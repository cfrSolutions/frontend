import { useState } from "react";
import api from "../services/api";

export default function CreateProject() {
  const [form, setForm] = useState({
    sector: "",
    market: "",
    completes: 90,
    ageFrom: 18,
    ageTo: 63,
    gender: "All",
    loi: 90,
    cpi:"",
    incidence: 90,
    timeline: 90,
    openEnded: 2,
    budget: 18,
    description: "",
    devices: {
      mobile: true,
      desktop: true,
      tablet: true,
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDevice = (type) => {
    setForm({
      ...form,
      devices: {
        ...form.devices,
        [type]: !form.devices[type],
      },
    });
  };

  const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token"); // 🔥 get token
    //console.log("TOKEN 👉", token); 
    await api.post(
      "/projects/create",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 SEND TOKEN
        },
      }
    );

    alert("✅ Project Created Successfully");
  } catch (err) {
    console.log(err);
    alert("❌ Error creating project");
  }
};

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-5xl mx-auto">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-2">Create New Project</h1>
      <p className="text-gray-500 mb-6">
        Fill details to create your research project
      </p>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT */}
        <div className="space-y-4">

          <div className="flex gap-4">
            <select name="sector" onChange={handleChange} className="border p-2 w-full rounded">
              <option value="">Sector</option>
              <option>Automobile</option>
              <option>Healthcare</option>
            </select>

            <select name="market" onChange={handleChange} className="border p-2 w-full rounded">
              <option value="">Market</option>
              <option>India</option>
              <option>USA</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span>Age</span>
            <input type="number" name="ageFrom" value={form.ageFrom} onChange={handleChange} className="border p-1 w-16" />
            <span>to</span>
            <input type="number" name="ageTo" value={form.ageTo} onChange={handleChange} className="border p-1 w-16" />
          </div>

          <select name="gender" onChange={handleChange} className="border p-2 w-full rounded">
            <option>All</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          {/* DEVICES */}
          <div>
            <p className="mb-2 font-medium">Device Convenience</p>
            <div className="flex gap-4">
              {["mobile", "desktop", "tablet"].map((d) => (
                <label key={d} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.devices[d]}
                    onChange={() => handleDevice(d)}
                  />
                  {d}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span>Open Ended</span>
            <input
              type="number"
              name="openEnded"
              value={form.openEnded}
              onChange={handleChange}
              className="border p-1 w-16"
            />
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-4">

          <div>
            <label>Completes</label>
            <input type="number" name="completes" value={form.completes} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          <div>
            <label>LOI (mins)</label>
            <input type="number" name="loi" value={form.loi} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          <div>
            <label>Incidence %</label>
            <input type="number" name="incidence" value={form.incidence} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          <div>
            <label>Timeline (days)</label>
            <input type="number" name="timeline" value={form.timeline} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

        </div>

      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <textarea
          name="description"
          maxLength={1000}
          placeholder="Describe your target audience..."
          onChange={handleChange}
          className="w-full border p-3 rounded h-28"
        />
        <p className="text-right text-xs text-gray-400">
          {form.description.length}/1000
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <label>Budget ($)</label>
          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="border p-2 ml-2 w-24"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}