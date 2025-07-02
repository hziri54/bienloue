import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import ApplyForm from "./ApplyForm"

interface Props {
  params: {
    id: string
  }
}

export default async function ApplyPage({ params }: Props) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  return <ApplyForm propertyId={parseInt(params.id)} />
}
