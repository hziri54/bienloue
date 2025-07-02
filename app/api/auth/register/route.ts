import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json()

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Utilisateur déjà existant' }), { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role?.toUpperCase() === 'LANDLORD' ? 'LANDLORD' : 'TENANT',
      },
    })

    return new Response(JSON.stringify({ message: 'Inscription réussie' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 })
  }
}
