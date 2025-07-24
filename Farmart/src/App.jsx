
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BuyerDashboard from './components/Buyer/BuyerDashboard';
import Cart from './components/Buyer/Cart';
import Orders from './components/Farmer/Orders'; // Buyer-specific orders
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AddAnimal from './components/Farmer/AddAnimal';
import EditAnimal from './components/Farmer/EditAnimal';
import Checkout from './components/Buyer/Checkout';
import { FaTrash, FaShoppingCart, FaCheck, FaTimes } from 'react-icons/fa';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<BuyerDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} /> {/* New buyer orders route */}
        <Route path="/farmer" element={<Orders />} /> {/* Farmer orders (adjust if different) */}
        <Route path="/add-animal" element={<AddAnimal />} />
        <Route path="/edit-animal/:id" element={<EditAnimal />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/test-icons" element={<TestIcons />} />
      </Routes>
      <Footer />
    </div>
  );
}

function TestIcons() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Icon Test</h1>
      <FaTrash data-testid="FaTrash" className="text-2xl text-black mb-2" />
      <FaShoppingCart data-testid="FaShoppingCart" className="text-2xl text-black mb-2" />
      <FaCheck data-testid="FaCheck" className="text-2xl text-black mb-2" />
      <FaTimes data-testid="FaTimes" className="text-2xl text-black mb-2" />
    </div>
  );
}

export default App;
