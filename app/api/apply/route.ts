import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getCurrentUser } from "@/lib/session"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  try {
    const { message, propertyId } = await req.json()

    await prisma.application.create({
      data: {
        message,
        propertyId,
        userId: user.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
