import { useParams } from 'next/navigation';

const biens = [
  {
    id: 1,
    titre: "Appartement T2 Bordeaux",
    prix: 750,
    superficie: 45,
    dpe: "B",
    image: "/appart1.jpg",
    description: "Très bel appartement au cœur de Bordeaux."
  },
  {
    id: 2,
    titre: "Studio Mérignac",
    prix: 500,
    superficie: 25,
    dpe: "C",
    image: "/appart2.jpg",
    description: "Studio lumineux proche de toutes commodités."
  }
];

export default function BienDetail({ params }) {
  const id = parseInt(params.id);
  const bien = biens.find((b) => b.id === id);

  if (!bien) return <div>Bien non trouvé.</div>;

  return (
    <div className="p-6">
      <img src={bien.image} alt={bien.titre} className="w-full h-64 object-cover rounded-md" />
      <h1 className="text-3xl font-bold mt-4">{bien.titre}</h1>
      <p className="mt-2">Prix : {bien.prix} €/mois</p>
      <p>Surface : {bien.superficie} m²</p>
      <p>DPE : {bien.dpe}</p>
      <p className="mt-4">{bien.description}</p>

      <button className="mt-6 bg-blue-600 text-white p-3 rounded-lg">Je suis intéressé(e)</button>
    </div>
  );
}
