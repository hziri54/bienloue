import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return new Response(JSON.stringify({ error: 'Utilisateur introuvable' }), { status: 404 })
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Mot de passe incorrect' }), { status: 401 })
    }

    return new Response(JSON.stringify({ message: 'Connexion réussie', user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur interne' }), { status: 500 })
  }
}
