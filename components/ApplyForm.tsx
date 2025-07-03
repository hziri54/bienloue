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
      const data = await res.json()
      setStatus(`Erreur : ${data.error || 'Veuillez réessayer.'}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6 max-w-md">
      <input
        type="text"
        name="firstName"
        placeholder="Prénom"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Nom"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Numéro de téléphone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        name="address"
        placeholder="Adresse"
        value={formData.address}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />
      <textarea
        name="message"
        placeholder="Message de candidature"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        required
        className="w-full border rounded p-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Postuler
      </button>
      {status && <p className="mt-2">{status}</p>}
    </form>
  )
}
