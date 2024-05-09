const { Router } = require('express');
const authController = require('../controllers/authController')

const router = Router();

router.post('/signup', authController.signup_post);
router.get('/login', authController.login_post);

module.exports = router;