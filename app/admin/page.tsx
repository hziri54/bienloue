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
  createdAt: string
  property: {
    title: string
    city: string
    address: string
  }
  user: {
    email: string
    role: string
  }
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/applications')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des candidatures')
        return res.json()
      })
      .then((data) => setApplications(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Chargement des candidatures...</p>
  if (error) return <p>Erreur : {error}</p>
  if (applications.length === 0) return <p>Aucune candidature pour le moment</p>

  return (
    <div>
      <h1>Dashboard Admin - Liste des candidatures</h1>
      <ul>
        {applications.map((app) => (
          <li key={app.id} className="mb-4 border p-3 rounded">
            <strong>{app.property.title}</strong> - {app.property.city} - {app.property.address}<br />
            Candidat : {app.firstName} {app.lastName} - Email : {app.email}<br />
            Téléphone : {app.phone}<br />
            Adresse : {app.address}<br />
            Message : {app.message}<br />
            Date : {new Date(app.createdAt).toLocaleString()}<br />
            Utilisateur : {app.user.email} ({app.user.role})
          </li>
        ))}
      </ul>
    </div>
  )
}
