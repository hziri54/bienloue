const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  try {
    const { nom, email, password, role } = req.body;

    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) return res.status(400).json({ message: "Email déjà utilisé" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { nom, email, password: hashed, role }
    });

    res.status(201).json({ message: "Utilisateur créé", userId: user.id });
  } catch (err) {
    console.error("❌ Erreur complète :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
