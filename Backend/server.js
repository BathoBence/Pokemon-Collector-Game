const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
require("dotenv").config();
const PokemonModel = require('./models/Pokemon');
const CaughtPokemonModel = require('./models/UsersPokemon');
const PlayerModel = require('./models/User');

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
    console.error("Missing MONGO_URL env. variable");
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use("/api",authRoutes);
app.use(cookieParser());

app.get('/set-cookies',(req,res) => {
res.cookie('name', false);
res.send("Check the cookies!");

});

app.get('/read-cookies', (req, res) => {



})

const main = async () => {
    await mongoose.connect(MONGO_URL);
    app.listen(PORT, () => {
        console.log(`App is listening on ${PORT}`);
        console.log("Try /api/pokemons route right now");
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
/* 
//Get all users

app.get("/api/users", async (req,res,next)=>{
    try{
        const players = await PlayerModel.find({})
        const playersPublic = await Promise.all(players.map(async(player)=>{
            const pokedex = await PokedexModel.findById(player.myPokedex)
            const progress = await pokedex.pokemons.filter((pokemon)=>pokemon.cathed === true)
            return {
                name: player.name,
                pokedex: progress.length
            }
        }))
        console.log(playersPublic)
        return res.json(playersPublic)
    } catch (err) {
        next(err)
    }
})

//Check the progress

app.get("/api/progress/:id", async (req,res,next)=>{
    try {
        const id = req.params.id
        const pokedex = await PokedexModel.findById(id)
        const progress = pokedex.pokemons.filter((pokemon)=>pokemon.cathed === true)
        return res.json(progress.length)
    } catch (err) {
        next(err)
    }
})

//------------------------------------------------------------------------
//Get all basic pokemon
app.get('/api/basePokemons', async (req, res, next) => {
    try {
        const basePokemons = await PokemonModel.find({form:"Base"})
        return res.json(basePokemons)
    } catch (err) {
        next(err)
    }
})

//Get all pokémon
app.get('/api/pokemon', async (req, res, next) => {
    try {
        const pokemons = await PokemonModel.find();
        return res.json(pokemons);
    } catch (err) {
        return next(err);
    }
});

app.get('/api/seenPokemons', async (req,res,next)=> {
    try {
        const seenPokemons = await PokedexPokemonModel.find({seen:true})
        return res.json(seenPokemons)
    } catch (err) {
        next(err)
    }
})

app.get('/api/pokedex', async (req,res,next)=> {
    try {
        const pokedexPokemons = await PokedexPokemonModel.find({})
        return res.json(pokedexPokemons)
    } catch (err) {
        next(err)
    }
})


//Create new Adenturer
app.post("/api/create/:name", async (req,res) => {
    const bulbasaur = await PokemonModel.findOne({name:"bulbasaur"});
    const charmander = await PokemonModel.findOne({name:"charmander"});
    const squirtle = await PokemonModel.findOne({name:"squirtle"});
    const allPokemons = await PokemonModel.find();
    const pokedex = allPokemons.map((pokemon)=>{
        if(pokemon.name ==="charmander" || pokemon.name ==="bulbasaur" || pokemon.name ==="squirtle" ){
            return ({
                PokeId: pokemon._id,
                seen:true
            })
        } else {
            return ({
                PokeId: pokemon._id,
                seen:false
            })
        }
    })
    const adventurer = {
        name: req.params.name,
        pokemonDollar: 1000,
        myPokemons: [
            {
            PokeId: bulbasaur._id
            },
            {
            PokeId: charmander._id
            },
            {
            PokeId: squirtle._id
            }
        ],
        Pokedex: pokedex
    }
    await InventoryModel.create(adventurer)
    return res.json("Welcome "+req.params.name)
})



//Get inventory
app.get('/api/player/:name', async (req, res, next) => {

    try {
        const myInventory = await InventoryModel.findOne({name: req.params.name});
        return res.json(myInventory);
    } catch (err) {
        return next(err);
    }
});

//Get a single pokemon
app.get('/api/pokemon/:id', async (req, res, next) => {
    try {
        const pokemon = await CaughtPokemonModel.findById(req.params.id);
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon not found' });
        }
        return res.json(pokemon);
    } catch (err) {
        return next(err);
    }
});

app.get(`/api/pokemon/enemy/:name`, async (req, res, next) => {
    const searchedName = req.params.name
    try {
        const pokemon = await PokemonModel.find({name: {$regex: `${searchedName}`}})
        return res.json(pokemon)
    } catch (err) {
        return next(err);
    }
});

app.patch(`/api/pokemonSeen/:name`, async (req, res, next) => {
    const name = req.params.name;
    try {
        const pokemon = await PokedexPokemonModel.findOneAndUpdate({name:name},{ $set: {seen: true}}, {new:true} );
        const saved = await pokemon.save()
        return res.json(saved)
    } catch (err) {
        return next(err);
    }
});

//Add pokemon to the inventory
app.post('/api/player/:name', async (req, res, next) => {
    const name = req.params.name
    try {
        const wildPokemon = await PokemonModel.findOne({name:name})
        await CaughtPokemonModel.create({
            name: wildPokemon?.name,
            id: wildPokemon?.id,
            hp: wildPokemon?.hp,
            atk: wildPokemon?.atk,
            def: wildPokemon.def,
            speed: wildPokemon.speed,
            type: wildPokemon.type,
            img: wildPokemon.img,
            level: 1,
            form: wildPokemon.form,
            evolveInto: wildPokemon.evolveInto
        })
        const allCaughtPokemon = await CaughtPokemonModel.find()
        const inventory = await InventoryModel.findOneAndUpdate({name:'Viki'},{ $set: {myPokemons: allCaughtPokemon}}, {new:true} );
        return res.json(inventory.save());
      } catch (err) {
        return next(err);
      }
});


app.patch('/api/player/money/minus', async (req, res, next) => {
    try {
        const inventory = await InventoryModel.findOneAndUpdate({name:'Viki'},
          { $inc: {pokemonDollar:-1000}},
        );
        return res.json(inventory);
      } catch (err) {
        return next(err);
      }
});

//Sell Pokemon
app.delete("/api/inventory/:id", async (req, res, next) => {
    try{
        const pokemon = await CaughtPokemonModel.findOneAndDelete({_id:req.params.id});
        const allCaughtPokemon = await CaughtPokemonModel.find({});
        const inventory = await InventoryModel.findOneAndUpdate({name:'Viki'}, {$set:{myPokemons: allCaughtPokemon}},{new:true});
        const savedMyPokemons = await inventory.save()
        const minusPokeDollar = await InventoryModel.findOneAndUpdate({name:'Viki'},{ $inc: {pokemonDollar:250}})
        const savedPokeDollar = await minusPokeDollar.save()
        return res.json(savedPokeDollar.pokemonDollar);
    } catch(err) {
        return next(err);
    }
});

//Remove preEvolved Pokemon
app.delete("/api/remove/:id", async (req, res, next) => {
    try{
        const pokemon = await CaughtPokemonModel.findOneAndDelete({_id:req.params.id});
        const allCaughtPokemon = await CaughtPokemonModel.find({});
        const inventory = await InventoryModel.findOneAndUpdate({name:'Viki'}, {$set:{myPokemons: allCaughtPokemon}},{new:true});
        const savedMyPokemons = await inventory.save()
        return res.json(savedMyPokemons);
    } catch(err) {
        return next(err);
    }
});

//Get all evolveable pokemon
app.get("/api/evolve", async(req,res,next)=>{
    try {
        const pokemons = await CaughtPokemonModel.find({ $and: [{ level: 3 }, { evolveInto:{$ne:"None"}  }] })
        return res.json(pokemons)
    } catch(err) {
        next(err)
    }
});

//LevelUp a Pokemon
app.patch("/api/levelup/:id", async (req,res,next)=>{
    try {
        const id = req.params.id
        const pokemon = await CaughtPokemonModel.findOneAndUpdate(
            {_id: id},
            {$inc: {
                level:1,
                atk:1,
                hp:1,
                def:1,
                speed:1
            }},
            {new: true}
            )
        return (res.json(pokemon))
    } catch (err) {
        next(err)
    }
});

app.patch("/api/player/:id", async (req,res,next) =>{
    try {
        const pokemon = await InventoryModel.findOneAndUpdate(
            {name: "Viki"},
            {$pull: {myPokemons:{$in: req.params.id}}},
            {new: true},
        );
        return res.json(pokemon)
    } catch (err) {
        next(err)
    }
});


//update pokemon
app.patch("/api/pokemon/:id", async (req, res, next) =>{
    try {
        const pokemon = await PokemonModel.findOneAndUpdate(
            {_id: req.params.body._id },
            {$set: {...req.body}},
            {new: true}
        );
        return res.json(pokemon);
    } catch (err) {
        return next(err);
    }
});

app.get('/api/player', (req,res)=>{
    res.send(player)
});

app.patch('/api/player', (req,res)=>{
    const money = req.body.money
    player.gold -= Number(money)
    res.status(200)
});

*/
