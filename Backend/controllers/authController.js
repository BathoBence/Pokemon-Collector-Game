const User = require('../models/User');
const PokemonModel = require('../models/Pokemon');
const PokedexModel = require('../models/UserPokedex');
const UserPokemons = require('../models/UserPokemons');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const PokedexPokemon = require('../models/PokedexPokemon');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    //incorrect email
    if(err.message === 'incorrect email') {
        errors.email = 'that email is not registered';
    }

    //incorrect password
    if(err.message === 'incorrect password') {
        errors.password = 'the password is incorrect';
    }

    //duplicate error
    if(err.code === 11000) {
        errors.email = 'that email is already registered'
        return errors;
    }

    //validation error
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
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
        const user = await createUser(userName, password, email);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });
        res.status(201).json({
            userName: user.name,
            id: user._id
        });
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
    const wildPokemons = await PokemonModel.find({});
    const numberOfGen1Pokemons = 151
    if(wildPokemons.length === numberOfGen1Pokemons){
        const pokedexIds = [];
        for (const wildPokemon of wildPokemons){
            const pokemon = await PokedexPokemon.create({
                name: wildPokemon.name,
                type: wildPokemon?.type,
                img: wildPokemon?.img,
                form: wildPokemon?.form,
                evolveInto: wildPokemon?.evolveInto
            })
            pokedexIds.push(pokemon._id);
        }
        const pokedex = await PokedexModel.create({pokemons: pokedexIds});
        return pokedex;
    } else {
        console.log("You need to run the pokemonPopulate file first!")
    }
    
};

const preparePokedexPokemons = async (pokemons, userId) => {
    for (const pokemonId of pokemons) {
        const pokemon = await PokedexPokemon.findById(pokemonId);
        pokemon.trainerId = userId;
        await pokemon.save();
    }

}
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
        preparePokedexPokemons(pokedex.pokemons, user._id);
        console.log(`${user.name} is created!`);
        return user;
    } catch (err) {
        console.log(err);
    }
};

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    console.log(email)
    console.log(password)
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });
        res.status(200).json({user: user._id})
    } catch (err) {
        const errors = handleErrors(err);
        console.log(err)
        res.status(400).json({ errors });
    }
}