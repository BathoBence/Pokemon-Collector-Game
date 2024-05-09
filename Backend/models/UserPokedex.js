const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userPokedexSchema = new Schema ({
    pokemons: [Object]
});

const UserPokedex = model('UserPokedex', userPokedexSchema);

module.exports = UserPokedex;