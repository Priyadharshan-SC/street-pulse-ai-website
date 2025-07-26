import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet marker icon path
const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function VendorProfile() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/vendors")
      .then(res => {
        const found = res.data.find(v => v.id.toString() === id);
        setVendor(found);
      })
      .catch(err => console.error("Error fetching vendor", err));
  }, [id]);

  if (!vendor) return <p className="p-4 text-gray-600">Loading vendor details...</p>;

  // ✅ Only run image logic after vendor is loaded
  let bannerImg, galleryImages;
  try {
    bannerImg = require(`../assets/vendors/${vendor.id}/banner.jpg`);
    galleryImages = [
      require(`../assets/vendors/${vendor.id}/food1.jpg`),
      require(`../assets/vendors/${vendor.id}/food2.jpg`),
      require(`../assets/vendors/${vendor.id}/food3.jpg`)
    ];
  } catch (e) {
    console.warn(`Missing images for vendor ${vendor.id}`, e);
    bannerImg = require(`../assets/fallback/banner.jpg`);
    galleryImages = [
      require(`../assets/fallback/food1.jpg`),
      require(`../assets/fallback/food2.jpg`),
      require(`../assets/fallback/food3.jpg`)
    ];
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", rating: 5, comment: "" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      <Link to="/explore" className="text-blue-500 text-sm mb-4 inline-block">← Back to Explore</Link>

      <img
        src={bannerImg}
        alt="Vendor Banner"
        className="rounded-lg mb-4 w-full object-cover h-60"
      />

      <h2 className="text-3xl font-bold mb-1">{vendor.name}</h2>
      <p className="text-gray-600 text-lg mb-2">{vendor.category} Vendor</p>

      <div className="mb-4">
        <span className="text-gray-700 font-semibold">🧼 Hygiene Rating:</span>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${vendor.hygiene * 20}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">Score: {vendor.hygiene}/5</p>
      </div>

      <p className="text-gray-700 mb-4">🍽️ “Known for delicious street-style {vendor.category.toLowerCase()} in the area!”</p>

      <div className="h-60 mb-6">
        <MapContainer center={[vendor.lat, vendor.lng]} zoom={16} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='© OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[vendor.lat, vendor.lng]} />
        </MapContainer>
      </div>

      {/* 🖼️ Gallery Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Food ${idx + 1}`}
            className="rounded-xl shadow hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      {/* Review Form */}
      <div className="my-8">
        <h3 className="text-2xl font-semibold mb-2">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 rounded w-full"
            value={newReview.name}
            onChange={e => setNewReview({ ...newReview, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Comment"
            className="border p-2 rounded w-full"
            value={newReview.comment}
            onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
          <label className="block text-sm">
            Rating:
            <select
              className="ml-2 border rounded p-1"
              value={newReview.rating}
              onChange={e => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
            >
              {[1, 2, 3, 4, 5].map(r => (
                <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Review List */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
        {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
        {reviews.map((r, i) => (
          <div key={i} className="border-b pb-2 mb-2">
            <p className="font-semibold">{r.name} <span className="text-yellow-500">{"★".repeat(r.rating)}</span></p>
            <p className="text-sm text-gray-700">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
