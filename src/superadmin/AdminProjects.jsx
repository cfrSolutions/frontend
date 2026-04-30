import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await api.get("/admin/projects", {
      withCredentials: true,
    });
    setProjects(res.data);
  };

  const handleAccept = async (id) => {
    try {
      await api.put(`/admin/project/${id}/accept`);
      alert("✅ Project Accepted");
      fetchProjects();
    } catch (err) {
      console.log(err);
      alert("❌ Error");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/admin/project/${id}/reject`);
      alert("❌ Project Rejected");
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Projects Approval</h2>

      {projects.map((p) => (
        <div key={p._id}  onClick={() => navigate(`/superadmin/dashboard/project/${p._id}`)}
  className="border p-4 rounded mb-4 cursor-pointer hover:bg-gray-50">

          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">
                {p.sector} - {p.market}
              </h3>
              <p className="text-sm text-gray-500">
                By: {p.business?.email}
              </p>
              <p className="text-xs mt-1">
                Status: <b>{p.status}</b>
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2">
              {p.status === "DRAFT" && (
                <>
                  <button
                    onClick={() => handleAccept(p._id)}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(p._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Reject
                  </button>
                </>
              )}

              {p.status === "LIVE" && (
                <span className="text-green-600 font-semibold">
                  Approved
                </span>
              )}

              {p.status === "CLOSED" && (
                <span className="text-red-600 font-semibold">
                  Rejected
                </span>
              )}
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}