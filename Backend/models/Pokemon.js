const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const pokemonSchema = new Schema({
    name: String,
    id: Number,
    hp: Number,
    atk: Number,
    def: Number,
    speed: Number,
    type: [String],
    img: [String],
    seen: {
        type:Boolean,
        default: false
    },
    form: String,
    evolveInto: [String]
});

const Pokemon = model('Pokemon', pokemonSchema);


module.exports = Pokemon;