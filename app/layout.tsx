import './globals.css'
import Providers from "../components/Providers"
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'BienLoué',
  description: "Plateforme de gestion locative",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 min-h-screen font-sans">
        <Providers>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
