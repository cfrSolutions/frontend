import { useEffect, useState } from "react";
import api from "../services/api";

export default function BusinessDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/business/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Calculate stats
  const total = projects.length;
  const live = projects.filter(p => p.status === "LIVE").length;
  const hold = projects.filter(p => p.status === "HOLD").length;
  const closed = projects.filter(p => p.status === "CLOSED").length;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-5">
        <h2 className="text-xl font-bold mb-6">Your Panel</h2>

        <div className="space-y-3 text-gray-700">
          <p className="font-semibold">Quick Links</p>

          <div className="space-y-2">
            <p className="cursor-pointer">+ New Projects</p>
            <p>Live Projects</p>
            <p>Hold Projects</p>
            <p>Closed Projects</p>
            <p>Draft Projects</p>
            <p>Your Invoices</p>
            <p>Profile</p>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* TOP */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">
            Welcome, Business 👋
          </h1>

          <input
            placeholder="Search Project"
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* TOTAL */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Total Projects</h2>
          <p className="text-3xl font-bold text-yellow-500">{total}</p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-3 gap-6 mb-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-600">Total Live Projects</h3>
            <p className="text-2xl font-bold">{live}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-600">Total Hold Projects</h3>
            <p className="text-2xl font-bold">{hold}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-600">Total Closed Projects</h3>
            <p className="text-2xl font-bold">{closed}</p>
          </div>

        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg">
            <h3 className="font-semibold mb-2">New Project</h3>
            <p className="text-gray-500">Click to create project</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg">
            <h3 className="font-semibold mb-2">Draft Projects</h3>
            <p className="text-gray-500">View drafts</p>
          </div>

        </div>
      </div>
    </div>
  );
}