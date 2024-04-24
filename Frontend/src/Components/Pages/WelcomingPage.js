import React from 'react';
import {useNavigate} from "react-router-dom"
import { useState } from 'react';
import PlayerList from '../PlayerList';

const WelcomePage = ({pageSetter}) => {
    const navigate = useNavigate()
    const [newplayer, setNewPlayer] = useState(null)
    const handleClick=()=> {
        navigate("/Viki")
        pageSetter("home")
    }
    if(newplayer===null){

        return (<div className="welcomeDiv">
        <div className="welcomeContainer">
            <h1>Welcome!</h1>
            <h2>Were you here before?</h2>
            <div>
                <button onClick={handleClick}>Yes</button>
                <button onClick={()=>setNewPlayer(true)}>Nope</button>
            </div>
        </div>
    </div>)
    } else if(newplayer===false){
        return (<div><h1>Woww</h1></div>)
    } else {
        return (<PlayerList/>)
    }
}

export default WelcomePage