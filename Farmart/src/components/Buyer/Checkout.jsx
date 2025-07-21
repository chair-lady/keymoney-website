import { Link } from 'react-router-dom';

function Checkout() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Checkout</h1>
      <p>Payment processing...</p>
      <p>Order placed successfully!</p>
      <Link to="/buyer" className="mt-4 inline-block bg-blue-500 text-white p-2 rounded">
        Back to Home
      </Link>
    </div>
  );
}

export default Checkout;