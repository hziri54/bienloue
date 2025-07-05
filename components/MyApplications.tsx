'use client'

import { useEffect, useState } from 'react'

interface Application {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  message: string
  property: {
    title: string
    city: string
    address: string
  }
}

export default function MyApplications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/applications')
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement')
        return res.json()
      })
      .then(data => setApplications(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur: {error}</p>
  if (applications.length === 0) return <p>Aucune candidature</p>

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mes candidatures</h2>
      <ul className="space-y-4">
        {applications.map(app => (
          <li key={app.id} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{app.property.title} - {app.property.city}</h3>
            <p><strong>Adresse bien :</strong> {app.property.address}</p>
            <p><strong>Candidat :</strong> {app.firstName} {app.lastName}</p>
            <p><strong>Email :</strong> {app.email}</p>
            <p><strong>Téléphone :</strong> {app.phone}</p>
            <p><strong>Adresse :</strong> {app.address}</p>
            <p><strong>Message :</strong> {app.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
