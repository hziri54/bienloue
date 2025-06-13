// app/api/properties/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const properties = await prisma.property.findMany()
  return NextResponse.json(properties)
}
