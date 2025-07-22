
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { featuredAnimals } from '../../data/animals';

function EditAnimal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundAnimal = featuredAnimals.find(a => a.id === parseInt(id));
    if (foundAnimal) {
      setAnimal(foundAnimal);
    } else {
      setError('Animal not found');
    }
  }, [id]);

  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  if (!animal) return <div className="container mx-auto p-4">Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://your-django-api/api/animals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal),
      });
      navigate('/farmer');
    } catch (error) {
      console.error('Update animal failed:', error);
      setError('Failed to update animal');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4 font-semibold font-serif text-center">Edit Animal</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md">
        <input
          type="text"
          placeholder="Name"
          value={animal.name || ''}
          onChange={(e) => setAnimal({ ...animal, name: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Breed"
          value={animal.breed || ''}
          onChange={(e) => setAnimal({ ...animal, breed: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Age (e.g., 3 years)"
          value={animal.age || ''}
          onChange={(e) => setAnimal({ ...animal, age: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={animal.price || ''}
          onChange={(e) => setAnimal({ ...animal, price: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={animal.image || ''}
          onChange={(e) => setAnimal({ ...animal, image: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Farmer Name"
          value={animal.farmer || ''}
          onChange={(e) => setAnimal({ ...animal, farmer: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={animal.location || ''}
          onChange={(e) => setAnimal({ ...animal, location: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Rating (e.g., 4.8)"
          value={animal.rating || ''}
          onChange={(e) => setAnimal({ ...animal, rating: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          step="0.1"
          min="0"
          max="5"
          required
        />
        <select
          value={animal.category || ''}
          onChange={(e) => setAnimal({ ...animal, category: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="cattle">Cattle</option>
          <option value="sheep">Sheep</option>
          <option value="pigs">Pigs</option>
          <option value="goats">Goats</option>
          <option value="chicken">Chicken</option>
        </select>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Update Animal
        </button>
      </form>
    </div>
  );
}

export default EditAnimal;
