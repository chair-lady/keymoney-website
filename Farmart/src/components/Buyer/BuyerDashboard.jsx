
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function BuyerDashboard() {
  const [animals, setAnimals] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');
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
      const response = await axios.post('http://localhost:8000/api/cart/add/', { animal_id: animalId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems([...cartItems, response.data]);
    } catch (error) {
      console.error('Add to cart failed:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(search.toLowerCase()) ||
    animal.breed.toLowerCase().includes(search.toLowerCase()) ||
    animal.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6 font-semibold font-serif text-center">Browse Animals</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search animals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded bg-gradient-to-r from-green-400 to-green-600 text-white placeholder-white"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAnimals.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">No animals found</p>
        ) : (
          filteredAnimals.map(animal => (
            <div key={animal.id} className="bg-white p-4 rounded shadow-md flex flex-col">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{animal.name}</h3>
                <p className="text-gray-600">Breed: {animal.breed}</p>
                <p className="text-gray-600">Category: {animal.category}</p>
                <p className="text-gray-600">Price: ${animal.price}</p>
                <p className="text-gray-600">Farmer: {animal.farmer}</p>
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
