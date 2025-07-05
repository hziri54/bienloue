"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardRedirect() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard/tenant")
      }
    }
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, session, router])

  if (status === "loading") return <p>Chargement...</p>

  return null
}
