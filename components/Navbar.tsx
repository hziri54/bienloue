'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div className="p-4">Chargement...</div>

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl text-blue-600">BienLoué</Link>
      <div className="space-x-4">
        {session ? (
          <>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">Connexion</Link>
            <Link href="/register" className="hover:underline">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  )
}
