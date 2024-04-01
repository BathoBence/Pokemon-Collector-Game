import PokeCard from "./PokeCard"
import { useState, useEffect } from "react"


const fetchEvolveablePokemons = () => {
    return fetch('/api/evolve').then((res) => res.json())
}

const addEvolvedPokemon = (pokemon) => {
    return fetch(`/api/player/${pokemon.evolveInto}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

const removeBasePokemon = (pokemon) =>{
    return fetch(`/api/remove/${pokemon._id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res)=>res.json())
}

const updateSeenPokemons = (pokemon) => {
    return fetch(`/api/pokemonSeen/${pokemon.evolveInto}`, {
      method: "PATCH",
        headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

const EvolveCenter = ({onEvolve}) => {

    const [playerPokemons, setPlayerPokemons] = useState([])
    const [numberOfPokemons, setNumberOfPokemons] = useState(151)
    const [evolvedPokemon, setEvolvedPokemon] = useState()

useEffect(()=>{
    fetchEvolveablePokemons()
    .then((pokemons)=>{
        setPlayerPokemons(pokemons)
    })
},[])


    const handleClick = (event, pokemon) => {
        event.preventDefault();
        addEvolvedPokemon(pokemon)
        removeBasePokemon(pokemon)
        updateSeenPokemons(pokemon)
        onEvolve()
    }

    return (

        <>
            {playerPokemons.map((pokemon, index) => {
                return (!pokemon.message ? <div key={pokemon._id}>
                    <PokeCard pokemon={pokemon} page={"Evolve"} />
                    <button onClick={(e) => handleClick(e, pokemon)}>Evolve</button>
                </div> : null)
            })}
        </>
    )
}

export default EvolveCenter