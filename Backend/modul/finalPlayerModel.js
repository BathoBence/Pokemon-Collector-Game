const mongoose= require('mongoose');
const {Schema, model} = mongoose;

const finalPlayerSchema = new Schema ({
    name: String,
    pokemonDollar: {type: Number, default: 1000},
    myPokemons: mongoose.Schema.Types.ObjectId,
    myPokedex : mongoose.Schema.Types.ObjectId,
    myMap: mongoose.Schema.Types.ObjectId,
    password: String
});

const FinalPlayer = model('finalPlayer', finalPlayerSchema);

module.exports = FinalPlayer;