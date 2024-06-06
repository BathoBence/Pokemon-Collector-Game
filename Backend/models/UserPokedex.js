const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userPokedexSchema = new Schema ({
    pokemons: [{type: mongoose.Schema.Types.ObjectId, ref:"PokedexPokemon"}]
});

const UserPokedex = model('UserPokedex', userPokedexSchema);

module.exports = UserPokedex;