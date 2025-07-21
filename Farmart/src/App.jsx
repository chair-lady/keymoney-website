
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BuyerDashboard from './components/Buyer/BuyerDashboard';
import Cart from './components/Buyer/Cart';
import Checkout from './components/Buyer/Checkout';
import FarmerDashboard from './components/Farmer/FarmerDashboard';
import AddAnimal from './components/Farmer/AddAnimal';
import EditAnimal from './components/Farmer/EditAnimal';
import Orders from './components/Farmer/Orders';

function App() {
  const { role } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-100">
      {role && (
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <Link to="/" className="text-xl font-bold">Farmart</Link>
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </nav>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buyer" element={role === 'buyer' ? <BuyerDashboard /> : <Login />} />
        <Route path="/cart" element={role === 'buyer' ? <Cart /> : <Login />} />
        <Route path="/checkout" element={role === 'buyer' ? <Checkout /> : <Login />} />
        <Route path="/farmer" element={role === 'farmer' ? <FarmerDashboard /> : <Login />} />
        <Route path="/add-animal" element={role === 'farmer' ? <AddAnimal /> : <Login />} />
        <Route path="/edit-animal/:id" element={role === 'farmer' ? <EditAnimal /> : <Login />} />
        <Route path="/orders" element={role === 'farmer' ? <Orders /> : <Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;