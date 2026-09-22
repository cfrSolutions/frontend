// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { useLocation } from "react-router-dom";
// import { CheckCircle, PauseCircle, Folder } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function BusinessDashboard() {
//    const [projects, setProjects] = useState([]);
//    const location = useLocation();

//    const fetchProjects = async () => {
//     try {
//       const res = await api.get("/projects");
//       setProjects(res.data); 
//     } catch (err) {
//       console.log(err);
//     }
//   };

// useEffect(() => {
//   fetchProjects();
// }, [location.pathname]);

// const path = location.pathname;

// let filter = "ALL";

// if (path.includes("/live")) filter = "LIVE";
// if (path.includes("/hold")) filter = "HOLD";
// if (path.includes("/closed")) filter = "CLOSED";
// if (path.includes("/drafts")) filter = "DRAFT";
// if(path.includes("/negotiation")) filter = "NEGOTIATION";
// if (path.includes("/accepted")) filter = "ACCEPTED";
// if (path.includes("/testing")) filter = "TESTING";
  

//   const filteredProjects =
//   filter === "ALL"
//     ? projects
//     : projects.filter(p => p.status === filter);

//   const total = projects.length;
//   const live = projects.filter(p => p.status === "LIVE").length;
//   const hold = projects.filter(p => p.status === "HOLD").length;
//   const closed = projects.filter(p => p.status === "CLOSED").length;
// //   const draftProjects = projects.filter(p => p.status === "DRAFT");
// // const liveProjects = projects.filter(p => p.status === "LIVE");
// // const holdProjects = projects.filter(p => p.status === "HOLD");
// // const closedProjects = projects.filter(p => p.status === "CLOSED");

//   return (
//     <div className="space-y-6">

//       <div>
//         <h2 className="text-gray-500 text-sm">Total Projects</h2>
//         <p className="text-4xl font-bold text-orange-500">{total}</p>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">
//         <div className="bg-white p-5 rounded-xl shadow flex justify-between">
//           <div>
//             <p className="text-sm text-gray-500">Live</p>
//             <h3 className="text-2xl font-bold">{live}</h3>
//           </div>
//           <CheckCircle className="text-green-500" />
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow flex justify-between">
//           <div>
//             <p className="text-sm text-gray-500">Hold</p>
//             <h3 className="text-2xl font-bold">{hold}</h3>
//           </div>
//           <PauseCircle className="text-yellow-500" />
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow flex justify-between">
//           <div>
//             <p className="text-sm text-gray-500">Closed</p>
//             <h3 className="text-2xl font-bold">{closed}</h3>
//           </div>
//           <Folder />
//         </div>
//       </div>
//  <h2 className="text-lg font-semibold mt-6">
//   {filter === "ALL" && "All Projects"}
//   {filter === "LIVE" && "Live Projects"}
//   {filter === "DRAFT" && "Draft Projects"}
//   {filter === "HOLD" && "Hold Projects"}
//   {filter === "CLOSED" && "Closed Projects"}
//   {filter === "NEGOTIATION" && "Negotiation Projects"}
// {filter === "ACCEPTED" && "Accepted Projects"}
// {filter === "TESTING" && "Testing Projects"}
// </h2>

// {filteredProjects.length === 0 ? (
//   <p className="text-gray-400">No projects found</p>
// ) : (
//   filteredProjects.map(p => (
//     <ProjectCard key={p._id} p={p} />
//   ))
// )}
//     </div>
//   );
// }

// {filteredProjects.length === 0 ? (
//   <p className="text-gray-400">No projects found</p>
// ) : (
//   filteredProjects.map((p) => (
//     <ProjectCards
//       key={p._id}
//       p={p}
//       filter={filter}
//     />
//   ))
// )
// }

// function ProjectCard({ p }) {
//   const navigate = useNavigate();

//   // Find the target group that is actually LIVE
//   const liveGroup = p.targetGroups?.find(
//     (group) => group.status === "LIVE"
//   );

//   const handleClick = () => {
//     if (liveGroup?._id) {
//       navigate(
//         `/business/dashboard/project/${p._id}/target-group/${liveGroup._id}/status`
//       );
//     } else {
//       console.error(
//         "No LIVE target group found for project:",
//         p._id
//       );
//     }
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="bg-white p-4 rounded-xl shadow mb-3 cursor-pointer hover:shadow-md transition"
//     >
//       <h3 className="font-semibold">
//         {liveGroup?.sector || p.sector || "-"}{" "}
//         -{" "}
//         {liveGroup?.market || p.market || "-"}
//       </h3>

//       <p className="text-sm text-gray-500">
//         Age:{" "}
//         {liveGroup?.ageFrom ?? p.ageFrom ?? "-"}{" "}
//         -{" "}
//         {liveGroup?.ageTo ?? p.ageTo ?? "-"}
//       </p>

//       <p className="text-sm mt-1">
//         Status:{" "}
//         <span className="font-semibold text-green-600">
//           LIVE
//         </span>
//       </p>
//     </div>
//   );
// }


// // function ProjectCard({ p }) {
// //   const navigate = useNavigate();

// //   return (
// //     <div
// //       onClick={() => navigate(`/business/dashboard/project/${p._id}/status`)}
// //       className="bg-white p-4 rounded-xl shadow mb-3 cursor-pointer hover:shadow-md transition"
// //     >
// //       <h3 className="font-semibold">
// //         {p.sector} - {p.market}
// //       </h3>

// //       <p className="text-sm text-gray-500">
// //         Age: {p.ageFrom} - {p.ageTo}
// //       </p>

// //       <p className="text-sm mt-1">
// //         Status:{" "}
// //         <span className={`font-semibold ${
// //           p.status === "LIVE" ? "text-green-600" :
// //           p.status === "DRAFT" ? "text-gray-500" :
// //           p.status === "HOLD" ? "text-yellow-500" :
// //           "text-red-500"
// //         }`}>
// //           {p.status}
// //         </span>
// //       </p>
// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   CheckCircle,
//   PauseCircle,
//   Folder,
// } from "lucide-react";

// export default function BusinessDashboard() {
//   const [projects, setProjects] = useState([]);
//   const location = useLocation();

//   const fetchProjects = async () => {
//     try {
//       const res = await api.get("/projects");
//       setProjects(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, [location.pathname]);

//   const path = location.pathname;

//   let filter = "ALL";

//   if (path.includes("/live")) filter = "LIVE";
//   if (path.includes("/hold")) filter = "HOLD";
//   if (path.includes("/closed")) filter = "CLOSED";
//   if (path.includes("/drafts")) filter = "DRAFT";
//   if (path.includes("/negotiation")) filter = "NEGOTIATION";
//   if (path.includes("/accepted")) filter = "ACCEPTED";
//   if (path.includes("/testing")) filter = "TESTING";

//   // =====================================================
//   // PROJECT COUNTS
//   // =====================================================

//   const total = projects.length;

//   const live = projects.filter(
//     (p) => p.status === "LIVE"
//   ).length;

//   const hold = projects.filter(
//     (p) => p.status === "HOLD"
//   ).length;

//   const closed = projects.filter(
//     (p) => p.status === "CLOSED"
//   ).length;

//   // =====================================================
//   // FILTER PROJECTS
//   // =====================================================

//   const filteredProjects =
//     filter === "ALL"
//       ? projects
//       : projects.filter((p) => p.status === filter);

//   // =====================================================
//   // PAGE TITLE
//   // =====================================================

//   const getPageTitle = () => {
//     switch (filter) {
//       case "LIVE":
//         return "Live Projects";

//       case "DRAFT":
//         return "Draft Projects";

//       case "HOLD":
//         return "Hold Projects";

//       case "CLOSED":
//         return "Closed Projects";

//       case "NEGOTIATION":
//         return "Negotiation Projects";

//       case "ACCEPTED":
//         return "Accepted Projects";

//       case "TESTING":
//         return "Testing Projects";

//       default:
//         return "All Projects";
//     }
//   };

//   return (
//     <div className="space-y-6">

//       {/* =====================================================
//           TOTAL PROJECTS
//       ===================================================== */}

//       <div>
//         <h2 className="text-gray-500 text-sm">
//           Total Projects
//         </h2>

//         <p className="text-4xl font-bold text-orange-500">
//           {total}
//         </p>
//       </div>

//       {/* =====================================================
//           SUMMARY CARDS
//       ===================================================== */}

//       <div className="grid md:grid-cols-3 gap-6">

//         {/* LIVE */}

//         <div className="bg-white p-5 rounded-xl shadow flex justify-between">
//           <div>
//             <p className="text-sm text-gray-500">
//               Live
//             </p>

//             <h3 className="text-2xl font-bold">
//               {live}
//             </h3>
//           </div>

//           <CheckCircle className="text-green-500" />
//         </div>

//         {/* HOLD */}

//         <div className="bg-white p-5 rounded-xl shadow flex justify-between">
//           <div>
//             <p className="text-sm text-gray-500">
//               Hold
//             </p>

//             <h3 className="text-2xl font-bold">
//               {hold}
//             </h3>
//           </div>

//           <PauseCircle className="text-yellow-500" />
//         </div>

//         {/* CLOSED */}

//         <div className="bg-white p-5 rounded-xl shadow flex justify-between">
//           <div>
//             <p className="text-sm text-gray-500">
//               Closed
//             </p>

//             <h3 className="text-2xl font-bold">
//               {closed}
//             </h3>
//           </div>

//           <Folder />
//         </div>

//       </div>

//       {/* =====================================================
//           PAGE TITLE
//       ===================================================== */}

//       <h2 className="text-lg font-semibold mt-6">
//         {getPageTitle()}
//       </h2>

//       {/* =====================================================
//           PROJECTS
//       ===================================================== */}

//       {filteredProjects.length === 0 ? (
//         <p className="text-gray-400">
//           No projects found
//         </p>
//       ) : (
//         filteredProjects.map((project) => (
//           <ProjectCards
//             key={project._id}
//             project={project}
//             filter={filter}
//           />
//         ))
//       )}

//     </div>
//   );
// }


// /* ============================================================
//    PROJECT CARDS
// ============================================================ */

// function ProjectCards({ project, filter }) {
//   const navigate = useNavigate();

//   const targetGroups = project.targetGroups || [];

//   // ==========================================================
//   // GET ALL TARGET GROUPS MATCHING THE CURRENT FILTER
//   // ==========================================================

//   let matchingGroups = targetGroups;

//   if (filter !== "ALL") {
//     matchingGroups = targetGroups.filter(
//       (group) => group.status === filter
//     );
//   }

//   // ==========================================================
//   // NO TARGET GROUP
//   // ==========================================================

//   if (matchingGroups.length === 0) {
//     return null;
//   }

//   return (
//     <div className="space-y-3">

//       {matchingGroups.map((group) => (

//         <div
//           key={group._id}
//           onClick={() => {
//             navigate(
//               `/business/dashboard/project/${project._id}/target-group/${group._id}/status`
//             );
//           }}
//           className="bg-white p-4 rounded-xl shadow mb-3 cursor-pointer hover:shadow-md transition"
//         >

//           {/* ==================================================
//               TOP
//           ================================================== */}

//           <div className="flex items-start justify-between">

//             <div>

//               {/* TARGET GROUP NAME */}

//               <h3 className="font-semibold text-lg">
//                 {group.name || "Target Group"}
//               </h3>

//               {/* SECTOR + MARKET */}

//               <p className="text-sm text-gray-700 mt-1">
//                 {group.sector ||
//                   project.sector ||
//                   "-"}{" "}
//                 -{" "}
//                 {group.market ||
//                   project.market ||
//                   "-"}
//               </p>

//               {/* AGE */}

//               <p className="text-sm text-gray-500">
//                 Age:{" "}
//                 {group.ageFrom ??
//                   project.ageFrom ??
//                   "-"}{" "}
//                 -{" "}
//                 {group.ageTo ??
//                   project.ageTo ??
//                   "-"}
//               </p>

//             </div>

//             {/* =================================================
//                 STATUS
//             ================================================= */}

//             <span
//               className={`font-semibold text-sm ${
//                 group.status === "LIVE"
//                   ? "text-green-600"
//                   : group.status === "HOLD"
//                   ? "text-yellow-500"
//                   : group.status === "DRAFT"
//                   ? "text-gray-500"
//                   : "text-red-500"
//               }`}
//             >
//               {group.status}
//             </span>

//           </div>

//           {/* ==================================================
//               BOTTOM INFO
//           ================================================== */}

//           <div className="flex items-center gap-6 mt-3 text-sm">

//             <div>
//               <span className="text-gray-500">
//                 Target Completes:
//               </span>{" "}
//               <span className="font-semibold">
//                 {group.targetCompletes ?? 0}
//               </span>
//             </div>

//             <div>
//               <span className="text-gray-500">
//                 Completes:
//               </span>{" "}
//               <span className="font-semibold">
//                 {group.completes ?? 0}
//               </span>
//             </div>

//           </div>

//         </div>

//       ))}

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  PauseCircle,
  Folder,
} from "lucide-react";

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
  if (path.includes("/negotiation")) filter = "NEGOTIATION";
  if (path.includes("/accepted")) filter = "ACCEPTED";
  if (path.includes("/testing")) filter = "TESTING";

  // =====================================================
  // TARGET GROUP HELPERS
  // =====================================================

  const getGroupsByStatus = (status) => {
    return projects.flatMap((project) =>
      (project.targetGroups || []).filter(
        (group) => group.status === status
      )
    );
  };

  // =====================================================
  // PROJECT COUNTS
  // =====================================================

  const total = projects.length;

  // Count PROJECTS having at least one target group
  // in the requested status.
  // const live = projects.filter((project) =>
  //   (project.targetGroups || []).some(
  //     (group) => group.status === "LIVE"
  //   )
  // ).length;

  const live = projects.filter(
  (project) =>
    project.status !== "CLOSED" &&
    (project.targetGroups || []).some(
      (group) => group.status === "LIVE"
    )
).length;

  const hold = projects.filter((project) =>
    (project.targetGroups || []).some(
      (group) => group.status === "HOLD"
    )
  ).length;

  const closed = projects.filter(
  (project) => project.status === "CLOSED"
).length;

  // =====================================================
  // FILTER PROJECTS
  // =====================================================

  let filteredProjects = projects;

  if (
  filter === "LIVE" ||
  filter === "HOLD" ||
  filter === "DRAFT" ||
  filter === "TESTING"
) {
  filteredProjects = projects.filter((project) =>
    (project.targetGroups || []).some(
      (group) => group.status === filter
    )
  );
}

// CLOSED is PROJECT level
if (filter === "CLOSED") {
  filteredProjects = projects.filter(
    (project) => project.status === "CLOSED"
  );
}



  if (
    filter === "NEGOTIATION" ||
    filter === "ACCEPTED"
  ) {
    filteredProjects = projects.filter(
      (project) => project.status === filter
    );
  }

  // =====================================================
  // PAGE TITLE
  // =====================================================

  const getPageTitle = () => {
    switch (filter) {
      case "LIVE":
        return "Live Projects";

      case "DRAFT":
        return "Draft Projects";

      case "HOLD":
        return "Hold Projects";

      case "CLOSED":
        return "Closed Projects";

      case "NEGOTIATION":
        return "Negotiation Projects";

      case "ACCEPTED":
        return "Accepted Projects";

      case "TESTING":
        return "Testing Projects";

      default:
        return "All Projects";
    }
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          TOTAL PROJECTS
      ===================================================== */}

      <div>
        <h2 className="text-gray-500 text-sm">
          Total Projects
        </h2>

        <p className="text-4xl font-bold text-orange-500">
          {total}
        </p>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* LIVE */}

        <div className="bg-white p-5 rounded-xl shadow flex justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Live
            </p>

            <h3 className="text-2xl font-bold">
              {live}
            </h3>
          </div>

          <CheckCircle className="text-green-500" />
        </div>

        {/* HOLD */}

        <div className="bg-white p-5 rounded-xl shadow flex justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Hold
            </p>

            <h3 className="text-2xl font-bold">
              {hold}
            </h3>
          </div>

          <PauseCircle className="text-yellow-500" />
        </div>

        {/* CLOSED */}

        <div className="bg-white p-5 rounded-xl shadow flex justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Closed
            </p>

            <h3 className="text-2xl font-bold">
              {closed}
            </h3>
          </div>

          <Folder />
        </div>

      </div>

      {/* =====================================================
          PAGE TITLE
      ===================================================== */}

      <h2 className="text-lg font-semibold mt-6">
        {getPageTitle()}
      </h2>

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      {filteredProjects.length === 0 ? (
        <p className="text-gray-400">
          No projects found
        </p>
      ) : (
        filteredProjects.map((project) => (
          <ProjectCards
            key={project._id}
            project={project}
            filter={filter}
          />
        ))
      )}

    </div>
  );
}


/* ============================================================
   PROJECT CARDS
============================================================ */

function ProjectCards({ project, filter }) {
  const navigate = useNavigate();

  const targetGroups = project.targetGroups || [];

  // ==========================================================
  // GET ALL TARGET GROUPS MATCHING CURRENT FILTER
  // ==========================================================

  let matchingGroups = targetGroups;

  if (
    filter === "LIVE" ||
    filter === "HOLD" ||
    filter === "DRAFT" ||
    filter === "TESTING"
  ) {
    matchingGroups = targetGroups.filter(
      (group) => group.status === filter
    );
  }

  if (filter === "CLOSED") {
  matchingGroups = targetGroups;
}

  /*
    For project-level statuses such as NEGOTIATION
    and ACCEPTED, show all target groups.
  */

  if (
    filter === "NEGOTIATION" ||
    filter === "ACCEPTED"
  ) {
    matchingGroups = targetGroups;
  }

  // ==========================================================
  // NO TARGET GROUP
  // ==========================================================

  if (matchingGroups.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">

      {matchingGroups.map((group) => (

        <div
          key={group._id}
          onClick={() => {
            navigate(
              `/business/dashboard/project/${project._id}/target-group/${group._id}/status`
            );
          }}
          className="bg-white p-4 rounded-xl shadow mb-3 cursor-pointer hover:shadow-md transition"
        >

          {/* ==================================================
              TOP
          ================================================== */}

          <div className="flex items-start justify-between">

            <div>

              <h3 className="font-semibold text-lg">
                {group.name || "Target Group"}
              </h3>

              <p className="text-sm text-gray-700 mt-1">
                {group.sector ||
                  project.sector ||
                  "-"}{" "}
                -{" "}
                {group.market ||
                  project.market ||
                  "-"}
              </p>

              <p className="text-sm text-gray-500">
                Age:{" "}
                {group.ageFrom ??
                  project.ageFrom ??
                  "-"}{" "}
                -{" "}
                {group.ageTo ??
                  project.ageTo ??
                  "-"}
              </p>

            </div>

            {/* =================================================
                STATUS
            ================================================= */}

            <span
              className={`font-semibold text-sm ${
                group.status === "LIVE"
                  ? "text-green-600"
                  : group.status === "HOLD"
                  ? "text-yellow-500"
                  : group.status === "DRAFT"
                  ? "text-gray-500"
                  : group.status === "TESTING"
                  ? "text-yellow-600"
                  : group.status === "CLOSED"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {group.status}
            </span>

          </div>

          {/* ==================================================
              BOTTOM INFO
          ================================================== */}

          <div className="flex items-center gap-6 mt-3 text-sm">

            <div>
              <span className="text-gray-500">
                Target Completes:
              </span>{" "}
              <span className="font-semibold">
                {group.targetCompletes ?? 0}
              </span>
            </div>

            <div>
              <span className="text-gray-500">
                Completes:
              </span>{" "}
              <span className="font-semibold">
                {group.completes ?? 0}
              </span>
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}