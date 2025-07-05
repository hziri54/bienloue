'use client'

import { SessionProvider } from 'next-auth/react'
import Navbar from './Navbar'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </SessionProvider>
  )
}
