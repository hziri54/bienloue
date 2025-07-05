const bcrypt = require('bcryptjs');

async function generateHash(password) {
  const hash = await bcrypt.hash(password, 10);
  console.log('Mot de passe :', password);
  console.log('Hash généré :', hash);
}

const passwordToHash = process.argv[2];

if (!passwordToHash) {
  console.error('Usage: node hashPassword.js <ton_mot_de_passe>');
  process.exit(1);
}

generateHash(passwordToHash);
