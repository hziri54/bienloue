'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddPropertyPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
  })
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/property/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setMessage('🏡 Bien ajouté avec succès !')
      setTimeout(() => router.push('/dashboard'), 1000)
    } else {
      setMessage('❌ Une erreur est survenue.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Ajouter un bien</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Titre" value={form.title} onChange={handleChange}
            className="w-full border px-4 py-2 rounded" required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}
            className="w-full border px-4 py-2 rounded" required />
          <input name="price" placeholder="Prix (€)" value={form.price} onChange={handleChange}
            className="w-full border px-4 py-2 rounded" required />
          <input name="address" placeholder="Adresse" value={form.address} onChange={handleChange}
            className="w-full border px-4 py-2 rounded" required />
          <input name="city" placeholder="Ville" value={form.city} onChange={handleChange}
            className="w-full border px-4 py-2 rounded" required />

          <button type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
            ➕ Publier le bien
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
      </div>
    </div>
  )
}
