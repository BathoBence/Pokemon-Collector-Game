import './App.css';
import NavBar from './Components/NavBar.js'
import { useState } from 'react';

function App() {
  const [page, setPage] = useState('welcome')
  const [enemyPokemon, setEnemyPokemon] = useState(null)
  const [playerPokemon, setPlayerPokemon] = useState(null)
  const [player, setPlayer] = useState(null)

  const clickHandlers = {
    homePageButton: () => {
      setPage('home')
    },
    pokedexButton: () => {
      setPage('pokedex')
    },
    shopButton: () => {
      setPage('shop')
    },
    inventoryButton: () => {
      setPage('inventory')
    },
    battleButton: () => {
      setPage('battle')
    },
    evolveButton: () => {
      setPage('evolve')
    }
  }

  const handleEncounter = async () => {
    setPage('encounter')
  }
  const battleStartEvent = (player, enemy) => {
    setEnemyPokemon(enemy)
    setPlayerPokemon(player)
    setPage('battle')
  }



  return (
    <div className="App">
      {page === 'welcome' &&
        <WelcomingPage
          pageSetter={setPage}
        />}
      {page === 'encounter' &&
        <EncounterPage
          battleStartEvent={battleStartEvent}
        />}
      {page !== 'encounter' && page !== 'battle' && page!== 'welcome' && page!== 'login' && page!== 'submit' &&
        <NavBar
          page={page}
          player={player}
          eventHandlers={clickHandlers}
          handleEncounter={handleEncounter} />
      }
      {page === 'battle' && 
        <BattlePage
          enemy={enemyPokemon}
          player={playerPokemon}
          endOfBattle={clickHandlers.homePageButton}
        />}
    </div>
  );
}

export default App;
