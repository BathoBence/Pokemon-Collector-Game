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
    Pokemons: {type: mongoose.Schema.Types.ObjectId, ref:'UserPokemons'},
    Pokedex : mongoose.Schema.Types.ObjectId,
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    new: {type: Boolean, default: true},
});

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    console.log(`New user password hashed: ${this.password}`);
    next();
})

userSchema.statics.login = async function (email , password){
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        console.log(`Password comparison: ${password} == ${user.password} => ${auth}`);
        if (auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = model('user', userSchema);

module.exports = User;