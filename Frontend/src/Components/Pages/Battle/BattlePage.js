import React from "react";
import { useEffect, useState } from "react"
import "./BattlePage.css"

const addPokemonToPlayer = (pokemon) => {
  return fetch(`/api/player/${pokemon.name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
const updateSeenPokemon = (pokemon) => {
  return fetch(`/api/pokemonSeen/${pokemon.name}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const levelUpPokemon = (pokemon) => {
  if(pokemon.level < 3) { 
    return fetch(`/api/levelup/${pokemon._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((res) => res.json());
  } else {
    console.log("Your pokemon reached the max level already. You can evolve it.")
  }
}


export default function BattlePage({ player, enemy, endOfBattle }) {
  const [enemyPokemon, setEnemyPokemon] = useState(enemy)
  const [playerPokemon, setPlayerPokemon] = useState(player)
  const [round, setRound] = useState('player')
  const [battleWon, setBattleWon] = useState(false)
  const [fightOver, setFightOver] = useState(false)
  const [pokemonAdded, setPokemonAdded] = useState(false)
  const myPokeImg = playerPokemon.img[1]
  const enemyPokeImg = enemyPokemon.img[0]

  function damage(B, D) {
    const Z = Math.floor(Math.random() * 38) + 217
    return Number(Math.floor((((2 / 5 + 2) * B * 60 / D) / 50) + 2) * Z / 255)
  }

  const navigateToRoot = () => {
    window.location.href = '/';
  };



  useEffect(() => {

    setTimeout(() => {

      if (enemyPokemon.hp > 0 && playerPokemon.hp > 0) {
        if (round === 'player') {
          setEnemyPokemon(enemyPokemon, enemyPokemon.hp -= Math.floor(damage(playerPokemon.atk, enemyPokemon.def)))
          setRound('enemy')
        }
        if (round === 'enemy') {
          setPlayerPokemon(playerPokemon, playerPokemon.hp -= Math.floor(damage(enemyPokemon.atk, playerPokemon.def)))
          setRound('player')
        }

      }
      if (playerPokemon.hp <= 0) {
        setFightOver(true)
        updateSeenPokemon(enemyPokemon)
        return
      }
      if (enemyPokemon.hp <= 0 && !pokemonAdded) {
        addPokemonToPlayer(enemyPokemon)
        updateSeenPokemon(enemyPokemon)
        levelUpPokemon(playerPokemon)
        setFightOver(true)
        setBattleWon(true)
        setPokemonAdded(true)
        return
      }

    }, 500);

  }, [round])

  return (
    <div className="battleground">
      {fightOver ? (
        battleWon ? (
          <div className="page">

            <button className="button" onClick={navigateToRoot}>
              You won!<br /> Click me to go back and claim your new Pokemon!
            </button>
          </div>
        ) : (
          <div className="page">

            <button className="button" onClick={navigateToRoot}>
              You lost!<br /> Click me to go back and rethink your life choices!
            </button>
          </div>

        )
      ) : (
        <>
          <div className="page">
            <div className="my">
              <img src={myPokeImg} alt="selfie" width="175px" />
              Player:{playerPokemon.hp}
              {playerPokemon.type.map((type)=>{
                return (
                <button>
                  {type} Attack
                </button>)
              })}
            </div>
            <div className="enemy">
              <img src={enemyPokeImg} alt="selfie" width="175px" />
              Enemy:{enemyPokemon.hp}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
