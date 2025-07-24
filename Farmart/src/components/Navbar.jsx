
import { useState, useEffect } from 'react';
import { FaUser, FaPlus, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isFarmer, setIsFarmer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFarmer(localStorage.getItem('is_farmer') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_farmer');
    navigate('/login');
  };

  return (
    <nav className="bg-green-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-xl font-bold">FarmArt</h2>
        <div className="space-x-4">
          {isFarmer ? (
            <button
              onClick={() => navigate('/add-animal')}
              className="flex items-center hover:text-green-200"
            >
              <FaPlus className="mr-1" /> Add Animal
            </button>
          ) : (
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center hover:text-green-200"
            >
              <FaUser className="mr-1" /> Buyer Dashboard
            </button>
          )}
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center hover:text-green-200"
          >
            <FaShoppingCart className="mr-1" /> Cart
          </button>
          <button
            onClick={() => navigate('/checkout')}
            className="flex items-center hover:text-green-200"
          >
            Checkout
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center hover:text-green-200"
          >
            <FaSignOutAlt className="mr-1" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
