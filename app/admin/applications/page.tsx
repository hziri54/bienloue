import { prisma } from "@/lib/prisma"
import AdminApplications from "@/components/AdminApplications"

export default async function Page() {
  const applications = await prisma.application.findMany({
    include: {
      property: true,
    },
  })

  return <AdminApplications applications={applications} />
}
