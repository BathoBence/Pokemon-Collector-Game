const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const pokedexPokemonSchema = new Schema({
    name: String,
    type: [String],
    img: [String],
    seen: {
        type:Boolean,
        default: false
    },
    form: String,
    evolveInto: [String]
});

const PokedexPokemon = model('Pokemon', pokedexPokemonSchema);


module.exports = PokedexPokemon;