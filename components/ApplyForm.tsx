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
      setStatus('Erreur lors de l’envoi. Veuillez réessayer.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6 max-w-md">
      <div>
        <label htmlFor="firstName" className="block mb-1 font-semibold">Prénom</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block mb-1 font-semibold">Nom</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1 font-semibold">Numéro de téléphone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="address" className="block mb-1 font-semibold">Adresse</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-semibold">Message de candidature</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border rounded p-2"
        />
      </div>

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
