const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userPokemonSchema = new Schema({
    pokemonList: [{type:mongoose.Schema.Types.ObjectId, ref:'CaughtPokemons'}]
});

const UserPokemon = model('UserPokemon', userPokemonSchema);

module.exports = UserPokemon;