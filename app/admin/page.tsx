"use client"

import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>
      <Link
        href="/admin/applications"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        📋 Gérer les candidatures
      </Link>
    </div>
  )
}
