import React, { useState } from 'react'

const convertPokemonName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};


const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};


const PokeCard = ({ page, pokemon, onImgClick }) => {
    const [visible, setVisible] = useState(false)
    const showStats = () => {
        setVisible(!visible)
    };
    if (page === "Encounter") {
        console.log(pokemon)

        return (
            ((pokemon !== null) & (pokemon !== undefined) & (pokemon?.message !== 'Pokemon not found')) ?
                <div key={pokemon.id} className='pokemonCard' style={{ backgroundColor: colours[pokemon?.type[0]] }}>
                    <img onClick={() => onImgClick(pokemon)} className='cardImage' src={pokemon?.img[0]} alt=''></img>
                    <h2 className='cardTitle'>{convertPokemonName(pokemon?.name)}</h2>
                    {visible && (
                        <div className='stats'>
                            <p>Health: {pokemon?.hp}</p>
                            <p>Attack: {pokemon?.atk}</p>
                            <p>Defense: {pokemon?.def}</p>
                            <p>Type: {pokemon?.type.join(", ")}</p>
                            <p>Speed: {pokemon?.speed}</p>
                        </div>
                    )}
                </div> : null
        )
    } else if (page === "Inventory") {
        return (
            ((pokemon !== null) && (pokemon !== undefined) && (pokemon?.message !== 'Pokemon not found')) ?
                <div key={pokemon.id}>
                    <div className='pokemonCard' style={{ backgroundColor: colours[pokemon?.type[0]] }}>
                        <div className='imageBackground' style={{ backgroundColor: colours[pokemon?.type[0]] }}>
                            <img className='cardImage' onClick={showStats} src={pokemon?.img[0]} alt='' ></img>
                        </div>
                        <h2 className='cardTitle'>{convertPokemonName(pokemon.name)}</h2>
                        {(visible) ? (
                            <div className='stats'>
                                <p>Health: {pokemon.hp}</p>
                                <p>Attack: {pokemon.atk}</p>
                                <p>Defense: {pokemon.def}</p>
                                <p>Type: {pokemon.type.join(", ")}</p>
                                <p>Speed: {pokemon.speed}</p>
                                <p>Level: {pokemon.level}</p>
                            </div>
                        ) : null}
                    </div>
                </div> : null
        )
    } else {
        return (
            ((pokemon !== null) && (pokemon !== undefined) && (pokemon?.message !== 'Pokemon not found')) ?
                <div key={pokemon.id} className='pokemonCard' style={{ backgroundColor: colours[pokemon?.type[0]] }}>
                    <img className='cardImage' onClick={showStats} src={pokemon?.img[0]} alt='' ></img>
                    <h2 className='cardTitle'>{convertPokemonName(pokemon.name)}</h2>
                    {(visible) ? (
                        <div className='stats'>
                            <p>Health: {pokemon.hp}</p>
                            <p>Attack: {pokemon.atk}</p>
                            <p>Defense: {pokemon.def}</p>
                            <p>Type: {pokemon.type.join(", ")}</p>
                            <p>Speed: {pokemon.speed}</p>
                        </div>
                    ) : null}
                </div> : null
        )
    }
}

export default PokeCard;