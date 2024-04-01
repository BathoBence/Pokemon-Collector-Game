const mongoose= require('mongoose');
const {Schema, model} = mongoose;

const finalPokedexSchema = new Schema ({
    pokemons: [Object]
});

const finalPokedex = model('FinalPokedex', finalPokedexSchema);

module.exports = finalPokedex;