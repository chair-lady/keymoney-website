import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimalCard from './AnimalCard';

const mockAnimals = [
  { id: 1, type: 'Cow', breed: 'Holstein', age: 2, price: 500, description: 'Healthy dairy cow' },
  { id: 2, type: 'Goat', breed: 'Boer', age: 1, price: 200, description: 'Young meat goat' },
];

function BuyerDashboard() {
  const [animals, setAnimals] = useState(mockAnimals);
  const [search, setSearch] = useState('');
  const [breedFilter, setBreedFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  const filteredAnimals = animals
    .filter(animal =>
      animal.type.toLowerCase().includes(search.toLowerCase()) ||
      animal.breed.toLowerCase().includes(search.toLowerCase())
    )
    .filter(animal => breedFilter ? animal.breed === breedFilter : true)
    .filter(animal => ageFilter ? animal.age === parseInt(ageFilter) : true);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Available Animals</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by type or breed"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <select
          value={breedFilter}
          onChange={(e) => setBreedFilter(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="">All Breeds</option>
          <option value="Holstein">Holstein</option>
          <option value="Boer">Boer</option>
        </select>
        <input
          type="number"
          placeholder="Filter by age"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAnimals.map(animal => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
      <Link to="/cart" className="mt-4 inline-block bg-blue-500 text-white p-2 rounded">
        View Cart
      </Link>
    </div>
  );
}

export default BuyerDashboard;