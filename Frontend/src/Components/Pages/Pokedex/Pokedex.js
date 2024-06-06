import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokeCard from "../../Elements/PokeCard";
import UnknownCard from "../../Elements/UnknownCard";
import './Pokedex.css'

const fetchPokedex = (id) => {
  return fetch(`/info/pokedex/${id}`).then((res) => res.json())
}



const Pokedex = () => {
  const [pokedex, setPokedex] = useState([])
  const {userId} = useParams();

  useEffect(() => {
    try {
      fetchPokedex(userId).then((pokedex)=>{
        setPokedex(pokedex)
      });
    } catch (error) {
      console.error("Error fetching Pokedex:", error);
    }
  }, []);


  return (
    <div className="pokedex">
      {pokedex.map((pokemon, index) => {
        if(pokemon.seen){
          return (<PokeCard pokemon={pokemon} key={index} />)
        } else {
          return (<UnknownCard pokemon={pokemon} key={index}/>)
        }
      })}
    </div>
  );
}

export default Pokedex;
