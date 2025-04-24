const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /api/users
const createUser = async (req, res) => {
  const { email, name } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { email, name },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création' });
  }
};

module.exports = { getAllUsers, createUser };
