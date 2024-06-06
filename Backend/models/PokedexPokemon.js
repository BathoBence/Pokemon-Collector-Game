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
    evolveInto: [String],
    trainerId: {type: mongoose.Schema.Types.ObjectId, default: null}
});

const PokedexPokemon = model('PokedexPokemon', pokedexPokemonSchema);


module.exports = PokedexPokemon;