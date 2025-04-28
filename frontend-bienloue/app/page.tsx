import BienCard from "./components/BienCard";

export default function Home() {
  const biens = [
    {
      title: "Appartement cosy à Bordeaux",
      price: 850,
      dpe: "C",
      surface: 45,
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    },
    {
      title: "Studio lumineux centre ville",
      price: 600,
      dpe: "D",
      surface: 28,
      imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be"
    },
    {
      title: "T2 moderne avec balcon",
      price: 950,
      dpe: "B",
      surface: 55,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    }
  ];

  return (
    <main className="p-8">
      {biens.map((bien, index) => (
        <BienCard
          key={index}
          title={bien.title}
          price={bien.price}
          dpe={bien.dpe}
          surface={bien.surface}
          imageUrl={bien.imageUrl}
        />
      ))}
    </main>
  );
}
