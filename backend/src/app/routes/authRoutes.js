const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/', AuthController.register); // For Sign Up
router.post('/login', AuthController.login); // For Login

module.exports = router;
