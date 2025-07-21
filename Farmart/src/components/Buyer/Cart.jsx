import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../store';
import { useNavigate, Link } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Mock API call to /api/orders (replace with real API call)
    try {
      fetch('http://your-django-api/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });
      dispatch(clearCart());
      navigate('/checkout');
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="bg-white p-4 rounded shadow-md mb-4">
              <h3>{item.type} - {item.breed}</h3>
              <p>Price: ${item.price}</p>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;