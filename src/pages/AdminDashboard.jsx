// src/pages/AdminDashboard.jsx
export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">👑 Admin Dashboard</h1>
      <p>Welcome, Admin. You can manage vendors, raw materials, and reviews here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">📦 Manage Vendors</div>
        <div className="bg-white p-4 rounded shadow">🧂 Raw Material Shops</div>
        <div className="bg-white p-4 rounded shadow">📝 User Reviews</div>
        <div className="bg-white p-4 rounded shadow">🔐 Admin Settings</div>
      </div>
    </div>
  );
}
