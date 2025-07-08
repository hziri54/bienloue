import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import nodemailer from "nodemailer"

const prisma = new PrismaClient()

// Configure ton transporteur SMTP (exemple Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const applicationId = parseInt(params.id)
    const { status } = await request.json()

    const application = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
      include: { user: true },
    })

    // Envoi mail au candidat
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: application.email,
      subject: "Mise à jour de votre candidature",
      text: `Bonjour ${application.firstName},

Votre candidature pour le bien a été mise à jour au statut suivant : ${status}.

Merci,
BienLoué`,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Statut mis à jour et mail envoyé." })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour du statut" }, { status: 500 })
  }
}
