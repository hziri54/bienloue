import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
    }

    // Ici on renvoie les infos utiles côté client (pas le password)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Erreur API login:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
