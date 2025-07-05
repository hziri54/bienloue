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
      {/* Tous les champs demandés */}
      {['firstName', 'lastName', 'email', 'phone', 'address'].map((field) => (
        <div key={field}>
          <label className="block mb-1 font-semibold" htmlFor={field}>
            {field === 'firstName' ? 'Prénom' :
             field === 'lastName' ? 'Nom' :
             field === 'email' ? 'Email' :
             field === 'phone' ? 'Numéro de téléphone' :
             'Adresse'}
          </label>
          <input
            type={field === 'email' ? 'email' : 'text'}
            id={field}
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
      ))}

      <div>
        <label className="block mb-1 font-semibold" htmlFor="message">Message de candidature</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded p-2"
          required
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
