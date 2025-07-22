
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, addOrder } from '../../store';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

function Cart() {
  const cartItems = useSelector(state => state.orders.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    try {
      cartItems.forEach(item => {
        const order = {
          id: Date.now() + item.id,
          animalId: item.id,
          buyer: 'Buyer Name',
          status: 'Pending',
          animal: item,
        };
        dispatch(addOrder(order));
      });
      dispatch(clearCart());
      navigate('/checkout');
    } catch (error) {
      console.error('Checkout failed:', error);
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
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-600">Breed: {item.breed}</p>
                  <p className="text-gray-600">Category: {item.category}</p>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Farmer: {item.farmer}</p>
                  <p className="text-gray-600">Location: {item.location}</p>
                  <p className="text-gray-600">Rating: {item.rating}/5</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="mt-4 flex items-center justify-center bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  <FaTrash className="mr-2" />
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full sm:w-auto flex items-center justify-center bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            <FaShoppingCart className="mr-2" />
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
