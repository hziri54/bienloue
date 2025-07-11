'use client'

import { useState } from 'react'

type Application = {
  id: number
  firstName: string
  lastName: string
  status: string
  user: { email: string }
  property: { title: string }
}

export default function AdminApplications({ applications }: { applications: Application[] }) {
  const [apps, setApps] = useState(applications ?? [])

  async function handleStatusChange(id: number, newStatus: string) {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error('Erreur lors de la mise à jour du statut')
      const updated = await res.json()
      setApps(apps.map(app => (app.id === id ? updated : app)))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <h1>Gestion des candidatures</h1>
      <ul>
        {apps.map(app => (
          <li key={app.id}>
            {app.firstName} {app.lastName} - Statut: 
            <select
              value={app.status}
              onChange={e => handleStatusChange(app.id, e.target.value)}
            >
              <option value="pending">En attente</option>
              <option value="accepted">Accepté</option>
              <option value="refused">Refusé</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  )
}
