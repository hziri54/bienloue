// app/api/admin/properties/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const properties = await prisma.property.findMany()
  return NextResponse.json(properties)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const { title, description, price, address, city } = data

  if (!title || !description || !price || !address || !city) {
    return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
  }

  const property = await prisma.property.create({ data })
  return NextResponse.json(property)
}

export async function PUT(request: NextRequest) {
  const data = await request.json()
  const { id, title, description, price, address, city } = data

  if (!id || !title || !description || !price || !address || !city) {
    return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
  }

  const property = await prisma.property.update({
    where: { id },
    data: { title, description, price, address, city },
  })

  return NextResponse.json(property)
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()
  if (!id) return NextResponse.json({ error: 'ID requis' }, { status: 400 })

  await prisma.property.delete({ where: { id } })
  return NextResponse.json({ message: 'Propriété supprimée' })
}
