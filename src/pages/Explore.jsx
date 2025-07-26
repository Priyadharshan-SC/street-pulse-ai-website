import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Get image based on category (for popup preview)
function getVendorImage(category) {
  const keyword = category.toLowerCase().replace(/\s/g, '-');
  return `https://source.unsplash.com/300x180/?${keyword}-food&sig=${Math.floor(Math.random() * 1000)}`;
}

// Sample menus by category
const sampleMenus = {
  "Chaat": ["Pani Puri", "Bhel Puri", "Aloo Tikki"],
  "South Indian": ["Idli", "Dosa", "Vada"],
  "Chinese": ["Noodles", "Manchurian", "Spring Roll"],
  "Juice": ["Mango Shake", "Sugarcane Juice", "Lemon Soda"],
  "Snacks": ["Samosa", "Kachori", "Pakoda"],
  "All": ["Pav Bhaji", "Grilled Sandwich", "Chole Bhature"]
};

export default function Explore() {
  const [vendors, setVendors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [minRating, setMinRating] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:5000/api/vendors")
      .then(res => {
        setVendors(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error("❌ Error fetching vendors", err));
  }, []);

  useEffect(() => {
    const result = vendors.filter(v =>
      (category === "All" || v.category === category) &&
      v.hygiene >= minRating
    );
    setFiltered(result);
  }, [category, minRating, vendors]);

  const categories = ["All", "Chaat", "South Indian", "Chinese", "Juice", "Snacks"];

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-yellow-900 drop-shadow">
        🗺️ Explore Street Vendors
      </h2>

      {/* Filter Panel */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <div>
          <label className="mr-2 font-medium">Category:</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            {categories.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-medium">Min Hygiene:</label>
          <select
            value={minRating}
            onChange={e => setMinRating(Number(e.target.value))}
            className="border px-3 py-1 rounded"
          >
            {[1, 2, 3, 4, 5].map(r => (
              <option key={r} value={r}>{r}+</option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-600">{filtered.length} vendors shown</p>
      </div>

      {/* Map Display */}
      <MapContainer center={[11.0168, 76.9558]} zoom={14} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filtered.map((vendor) => {
          const menuItems = sampleMenus[vendor.category] || sampleMenus["All"];
          return (
            <Marker key={vendor.id} position={[vendor.lat, vendor.lng]}>
              <Popup minWidth={250}>
                <div className="text-sm">
                  <img
                    src={getVendorImage(vendor.category)}
                    alt={vendor.category}
                    loading="lazy"
                    className="mb-2 w-full rounded-md"
                  />
                  <strong className="text-lg">{vendor.name}</strong><br />
                  Category: {vendor.category}<br />
                  Hygiene: ⭐ {vendor.hygiene}/5<br />
                  <p className="mt-2 font-medium text-gray-700">Menu Preview:</p>
                  <ul className="list-disc ml-5 text-gray-600 text-xs">
                    {menuItems.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href={`/vendor/${vendor.id}`}
                    className="mt-2 inline-block text-blue-600 underline"
                  >
                    View Full Profile →
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
