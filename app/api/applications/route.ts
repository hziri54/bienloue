import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const { status } = await request.json()

    // Valide le statut
    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 })
    }

    const updated = await prisma.application.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Erreur API PATCH /applications/:id", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
