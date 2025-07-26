import { useState } from "react";
import axios from "axios";

export default function OnboardVendor() {
  const [formData, setFormData] = useState({
    name: "",
    category: "Chaat",
    hygiene: 3,
    lat: "",
    lng: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/vendors", {
        ...formData,
        hygiene: Number(formData.hygiene),
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng)
      });
      alert("Vendor successfully registered!");
      setFormData({
        name: "",
        category: "Chaat",
        hygiene: 3,
        lat: "",
        lng: "",
        description: ""
      });
    } catch (err) {
      console.error(err);
      alert("Failed to register vendor");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-800">📝 Vendor Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Vendor Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        >
          {["Chaat", "South Indian", "Chinese", "Juice", "Snacks"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <label className="block">
          Hygiene Rating:
          <select
            name="hygiene"
            value={formData.hygiene}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 mt-1"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
        <input
          type="text"
          name="lat"
          placeholder="Latitude"
          value={formData.lat}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2"
        />
        <input
          type="text"
          name="lng"
          placeholder="Longitude"
          value={formData.lng}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2"
        />
        <textarea
          name="description"
          placeholder="Short Description / Specialty"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl w-full"
        >
          ✅ Submit Vendor
        </button>
      </form>
    </div>
  );
}
