const express = require('express');
const router = express.Router();
const { getAllUsers, createUser } = require('../controllers/userController');

// Route GET pour récupérer tous les utilisateurs
router.get('/', getAllUsers);

// Route POST pour créer un utilisateur
router.post('/', createUser);

module.exports = router;
