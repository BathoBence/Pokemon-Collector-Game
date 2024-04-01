import { useState } from "react";
import Pack from "./Pack";


const updateMyPokemons = (pokemon) => {
    return fetch(`/api/player/${pokemon.name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const updateSeenPokemons = (pokemon) => {
    return fetch(`/api/pokemonSeen/${pokemon.name}`, {
      method: "PATCH",
        headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };



const Shop =  ({eventHandler,gold}) => {
    
    const [open,setOpen] = useState(false)
    const [pokemons,setPokemons] =useState([])
    
    const openedPokemons = [];
    
    const openPack = async () => {
      if (Number(gold) > 999)  {
        for(let i = 0; i < 3; i++) {
          
          const promise = await fetch('/api/basePokemons')
          const pokemons = await promise.json()
          const pokemon = pokemons[(Math.floor(Math.random()*73))+1]
          
          updateMyPokemons(pokemon)
          openedPokemons.push(pokemon)
          updateSeenPokemons(pokemon)
          setOpen(true)
          setPokemons(openedPokemons)
        }
        eventHandler()
      } else {
        console.log("Don't have enoguh money :(")
      }
    }

    return (
        <div className="mainShopContainer">
            <div className="shopContainer">
                <div className="packBuy">
                    {open ? <> </> : <div className="packImage"></div>}
                    {open ? <button className="Buy" onClick={openPack}>Bust open another pack!</button>:
                    <button className="Buy" onClick={openPack}>Buy 3 Pokemons for 1000G</button>}
                </div>
                <div className="openerContainer">
                    {open ? <Pack pokemons={pokemons}/> : <></>}
                </div>
            </div>
            <div className="shopInventory"></div>
        </div>
        )
    }

export default Shop