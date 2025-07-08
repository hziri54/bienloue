"use client"
import React, { useState } from "react"

function StatusSelect({ id, currentStatus }: { id: number; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const [message, setMessage] = useState("")

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setStatus(newStatus)

    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error("Erreur lors de la mise à jour du statut")

      setMessage("Statut mis à jour avec succès !")
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Erreur lors de la mise à jour du statut")
    }
  }

  return (
    <div>
      <select value={status} onChange={handleChange} className="border px-2 py-1 rounded">
        <option value="pending">En attente</option>
        <option value="approved">Approuvé</option>
        <option value="rejected">Rejeté</option>
      </select>
      {message && <p className="text-sm mt-1">{message}</p>}
    </div>
  )
}

export default StatusSelect
