const mongoose= require('mongoose');
const {Schema, model} = mongoose;
const {v4: uuidv4} = require('uuid');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
    name: String,
    id: {
        type: String,
        default: uuidv4()
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    pokemonDollar: {type: Number, default: 1000},
    Pokemons: mongoose.Schema.Types.ObjectId,
    Pokedex : mongoose.Schema.Types.ObjectId,
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
});

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

const User = model('user', userSchema);

module.exports = User;