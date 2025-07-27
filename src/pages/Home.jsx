import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Lottie from 'react-lottie-player';
import discoverAnim from '../assets/discover.json';
import reviewAnim from '../assets/review.json';
import boostAnim from '../assets/boost.json';
import heroBanner from '../assets/images/hero-banner.png';
import introImage from '../assets/images/intro.png';
import highlightImage from '../assets/images/highlight.jpg';

export default function Home() {
  const [vendors, setVendors] = useState([]);
  const [rawShops, setRawShops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const vendorSnap = await getDocs(collection(db, 'vendors'));
      const rawSnap = await getDocs(collection(db, 'rawShops'));

      setVendors(vendorSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setRawShops(rawSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-yellow-100 to-orange-200 text-yellow-900">
      <img
        src={heroBanner}
        alt="Street Food Hero"
        className="mt-10 mx-auto rounded-xl shadow-xl w-full max-w-4xl object-cover"
      />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-16 pb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-sm leading-tight">
          Discover <span className="text-orange-600">Street Food Gems</span> 🍢
        </h1>
        <p className="text-lg md:text-xl mt-4 max-w-2xl text-yellow-800">
          Explore, rate, and support local street vendors with hygiene insights, real reviews, and tasty recommendations.
        </p>
        <Link to="/explore">
          <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 text-lg rounded-xl shadow-md transition transform hover:scale-105">
            🔍 Explore Vendors
          </button>
        </Link>
        <img
          src={introImage}
          alt="Street Food Banner"
          className="mt-10 mx-auto rounded-xl shadow-xl w-full max-w-4xl object-cover"
        />
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[discoverAnim, reviewAnim, boostAnim].map((anim, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center"
            >
              <Lottie loop play animationData={anim} className="w-32 h-32 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">
                {["Discover Vendors", "Rate & Review", "Boost Local Vendors"][i]}
              </h3>
              <p className="text-sm text-yellow-800 text-center">
                {[
                  "Explore street food stalls on an interactive map, complete with hygiene scores and live location pins.",
                  "Share your street food experiences through helpful reviews, photos, and ratings.",
                  "Give visibility and credibility to hygienic, underrated street food heroes in your city."
                ][i]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Banner */}
      <section className="mt-10 relative w-full h-[400px] overflow-hidden">
        <img
          src={highlightImage}
          alt="Vendor Highlight"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-white text-center px-4">
            <h3 className="text-3xl font-bold mb-2">Your Next Bite Awaits</h3>
            <p className="text-md mb-4">
              Authentic, affordable, and hygienic street food, around the corner.
            </p>
            <Link to="/explore">
              <button className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full text-white font-medium shadow-md">
                View the Map →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-4">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Start Exploring Local Flavors Now!
        </h3>
        <Link to="/explore">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 text-lg rounded-xl shadow-md transition transform hover:scale-105">
            🚀 Launch Map
          </button>
        </Link>
      </section>

      {/* 🍽️ Street Vendors Section */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">🍽️ Popular Vendors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vendors.slice(0, 6).map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
              <h4 className="text-lg font-semibold text-yellow-900">{vendor.name}</h4>
              <p className="text-sm text-gray-600">Category: {vendor.category}</p>
              <p className="text-sm text-gray-600">Hygiene: ⭐ {vendor.hygiene}/5</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🛍️ Raw Material Shops Section */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">🧂 Raw Material Shops</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rawShops.slice(0, 6).map((shop) => (
            <div key={shop.id} className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
              <h4 className="text-lg font-semibold text-yellow-900">{shop.name}</h4>
              <p className="text-sm text-gray-600">Category: {shop.category || "General"}</p>
              <p className="text-sm text-gray-600">Location: {shop.area || "Not specified"}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
