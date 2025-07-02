'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-700">
        BienLoué
      </Link>
      <nav className="space-x-6">
        <Link href="/login" className="text-gray-600 hover:text-blue-700 font-medium">
          Connexion
        </Link>
        <Link href="/register" className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition">
          Inscription
        </Link>
      </nav>
    </header>
  )
}
