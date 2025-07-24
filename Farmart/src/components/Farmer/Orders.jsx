
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:8000/api/orders/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Fetch orders failed:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchOrders();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6 font-semibold font-serif text-center">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-bold">Order #{order.id}</h3>
              <p className="text-gray-600">Total: ${order.total}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <p className="text-gray-600">Date: {new Date(order.created_at).toLocaleDateString()}</p>
              <div className="mt-2">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center mb-2">
                    <img
                      src={item.animal.image_url || '/placeholder.jpg'}
                      alt={item.animal.name}
                      className="w-16 h-16 object-cover rounded mr-2"
                      onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                    />
                    <span>{item.animal.name} - ${item.animal.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
