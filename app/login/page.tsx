'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('Connexion en cours...')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.ok) {
      setMessage('Connecté !')
      router.push('/properties') // redirection après connexion
    } else {
      setMessage('Erreur : ' + (res?.error || 'Échec de la connexion'))
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
        Se connecter
      </button>
      {message && <p>{message}</p>}
    </form>
  )
}
