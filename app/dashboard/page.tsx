'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const storedRole = localStorage.getItem('role')
    setRole(storedRole)
  }, [])

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Chargement du dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Dashboard {role === 'LANDLORD' ? 'Propriétaire' : 'Locataire'}
        </h1>

        {role === 'LANDLORD' ? (
          <div className="space-y-4">
            <p className="text-gray-700">Bienvenue ! Tu peux :</p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Ajouter un bien à louer</li>
              <li>Gérer tes annonces</li>
              <li>Consulter les candidatures reçues</li>
            </ul>
            <Link href="/add-property">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                ➕ Ajouter un bien
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700">Bienvenue ! Tu peux :</p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Parcourir les biens disponibles</li>
              <li>Soumettre une candidature</li>
              <li>Suivre ton dossier de location</li>
            </ul>
            <Link href="/properties">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                🔍 Voir les annonces
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
