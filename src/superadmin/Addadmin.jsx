import { useState } from "react";
import api from "../services/api";

export default function Addadmin() {
  /* ---------------- CREATE NEW ADMIN ---------------- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ---------------- TOGGLE ROLE ---------------- */
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ---------- Create Admin ---------- */
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/create-admin", form);
      alert("Admin created successfully ✅");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  /* ---------- Toggle Role ---------- */
  const handleToggle = async (e) => {
    e.preventDefault();

    try {
      await api.patch("/admin/toggle-role", {
        email,
        isAdmin,
      });

      alert(isAdmin ? "User promoted to Admin ✅" : "Admin downgraded to User ✅");

      setEmail("");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="space-y-8 max-w-lg mx-auto">

      {/* ================= CREATE ADMIN ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Create New Admin</h2>

        <form onSubmit={handleCreate} className="space-y-3">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button className="w-full bg-green-600 text-white p-2 rounded">
            Create Admin
          </button>
        </form>
      </div>

      {/* ================= TOGGLE ROLE ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Promote / Demote User</h2>

        <form onSubmit={handleToggle} className="space-y-3">

          <input
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Make Admin
          </label>

          <button className="w-full bg-blue-600 text-white p-2 rounded">
            Update Role
          </button>
        </form>
      </div>
    </div>
  );
}
