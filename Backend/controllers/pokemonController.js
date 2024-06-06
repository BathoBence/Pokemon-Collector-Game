const User = require('../models/User');
const PokemonModel = require('../models/Pokemon');
const UserPokemons = require('../models/UserPokemons');
const CaughtPokemon = require('../models/CaughtPokemon');
const PokedexPokemon = require('../models/PokedexPokemon');
const Pokemon = require('../models/Pokemon');


module.exports.add_pokemon_post = async (req, res) => {
    const { pokemonId } = req.body;
    const userId = req.params.id
    try {
        // Get the user
        const user = await User.findById(userId);
        // Get the user's pokemon list
        const pokemonList = await UserPokemons.findById(user.Pokemons);
        // Get the blueprint for the pokemon
        const basePokemon = await PokemonModel.findOne({ id: pokemonId });
        // Create caught pokemon
        const caughtPokemon = await createCaughtPokemon(basePokemon, user._id);
        // Check if the pokemon is new and update pokedex if it is
        if (checkIfPokemonIsNew(userId, caughtPokemon)) {
            await updatePokedex(userId, caughtPokemon);
        }
        // Add the ObjectId to the pokemon list
        pokemonList.pokemonList.push(caughtPokemon._id);
        // Save the updated documents
        pokemonList.save();
        user.save();
        console.log(`${caughtPokemon.name} has been added to ${user.name}`)
        res.status(201).json(user.name);
    } catch (err) {
        console.log(err);
        res.status(400).send("Error, pokemon has gone")
    }
};

module.exports.sell_pokemon_delete = async (req, res) => {
    const pokemonId = req.params.id;
    try {
        const pokemon = await CaughtPokemon.findById(pokemonId);
        const user = await User.findById(pokemon.trainerId);

        if (pokemon) {
            pokemon.deleteOne();
            const updatedInventory = [];
            const inventory = await UserPokemons.findById(user.Pokemons)
            const caughtPokemons = await CaughtPokemon.find({ trainerId: user._id })
            for (const pokemon of caughtPokemons) {
                updatedInventory.push(pokemon._id);
            }
            inventory.pokemonList = updatedInventory;
            await inventory.save();
            res.status(201).send("We know, it's not easy to let go");
        } else {
            res.status(201).send("Your pokemon is already gone");
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("We couldn't find that pokemon...");
    }
}

module.exports.evolve_pokemon_patch = async (req, res) => {
    const pokemonId = req.params.id;
    try {
        // Find the pokemon based on it's ID from the request parameters
        let pokemon = await CaughtPokemon.findById(pokemonId);
        console.log("found it");
        // Get the userID
        const userId = pokemon.trainerId;
        console.log("we have you");
        // Find the evolved version of the pokemon
        // If there is more than one evolution path, it evolves into the first in the list
        const wildBasePokemon = await PokemonModel.findOne({ name: pokemon.name });
        const evolvedPokemon = await PokemonModel.findOne({name:wildBasePokemon.evolveInto[0]})
        console.log(`the result will be ${evolvedPokemon.name}`);
        // Update the pokemon into the evolved version
        pokemon = await createCaughtPokemon(evolvedPokemon, userId);
        // Updates the pokedex if needed
        if (checkIfPokemonIsNew(userId, pokemon)) {
            await updatePokedex(userId, pokemon);
        }
        res.status(200).json(pokemon)
    } catch (err) {
        console.error(err);
        res.status(400).send('Evolution is failed, just like in your case');
    }
}

module.exports.evolveable_pokemons_get = async (req, res) => {
    const userId = req.params.id;
    try {
        const pokemons = await CaughtPokemon.find({ trainerId: userId });
        const evolveablePokemons = pokemons.map((pokemon) => {
            if (pokemon.level === 1) {
                return pokemon;
            }
        })
        res.status(200).json(evolveablePokemons);
    } catch (err) {
        console.error(err);
        res.status(400).send("There is no pokemon that can be evolved right now");
    }
}

module.exports.buy_pokemons_get = async (req, res) => {
    const { userId } = useParams();
    const boughtPokemons = [];
    const packPrice = 1000;
    try {
        const basePokemons = await PokemonModel.find({ form: "base" });
        const numberOfBasePokemons = basePokemons.length;
        for (let i = 0; i < 3; i++) {
            const basePokemon = basePokemons[(Math.floor(Math.random() * numberOfBasePokemons)) + 1];
            boughtPokemons.push(basePokemon);
            // Get the user
            const user = await User.findById(userId);
            if(user.pokemonDollar < packPrice){
                res.status(300).send("Not enough money my boi");
            }
            // Get the user's pokemon list
            const pokemonList = await UserPokemons.findById(user.Pokemons);
            // Create caught pokemon
            const caughtPokemon = await createCaughtPokemon(basePokemon, user._id);
            // Check if the pokemon is new and update pokedex if it is
            if (checkIfPokemonIsNew(userId, caughtPokemon)) {
                await updatePokedex(userId, caughtPokemon);
            }
            // Add the ObjectId to the pokemon list
            pokemonList.pokemonList.push(caughtPokemon._id);
            // Save the updated documents
            pokemonList.save();
            user.save();
            console.log(`${caughtPokemon.name} has been added to ${user.name}`)
        }
        res.status(200).json(boughtPokemons);
    } catch (err) {
        console.error(err);
        res.status(400).send("Can't find any base pokemon");
    }
}

const createCaughtPokemon = async (wildPokemon, user_id) => {
    const pokemon = await CaughtPokemon.create({
        name: wildPokemon.name,
        id: wildPokemon.id,
        hp: wildPokemon.hp,
        atk: wildPokemon.atk,
        def: wildPokemon.def,
        speed: wildPokemon.speed,
        type: wildPokemon.type,
        img: wildPokemon.img,
        form: wildPokemon.form,
        evolveInto: wildPokemon.evolveInfo,
        trainerId: user_id
    });
    return pokemon;
}

const updatePokedex = async (userId, pokemon) => {

    const pokedexPokemon = await PokedexPokemon.findOne({ trainerId: userId, name: pokemon.name })
    pokedexPokemon.seen = true;
    await pokedexPokemon.save();
}

const checkIfPokemonIsNew = async (userId, pokemon) => {
    const pokedexPokemon = await PokedexPokemon.findOne({ trainerId: userId, name:pokemon.name })
    console.log(pokemon);
    console.log(pokedexPokemon)
    return pokedexPokemon.seen
}