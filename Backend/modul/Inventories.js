const mongoose= require('mongoose');
const {Schema, model} = mongoose;

const inventorySchema = new Schema ({
    name: String,
    pokemonDollar: Number,
    myPokemons: [
        {type: mongoose.Schema.Types.ObjectId,}
    ],
    Pokedex :
        [{type: mongoose.Schema.Types.ObjectId,}],
});

const Inventory = model('Inventory', inventorySchema);

module.exports = Inventory;