const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userPokemonSchema = new Schema({
    UserPokemons: [mongoose.Schema.Types.ObjectId]
});

const UserPokemon = model('UserPokemon', userPokemonSchema);

module.exports = UserPokemon;