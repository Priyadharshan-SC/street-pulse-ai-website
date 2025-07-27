// src/pages/OnboardVendor.jsx
import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

export default function OnboardVendor() {
  const [formData, setFormData] = useState({
    name: "",
    category: "Chaat",
    hygiene: 3,
    lat: "",
    lng: "",
  });

  const [bannerImage, setBannerImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([null, null, null]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGalleryChange = (e, index) => {
    const updated = [...galleryImages];
    updated[index] = e.target.files[0];
    setGalleryImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bannerImage || galleryImages.includes(null)) {
      toast.error("Please upload all images (1 banner + 3 gallery).");
      return;
    }

    try {
      const folderId = Date.now().toString();

      // Upload banner
      const bannerRef = ref(storage, `vendor_images/${folderId}/banner.jpg`);
      await uploadBytes(bannerRef, bannerImage);
      const bannerURL = await getDownloadURL(bannerRef);

      // Upload gallery
      const galleryURLs = await Promise.all(
        galleryImages.map((img, idx) => {
          const imgRef = ref(storage, `vendor_images/${folderId}/gallery${idx + 1}.jpg`);
          return uploadBytes(imgRef, img).then(() => getDownloadURL(imgRef));
        })
      );

      // Save vendor data
      await addDoc(collection(db, "vendors"), {
        ...formData,
        hygiene: parseInt(formData.hygiene),
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        bannerURL,
        gallery: galleryURLs,
        createdAt: new Date(),
      });

      toast.success("Vendor added successfully!");
      setFormData({
        name: "",
        category: "Chaat",
        hygiene: 3,
        lat: "",
        lng: "",
      });
      setBannerImage(null);
      setGalleryImages([null, null, null]);
    } catch (error) {
      console.error("Error adding vendor:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Vendor Onboarding</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Vendor Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Chaat</option>
          <option>Chinese</option>
          <option>South Indian</option>
          <option>Snacks</option>
          <option>Juice</option>
        </select>

        <input
          type="number"
          name="hygiene"
          placeholder="Hygiene Rating (1-5)"
          min={1}
          max={5}
          value={formData.hygiene}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="lat"
          placeholder="Latitude"
          value={formData.lat}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="lng"
          placeholder="Longitude"
          value={formData.lng}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* 🖼️ Image Uploads */}
        <label className="block font-medium">Banner Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBannerImage(e.target.files[0])}
          className="w-full"
          required
        />

        <label className="block font-medium mt-4">Gallery Images (3):</label>
        {[0, 1, 2].map((i) => (
          <input
            key={i}
            type="file"
            accept="image/*"
            onChange={(e) => handleGalleryChange(e, i)}
            className="w-full"
            required
          />
        ))}

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
        >
          Submit Vendor
        </button>
      </form>
    </div>
  );
}
