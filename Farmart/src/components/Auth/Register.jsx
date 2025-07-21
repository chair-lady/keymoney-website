import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');

  const handleRegister = async (e) => {
    e.preventDefault();
    // Mock API call (replace with real API call to /api/auth/register)
    try {
      await fetch('http://your-django-api/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="buyer">Buyer</option>
          <option value="farmer">Farmer</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Register
        </button>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;