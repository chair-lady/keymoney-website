import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddAnimal() {
  const navigate = useNavigate();
  const [animal, setAnimal] = useState({ type: '', breed: '', age: '', price: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mock API call (replace with real API call to /api/animals)
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Add Animal</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md">
        <input
          type="text"
          placeholder="Type (e.g., Cow)"
          value={animal.type}
          onChange={(e) => setAnimal({ ...animal, type: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Breed (e.g., Holstein)"
          value={animal.breed}
          onChange={(e) => setAnimal({ ...animal, breed: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={animal.age}
          onChange={(e) => setAnimal({ ...animal, age: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={animal.price}
          onChange={(e) => setAnimal({ ...animal, price: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={animal.description}
          onChange={(e) => setAnimal({ ...animal, description: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Animal
        </button>
      </form>
    </div>
  );
}

export default AddAnimal;