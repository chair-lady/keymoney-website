
import { Link } from 'react-router-dom';

function Checkout() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4 font-semibold font-serif text-center">Checkout</h1>
      <p className="text-center">Payment processing...</p>
      <p className="text-center">Order placed successfully!</p>
      <Link to="/buyer" className="mt-4 inline-block bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Back to Home
      </Link>
    </div>
  );
}

export default Checkout;
