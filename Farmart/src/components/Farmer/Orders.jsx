
import { useSelector, useDispatch } from 'react-redux';
import { confirmOrder, rejectOrder } from '../../store';

function Orders() {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  const handleConfirm = (id) => {
    dispatch(confirmOrder(id));
    fetch(`http://your-django-api/api/orders/${id}/confirm`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    }).catch(err => console.error('Confirm order failed:', err));
  };

  const handleReject = (id) => {
    dispatch(rejectOrder(id));
    fetch(`http://your-django-api/api/orders/${id}/reject`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    }).catch(err => console.error('Reject order failed:', err));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6 font-semibold font-serif text-center">View Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders available</p>
      ) : (
        <div className="bg-white rounded shadow-md">
          {orders.map(order => (
            <div key={order.id} className="border-b last:border-b-0 p-4 flex flex-col sm:flex-row items-center">
              <img
                src={order.animal.image}
                alt={order.animal.name}
                className="w-24 h-24 object-cover rounded mr-4 mb-4 sm:mb-0"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{order.animal.name}</h3>
                <p className="text-gray-600">Animal ID: {order.animalId}</p>
                <p className="text-gray-600">Buyer: {order.buyer}</p>
                <p className="text-gray-600">Status: {order.status}</p>
              </div>
              {order.status === 'Pending' && (
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleConfirm(order.id)}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
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
      )}
    </div>
  );
}

export default Orders;
