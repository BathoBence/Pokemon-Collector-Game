const mongoose = require('mongoose');
const caughtPokemon = require('./caughtPokemons');
const { Schema, model } = mongoose;

const finalMyPokemonSchema = new Schema({
    caughtPokemons: [Object]
});

const finalMyPokemon = model('finalMyPokemon', finalMyPokemonSchema);

module.exports = finalMyPokemon;