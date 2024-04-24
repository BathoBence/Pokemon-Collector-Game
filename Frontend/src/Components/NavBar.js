import { useEffect, useState } from "react";

import Inventory from './Inventory.js'
import Pokedex from './Pokedex.js'
import Shop from './Shop.js'
import Home from './Home.js'
import EvolveCenter from './EvolveCenter.js'

function NavBar({page, eventHandlers, handleEncounter}){

    const [name, setName] = useState(null)
    const [gold, setGold] = useState(null)

    useEffect(()=>{

        async function getStat(){
            const response = await fetch(`/api/player/Viki`)
            const playerData = await response.json()
            setName(playerData.name)
            setGold(playerData.pokemonDollar)    
        }
        getStat()

    },[])


    async function bought(value) {
        const patchResponse = async() => await fetch('/api/player/money/minus',{
            method:'PATCH',
            headers: {'Content-type': 'application/json'},
        })
        patchResponse()

        setTimeout(async () => {
            
            const getResponse = await fetch('/api/player/Viki')
            const playerData = await getResponse.json()
    
            setGold(playerData.pokemonDollar)
        }, 500);
    }
    function handleCallBack(url){
        handleEncounter(url)
    }

    return(
        <>
            <div className="navBar">
                <div className="navStats">
                    <div className='navName'>{name}</div>
                    <div className="navGold">{gold}G</div>
                </div>
                <div className="navButtons">
                    <button className="navButton" onClick={eventHandlers.homePageButton}>Home</button>
                    <button className="navButton" onClick={eventHandlers.shopButton}>Shop</button>
                    <button className="navButton" onClick={eventHandlers.evolveButton}>Evolve</button>
                    <button className="navButton" onClick={eventHandlers.inventoryButton}>Inventory</button>
                    <button className="navButton" onClick={eventHandlers.pokedexButton}>Pokedex</button>
                </div>
            </div>
            <div className="screen">
                {page === 'home' && <Home
                    battleStartEvent={eventHandlers.battleButton}
                    handleEncounter={handleCallBack}/>}
                {page === 'shop' && <Shop
                    eventHandler={bought}
                    gold={gold}
                    />}
                {page === 'inventory' && <Inventory onSell={setGold}/>}
                {page === 'pokedex' && <Pokedex/>}
                {page === 'evolve' && <EvolveCenter onEvolve={eventHandlers.inventoryButton}/>}
            </div>
        </>
    )
}

export default NavBar