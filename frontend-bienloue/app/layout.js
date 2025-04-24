import '../styles/globals.css'

export const metadata = {
  title: 'BienLoué',
  description: 'Trouvez votre location idéale',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
