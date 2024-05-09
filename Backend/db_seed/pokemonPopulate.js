const mongoose = require('mongoose');
require("dotenv").config();
const pokemons = require('../db_seed/pokemons.json');
const Pokemon = require('../models/Pokemon');

const { MONGO_URL} = process.env;
console.log(MONGO_URL);

async function seedPokemonDb () {
  await Pokemon.deleteMany({});
  console.log('deleted');
  for (const pokemon of pokemons){
      
      await Pokemon.create({
        name: pokemon.name,
        id: pokemon.id,
        hp: pokemon.hp,
        atk: pokemon.atk,
        def: pokemon.def,
        speed: pokemon.speed,
        type: pokemon.type,
        img: pokemon.img,
        form: pokemon.form,
        evolveInto: pokemon.evolveInto
      })
      .then(pokemon => { console.log(pokemon.name);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  const main = async () => {
    await mongoose.connect(MONGO_URL);
    await seedPokemonDb();
    await mongoose.disconnect(MONGO_URL);
  }
  main();