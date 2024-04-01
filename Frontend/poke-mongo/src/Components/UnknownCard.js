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


const UnKnownCard = ({ pokemon, onClick }) => {
    const [visible, setVisible] = useState(false)
    const showStats = () => {
        setVisible(!visible)
    };
    return (
        pokemon !== null ?
            <div key={pokemon.id}>
                <div className='Unknown' style={{backgroundColor: "#676767"}}>
                <img className='UnknownCardImage' src={"https://i0.wp.com/www.alphr.com/wp-content/uploads/2016/07/whos_that_pokemon.png?fit=1920%2C1080&ssl=1"} alt=''></img>
                <h2 className='cardTitle'>Unknown</h2>
                </div>
            </div> : null
    )
}

export default UnKnownCard;