import React from "react";
import { useState, useEffect } from 'react'
import PokeCard from '../../Elements/PokeCard'
import { useParams } from 'react-router-dom'

const sellPokemon = (pokemonId) => {
    return fetch(`/user/sell_pokemon/${pokemonId}`, { 
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
     }).then((res) =>
      res.json()
    );
  };

const Inventory = ({onSell}) => {
    const [playerPokemons, setPlayerPokemons] = useState([]);
    const [numberOfPokemons, setNumberOfPokemons] = useState(151);
    const {userId} = useParams();

    useEffect(() => {
        const fetchInventory = async () => {
            const response = await fetch(`/info/inventory/${userId}`);
            const data = await response.json();
            setPlayerPokemons(data);
        }
        fetchInventory()

    }, [numberOfPokemons])

    const handleClick = async (event,pokemonId) => {
        event.preventDefault()
        await sellPokemon(pokemonId)
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

export default Inventory;