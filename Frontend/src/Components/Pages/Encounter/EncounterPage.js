import { useState, useEffect } from "react";
import PokeCard from '../../PokeCard'
import "./EncounterPage.css"

const getPokemon = async (id) => {
    const promise = await fetch(`/api/pokemon/${id}`)
    const data = await promise.json()
    return data
}

export default function EncounterPage({ battleStartEvent }) {

    const [playerPokemon, setPlayerPokemon] = useState(null)
    const [enemyPokemon, setEnemyPokemon] = useState(null)
    const [selectedPokemon, setSelectedPokemon] = useState(null)

    useEffect(() => {
        const getEnemyPokemon = async () => {
            const promise = await fetch('/api/pokemon')
            const enemyPokemon = await promise.json()
            setEnemyPokemon(enemyPokemon[Math.floor(Math.random() * enemyPokemon.length)]);
        }
        const getPlayerPokemons = async () => {
            const promise = await fetch('/api/player/Viki')
            const data = await promise.json()
            const ids = data.myPokemons
            Promise.all([...ids].map(x => getPokemon(x))).then(x => setPlayerPokemon(x))
        }
        getEnemyPokemon()
        getPlayerPokemons()
    }, [])

    const handleBattleButton = (event) => {
        if((selectedPokemon!==null)&&(enemyPokemon!==null)){
            battleStartEvent(selectedPokemon, enemyPokemon)
        }
    }

    const handleSelect = (pokemon) => {
        if (selectedPokemon !== null) {
            console.log(pokemon)
            setPlayerPokemon(playerPokemon => [...playerPokemon, selectedPokemon])
        }
        setPlayerPokemon((playerPokemon) => playerPokemon.filter(x => x.id !== pokemon.id))
        setSelectedPokemon(pokemon)
    }

    return (
        enemyPokemon && playerPokemon ? <>
            <div className='encounterPage'>
                <div className="pokemonsDisplay">
                <div className='enemyBattleground'>
                    <div>A Wild Pokemon has appeared!</div>
                    <PokeCard
                        pokemon={enemyPokemon}
                        className={"enemyFighterPokemon"}
                    />
                </div>
                <button className="attackButton" onClick={(e)=>handleBattleButton(e)}>Start battle!</button>
                <div className='playerBattleground'>
                    <div>Send a Pokemon to Battle!</div>
                    <PokeCard 
                    pokemon={selectedPokemon} />
                </div>
                </div>
                <div className='ownDeck'>
                    <div className='pokemonSelect'>
                        <p>Select your</p>
                        <p>POKEMON</p>
                    </div>
                    <div className="pokes">
                        {playerPokemon.map((pokemon, index) => {
                            return (
                                <PokeCard
                                key={index}
                                    page={"Encounter"}
                                    pokemon={pokemon}
                                    className={"pokemonCard"}
                                    onImgClick={handleSelect}
                                />
                            );
                        })}

                    </div>
                </div>
            </div>
           
            </> : null)

}