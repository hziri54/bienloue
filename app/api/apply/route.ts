import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const formData = await request.json()
    const {
      propertyId,
      firstName,
      lastName,
      email,
      phone,
      address,
      message,
    } = formData

    if (
      !propertyId ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !message
    ) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Trouver user connecté
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })
    }

    // Créer la candidature en base
    const application = await prisma.application.create({
      data: {
        propertyId,
        firstName,
        lastName,
        email,
        phone,
        address,
        message,
        userId: user.id,
        status: 'pending',  // statut initial par défaut
      },
    })

    // Trouver le bien pour l’email
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    })

    // Configurer nodemailer (mettre tes infos .env)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Traduction des statuts
    const statutTraduction = {
      refused: "Refusé",
      accepted: "Accepté",
      pending: "En attente",
    }

    const statutCandidature = statutTraduction[application.status] ?? "En attente"

    // Options du mail
    const mailOptions = {
      from: `"BienLoué" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Nouvelle candidature pour le bien "${property?.title ?? "N/A"}"`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
          <h1 style="color:#004080;">Nouvelle candidature reçue sur BienLoué</h1>
          <p>Bonjour,</p>
          <p>Une nouvelle candidature a été soumise pour le bien <strong>${property?.title ?? "N/A"}</strong> situé à <strong>${property?.address ?? "N/A"}, ${property?.city ?? "N/A"}</strong>.</p>
          
          <h2>Détails du candidat :</h2>
          <ul>
            <li><strong>Nom :</strong> ${firstName ?? "N/A"} ${lastName ?? ""}</li>
            <li><strong>Email :</strong> ${email ?? "N/A"}</li>
            <li><strong>Téléphone :</strong> ${phone ?? "N/A"}</li>
            <li><strong>Adresse :</strong> ${address ?? "N/A"}</li>
          </ul>

          <h2>Message du candidat :</h2>
          <p style="background:#f5f5f5; padding: 10px; border-radius: 5px; font-style: italic;">
            ${message ?? "Aucun message fourni."}
          </p>

          <h2>Statut actuel de la candidature :</h2>
          <p style="font-weight: bold; color: #007700;">${statutCandidature}</p>

          <p>Vous pouvez consulter et gérer cette candidature directement depuis votre espace administrateur.</p>

          <p>Bonne journée,<br/><em>L’équipe BienLoué</em></p>
        </div>
      `,
    }

    // Envoi du mail
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: 'Candidature créée et mail envoyé' }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
