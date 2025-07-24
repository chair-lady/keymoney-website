
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function BuyerDashboard() {
  const [animals, setAnimals] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/animals/');
        setAnimals(response.data);
      } catch (error) {
        console.error('Fetch animals failed:', error);
      }
    };
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:8000/api/cart/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Fetch cart failed:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchAnimals();
    fetchCart();
  }, [navigate]);

  const handleAddToCart = async (animalId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      await axios.post('http://localhost:8000/api/cart/add/', { animal_id: animalId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cartResponse = await axios.get('http://localhost:8000/api/cart/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartResponse.data);
    } catch (error) {
      console.error('Add to cart failed:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const filteredAnimals = animals.filter(animal =>
    (!selectedName || animal.name.toLowerCase() === selectedName.toLowerCase()) &&
    (!selectedBreed || animal.breed.toLowerCase() === selectedBreed.toLowerCase()) &&
    (!selectedCategory || animal.category.toLowerCase() === selectedCategory.toLowerCase()) &&
    (!selectedAge || animal.age.toLowerCase() === selectedAge.toLowerCase()) &&
    (animal.name.toLowerCase().includes(search.toLowerCase()) ||
     animal.breed.toLowerCase().includes(search.toLowerCase()) ||
     animal.category.toLowerCase().includes(search.toLowerCase()))
  );

  const uniqueNames = [...new Set(animals.map(animal => animal.name))];
  const uniqueBreeds = [...new Set(animals.map(animal => animal.breed))];
  const uniqueCategories = [...new Set(animals.map(animal => animal.category))];
  const uniqueAges = [...new Set(animals.map(animal => animal.age))];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6 font-semibold font-serif text-center">Browse Animals</h1>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Search animals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded bg-gradient-to-r from-green-400 to-green-600 text-white placeholder-white"
        />
        <select
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
          className="w-full p-2 border rounded bg-green-100"
        >
          <option value="">All Names</option>
          {uniqueNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          className="w-full p-2 border rounded bg-green-100"
        >
          <option value="">All Breeds</option>
          {uniqueBreeds.map(breed => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded bg-green-100"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          className="w-full p-2 border rounded bg-green-100"
        >
          <option value="">All Ages</option>
          {uniqueAges.map(age => (
            <option key={age} value={age}>{age}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAnimals.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">No animals found</p>
        ) : (
          filteredAnimals.map(animal => (
            <div key={animal.id} className="bg-white p-4 rounded shadow-md flex flex-col">
              <img
                src={animal.image_url || '/placeholder.jpg'}
                alt={animal.name}
                className="w-full h-48 object-cover rounded mb-4"
                onError={(e) => { e.target.src = '/placeholder.jpg'; }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{animal.name}</h3>
                <p className="text-gray-600">Breed: {animal.breed}</p>
                <p className="text-gray-600">Category: {animal.category}</p>
                <p className="text-gray-600">Price: ${animal.price}</p>
                <p className="text-gray-600">Farmer: {animal.farmer.email}</p>
                <p className="text-gray-600">Location: {animal.location}</p>
                <p className="text-gray-600">Rating: {animal.rating}/5</p>
              </div>
              <button
                onClick={() => handleAddToCart(animal.id)}
                disabled={cartItems.find(item => item.animal.id === animal.id)}
                className={`mt-4 flex items-center justify-center p-2 rounded ${
                  cartItems.find(item => item.animal.id === animal.id)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                <FaShoppingCart data-testid="FaShoppingCart" className="mr-2 text-white w-5 h-5" />
                {cartItems.find(item => item.animal.id === animal.id) ? 'In Cart' : 'Add to Cart'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BuyerDashboard;
