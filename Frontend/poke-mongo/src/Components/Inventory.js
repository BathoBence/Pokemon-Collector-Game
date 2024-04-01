import { useState, useEffect } from 'react'
import PokeCard from './PokeCard'

const getPokemon = async (id) => {
    const promise = await fetch(`/api/pokemon/${id}`)
    const data = await promise.json()
    return data
}

const sellPokemon = (id) => {
    return fetch(`/api/inventory/${id}`, { 
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
     }).then((res) =>
      res.json()
    );
  };

export default function Inventory({onSell}) {
    const [playerPokemons, setPlayerPokemons] = useState([])
    const [numberOfPokemons, setNumberOfPokemons] = useState(151)

    useEffect(() => {
        const fetchInventory = async () => {
            const response = await fetch("/api/player/Viki");
            const data = await response.json();
            const urls = data.myPokemons.map((pokemon)=>(pokemon))
            Promise.all([...urls].map(x => getPokemon(x))).then(x => setPlayerPokemons(x))
        }
        fetchInventory()

    }, [numberOfPokemons])

    const handleClick = (event,pokemonId) => {
        event.preventDefault()
        sellPokemon(pokemonId).then((money)=>{
            onSell(Number(money))
        })
        setNumberOfPokemons(numberOfPokemons-1)
    }


    return (

        <>
            {playerPokemons.map((pokemon,index) => {
                return (!pokemon.message ?<div key={pokemon._id}>
                    <PokeCard pokemon={pokemon} page={"Inventory"} />
                    <button onClick={(e)=>handleClick(e,pokemon._id)}>Sell</button>
                </div>:null)
            })}
        </>
    )
}