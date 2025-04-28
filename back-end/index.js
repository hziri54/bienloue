import { useEffect, useState } from 'react';

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Simuler la récupération des biens non meublés
    fetch('/api/properties')
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error('Erreur:', error));
  }, []);

  return (
    <div>
      <h1>Biens à louer non meublés</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>{property.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
