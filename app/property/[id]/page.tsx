'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ApplyPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: parseInt(params.id),
          message,
        }),
      })

      if (!res.ok) throw new Error('Erreur serveur')

      router.push('/') // redirige à l’accueil après succès
    } catch (err) {
      setError('Erreur lors de la soumission')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Postuler à ce bien</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="p-3 border border-gray-300 rounded resize-none"
          rows={6}
          placeholder="Votre message à propos de la candidature..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={loading}
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
        </button>
      </form>
    </div>
  )
}
