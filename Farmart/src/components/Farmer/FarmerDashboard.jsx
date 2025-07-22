
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredAnimals } from '../../data/animals';

function FarmerDashboard() {
  const [animals] = useState(featuredAnimals);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4 font-semibold font-serif text-center">Farmer Dashboard</h1>
      <Link to="/add-animal" className="mb-4 inline-block bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Add New Animal
      </Link>
      <h2 className="text-2xl mb-2">Your Animals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {animals.map(animal => (
          <div key={animal.id} className="bg-white p-4 rounded shadow-md flex flex-col">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold">{animal.name}</h3>
            <p className="text-gray-600">Breed: {animal.breed}</p>
            <p className="text-gray-600">Category: {animal.category}</p>
            <p className="text-gray-600">Age: {animal.age}</p>
            <p className="text-gray-600">Price: ${animal.price}</p>
            <Link
              to={`/edit-animal/${animal.id}`}
              className="mt-2 inline-block bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
      <Link to="/orders" className="mt-4 inline-block bg-green-500 text-white p-2 rounded hover:bg-green-600">
        View Orders
      </Link>
    </div>
  );
}

export default FarmerDashboard;
