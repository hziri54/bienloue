'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div className="p-4">Chargement...</div>

  return (
    <nav className="bg-white shadow p-4 flex justify-between max-w-6xl mx-auto">
      <div className="font-bold text-xl text-blue-700">
        <Link href="/">BienLoué</Link>
      </div>
      <div className="space-x-4">
        {session?.user ? (
          <>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-blue-700 hover:underline">Connexion</Link>
            <Link href="/register" className="text-blue-700 hover:underline ml-4">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  )
}
