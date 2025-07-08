"use client"

import { useRouter } from "next/navigation"

export default function TenantDashboard() {
  const router = useRouter()

  const handleViewProperties = () => {
    router.push("/properties") // Assure-toi que cette route existe
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Locataire</h1>
      <p className="mb-6">
        Bienvenue ! Tu peux :
        <ul className="list-disc ml-6 mt-2">
          <li>Parcourir les biens disponibles</li>
          <li>Soumettre une candidature</li>
          <li>Suivre ton dossier de location</li>
        </ul>
      </p>
      <button
        onClick={handleViewProperties}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        🔍 Voir les annonces
      </button>
    </div>
  )
}
