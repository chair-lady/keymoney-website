
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimalCard from './AnimalCard';
import { featuredAnimals } from '../../data/animals';

function BuyerDashboard() {
  const [animals] = useState(featuredAnimals);
  const [search, setSearch] = useState('');
  const [breedFilter, setBreedFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  const filteredAnimals = animals
    .filter(animal =>
      animal.name.toLowerCase().includes(search.toLowerCase()) ||
      animal.breed.toLowerCase().includes(search.toLowerCase()) ||
      animal.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter(animal => breedFilter ? animal.breed === breedFilter : true)
    .filter(animal => categoryFilter ? animal.category === categoryFilter : true)
    .filter(animal => ageFilter ? animal.age.includes(ageFilter) : true);

  const uniqueBreeds = [...new Set(animals.map(animal => animal.breed))];
  const uniqueCategories = [...new Set(animals.map(animal => animal.category))];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4 font-semibold font-serif text-center">Available Animals</h1>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, breed, or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 p-2 border rounded bg-gradient-to-r from-green-400 to-green-600 text-black placeholder-black"
        />
        <select
          value={breedFilter}
          onChange={(e) => setBreedFilter(e.target.value)}
          className="w-full sm:w-1/3 p-2 border rounded bg-gradient-to-r from-green-400 to-green-600 text-black"
        >
          <option value="">All Breeds</option>
          {uniqueBreeds.map(breed => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-1/3 p-2 border rounded bg-gradient-to-r from-green-400 to-green-600 text-black"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Filter by age (e.g., 3 years)"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
          className="w-full sm:w-1/3 p-2 border rounded bg-gradient-to-r from-green-400 to-green-600 text-black placeholder-black"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAnimals.map(animal => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
      <Link to="/cart" className="mt-4 inline-block bg-green-500 text-white p-2 rounded hover:bg-green-600">
        View Cart
      </Link>
    </div>
  );
}

export default BuyerDashboard;
