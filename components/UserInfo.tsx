'use client'

import { useSession, signOut } from 'next-auth/react'

export default function UserInfo() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div className="flex items-center space-x-4">
      <span>👋 Bonjour, {session.user?.name || session.user?.email}</span>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Déconnexion
      </button>
    </div>
  )
}
