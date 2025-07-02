import bcrypt from 'bcryptjs'

async function main() {
  const password = 'monpassword' // ← tu peux changer le mot de passe ici
  const hash = await bcrypt.hash(password, 10)
  console.log('Mot de passe hashé :', hash)
}

main()
