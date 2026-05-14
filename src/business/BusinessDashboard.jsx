// import { useEffect, useState } from "react";
// import api from "../services/api";

// export default function BusinessDashboard() {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const res = await api.get("/business/projects");
//       setProjects(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // 🔥 Calculate stats
//   const total = projects.length;
//   const live = projects.filter(p => p.status === "LIVE").length;
//   const hold = projects.filter(p => p.status === "HOLD").length;
//   const closed = projects.filter(p => p.status === "CLOSED").length;

//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* SIDEBAR */}
//       <div className="w-64 bg-white border-r p-5">
//         <h2 className="text-xl font-bold mb-6">Your Panel</h2>

//         <div className="space-y-3 text-gray-700">
//           <p className="font-semibold">Quick Links</p>

//           <div className="space-y-2">
//             <p className="cursor-pointer">+ New Projects</p>
//             <p>Live Projects</p>
//             <p>Hold Projects</p>
//             <p>Closed Projects</p>
//             <p>Draft Projects</p>
//             <p>Your Invoices</p>
//             <p>Profile</p>
//           </div>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="flex-1 p-6">

//         {/* TOP */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-xl font-semibold">
//             Welcome, Business 👋
//           </h1>

//           <input
//             placeholder="Search Project"
//             className="border px-3 py-2 rounded"
//           />
//         </div>

//         {/* TOTAL */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold">Total Projects</h2>
//           <p className="text-3xl font-bold text-yellow-500">{total}</p>
//         </div>

//         {/* STATS CARDS */}
//         <div className="grid grid-cols-3 gap-6 mb-6">

//           <div className="bg-white p-5 rounded-xl shadow">
//             <h3 className="text-gray-600">Total Live Projects</h3>
//             <p className="text-2xl font-bold">{live}</p>
//           </div>

//           <div className="bg-white p-5 rounded-xl shadow">
//             <h3 className="text-gray-600">Total Hold Projects</h3>
//             <p className="text-2xl font-bold">{hold}</p>
//           </div>

//           <div className="bg-white p-5 rounded-xl shadow">
//             <h3 className="text-gray-600">Total Closed Projects</h3>
//             <p className="text-2xl font-bold">{closed}</p>
//           </div>

//         </div>

//         {/* ACTION CARDS */}
//         <div className="grid grid-cols-2 gap-6">

//           <div className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg">
//             <h3 className="font-semibold mb-2">New Project</h3>
//             <p className="text-gray-500">Click to create project</p>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg">
//             <h3 className="font-semibold mb-2">Draft Projects</h3>
//             <p className="text-gray-500">View drafts</p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../services/api";
import { useLocation } from "react-router-dom";
import { CheckCircle, PauseCircle, Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BusinessDashboard() {
   const [projects, setProjects] = useState([]);
   const location = useLocation();

   const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data); 
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
  fetchProjects();
}, [location.pathname]);

const path = location.pathname;

let filter = "ALL";

if (path.includes("/live")) filter = "LIVE";
if (path.includes("/hold")) filter = "HOLD";
if (path.includes("/closed")) filter = "CLOSED";
if (path.includes("/drafts")) filter = "DRAFT";
if(path.includes("/negotiation")) filter = "NEGOTIATION";
if (path.includes("/accepted")) filter = "ACCEPTED";
if (path.includes("/testing")) filter = "TESTING";
  

  const filteredProjects =
  filter === "ALL"
    ? projects
    : projects.filter(p => p.status === filter);

  const total = projects.length;
  const live = projects.filter(p => p.status === "LIVE").length;
  const hold = projects.filter(p => p.status === "HOLD").length;
  const closed = projects.filter(p => p.status === "CLOSED").length;
//   const draftProjects = projects.filter(p => p.status === "DRAFT");
// const liveProjects = projects.filter(p => p.status === "LIVE");
// const holdProjects = projects.filter(p => p.status === "HOLD");
// const closedProjects = projects.filter(p => p.status === "CLOSED");

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-gray-500 text-sm">Total Projects</h2>
        <p className="text-4xl font-bold text-orange-500">{total}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Live</p>
            <h3 className="text-2xl font-bold">{live}</h3>
          </div>
          <CheckCircle className="text-green-500" />
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Hold</p>
            <h3 className="text-2xl font-bold">{hold}</h3>
          </div>
          <PauseCircle className="text-yellow-500" />
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Closed</p>
            <h3 className="text-2xl font-bold">{closed}</h3>
          </div>
          <Folder />
        </div>
      </div>
 <h2 className="text-lg font-semibold mt-6">
  {filter === "ALL" && "All Projects"}
  {filter === "LIVE" && "Live Projects"}
  {filter === "DRAFT" && "Draft Projects"}
  {filter === "HOLD" && "Hold Projects"}
  {filter === "CLOSED" && "Closed Projects"}
  {filter === "NEGOTIATION" && "Negotiation Projects"}
{filter === "ACCEPTED" && "Accepted Projects"}
{filter === "TESTING" && "Testing Projects"}
</h2>

{filteredProjects.length === 0 ? (
  <p className="text-gray-400">No projects found</p>
) : (
  filteredProjects.map(p => (
    <ProjectCard key={p._id} p={p} />
  ))
)}
    </div>
  );
}



function ProjectCard({ p }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/business/dashboard/project/${p._id}/status`)}
      className="bg-white p-4 rounded-xl shadow mb-3 cursor-pointer hover:shadow-md transition"
    >
      <h3 className="font-semibold">
        {p.sector} - {p.market}
      </h3>

      <p className="text-sm text-gray-500">
        Age: {p.ageFrom} - {p.ageTo}
      </p>

      <p className="text-sm mt-1">
        Status:{" "}
        <span className={`font-semibold ${
          p.status === "LIVE" ? "text-green-600" :
          p.status === "DRAFT" ? "text-gray-500" :
          p.status === "HOLD" ? "text-yellow-500" :
          "text-red-500"
        }`}>
          {p.status}
        </span>
      </p>
    </div>
  );
}