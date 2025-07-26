import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import VendorProfile from './pages/VendorProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import OnboardVendor from './pages/OnboardVendor';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/onboard" element={<OnboardVendor />} />
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/vendor/:id" element={<VendorProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
