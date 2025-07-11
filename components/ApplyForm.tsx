'use client'

import { useState } from 'react'

interface ApplyFormProps {
  propertyId: number
}

export default function ApplyForm({ propertyId }: ApplyFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('Envoi en cours...')

    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, ...formData }),
    })

    const data = await res.json()

    if (res.ok) {
      setStatus('Candidature envoyée avec succès !')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        message: '',
      })
    } else {
      setStatus(`Erreur lors de l’envoi : ${data.error || 'Erreur inconnue'}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6 max-w-md">
      <input
        name="firstName"
        placeholder="Prénom"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <input
        name="lastName"
        placeholder="Nom"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <input
        name="phone"
        placeholder="Téléphone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <input
        name="address"
        placeholder="Adresse"
        value={formData.address}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={4}
        className="w-full border rounded p-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Postuler
      </button>
      {status && <p>{status}</p>}
    </form>
  )
}
