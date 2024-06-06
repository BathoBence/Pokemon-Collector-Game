const { Router } = require('express');
const pokemonController = require('../controllers/pokemonController')

const router = Router();

router.post('/add_pokemon/:id', pokemonController.add_pokemon_post);

router.delete('/sell_pokemon/:id', pokemonController.sell_pokemon_delete);

router.patch('/evolve_pokemon/:id', pokemonController.evolve_pokemon_patch);

router.get('/evolvable_pokemons/:id', pokemonController.evolveable_pokemons_get);

router.get('/buy', pokemonController.buy_pokemons_get);

module.exports = router;