
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/cart/remove/${cartItemId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Remove from cart failed:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6 font-semibold font-serif text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white p-4 rounded shadow-md flex flex-col items-center">
              <img
                src={item.animal.image_url || '/placeholder.jpg'}
                alt={item.animal.name}
                className="w-full h-48 object-cover rounded mb-4"
                onError={(e) => { e.target.src = '/placeholder.jpg'; }}
              />
              <div className="text-center">
                <h3 className="text-xl font-bold">{item.animal.name}</h3>
                <p className="text-gray-600">Price: ${item.animal.price}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center w-full"
              >
                <FaTrash className="w-5 h-5 mr-2" /> Remove
              </button>
            </div>
          ))}
          <div className="mt-6 text-center">
            <button
              onClick={handleCheckout}
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
