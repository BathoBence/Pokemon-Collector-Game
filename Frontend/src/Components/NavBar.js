import React from "react";
import { useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import './NavBar.css'

const NavBar = () => {

    const [name, setName] = useState(null);
    const [gold, setGold] = useState(null);
    const {userId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        async function getStat() {
            // need and endpoint that return the user
            const response = await fetch(`/info/user/${userId}`)
            const playerData = await response.json()
            setName(playerData.username)
            setGold(playerData.gold)
        }
        getStat()

    }, [])

    return (
        <>
            <div className="body_container">
                <div className="navBar">
                    <div className="navStats">
                        <div className='navName'>{name}</div>
                        <div className="navGold">{gold}G</div>
                    </div>
                    <div className="navButtons">
                        <button className="navButton" onClick={()=> navigate(`/main/${userId}`)}>Home</button>
                        <button className="navButton" onClick={()=> navigate(`/main/shop/${userId}`)}>Shop</button>
                        <button className="navButton" onClick={()=> navigate(`/main/evolve/${userId}`)}>Evolve</button>
                        <button className="navButton" onClick={()=> navigate(`/main/inventory/${userId}`)}>Inventory</button>
                        <button className="navButton" onClick={()=> navigate(`/main/pokedex/${userId}`)}>Pokedex</button>
                    </div>
                </div>
                <div className="content"><Outlet /></div>
            </div>
        </>
    )
}

export default NavBar