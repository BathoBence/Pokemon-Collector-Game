const mongoose= require('mongoose');
const {Schema, model} = mongoose;

const finalPokedexSchema = new Schema ({
    pokemons: [Object]
});

const PokedexPokemon = model('PokedexPokemon', finalPokedexSchema);

module.exports = PokedexPokemon;