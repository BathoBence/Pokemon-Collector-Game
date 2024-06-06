const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/user/:id', userController.get_user_info)

router.get('/pokedex/:id', userController.get_pokedex);

router.get('/inventory/:id', userController.get_inventory)

module.exports = router;