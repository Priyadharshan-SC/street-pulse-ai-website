import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-yellow-400 shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-white tracking-wide">
        Street Pulse 🍜
      </Link>
      <div className="space-x-4 hidden md:flex">
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

      </div>
    </nav>
  );
}
