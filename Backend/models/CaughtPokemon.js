const mongoose= require('mongoose');
const {Schema, model} = mongoose;

const caughtPokemonSchema = new Schema ({
    name: String,
    id: Number,
    hp: Number,
    atk: Number,
    def: Number,
    speed: Number,
    type: [String],
    img: [String],
    level: {
        type: Number,
        default: 1
    },
    form: String,
    evolveInto: String,
    trainerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User",
        required: true,
    }
});

const caughtPokemon = model('CaughtPokemon', caughtPokemonSchema);

module.exports = caughtPokemon;