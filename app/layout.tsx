import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'BienLoué',
  description: 'Trouvez votre futur logement en quelques clics.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        <Header />
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
