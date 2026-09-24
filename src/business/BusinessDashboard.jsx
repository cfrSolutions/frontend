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
  FileText, 
  X,
} from "lucide-react";
import InvoiceSection from "./InvoiceSection";

export default function BusinessDashboard() {
  const [projects, setProjects] = useState([]);
  const [outstandingInvoices, setOutstandingInvoices] = useState([]);
  const [paidInvoices, setPaidInvoices] = useState([]);
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] =
  useState(null);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchInvoices = async () => {
  try {
    const res = await api.get(
      "/invoices/business"
    );

    setOutstandingInvoices(
      res.data.outstanding || []
    );

    setPaidInvoices(
      res.data.paid || []
    );
  } catch (err) {
    console.error(
      "Failed to fetch invoices:",
      err
    );

    setOutstandingInvoices([]);
    setPaidInvoices([]);
  }
};

  useEffect(() => {
    fetchProjects();
    fetchInvoices();
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
      (group) => group.status === "TESTING"
    )
  ).length;

//   const closed = projects.filter(
//   (project) => project.status === "CLOSED"
// ).length;

const closed = new Set(
  outstandingInvoices
    .map((invoice) => invoice.project?._id)
    .filter(Boolean)
).size;

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
// if (filter === "CLOSED") {
//   filteredProjects = projects.filter(
//     (project) => project.status === "CLOSED"
//   );
// }

if (filter === "CLOSED") {
  const outstandingProjectIds = new Set(
    outstandingInvoices
      .map((invoice) => invoice.project?._id)
      .filter(Boolean)
  );

  filteredProjects = projects.filter(
    (project) =>
      project.status === "CLOSED" &&
      outstandingProjectIds.has(project._id)
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

//   const handleViewInvoice = async (projectId) => {
//   try {
//     setInvoiceLoading(true);

//     const response = await api.get(
//       `/invoices/project/${projectId}`
//     );

//     setSelectedInvoice(response.data.invoice);
//   } catch (error) {
//     console.error("Failed to fetch invoice:", error);

//     alert(
//       error.response?.data?.message ||
//         "Invoice could not be loaded"
//     );
//   } finally {
//     setInvoiceLoading(false);
//   }
// };
const handleViewInvoice = (
  project,
  invoiceId
) => {
  setSelectedProject(project);
  setSelectedInvoiceId(invoiceId);
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

     {filter === "CLOSED" ? (
  outstandingInvoices.length === 0 ? (
    <p className="text-gray-400">
      No outstanding invoices found
    </p>
  ) : (
    outstandingInvoices.map((invoice) => {
      const project =
        projects.find(
          (item) =>
            item._id === invoice.project?._id
        ) || invoice.project;

      if (!project) {
        return null;
      }

      return (
        <ProjectCards
          key={invoice._id}
          project={project}
          invoice={invoice}
          filter={filter}
          onViewInvoice={
            handleViewInvoice
          }
        />
      );
    })
  )
) : filteredProjects.length === 0 ? (
  <p className="text-gray-400">
    No projects found
  </p>
) : (
  filteredProjects.map((project) => (
    <ProjectCards
      key={project._id}
      project={project}
      filter={filter}
      onViewInvoice={handleViewInvoice}
    />
  ))
)}

      {filter === "CLOSED" && (
  <div className="mt-10">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Payment Done
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Successfully paid invoices
        </p>
      </div>

      <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
        {paidInvoices.length}
      </span>
    </div>

    {paidInvoices.length === 0 ? (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-400">
          No paid invoices found
        </p>
      </div>
    ) : (
      <div className="space-y-3">
        {paidInvoices.map((invoice) => {
          const invoiceProject =
            projects.find(
              (project) =>
                project._id === invoice.project?._id
            ) || invoice.project;

          return (
            <div
              key={invoice._id}
              className="
                rounded-xl
                border
                border-green-100
                bg-white
                p-5
                shadow-sm
              "
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle
                      size={18}
                      className="text-green-500"
                    />

                    <h3 className="font-semibold text-slate-900">
                      {invoiceProject?.name ||
                        "Project"}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Invoice:{" "}
                    <span className="font-medium text-slate-700">
                      {invoice.invoiceNumber}
                    </span>
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Target Groups:{" "}
                    <span className="font-medium text-slate-700">
                      {invoice.items?.length || 0}
                    </span>
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {(invoice.items || []).map(
                      (item) => (
                        <span
                          key={item.targetGroupId}
                          className="
                            rounded-full
                            bg-slate-100
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            text-slate-600
                          "
                        >
                          {item.targetGroupName}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className="
                      inline-flex
                      rounded-full
                      bg-green-50
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-green-600
                    "
                  >
                    PAID
                  </span>

                  <p className="mt-3 text-xl font-bold text-slate-900">
                    $
                    {Number(
                      invoice.total || 0
                    ).toFixed(2)}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {invoice.issuedAt
                      ? new Date(
                          invoice.issuedAt
                        ).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
)}
    
{selectedProject && (
  <div
    className="
      fixed
      inset-0
      z-50
      overflow-y-auto
      bg-black/50
      p-4
      sm:p-8
    "
    onClick={() => {
  setSelectedProject(null);
  setSelectedInvoiceId(null);
}}
  >
    <div
      className="
        mx-auto
        w-full
        max-w-[900px]
      "
      onClick={(e) => e.stopPropagation()}
    >

      {/* CLOSE BUTTON */}

      <div className="mb-4 flex justify-end">
        <button
          onClick={() =>{
  setSelectedProject(null);
  setSelectedInvoiceId(null);
}}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
            text-slate-700
            shadow-lg
            transition
            hover:bg-slate-100
          "
        >
          <X size={20} />
        </button>
      </div>

      {/* NEW INVOICE */}

      <InvoiceSection
        project={selectedProject}
        invoiceId={selectedInvoiceId}
      />

    </div>
  </div>
)}
    </div>
  );
}


function ProjectCards({
  project,
  invoice,
  filter,
  onViewInvoice,
}) {
  const navigate = useNavigate();

  const targetGroups = project.targetGroups || [];

  // ==========================================================
  // CLOSED PROJECT
  // PROJECT-LEVEL CARD
  // ==========================================================

  if (filter === "CLOSED") {
    return (
      <div className="space-y-3">

        <div
          className="bg-white p-4 rounded-xl shadow mb-3"
        >
          {/* ==================================================
              TOP
          ================================================== */}

          <div className="flex items-start justify-between">

            <div>

              <h3 className="font-semibold text-lg">
                {project.name || "Project"}
              </h3>

              <p className="text-sm text-gray-700 mt-1">
                {project.sector || "-"}{" "}
                -{" "}
                {project.market || "-"}
              </p>

              <p className="text-sm text-gray-500">
                Age:{" "}
                {project.ageFrom ?? "-"}{" "}
                -{" "}
                {project.ageTo ?? "-"}
              </p>

            </div>

            {/* PROJECT STATUS */}

            <span className="font-semibold text-sm text-red-500">
              CLOSED
            </span>

          </div>

          {/* ==================================================
              PROJECT INFO
          ================================================== */}

          <div className="flex items-center gap-6 mt-3 text-sm">

            <div>
              <span className="text-gray-500">
                Target Completes:
              </span>{" "}

              <span className="font-semibold">
                {project.targetCompletes ?? 0}
              </span>
            </div>

            <div>
              <span className="text-gray-500">
                Completes:
              </span>{" "}

              <span className="font-semibold">
                {project.completes ?? 0}
              </span>
            </div>

          </div>

          {/* ==================================================
              TARGET GROUP COUNT
          ================================================== */}

          <div className="mt-2 text-sm text-gray-500">
            Target Groups:{" "}
            <span className="font-semibold text-gray-700">
              {targetGroups.length}
            </span>
          </div>

          {/* ==================================================
              INVOICE
          ================================================== */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewInvoice(project, invoice._id);
            }}
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-100"
          >
            <FileText size={16} />
            View Invoice
          </button>

        </div>

      </div>
    );
  }

  // ==========================================================
  // OTHER PROJECT / TARGET GROUP PAGES
  // ==========================================================

    // ==========================================================
  // OTHER PROJECT PAGES
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

  /*
    Project-level statuses:
    show all target groups
  */
  if (
    filter === "NEGOTIATION" ||
    filter === "ACCEPTED"
  ) {
    matchingGroups = targetGroups;
  }

  // ==========================================================
  // NO MATCHING TARGET GROUP
  // ==========================================================

  if (matchingGroups.length === 0) {
    return null;
  }

  // ==========================================================
  // PROJECT CARD
  // ==========================================================

  return (
    <div className="mb-6">

      <div
        className="
          bg-white
          rounded-2xl
          border
          border-slate-200
          shadow-sm
          overflow-hidden
        "
      >

        {/* ==================================================
            PROJECT HEADER
        ================================================== */}

        <div
          className="
            px-6
            py-5
            border-b
            border-slate-100
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div>

            <div className="flex items-center gap-3">

              <h3 className="text-xl font-bold text-slate-900">
                {project.name || "Project"}
              </h3>

              {filter === "LIVE" && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-green-50
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-600
                  "
                >
                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-green-500
                    "
                  />

                  PROJECT HAS LIVE TARGET
                </span>
              )}

            </div>

            <p className="mt-1 text-sm text-slate-500">
              {project.sector || "-"}
              {" · "}
              {project.market || "-"}
            </p>

          </div>

          {/* PROJECT STATUS */}

          <div className="text-right">

            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Project
            </p>

            <p
              className={`mt-1 text-sm font-bold ${
                filter === "LIVE"
                  ? "text-green-600"
                  : filter === "TESTING"
                  ? "text-yellow-600"
                  : filter === "DRAFT"
                  ? "text-slate-500"
                  : "text-slate-600"
              }`}
            >
              {filter}
            </p>

          </div>

        </div>


        {/* ==================================================
            PROJECT INFO
        ================================================== */}

        <div
          className="
            px-6
            py-4
            bg-slate-50/70
            border-b
            border-slate-100
            flex
            flex-wrap
            items-center
            gap-x-8
            gap-y-2
            text-sm
          "
        >

          <div>
            <span className="text-slate-400">
              Target Groups:
            </span>{" "}
            <span className="font-semibold text-slate-700">
              {matchingGroups.length}
            </span>
          </div>

          {filter === "LIVE" && (
            <div>
              <span className="text-slate-400">
                Live Targets:
              </span>{" "}
              <span className="font-semibold text-green-600">
                {matchingGroups.length}
              </span>
            </div>
          )}

          <div>
            <span className="text-slate-400">
              Project Target:
            </span>{" "}
            <span className="font-semibold text-slate-700">
              {project.targetCompletes ?? 0}
            </span>
          </div>

        </div>


        {/* ==================================================
            TARGET GROUPS
        ================================================== */}

        <div className="p-5">

          <div className="flex items-center justify-between mb-4">

            <h4 className="text-sm font-semibold text-slate-700">
              Target Groups
            </h4>

            <span className="text-xs text-slate-400">
              {matchingGroups.length} target group
              {matchingGroups.length !== 1 ? "s" : ""}
            </span>

          </div>


          <div className="space-y-3">

            {matchingGroups.map((group) => (

              <div
                key={group._id}
                onClick={() => {
                  navigate(
                    `/business/dashboard/project/${project._id}/target-group/${group._id}/status`
                  );
                }}
                className="
                  group
                  cursor-pointer
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  transition
                  hover:border-orange-200
                  hover:shadow-sm
                "
              >

                {/* TARGET GROUP HEADER */}

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-3">

                      <h5 className="font-semibold text-slate-900">
                        {group.name || "Target Group"}
                      </h5>

                      <span
                        className={`
                          rounded-full
                          px-2.5
                          py-1
                          text-[11px]
                          font-semibold
                          ${
                            group.status === "LIVE"
                              ? "bg-green-50 text-green-600"
                              : group.status === "TESTING"
                              ? "bg-yellow-50 text-yellow-600"
                              : group.status === "DRAFT"
                              ? "bg-slate-100 text-slate-500"
                              : "bg-slate-100 text-slate-500"
                          }
                        `}
                      >
                        {group.status}
                      </span>

                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {group.sector ||
                        project.sector ||
                        "-"}
                      {" · "}
                      {group.market ||
                        project.market ||
                        "-"}
                    </p>

                  </div>


                  {/* AGE */}

                  <div className="text-right">

                    <p className="text-xs text-slate-400">
                      Age
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {group.ageFrom ??
                        project.ageFrom ??
                        "-"}{" "}
                      -{" "}
                      {group.ageTo ??
                        project.ageTo ??
                        "-"}
                    </p>

                  </div>

                </div>


                {/* TARGET GROUP STATS */}

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">

                  <div className="rounded-lg bg-slate-50 px-3 py-2">

                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Target
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-800">
                      {group.targetCompletes ?? 0}
                    </p>

                  </div>


                  <div className="rounded-lg bg-slate-50 px-3 py-2">

                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Completes
                    </p>

                    <p
                      className={`
                        mt-1
                        text-lg
                        font-bold
                        ${
                          group.status === "LIVE"
                            ? "text-green-600"
                            : "text-slate-800"
                        }
                      `}
                    >
                      {group.completes ?? 0}
                    </p>

                  </div>


                  <div className="rounded-lg bg-slate-50 px-3 py-2">

                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Disqualified
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-800">
                      {group.disqualified ?? 0}
                    </p>

                  </div>


                  <div className="rounded-lg bg-slate-50 px-3 py-2">

                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Responses
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-800">
                      {group.totalResponses ?? 0}
                    </p>

                  </div>

                </div>


                {/* CLICK HINT */}

                <div
                  className="
                    mt-3
                    text-right
                    text-xs
                    text-slate-400
                    group-hover:text-orange-500
                  "
                >
                  View target group →
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}


// function ProjectCards({
//   project,
//   filter,
//   onViewInvoice,
// }) {
//   const navigate = useNavigate();

//   const targetGroups = project.targetGroups || [];

//   // ==========================================================
//   // CLOSED PROJECT
//   // PROJECT-LEVEL CARD
//   // ==========================================================

//   if (filter === "CLOSED") {
//     return (
//       <div className="space-y-3">

//         <div
//           className="bg-white p-4 rounded-xl shadow mb-3"
//         >
//           {/* ==================================================
//               TOP
//           ================================================== */}

//           <div className="flex items-start justify-between">

//             <div>

//               <h3 className="font-semibold text-lg">
//                 {project.name || "Project"}
//               </h3>

//               <p className="text-sm text-gray-700 mt-1">
//                 {project.sector || "-"}{" "}
//                 -{" "}
//                 {project.market || "-"}
//               </p>

//               <p className="text-sm text-gray-500">
//                 Age:{" "}
//                 {project.ageFrom ?? "-"}{" "}
//                 -{" "}
//                 {project.ageTo ?? "-"}
//               </p>

//             </div>

//             {/* PROJECT STATUS */}

//             <span className="font-semibold text-sm text-red-500">
//               CLOSED
//             </span>

//           </div>

//           {/* ==================================================
//               PROJECT INFO
//           ================================================== */}

//           <div className="flex items-center gap-6 mt-3 text-sm">

//             <div>
//               <span className="text-gray-500">
//                 Target Completes:
//               </span>{" "}

//               <span className="font-semibold">
//                 {project.targetCompletes ?? 0}
//               </span>
//             </div>

//             <div>
//               <span className="text-gray-500">
//                 Completes:
//               </span>{" "}

//               <span className="font-semibold">
//                 {project.completes ?? 0}
//               </span>
//             </div>

//           </div>

//           {/* ==================================================
//               TARGET GROUP COUNT
//           ================================================== */}

//           <div className="mt-2 text-sm text-gray-500">
//             Target Groups:{" "}
//             <span className="font-semibold text-gray-700">
//               {targetGroups.length}
//             </span>
//           </div>

//           {/* ==================================================
//               INVOICE
//           ================================================== */}

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onViewInvoice(project._id);
//             }}
//             className="mt-3 inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-100"
//           >
//             <FileText size={16} />
//             View Invoice
//           </button>

//         </div>

//       </div>
//     );
//   }

//   // ==========================================================
//   // OTHER PROJECT / TARGET GROUP PAGES
//   // ==========================================================

//   let matchingGroups = targetGroups;

//   if (
//     filter === "LIVE" ||
//     filter === "HOLD" ||
//     filter === "DRAFT" ||
//     filter === "TESTING"
//   ) {
//     matchingGroups = targetGroups.filter(
//       (group) => group.status === filter
//     );
//   }

//   /*
//     For project-level statuses such as NEGOTIATION
//     and ACCEPTED, show all target groups.
//   */

//   if (
//     filter === "NEGOTIATION" ||
//     filter === "ACCEPTED"
//   ) {
//     matchingGroups = targetGroups;
//   }

//   // ==========================================================
//   // NO TARGET GROUP
//   // ==========================================================

//   if (matchingGroups.length === 0) {
//     return null;
//   }

//   // ==========================================================
//   // TARGET GROUP CARDS
//   // ==========================================================

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

//           {/* TOP */}

//           <div className="flex items-start justify-between">

//             <div>

//               <h3 className="font-semibold text-lg">
//                 {group.name || "Target Group"}
//               </h3>

//               <p className="text-sm text-gray-700 mt-1">
//                 {group.sector ||
//                   project.sector ||
//                   "-"}{" "}
//                 -{" "}
//                 {group.market ||
//                   project.market ||
//                   "-"}
//               </p>

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

//             {/* STATUS */}

//             <span
//               className={`font-semibold text-sm ${
//                 group.status === "LIVE"
//                   ? "text-green-600"
//                   : group.status === "HOLD"
//                   ? "text-yellow-500"
//                   : group.status === "DRAFT"
//                   ? "text-gray-500"
//                   : group.status === "TESTING"
//                   ? "text-yellow-600"
//                   : "text-gray-500"
//               }`}
//             >
//               {group.status}
//             </span>

//           </div>

//           {/* BOTTOM INFO */}

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