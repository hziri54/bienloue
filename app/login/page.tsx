'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('Connexion en cours...')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    console.log('Login response:', data)

    if (res.ok && data.user) {
      localStorage.setItem('role', data.user.role)
      router.push('/dashboard')
    } else {
      setMessage(`❌ ${data.error || 'Erreur lors de la connexion'}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6">
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        className="w-full border rounded p-2"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        required
        onChange={e => setPassword(e.target.value)}
        className="w-full border rounded p-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Se connecter
      </button>
      {message && <p>{message}</p>}
    </form>
  )
}
