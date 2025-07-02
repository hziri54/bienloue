"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
  propertyId: number
}

export default function ApplyForm({ propertyId }: Props) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, propertyId }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Erreur inconnue")
      }

      router.push("/")
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Postuler à ce bien</h1>

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
        {loading ? "Envoi en cours..." : "Envoyer ma candidature"}
      </button>
    </form>
  )
}
