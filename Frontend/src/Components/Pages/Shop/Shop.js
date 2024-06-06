import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Pack from "../../Elements/Pack";


const buyPack = async (userId) => {
  const res = await fetch(`/api/player/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

const updateSeenPokemons = async (pokemon) => {
  const res = await fetch(`/api/pokemonSeen/${pokemon.name}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};



const Shop = ({ eventHandler, gold }) => {

  const [open, setOpen] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const {userId} = useParams();

  const openedPokemons = [];

  const openPack = async () => {

    setOpen(true);
    setPokemons(openedPokemons);
    eventHandler();
  }

  return (
    <div className="mainShopContainer">
      <div className="shopContainer">
        <div className="packBuy">
          {open ? <> </> : <div className="packImage"></div>}
          {open ? <button className="Buy" onClick={openPack}>Bust open another pack!</button> :
            <button className="Buy" onClick={openPack}>Buy 3 Pokemons for 1000G</button>}
        </div>
        <div className="openerContainer">
          {open ? <Pack pokemons={pokemons} /> : <></>}
        </div>
      </div>
      <div className="shopInventory"></div>
    </div>
  )
}

export default Shop