"use client"
import { useState } from "react"

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
    title: string
    city: string
    address: string
  }
}

export default function AdminApplications({ applications }: { applications: Application[] }) {
  const [list, setList] = useState(applications)

  async function updateStatus(id: number, newStatus: string) {
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    if (!res.ok) throw new Error("Erreur lors de la mise à jour")
    return res.json()
  }

  function StatusSelect({ id, currentStatus }: { id: number; currentStatus: string }) {
    const [status, setStatus] = useState(currentStatus)

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newStatus = e.target.value
      try {
        await updateStatus(id, newStatus)
        setStatus(newStatus)
        setList(prev =>
          prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
        )
      } catch {
        alert("Erreur lors de la mise à jour du statut")
      }
    }

    return (
      <select value={status} onChange={handleChange} className="border rounded p-1">
        <option value="pending">En attente</option>
        <option value="approved">Approuvé</option>
        <option value="rejected">Rejeté</option>
      </select>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gérer les candidatures</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Bien</th>
            <th className="border p-2">Candidat</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Téléphone</th>
            <th className="border p-2">Adresse</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Statut</th>
          </tr>
        </thead>
        <tbody>
          {list.map(app => (
            <tr key={app.id}>
              <td className="border p-2">{app.property.title}</td>
              <td className="border p-2">{app.firstName} {app.lastName}</td>
              <td className="border p-2">{app.email}</td>
              <td className="border p-2">{app.phone}</td>
              <td className="border p-2">{app.address}</td>
              <td className="border p-2">{app.message}</td>
              <td className="border p-2">
                <StatusSelect id={app.id} currentStatus={app.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
