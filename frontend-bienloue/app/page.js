import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      <main className="p-8">
        <h2 className="text-3xl font-bold mb-4 text-blue-900">Biens non meublés disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cartes de biens à afficher ici */}
          <div className="bg-white rounded-md shadow p-4">
            <h3 className="text-xl font-semibold">T2 - Bordeaux</h3>
            <p>700€/mois - 45m²</p>
            <button className="mt-2 text-sm text-blue-600 underline">Voir plus</button>
          </div>
          {/* ... */}
        </div>
      </main>
    </div>
  )
}
