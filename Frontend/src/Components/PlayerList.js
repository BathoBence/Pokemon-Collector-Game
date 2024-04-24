import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const fetchPlayers = () => {
    return fetch("/api/users").then((res)=>res.json())
}


const PlayerList = () => {
    const [players, setPlayers] = useState(null)
    const numberOfAllPokemon = 151

    useEffect(()=>{
        fetchPlayers()
        .then((players)=>{
            setPlayers(players)
        })
    },[])


    if(players){

        return (
            <div>
        {players.map((player)=>{
            return (
                <div>
            <h1>{player?.name}</h1>
            <h1>{player?.pokedex}/{numberOfAllPokemon}</h1>
            <button>LogIn</button>
                </div>
            )
        })}
    </div>)
    }

}

export default PlayerList