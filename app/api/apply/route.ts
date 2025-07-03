import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const body = await request.json()
  const { propertyId, firstName, lastName, email, phone, address, message } = body

  if (!propertyId || !firstName || !lastName || !email || !phone || !address || !message) {
    return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
  }

  try {
    await prisma.application.create({
      data: {
        message,
        propertyId: propertyId,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
