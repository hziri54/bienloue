import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const data = await request.json()
    const { propertyId, firstName, lastName, email, phone, address, message } = data

    if (!propertyId || !firstName || !lastName || !email || !phone || !address || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
    }

    // Récupérer l'utilisateur via l'email de la session
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    await prisma.application.create({
      data: {
        propertyId,
        firstName,
        lastName,
        email,
        phone,
        address,
        message,
        userId: user.id,
      },
    })

    return NextResponse.json({ message: 'Candidature envoyée avec succès' }, { status: 201 })
  } catch (error) {
    console.error('Erreur API /apply :', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
