import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { message, propertyId } = await req.json()

  // Fake user ID (à remplacer par session plus tard)
  const userId = 1

  try {
    await prisma.application.create({
      data: {
        message,
        propertyId,
        userId,
      },
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
