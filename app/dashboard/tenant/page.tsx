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
  status: string
  property: {
    id: number
    title: string
    city: string
    address: string
  }
}

export default function TenantDashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/applications')
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des candidatures')
        return res.json()
      })
      .then(data => {
        setApplications(data)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur: {error}</p>
  if (applications.length === 0) return <p>Aucune candidature en cours</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mes candidatures</h1>
      <ul className="space-y-4">
        {applications.map(app => (
          <li key={app.id} className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-semibold">{app.property.title}</h2>
            <p className="text-sm text-gray-600">{app.property.city} - {app.property.address}</p>
            <p>Statut : <span className={`font-semibold ${app.status === 'accepted' ? 'text-green-600' : app.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{app.status}</span></p>
            <p>Candidat : {app.firstName} {app.lastName}</p>
            <p>Email : {app.email}</p>
            <p>Téléphone : {app.phone}</p>
            <p>Adresse : {app.address}</p>
            <p>Message : {app.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
