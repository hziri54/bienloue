const express = require("express");
const app = express();
const port = 5001;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

// Test route
app.get("/", (req, res) => {
  res.send("Bienvenue sur BienLoué 🎉");
});

app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});
