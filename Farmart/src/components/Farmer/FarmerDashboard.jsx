import { useState } from 'react';
import { Link } from 'react-router-dom';

const mockAnimals = [
  { id: 1, type: 'Cow', breed: 'Holstein', age: 2, price: 500, description: 'Healthy dairy cow' },
  { id: 2, type: 'Goat', breed: 'Boer', age: 1, price: 200, description: 'Young meat goat' },
];

function FarmerDashboard() {
  const [animals, setAnimals] = useState(mockAnimals);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Farmer Dashboard</h1>
      <Link to="/add-animal" className="mb-4 inline-block bg-blue-500 text-white p-2 rounded">
        Add New Animal
      </Link>
      <h2 className="text-2xl mb-2">Your Animals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {animals.map(animal => (
          <div key={animal.id} className="bg-white p-4 rounded shadow-md">
            <h3>{animal.type} - {animal.breed}</h3>
            <p>Age: {animal.age} years</p>
            <p>Price: ${animal.price}</p>
            <Link
              to={`/edit-animal/${animal.id}`}
              className="mt-2 inline-block bg-yellow-500 text-white p-2 rounded"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
      <Link to="/orders" className="mt-4 inline-block bg-blue-500 text-white p-2 rounded">
        View Orders
      </Link>
    </div>
  );
}

export default FarmerDashboard;