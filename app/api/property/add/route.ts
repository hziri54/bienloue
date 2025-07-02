import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { title, description, price, address, city } = await req.json()

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parseInt(price),
        address,
        city,
      },
    })

    return new Response(JSON.stringify(property), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 })
  }
}
