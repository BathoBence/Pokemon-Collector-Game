import React from "react";
import PokeCard from "../../Elements/PokeCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const fetchEvolveablePokemons = async (userId) => {
    const response = await fetch(`/user/evolvable_pokemons/${userId}`);
    const data = response.json();
    return data;
}

const EvolvePokemon = async (pokemonId) => {
    const res = await fetch(`/user/evolve_pokemon/${pokemonId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await res.json();
}

const EvolveCenter = () => {

    const [playerPokemons, setPlayerPokemons] = useState([])
    const { userId } = useParams();

    useEffect(() => {
        const getEvolveablePokemons = async () => {
            const pokemons = await fetchEvolveablePokemons(userId)
            setPlayerPokemons(pokemons)
        }
        getEvolveablePokemons()
    }, [])


    const handleClick = (event, pokemon) => {
        event.preventDefault();
        EvolvePokemon(pokemon._id)
    }

    return (
        <>
            {playerPokemons.map((pokemon) => {
                return (!pokemon.message ? <div key={pokemon._id}>
                    <PokeCard pokemon={pokemon} page={"Evolve"} />
                    <button onClick={(e) => handleClick(e, pokemon)}>Evolve</button>
                </div> : null)
            })}
        </>
    )
}

export default EvolveCenter