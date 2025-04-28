import Link from "next/link";

export default function BienCard({ bien }) {
  return (
    <Link href={`/biens/${bien.id}`}>
      <div className="bg-white rounded-lg shadow-md p-4 w-80 cursor-pointer hover:scale-105 transition-transform">
        <img src={bien.image} alt={bien.titre} className="w-full h-48 object-cover rounded-md" />
        <h2 className="text-xl font-bold mt-2">{bien.titre}</h2>
        <p>Prix : {bien.prix} €/mois</p>
        <p>Surface : {bien.superficie} m²</p>
        <p>DPE : {bien.dpe}</p>
      </div>
    </Link>
  );
}
