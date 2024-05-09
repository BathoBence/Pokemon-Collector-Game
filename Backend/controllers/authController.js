const User = require('../models/User');
const PokemonModel = require('../models/Pokemon');
const PokedexModel = require('../models/UserPokedex');
const UserPokemons = require('../models/UserPokemons');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const handleErrors = (err) => {
    console.log(err.message, err.code);
}
//3 days in minutes
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'ultimateninjasecrettealeaf', {
        expiresIn: maxAge
    });
};

module.exports.signup_post = async (req, res) => {
    const {userName, password, email} = req.body;
    try {
        const user = createUser(userName, password, email);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,

        });
        res.status(201).json(user.name);
    } catch(err) {
        handleErrors(err);
        res.status(400).send("Error, user not created")
    }
};
const prepareUserPokemons = async () => {
    const userPokemons = await UserPokemons.create({pokemons: []});
    return userPokemons;
};
const preparePokedex = async () => {
    const allPokemons = [];
    const wildPokemons = await PokemonModel.find({});
    const numberOfGen1Pokemons = 151
    if(wildPokemons.length === numberOfGen1Pokemons){
        for (const wildPokemon of wildPokemons){
            const pokemon = {
                name: wildPokemon.name,
                type: wildPokemon?.type,
                img: wildPokemon?.img,
                seen: false,
                form: wildPokemon?.form,
                evolveInto: wildPokemon?.evolveInto
            }
            allPokemons.push(pokemon);
        }
        const pokedex = await PokedexModel.create({pokemons: allPokemons});
        return pokedex;
    } else {
        console.log("You need to run the pokemonPopulate file first!")
    }
    
};
const createUser = async (userName, password, email) => {
    const pokedex = await preparePokedex();
    const userPokemons = await prepareUserPokemons();
    try {
        const user = await User.create({
            name: userName,
            email: email,
            Pokemons: userPokemons._id,
            Pokedex : pokedex._id,
            password: password
          });
        console.log(`${userName} is created!`);
        return user;
    } catch (err) {
        console.log(err);
    }
};

module.exports.login_post = (req, res) => {
    const {username, password} = req.body;
    res.send('user login')
}