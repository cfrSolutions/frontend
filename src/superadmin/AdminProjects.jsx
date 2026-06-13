// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";


// export default function AdminProjects() {
//   const [projects, setProjects] = useState([]);
//   const [showChat, setShowChat] = useState(false);
// const navigate = useNavigate();
//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     const res = await api.get("/admin/projects", {
//       withCredentials: true,
//     });
//     setProjects(res.data);
//   };
//   const openNegotiation = () => {
//   setShowChat(true);
// };

//   const handleAccept = async (id) => {
//     try {
//       await api.put(`/admin/project/${id}/accept`);
//       alert("✅ Project Accepted");
//       fetchProjects();
//     } catch (err) {
//       console.log(err);
//       alert("❌ Error");
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       await api.put(`/admin/project/${id}/reject`);
//       alert("❌ Project Rejected");
//       fetchProjects();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Projects Approval</h2>

//       {projects.map((p) => (
//         <div key={p._id}  onClick={() => navigate(`/superadmin/dashboard/project/${p._id}`)}
//   className="border p-4 rounded mb-4 cursor-pointer hover:bg-gray-50">

//           <div className="flex justify-between">
//             <div>
//               <h3 className="font-semibold">
//                 {p.sector} - {p.market}
//               </h3>
//               <p className="text-sm text-gray-500">
//                 By: {p.business?.email}
//               </p>
//               <p className="text-xs mt-1">
//                 Status: <b>{p.status}</b>
//               </p>
//             </div>

//             {/* ACTION BUTTONS */}
//             <div className="flex gap-2">
//               {p.status === "DRAFT" && (
//                 <>
//                   <button
//                     onClick={() => handleAccept(p._id)}
//                     className="bg-green-600 text-white px-4 py-1 rounded"
//                   >
//                     Accept
//                   </button>

//                   <button
//                     onClick={() => handleReject(p._id)}
//                     className="bg-red-600 text-white px-4 py-1 rounded"
//                   >
//                     Reject
//                   </button>
//                   <button
//   onClick={openNegotiation}
//   className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
// >
//   Start Negotiation
// </button>
//                 </>
//               )}

//               {p.status === "LIVE" && (
//                 <span className="text-green-600 font-semibold">
//                   Approved
//                 </span>
//               )}

//               {p.status === "CLOSED" && (
//                 <span className="text-red-600 font-semibold">
//                   Rejected
//                 </span>
//               )}
//             </div>
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function AdminProjects() {
//   const [projects, setProjects] = useState([]);
//   const [showChat, setShowChat] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     const res = await api.get("/admin/projects", {
//       withCredentials: true,
//     });

//     setProjects(res.data);
//   };



//   return (
//     <div className="w-full p-3 sm:p-6">
//       <h2 className="text-xl sm:text-2xl font-bold mb-4">
//         Projects Approval
//       </h2>

//       <div className="space-y-4">
//         {projects.map((p) => (
//           <div
//             key={p._id}
//             onClick={() =>
//               navigate(`/superadmin/dashboard/project/${p._id}`)
//             }
//             className="
//               w-full
//               border
//               rounded-xl
//               p-4
//               bg-white
//               shadow-sm
//               cursor-pointer
//               hover:bg-gray-50
//               transition
//             "
//           >
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              
//               {/* LEFT SIDE */}
//               <div className="min-w-0">
//                 <h3 className="font-semibold text-base sm:text-lg break-words">
//                   {p.sector} - {p.market}
//                 </h3>

//                 <p className="text-sm text-gray-500 break-all">
//                   By: {p.business?.email}
//                 </p>

//                 <p className="text-xs sm:text-sm mt-1">
//                   Status: <b>{p.status}</b>
//                 </p>
//               </div>

//               {/* RIGHT SIDE */}
//               <div className="flex flex-wrap gap-2 w-full lg:w-auto">
//                <button
//   onClick={(e) => {
//     e.stopPropagation();
//     navigate(`/superadmin/dashboard/project/${p._id}`);
//   }}
//   className="bg-blue-600 text-white px-4 py-2 rounded-lg"
// >
//   Manage Project
// </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await api.get("/admin/projects", {
        withCredentials: true,
      });

      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Projects
      </h1>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() =>
              navigate(
                `/superadmin/dashboard/project/${project._id}`
              )
            }
            className="border rounded-xl p-5 bg-white cursor-pointer hover:bg-gray-50"
          >
            <h2 className="font-bold text-lg">
              {project.name}
            </h2>

            <p className="text-gray-500">
              {project.business?.email}
            </p>

            <p>
              Survey ID:
              {" "}
              {project.surveyId}
            </p>

            <p>
              Status:
              {" "}
              <b>{project.status}</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}