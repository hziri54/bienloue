// app/api/apply/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const body = await request.json()
  const { propertyId, firstName, lastName, email, phone, address, message } = body

  try {
    await prisma.application.create({
      data: {
        propertyId,
        userId: session.user.id,
        firstName,
        lastName,
        email,
        phone,
        address,
        message,
      },
    })
    return NextResponse.json({ message: "Candidature envoyée" }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
