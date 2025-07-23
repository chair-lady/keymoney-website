
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    fetchCart();
  }, [navigate]);

  const handleRemove = async (cartItemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      await axios.delete(`http://localhost:8000/api/cart/${cartItemId}/remove/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Remove from cart failed:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await axios.post('http://localhost:8000/api/cart/checkout/', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems([]);
      navigate('/checkout');
    } catch (error) {
      console.error('Checkout failed:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6 font-semibold font-serif text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white p-4 rounded shadow-md flex flex-col">
                <img
                  src={item.animal.image}
                  alt={item.animal.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.animal.name}</h3>
                  <p className="text-gray-600">Breed: {item.animal.breed}</p>
                  <p className="text-gray-600">Category: {item.animal.category}</p>
                  <p className="text-gray-600">Price: ${item.animal.price}</p>
                  <p className="text-gray-600">Farmer: {item.animal.farmer}</p>
                  <p className="text-gray-600">Location: {item.animal.location}</p>
                  <p className="text-gray-600">Rating: {item.animal.rating}/5</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="mt-4 flex items-center justify-center bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  <FaTrash data-testid="FaTrash" className="mr-2 text-white w-5 h-5" />
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full sm:w-auto flex items-center justify-center bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            <FaShoppingCart data-testid="FaShoppingCart" className="mr-2 text-white w-5 h-5" />
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
