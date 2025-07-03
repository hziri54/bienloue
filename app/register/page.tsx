'use client'
import { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('Envoi en cours...')

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      setMessage('Compte créé avec succès !')
      setEmail('')
      setPassword('')
    } else {
      setMessage(data.error || 'Erreur lors de la création')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6">
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded p-2"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded p-2"
      />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        S’inscrire
      </button>
      {message && <p>{message}</p>}
    </form>
  )
}
