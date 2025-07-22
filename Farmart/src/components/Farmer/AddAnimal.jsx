
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddAnimal() {
  const navigate = useNavigate();
  const [animal, setAnimal] = useState({
    name: '',
    breed: '',
    age: '',
    price: '',
    image: '',
    farmer: '',
    location: '',
    rating: '',
    category: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://your-django-api/api/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal),
      });
      navigate('/farmer');
    } catch (error) {
      console.error('Add animal failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h1 className="text-3xl mb-6 font-semibold font-serif text-center">Add New Animal</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Name</label>
            <input
              type="text"
              placeholder="e.g., Holstein Dairy Cow"
              value={animal.name}
              onChange={(e) => setAnimal({ ...animal, name: e.target.value })}
              className="w-2/3 p-2 border rounded"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Breed</label>
            <input
              type="text"
              placeholder="e.g., Holstein"
              value={animal.breed}
              onChange={(e) => setAnimal({ ...animal, breed: e.target.value })}
              className="w-2/3 p-2 border rounded"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Age</label>
            <input
              type="text"
              placeholder="e.g., 3 years"
              value={animal.age}
              onChange={(e) => setAnimal({ ...animal, age: e.target.value })}
              className="w-2/3 p-2 border rounded"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Price</label>
            <input
              type="number"
              placeholder="e.g., 2500"
              value={animal.price}
              onChange={(e) => setAnimal({ ...animal, price: e.target.value })}
              className="w-2/3 p-2 border rounded"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Image URL</label>
            <input
              type="text"
              placeholder="e.g., https://image-url.com"
              value={animal.image}
              onChange={(e) => setAnimal({ ...animal, image: e.target.value })}
              className="w-2/3 p-2 border rounded"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Farmer Name</label>
            <input
              type="text"
              placeholder="e.g., Green Valley Farm"
              value={animal.farmer}
              onChange={(e) => setAnimal({ ...animal, farmer: e.target.value })}
              className="w-2/3 p-2 border rounded"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Location</label>
            <input
              type="text"
              placeholder="e.g., Limuru"
              value={animal.location}
              onChange={(e) => setAnimal({ ...animal, location: e.target.value })}
              className="w-2/3 p-2 border rounded"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Rating</label>
            <input
              type="number"
              placeholder="e.g., 4.8"
              value={animal.rating}
              onChange={(e) => setAnimal({ ...animal, rating: e.target.value })}
              className="w-2/3 p-2 border rounded"
              step="0.1"
              min="0"
              max="5"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Category</label>
            <select
              value={animal.category}
              onChange={(e) => setAnimal({ ...animal, category: e.target.value })}
              className="w-2/3 p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="cattle">Cattle</option>
              <option value="sheep">Sheep</option>
              <option value="pigs">Pigs</option>
              <option value="goats">Goats</option>
              <option value="chicken">Chicken</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mt-4">
            Add Animal
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAnimal;
