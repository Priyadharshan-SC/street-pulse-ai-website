import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-yellow-400 shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-white tracking-wide">
        Street Pulse 🍜
      </Link>

      <div className="space-x-4 hidden md:flex items-center">
        <Link to="/explore" className="text-white hover:text-gray-100 font-medium">
          Explore
        </Link>
        <Link to="/about" className="text-white hover:text-gray-100 font-medium">
          About
        </Link>
        <Link to="/contact" className="text-white hover:text-gray-100 font-medium">
          Contact
        </Link>
        <Link to="/onboard" className="text-white hover:text-gray-100 font-medium">
          Register Vendor
        </Link>

        {currentUser ? (
          <>
            <span className="text-white font-medium">👤 {currentUser.email}</span>
            <button
              onClick={handleLogout}
              className="ml-2 bg-white text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-gray-100 font-medium">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:text-gray-100 font-medium">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
