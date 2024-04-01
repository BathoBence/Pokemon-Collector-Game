import React, { useEffect, useState } from "react";
import PokeCard from "./PokeCard";
import UnknownCard from "./UnknownCard";

const fetchSeenPokemons = () => {
  return fetch(`/api/pokedex`).then((res) => res.json())
}



function Pokedex() {
  const [seenPokemons, setSeenPokemons] = useState([])

  useEffect(() => {
    try {
      fetchSeenPokemons().then((fetchedSeenPokemons)=>{
        setSeenPokemons(fetchedSeenPokemons)
      });
    } catch (error) {
      console.error("Error fetching seen Pokemon:", error);
    }
  }, []);


  return (
    <>
      {seenPokemons.map((pokemon, index) => {
        if(pokemon.seen){
          return (<PokeCard pokemon={pokemon} key={index} />)
        } else {
          return (<UnknownCard pokemon={pokemon} key={index}/>)
        }
      })}
    </>
  );
}

export default Pokedex;
