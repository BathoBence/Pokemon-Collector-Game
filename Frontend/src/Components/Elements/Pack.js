import React from "react";
import PokeCard from "./PokeCard";

const Pack = ({pokemons}) => {
    return (
        <div className="pack">
            {pokemons.map(x=><PokeCard pokemon={x}/>)}
        </div>
    )
}

export default Pack