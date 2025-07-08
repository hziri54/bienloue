import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  const formData = await request.formData()
  const files = formData.getAll('files')

  if (!files.length) {
    return NextResponse.json({ error: 'Aucun fichier reçu' }, { status: 400 })
  }

  // Dossier local de stockage temporaire
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const uploadedFiles = []

  for (const file of files) {
    if (!(file instanceof Blob)) continue
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const filename = `${Date.now()}-${file.name}`
    const filepath = path.join(uploadDir, filename)

    fs.writeFileSync(filepath, buffer)

    uploadedFiles.push({
      filename,
      url: `/uploads/${filename}`,
    })
  }

  return NextResponse.json({ uploadedFiles }, { status: 201 })
}
