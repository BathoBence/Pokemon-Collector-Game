const mongoose = require('mongoose');
const PokemonModel = require('./modul/allPokemons')
const MapModel = require('./modul/finalMapModel')
const FinalPlayerModel = require('./modul/finalPlayerModel')
const FinalMyPokemonModel = require('./modul/finalMyPokemonModel')
const FinalPokedexModel = require('./modul/finalPokedexModel')
const locations = require('./map.json');

async function pokemonFetch() {
  const wildPokemons = await PokemonModel.find()
  for (const wildPokemon of wildPokemons) {
    if (wildPokemon.name === "bulbasaur" || wildPokemon.name === "charmander" || wildPokemon.name === "squirtle") {
      await PokedexPokemonModel.create({
        name: wildPokemon.name,
        id: wildPokemon.id,
        hp: wildPokemon?.hp,
        atk: wildPokemon?.atk,
        def: wildPokemon?.def,
        speed: wildPokemon?.speed,
        type: wildPokemon?.type,
        img: wildPokemon?.img,
        seen: true,
        form: wildPokemon?.form,
        evolveInto: wildPokemon?.evolveInto
      })
        .then(pokemon => {
        })
        .catch(error => {
          console.error(error);
        });
      await CaughtPokemonModel.create({
        name: wildPokemon.name,
        id: wildPokemon.id,
        hp: wildPokemon?.hp,
        atk: wildPokemon?.atk,
        def: wildPokemon?.def,
        speed: wildPokemon?.speed,
        type: wildPokemon?.type,
        img: wildPokemon?.img,
        form: wildPokemon?.form,
        evolveInto: wildPokemon?.evolveInto
      })
        .then(pokemon => {
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      await PokedexPokemonModel.create({
        name: wildPokemon.name,
        id: wildPokemon.id,
        hp: wildPokemon?.hp,
        atk: wildPokemon?.atk,
        def: wildPokemon?.def,
        speed: wildPokemon?.speed,
        type: wildPokemon?.type,
        img: wildPokemon?.img,
        seen: false,
        form: wildPokemon?.form,
        evolveInto: wildPokemon?.evolveInto
      })
        .then(pokemon => {
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  return ("done")
}

const getStarterPokemons = async () => {
  const starterPokemons = []
  const wildPokemons = await PokemonModel.find({ $or: [{ name: "bulbasaur" }, { name: "charmander" }, { name: "squirtle" }] })
  for (const wildPokemon of wildPokemons) {
    const caughtPokemon = {
      name: wildPokemon.name,
      id: `${wildPokemon.name}1`,
      hp: wildPokemon?.hp,
      atk: wildPokemon?.atk,
      def: wildPokemon?.def,
      speed: wildPokemon?.speed,
      type: wildPokemon?.type,
      img: wildPokemon?.img,
      form: wildPokemon?.form,
      level: 1,
      evolveInto: wildPokemon?.evolveInto
    };
    starterPokemons.push(caughtPokemon)
  }
  const myPokemons = await FinalMyPokemonModel.create({caughtPokemons: starterPokemons})
  return myPokemons
}

const preparePokedex = async () => {
  const allPokemons = []
  const wildPokemons = await PokemonModel.find({})
  for (const wildPokemon of wildPokemons){
    if (wildPokemon.name === "bulbasaur" || wildPokemon.name === "charmander" || wildPokemon.name === "squirtle") {
      const pokemon = {
        name: wildPokemon.name,
        id: wildPokemon.id,
        hp: wildPokemon?.hp,
        atk: wildPokemon?.atk,
        def: wildPokemon?.def,
        speed: wildPokemon?.speed,
        type: wildPokemon?.type,
        img: wildPokemon?.img,
        seen: true,
        cathed :true,
        form: wildPokemon?.form,
        evolveInto: wildPokemon?.evolveInto
      }
      allPokemons.push(pokemon)
    } else {
      const pokemon = {
        name: wildPokemon.name,
        id: wildPokemon.id,
        hp: wildPokemon?.hp,
        atk: wildPokemon?.atk,
        def: wildPokemon?.def,
        speed: wildPokemon?.speed,
        type: wildPokemon?.type,
        img: wildPokemon?.img,
        seen: false,
        cathed :false,
        form: wildPokemon?.form,
        evolveInto: wildPokemon?.evolveInto
      }
      allPokemons.push(pokemon)
    }
  }
  const pokedex = await FinalPokedexModel.create({pokemons: allPokemons})
  return pokedex
}


const mapCreator = async () => {
  const map = await MapModel.create({ locations })
  return map
}

const createFinalPlayer = async () => {
  const map = await mapCreator()
  const pokemons = await getStarterPokemons()
  const pokedex = await preparePokedex()
  await FinalPlayerModel.create({
    name: "Bence",
    myPokemons: pokemons._id,
    myPokedex : pokedex._id,
    myMap: map._id,
    password: 'AlexMerCer21.'
  })
  console.log("Another one")
}


async function main() {

  await mongoose.connect("mongodb+srv://pokemon:pokemongo@pokemongo.bs29s8f.mongodb.net/")
  // await pokemonFetch()
  await createFinalPlayer()
  await mongoose.disconnect("mongodb+srv://pokemon:pokemongo@pokemongo.bs29s8f.mongodb.net/")
}
main()