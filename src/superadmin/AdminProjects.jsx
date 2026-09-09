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

// import { useEffect, useMemo, useState } from "react";
// import api from "../services/api";

// export default function AdminProjects() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Business expansion
//   const [expandedBusiness, setExpandedBusiness] =
//     useState(null);

//   // Project expansion
//   const [expandedProject, setExpandedProject] =
//     useState(null);

//   // =====================================================
//   // FETCH PROJECTS
//   // =====================================================

//   const fetchProjects = async () => {
//     try {
//       setLoading(true);

//       const res = await api.get(
//         "/admin/projects",
//         {
//           withCredentials: true,
//         }
//       );

//       console.log(
//         "ADMIN PROJECTS:",
//         res.data
//       );

//       setProjects(
//         Array.isArray(res.data)
//           ? res.data
//           : []
//       );

//     } catch (err) {
//       console.error(
//         "FETCH ADMIN PROJECTS ERROR:",
//         err
//       );

//       setProjects([]);

//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // =====================================================
//   // GROUP PROJECTS BY BUSINESS
//   // =====================================================

//   const businesses = useMemo(() => {
//     const grouped = {};

//     projects.forEach((project) => {
//       const businessId =
//         project.business?._id ||
//         project.business ||
//         "unknown";

//       if (!grouped[businessId]) {
//         grouped[businessId] = {
//           id: businessId,

//           name:
//             project.business?.name ||
//             "Unknown Business",

//           email:
//             project.business?.email ||
//             "",

//           projects: [],
//         };
//       }

//       grouped[businessId].projects.push(
//         project
//       );
//     });

//     return Object.values(grouped);
//   }, [projects]);

//   // =====================================================
//   // TOGGLE BUSINESS
//   // =====================================================

//   const toggleBusiness = (businessId) => {
//     setExpandedBusiness((current) =>
//       current === businessId
//         ? null
//         : businessId
//     );

//     // Close any open project when changing business
//     setExpandedProject(null);
//   };

//   // =====================================================
//   // TOGGLE PROJECT
//   // =====================================================

//   const toggleProject = (projectId) => {
//     setExpandedProject((current) =>
//       current === projectId
//         ? null
//         : projectId
//     );
//   };

//   // =====================================================
//   // LOADING
//   // =====================================================

//   if (loading) {
//     return (
//       <div className="p-6">

//         <h1 className="text-2xl font-bold">
//           Projects
//         </h1>

//         <p className="mt-4 text-gray-500">
//           Loading projects...
//         </p>

//       </div>
//     );
//   }

//   // =====================================================
//   // PAGE
//   // =====================================================

//   return (
//     <div className="p-6">

//       {/* =================================================
//           PAGE HEADER
//       ================================================= */}

//       <div className="mb-8">

//         <h1 className="text-3xl font-bold">
//           Projects
//         </h1>

//         <p className="text-gray-500 mt-1">
//           Manage projects by business
//         </p>

//         <p className="text-sm text-gray-400 mt-2">
//           {businesses.length}{" "}
//           {businesses.length === 1
//             ? "business"
//             : "businesses"}
//           {" · "}
//           {projects.length}{" "}
//           {projects.length === 1
//             ? "project"
//             : "projects"}
//         </p>

//       </div>


//       {/* =================================================
//           NO PROJECTS
//       ================================================= */}

//       {businesses.length === 0 ? (

//         <div className="
//           bg-white
//           border
//           rounded-xl
//           p-8
//           text-gray-500
//         ">
//           No projects found.
//         </div>

//       ) : (

//         <div className="space-y-4">

//           {/* =================================================
//               BUSINESSES
//           ================================================= */}

//           {businesses.map((business) => {

//             const isBusinessExpanded =
//               expandedBusiness ===
//               business.id;

//             return (

//               <div
//                 key={business.id}
//                 className="
//                   bg-white
//                   border
//                   rounded-2xl
//                   overflow-hidden
//                 "
//               >

//                 {/* =================================================
//                     BUSINESS HEADER
//                 ================================================= */}

//                 <button
//                   type="button"
//                   onClick={() =>
//                     toggleBusiness(
//                       business.id
//                     )
//                   }
//                   className="
//                     w-full
//                     flex
//                     items-center
//                     justify-between
//                     px-6
//                     py-5
//                     text-left
//                     hover:bg-gray-50
//                     transition
//                   "
//                 >

//                   <div className="
//                     flex
//                     items-center
//                     gap-4
//                   ">

//                     {/* ARROW */}

//                     <span className="
//                       text-xl
//                       w-5
//                       text-gray-600
//                     ">
//                       {isBusinessExpanded
//                         ? "⌄"
//                         : "›"}
//                     </span>


//                     {/* BUSINESS */}

//                     <div>

//                       <h2 className="
//                         text-lg
//                         font-bold
//                         text-slate-900
//                       ">
//                         {business.name}
//                       </h2>

//                       {business.email && (

//                         <p className="
//                           text-sm
//                           text-gray-500
//                           mt-1
//                         ">
//                           {business.email}
//                         </p>

//                       )}

//                     </div>

//                   </div>


//                   {/* PROJECT COUNT */}

//                   <span className="
//                     px-4
//                     py-2
//                     rounded-full
//                     bg-purple-50
//                     text-purple-700
//                     text-sm
//                     font-semibold
//                   ">
//                     {business.projects.length}{" "}
//                     {business.projects.length === 1
//                       ? "Project"
//                       : "Projects"}
//                   </span>

//                 </button>


//                 {/* =================================================
//                     PROJECTS UNDER BUSINESS
//                 ================================================= */}

//                 {isBusinessExpanded && (

//                   <div className="
//                     border-t
//                     bg-slate-50
//                     p-5
//                   ">

//                     <div className="space-y-4">

//                       {business.projects.map(
//                         (project) => {

//                           // =========================================
//                           // TARGET GROUPS
//                           // =========================================

//                           const targetGroups =
//                             Array.isArray(
//                               project.targetGroups
//                             )
//                               ? project.targetGroups
//                               : [];


//                           // =========================================
//                           // TOTAL TARGET
//                           // =========================================

//                           const targetCompletes =
//                             targetGroups.reduce(
//                               (
//                                 total,
//                                 group
//                               ) =>
//                                 total +
//                                 (
//                                   Number(
//                                     group.targetCompletes
//                                   ) || 0
//                                 ),
//                               0
//                             );


//                           // =========================================
//                           // PROJECT COMPLETES
//                           // =========================================

//                           const completes =
//                             Number(
//                               project.completes
//                             ) || 0;


//                           // =========================================
//                           // PROJECT PROGRESS
//                           // =========================================

//                           const progress =
//                             targetCompletes > 0
//                               ? Math.min(
//                                   (
//                                     completes /
//                                     targetCompletes
//                                   ) * 100,
//                                   100
//                                 )
//                               : 0;


//                           // =========================================
//                           // PROJECT EXPANDED?
//                           // =========================================

//                           const isProjectExpanded =
//                             expandedProject ===
//                             project._id;


//                           return (

//                             <div
//                               key={
//                                 project._id
//                               }
//                               className="
//                                 bg-white
//                                 border
//                                 rounded-xl
//                                 overflow-hidden
//                               "
//                             >

//                               {/* ==================================
//                                   PROJECT HEADER
//                               ================================== */}

//                               <div
//                                 onClick={() =>
//                                   toggleProject(
//                                     project._id
//                                   )
//                                 }
//                                 className="
//                                   p-5
//                                   cursor-pointer
//                                   hover:bg-gray-50
//                                   transition
//                                 "
//                               >

//                                 <div className="
//                                   flex
//                                   justify-between
//                                   items-start
//                                   gap-4
//                                 ">

//                                   {/* PROJECT INFO */}

//                                   <div className="
//                                     flex
//                                     items-start
//                                     gap-3
//                                   ">

//                                     {/* ARROW */}

//                                     <span className="
//                                       text-xl
//                                       text-gray-600
//                                       mt-1
//                                     ">
//                                       {isProjectExpanded
//                                         ? "⌄"
//                                         : "›"}
//                                     </span>


//                                     <div>

//                                       <h3 className="
//                                         text-xl
//                                         font-bold
//                                         text-purple-800
//                                       ">
//                                         {project.name ||
//                                           "Unnamed Project"}
//                                       </h3>

//                                       <p className="
//                                         text-sm
//                                         text-gray-500
//                                         mt-1
//                                       ">
//                                         Survey ID:{" "}
//                                         {project.surveyId ||
//                                           "-"}
//                                       </p>

//                                     </div>

//                                   </div>


//                                   {/* STATUS */}

//                                   <span className="
//                                     px-3
//                                     py-1
//                                     border
//                                     rounded-full
//                                     text-xs
//                                     whitespace-nowrap
//                                   ">
//                                     {project.status ||
//                                       "DRAFT"}
//                                   </span>

//                                 </div>


//                                 {/* ==================================
//                                     PROJECT STATS
//                                 ================================== */}

//                                 <div className="
//                                   grid
//                                   grid-cols-2
//                                   md:grid-cols-4
//                                   gap-4
//                                   mt-5
//                                 ">

//                                   {/* COMPLETES */}

//                                   <Stat
//                                     label="Completes"
//                                     value={
//                                       `${completes} / ${targetCompletes}`
//                                     }
//                                   />


//                                   {/* DISQUALIFIED */}

//                                   <Stat
//                                     label="Disqualified"
//                                     value={
//                                       project.disqualified ||
//                                       0
//                                     }
//                                   />


//                                   {/* QUOTA FULL */}

//                                   <Stat
//                                     label="Quota Full"
//                                     value={
//                                       project.quotaFull ||
//                                       0
//                                     }
//                                   />


//                                   {/* RESPONSES */}

//                                   <Stat
//                                     label="Responses"
//                                     value={
//                                       project.totalResponses ||
//                                       0
//                                     }
//                                   />

//                                 </div>


//                                 {/* ==================================
//                                     PROJECT PROGRESS
//                                 ================================== */}

//                                 <div className="mt-5">

//                                   <div className="
//                                     flex
//                                     justify-between
//                                     text-xs
//                                     text-gray-500
//                                     mb-2
//                                   ">

//                                     <span>
//                                       Project Progress
//                                     </span>

//                                     <span>
//                                       {Math.round(
//                                         progress
//                                       )}%
//                                     </span>

//                                   </div>


//                                   <div className="
//                                     h-2
//                                     bg-purple-100
//                                     rounded-full
//                                     overflow-hidden
//                                   ">

//                                     <div
//                                       className="
//                                         h-full
//                                         bg-purple-700
//                                         rounded-full
//                                         transition-all
//                                       "
//                                       style={{
//                                         width:
//                                           `${progress}%`,
//                                       }}
//                                     />

//                                   </div>

//                                 </div>


//                                 {/* ==================================
//                                     TARGET GROUP COUNT
//                                 ================================== */}

//                                 <div className="
//                                   mt-5
//                                   pt-4
//                                   border-t
//                                   flex
//                                   justify-between
//                                   items-center
//                                 ">

//                                   <span className="
//                                     text-gray-500
//                                   ">
//                                     Target Groups
//                                   </span>


//                                   <div className="
//                                     flex
//                                     items-center
//                                     gap-3
//                                   ">

//                                     <span className="
//                                       font-semibold
//                                     ">
//                                       {
//                                         targetGroups.length
//                                       }
//                                     </span>

//                                     <span className="
//                                       text-purple-700
//                                       text-lg
//                                     ">
//                                       {isProjectExpanded
//                                         ? "⌃"
//                                         : "⌄"}
//                                     </span>

//                                   </div>

//                                 </div>

//                               </div>


//                               {/* ==================================
//                                   TARGET GROUP DETAILS
//                               ================================== */}

//                               {isProjectExpanded && (

//                                 <div className="
//                                   border-t
//                                   bg-slate-50
//                                   px-6
//                                   py-6
//                                 ">

//                                   {/* TARGET GROUP HEADER */}

//                                   <div className="
//                                     grid
//                                     grid-cols-8
//                                     gap-4
//                                     text-xs
//                                     font-semibold
//                                     uppercase
//                                     text-slate-500
//                                     pb-4
//                                     border-b
//                                   ">

//                                     <div>
//                                       Target Group
//                                     </div>

//                                     <div>
//                                       Status
//                                     </div>

//                                     <div>
//                                       Progress
//                                     </div>

//                                     <div>
//                                       CPI
//                                     </div>

//                                     <div>
//                                       CR
//                                     </div>

//                                     <div>
//                                       IR
//                                     </div>

//                                     <div>
//                                       LOI
//                                     </div>

//                                     <div>
//                                       DOR
//                                     </div>

//                                   </div>


//                                   {/* =================================
//                                       TARGET GROUP ROWS
//                                   ================================= */}

//                                   {targetGroups.length > 0 ? (

//                                     targetGroups.map(
//                                       (group) => {

//                                         const groupCompletes =
//                                           Number(
//                                             group.completes
//                                           ) || 0;

//                                         const groupTarget =
//                                           Number(
//                                             group.targetCompletes
//                                           ) || 0;

//                                         const groupProgress =
//                                           groupTarget > 0
//                                             ? Math.min(
//                                                 (
//                                                   groupCompletes /
//                                                   groupTarget
//                                                 ) * 100,
//                                                 100
//                                               )
//                                             : 0;

//                                         return (

//                                           <div
//                                             key={
//                                               group._id
//                                             }
//                                             className="
//                                               grid
//                                               grid-cols-8
//                                               gap-4
//                                               items-center
//                                               py-5
//                                               border-b
//                                               last:border-b-0
//                                             "
//                                           >

//                                             {/* TARGET GROUP */}

//                                             <div>

//                                               <div className="
//                                                 font-semibold
//                                                 text-purple-700
//                                               ">
//                                                 {group.name ||
//                                                   "Target Group"}
//                                               </div>

//                                               <div className="
//                                                 text-sm
//                                                 text-slate-500
//                                                 mt-1
//                                               ">
//                                                 {
//                                                   group._id
//                                                     ?.slice(-6)
//                                                 }
//                                               </div>

//                                             </div>


//                                             {/* STATUS */}

//                                             <div>

//                                               <span className="
//                                                 inline-block
//                                                 px-3
//                                                 py-1
//                                                 border
//                                                 rounded-full
//                                                 text-xs
//                                               ">
//                                                 {group.status ||
//                                                   "DRAFT"}
//                                               </span>

//                                             </div>


//                                             {/* PROGRESS */}

//                                             <div>

//                                               <div className="
//                                                 font-medium
//                                               ">
//                                                 {
//                                                   groupCompletes
//                                                 }{" "}
//                                                 /{" "}
//                                                 {
//                                                   groupTarget
//                                                 }
//                                               </div>

//                                               <div className="
//                                                 text-xs
//                                                 text-gray-400
//                                                 mt-1
//                                               ">
//                                                 {
//                                                   Math.round(
//                                                     groupProgress
//                                                   )
//                                                 }%
//                                               </div>

//                                             </div>


//                                             {/* CPI */}

//                                             <div>

//                                               {group.cpi != null
//                                                 ? `$${group.cpi}`
//                                                 : "-"}

//                                             </div>


//                                             {/* CR */}

//                                             <div>

//                                               {group.cr != null
//                                                 ? `${group.cr}%`
//                                                 : "-"}

//                                             </div>


//                                             {/* IR */}

//                                             <div>

//                                               {group.incidence !=
//                                               null
//                                                 ? `${group.incidence}%`
//                                                 : "-"}

//                                             </div>


//                                             {/* LOI */}

//                                             <div>

//                                               {group.loi != null
//                                                 ? `${group.loi} min`
//                                                 : "-"}

//                                             </div>


//                                             {/* DOR */}

//                                             <div>

//                                               {group.dor != null
//                                                 ? group.dor
//                                                 : "-"}

//                                             </div>

//                                           </div>

//                                         );
//                                       }
//                                     )

//                                   ) : (

//                                     <div className="
//                                       py-8
//                                       text-center
//                                       text-gray-500
//                                     ">
//                                       No target groups found.
//                                     </div>

//                                   )}

//                                 </div>

//                               )}

//                             </div>

//                           );
//                         }
//                       )}

//                     </div>

//                   </div>

//                 )}

//               </div>
//             );
//           })}

//         </div>
//       )}

//     </div>
//   );
// }


// // =====================================================
// // STAT COMPONENT
// // =====================================================

// function Stat({
//   label,
//   value,
// }) {
//   return (
//     <div className="
//       border
//       rounded-lg
//       p-3
//       bg-slate-50
//     ">

//       <p className="
//         text-xs
//         uppercase
//         text-gray-500
//       ">
//         {label}
//       </p>

//       <p className="
//         text-lg
//         font-bold
//         mt-1
//       ">
//         {value}
//       </p>

//     </div>
//   );
// }