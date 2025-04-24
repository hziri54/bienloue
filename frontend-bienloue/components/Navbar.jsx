export default function Navbar() {
    return (
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">BienLoué</h1>
        <div className="space-x-4">
          <button className="text-blue-800 font-medium">Connexion</button>
          <button className="bg-blue-800 text-white px-4 py-2 rounded-md">Inscription</button>
        </div>
      </nav>
    )
  }
  