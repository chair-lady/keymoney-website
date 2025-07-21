import { useState } from 'react';

const mockOrders = [
  { id: 1, animalId: 1, buyer: 'John Doe', status: 'Pending' },
];

function Orders() {
  const [orders, setOrders] = useState(mockOrders);

  const handleConfirm = async (id) => {
    // Mock API call (replace with real API call to /api/orders/:id/confirm)
    try {
      await fetch(`http://your-django-api/api/orders/${id}/confirm`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      setOrders(orders.map(order => order.id === id ? { ...order, status: 'Confirmed' } : order));
    } catch (error) {
      console.error('Confirm order failed:', error);
    }
  };

  const handleReject = async (id) => {
    // Mock API call (replace with real API call to /api/orders/:id/reject)
    try {
      await fetch(`http://your-django-api/api/orders/${id}/reject`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      setOrders(orders.map(order => order.id === id ? { ...order, status: 'Rejected' } : order));
    } catch (error) {
      console.error('Reject order failed:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Orders</h1>
      {orders.map(order => (
        <div key={order.id} className="bg-white p-4 rounded shadow-md mb-4">
          <h3>Order #{order.id}</h3>
          <p>Animal ID: {order.animalId}</p>
          <p>Buyer: {order.buyer}</p>
          <p>Status: {order.status}</p>
          {order.status === 'Pending' && (
            <div>
              <button
                onClick={() => handleConfirm(order.id)}
                className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600"
              >
                Confirm
              </button>
              <button
                onClick={() => handleReject(order.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;