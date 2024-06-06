const caughtPokemon = require('../models/CaughtPokemon');
const PokedexPokemon = require('../models/PokedexPokemon');
const User = require('../models/User');
const UserPokemon = require('../models/UserPokemons');

module.exports.get_user_info = async (req, res) => {
    const userId  = req.params.id;
    try {
        const user = await User.findById(userId);
        res.status(201).json({username: user.name, gold: user.pokemonDollar})
    } catch (err) {
        console.error(err);
        res.status(400).send("Can't find the user");
    }
}

module.exports.get_pokedex = async (req, res) => {
    const userId = req.params.id;
    try {
        const pokedexPokemons = await PokedexPokemon.find({trainerId:userId})
        res.status(201).json(pokedexPokemons);
    } catch (err) {
        console.error(err);
        res.status(400).send("Can't find the user");
    }
}

module.exports.get_inventory = async (req, res) => {
    const userId = req.params.id;
    try {
        const userPokemons = await caughtPokemon.find({trainerId: userId})
        console.log(userPokemons);
        res.status(201).json(userPokemons);
    } catch (err) {
        console.error(err);
        res.status(400).send("Can't find the user");
    }
}