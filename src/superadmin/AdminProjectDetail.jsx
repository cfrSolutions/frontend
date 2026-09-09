// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";

// export default function AdminProjectDetail() {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     fetchProject();
//   }, []);

//   const fetchProject = async () => {
//     const res = await api.get(`/admin/project/${id}`);
//     setProject(res.data);
    
//   };
 
//   if (!project) return <p>Loading...</p>;

//   const steps = [
//     "Project Created",
//     "Cost Accepted",
//     "Testing Setup",
//     "Live",
//     "Hold",
//     "Completed",
//   ];

//   const getStep = () => {
//     switch (project.status) {
//       case "DRAFT":
//         return 0;
//       case "LIVE":
//         return 1; // 👉 COST ACCEPTED PHASE
//       case "HOLD":
//         return 4;
//       case "CLOSED":
//         return 5;
//       default:
//         return 0;
//     }
//   };

//   const activeStep = getStep();

//   const base = import.meta.env.VITE_API_URL;

//   return (
//     <div className="p-8">

//       <h1 className="text-2xl font-bold mb-2">
//         Project Detail
//       </h1>

//       {/* TIMELINE */}
//       <div className="flex justify-between mb-10">
//         {steps.map((step, i) => (
//           <div key={i} className="flex-1 text-center">
//             <div
//               className={`w-4 h-4 mx-auto rounded-full mb-2 ${
//                 i <= activeStep ? "bg-blue-600" : "bg-gray-300"
//               }`}
//             />
//             <p className="text-xs">{step}</p>
//           </div>
//         ))}
//       </div>

//       {/* SUMMARY */}
//       <div className="border rounded-2xl p-6 w-[350px] mb-6">
//         <h3 className="font-semibold mb-4">Summary</h3>

//         <div className="text-sm space-y-1">
//           <p>Sector – {project.sector}</p>
//           <p>Market – {project.market}</p>
//           <p>Age – {project.ageFrom} to {project.ageTo}</p>
//           <p>Completes – {project.completes}</p>
//         </div>
//       </div>

//       {/* 🔥 REDIRECTS (ONLY AFTER ACCEPT) */}
//       {project.status === "LIVE" && project.redirects && (
//         <div className="space-y-2">

//           <h3 className="font-semibold mb-2">Redirect Links</h3>

//           <LinkBox
//             label="Complete"
//             url={`${base}/redirect/c?tk=${project.redirects.complete?.token}`}
//           />

//           <LinkBox
//             label="Disqualified"
//             url={`${base}/redirect/dq?tk=${project.redirects.disqualified?.token}`}
//           />

//           <LinkBox
//             label="Quota Full"
//             url={`${base}/redirect/qf?tk=${project.redirects.quotaFull?.token}`}
//           />

//         </div>
//       )}

//       {
//         project.surveyLinks && (
//           <div className="mt-6">
//             <p>Test Link: {project.surveyLinks.test}</p>
//             <p>Live Link: {project.surveyLinks.live}</p>
//           </div>
//         )
//       }
//      {project.clientKeysFile && (
//         <a
//           href={project.clientKeysFile}  
//           target="_blank"
//           rel="noreferrer"
//           className="text-blue-600 underline mt-4 block"
//         >
//           Download Client Keys
//         </a>
//       )}

//       <LinkBox
//   label="Start Link (Give to Supplier)"
//   url={`${base}/redirect/start?tk=${project.redirects.complete?.token}`}
// />
//     </div>
//   );
// }

// function LinkBox({ label, url }) {
//   return (
//     <div className="flex justify-between border p-2 rounded">
//       <span>{label}</span>
//       <input value={url} readOnly className="text-xs w-[250px]" />
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";

// export default function AdminProjectDetail() {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);

//   // useEffect(() => {
//   //   fetchProject();
//   // }, [id]);
//   useEffect(() => {
//   fetchProject();

//   const interval = setInterval(fetchProject, 5000);
//   return () => clearInterval(interval);
// }, [id]);

// const moveToTesting = async () => {
//   await api.put(`/admin/project/${id}/move-testing`);
//   fetchProject();
// };

//   const fetchProject = async () => {
//     const res = await api.get(`/admin/project/${id}`);
//     setProject(res.data);
    
//   };
 
//   if (!project) return <p>Loading...</p>;

//   const steps = [
//     "Project Created",
//     "Cost Accepted",
//     "Testing Setup",
//     "Live",
//     "Hold",
//     "Completed",
//   ];

//   // const getStep = () => {
//   //   switch (project.status) {
//   //     case "DRAFT":
//   //       return 0;
//   //     case "LIVE":
//   //       return 1; // 
//   //     case "HOLD":
//   //       return 4;
//   //     case "CLOSED":
//   //       return 5;
//   //     default:
//   //       return 0;
//   //   }
//   // };

//   const getStep = () => {
//     switch (project.status) {
//       case "DRAFT":
//         return 0;
//       case "TESTING":
//         return 2;
//       case "LIVE":
//         return 3;
//       case "HOLD":
//         return 4;
//       case "COMPLETED":
//         return 5;
//       default:
//         return 0;
//     }
//   };

// //  const goLive = async () => {
// //   try {
// //     await api.put(`/admin/project/${id}/go-live`);
// //     fetchProject(); 
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };
// const goLive = async () => {
//   try {
//     await api.put(`/admin/project/${id}/go-live`);

//     await fetchProject(); 

//   } catch (err) {
//     console.error(err);
//   }
// };
//   const activeStep = getStep();

//   const base = import.meta.env.VITE_API_URL;

//   return (
//     <div className="p-8">

//       {/* <h1 className="text-2xl font-bold mb-2">
//         Project Detail
//       </h1>
// {project.status === "LIVE" && (
//   <button onClick={moveToTesting}>
//     Move to Testing 🚀
//   </button>
// )}
      
//       <div className="flex justify-between mb-10">
//         {steps.map((step, i) => (
//           <div key={i} className="flex-1 text-center">
//             <div
//               className={`w-4 h-4 mx-auto rounded-full mb-2 ${
//                 i <= activeStep ? "bg-blue-600" : "bg-gray-300"
//               }`}
//             />
//             <p className="text-xs">{step}</p>
//           </div>
//         ))}
//       </div> */}


// <div className="flex items-center justify-between mb-6">
//   <div>
//     <h1 className="text-2xl font-bold flex items-center gap-3">
//       Project Detail
//       <span className={`bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full ${
//         project.status === "LIVE"
//       ? "bg-green-100 text-green-700"
//       : project.status === "TESTING"
//       ? "bg-yellow-100 text-yellow-700"
//       : project.status === "HOLD"
//       ? "bg-gray-200 text-gray-700"
//       : project.status === "COMPLETED"
//       ? "bg-blue-100 text-blue-700"
//       : "bg-gray-100 text-gray-600"
//       }`}>
//         ● {project.status.toLowerCase()}
//       </span>
//     </h1>
//     <p className="text-gray-500 text-sm mt-1">
//       {project.sector} · {project.market} · Created{" "}
//       {new Date(project.createdAt).toLocaleDateString()}
//     </p>
//   </div>

//   <div className="flex gap-3">
//     <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
//       Actions
//     </button>

//     {project.status === "LIVE" && (
//       <button
//         onClick={moveToTesting}
//         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//       >
//         Move to Testing ↗
//       </button>
//     )}

//     {project.status === "TESTING" && (
//   <div className="mb-6">
//     <button
//       onClick={goLive}
//       className="bg-green-600 text-white px-4 py-2 rounded"
//     >
//       Move to Live 🚀
//     </button>
//   </div>
// )}
//   </div>
// </div>
// <div className="border border-gray-200 rounded-xl p-6 bg-white">
//   <div className="flex justify-between items-center mb-4">
//     <h3 className="font-semibold text-lg">Project Lifecycle</h3>
//     <span className="text-sm text-gray-500">
//       Step {activeStep + 1} of {steps.length}
//     </span>
//   </div>

//   <div className="flex items-center justify-between">
//     {steps.map((step, i) => (
//       <div key={i} className="flex-1 flex items-center">
        
//         {/* STEP */}
//         <div className="flex flex-col items-center flex-1">
//           <div
//             className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold
//               ${
//                 i < activeStep
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : i === activeStep
//                   ? "border-blue-600 text-blue-600"
//                   : "border-gray-300 text-gray-400"
//               }`}
//           >
//             {i < activeStep ? "✓" : i + 1}
//           </div>

//           <p className="text-xs mt-2 text-center">{step}</p>
//         </div>

//         {/* LINE */}
//         {i !== steps.length - 1 && (
//           <div
//             className={`h-[2px] flex-1 mx-2 ${
//               i < activeStep ? "bg-blue-600" : "bg-gray-300"
//             }`}
//           />
//         )}
//       </div>
//     ))}
//   </div>
// </div>
//       {/* SUMMARY */}
//       <div className="border rounded-2xl p-6 w-[350px] mb-6">
//         <h3 className="font-semibold mb-4">Summary</h3>

//         <div className="text-sm space-y-1">
//           <p>Sector – {project.sector}</p>
//           <p>Market – {project.market}</p>
//           <p>Age – {project.ageFrom} to {project.ageTo}</p>
//           <p>Completes – {project.completes}</p>
//         </div>
//       </div>

     

//       {/* 🔥 REDIRECTS (ONLY AFTER ACCEPT) */}
//       {project.status === "TESTING" && project.redirects && (
//         <div className="space-y-2">

//           <h3 className="font-semibold mb-2">Redirect Links</h3>

//           <LinkBox
//             label="Complete"
//             url={`${base}/redirect/c?tk=${project.redirects.complete?.token}`}
//           />

//           <LinkBox
//             label="Disqualified"
//             url={`${base}/redirect/dq?tk=${project.redirects.disqualified?.token}`}
//           />

//           <LinkBox
//             label="Quota Full"
//             url={`${base}/redirect/qf?tk=${project.redirects.quotaFull?.token}`}
//           />

//         </div>
//       )}

//       {
//         project.surveyLinks && (
//           <div className="mt-6">
//             <p>Test Link: {project.surveyLinks.test}</p>
//             <p>Live Link: {project.surveyLinks.live}</p>
//           </div>
//         )
//       }
//      {project.clientKeysFile && (
//         <a
//           href={project.clientKeysFile}  
//           target="_blank"
//           rel="noreferrer"
//           className="text-blue-600 underline mt-4 block"
//         >
//           Download Client Keys
//         </a>
//       )}
// {/* {project.status === "LIVE" && (
//   <button onClick={moveToTesting}>
//     Move to Testing 🚀
//   </button>
// )} */}
//       <LinkBox
//   label="Start Link (Give to Supplier)"
//   url={`${base}/redirect/start?tk=${project.redirects.start?.token}`}
// />
// {/* {project.status === "TESTING" && (
//   <div className="mb-6">
//     <button
//       onClick={goLive}
//       className="bg-green-600 text-white px-4 py-2 rounded"
//     >
//       Move to Live 🚀
//     </button>
//   </div>
// )} */}


// {project.status === "LIVE" && (
//   <div className="border rounded-2xl p-6 w-[350px] mt-6">
//     <h3 className="font-semibold mb-4">Live Stats</h3>

//     <div className="text-sm space-y-1">
//       <p>Total Responses – {project.totalResponses}</p>
//       <p>Completes – {project.completes}</p>
//       <p>Disqualified – {project.disqualified}</p>
//       <p>Quota Full – {project.quotaFull}</p>
//     </div>
//   </div>
// )}
//     </div>
    
//   );
// }

// function LinkBox({ label, url }) {
//   return (
//     <div className="flex justify-between border p-2 rounded">
//       <span>{label}</span>
//       <input value={url} readOnly className="text-xs w-[250px]" />
//     </div>
//   );
// }






// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";
// import socket from "../socket";

// export default function AdminProjectDetail() {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);


//   useEffect(() => {
//   fetchProject();

  
// }, [id]);

// const steps = [
//   "Created",
//   "Testing",
//   "Live",
//   "Hold",
//   "Completed",
// ];

// const getStep = () => {
//   const activeStep = getStep();
//   switch (project?.status) {
//     case "DRAFT":
//       return 0;

//     case "TESTING":
//       return 1;

//     case "LIVE":
//       return 2;

//     case "HOLD":
//       return 3;

//     case "COMPLETED":
//       return 4;

//     default:
//       return 0;
//   }
// };

// const [vendorLinks, setVendorLinks] = useState({
//   vendorName: "",
//   capture: "",
//   complete: "",
//   disqualified: "",
//   quotaFull: "",
// });

// const moveToTesting = async () => {
//   await api.put(`/admin/project/${id}/testing`);
//   fetchProject();
// };

// const moveToHold = async () => {
//   await api.put(`/admin/project/${id}/hold`);
//   fetchProject();
// };

// const completeProject = async () => {
//   await api.put(`/admin/project/${id}/complete`);
//   fetchProject();
// };
// const goLive = async () => {
//   try {
//     await api.put(`/admin/project/${id}/go-live`);

//     await fetchProject(); 

//   } catch (err) {
//     console.error(err);
//   }
// };

// const saveVendorLinks = async () => {
//   await api.put(
//     `/admin/project/${id}/vendor-links`,
//     vendorLinks
//   );

//   alert("Vendor links saved");

//   fetchProject();
// };

// if (!project) {
//   return (
//     <div className="p-6">
//       Loading...
//     </div>
//   );
// }

//   // const activeStep = getStep();

//   const base = import.meta.env.VITE_API_URL;

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">


// <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
//   <div>
//     <h1 className="text-2xl font-bold flex items-center gap-3">
//       Project Detail
//       <span className={`bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full ${
//         project.status === "LIVE"
//       ? "bg-green-100 text-green-700"
//       : project.status === "TESTING"
//       ? "bg-yellow-100 text-yellow-700"
//       : project.status === "HOLD"
//       ? "bg-gray-200 text-gray-700"
//       : project.status === "COMPLETED"
//       ? "bg-blue-100 text-blue-700"
//       : "bg-gray-100 text-gray-600"
//       }`}>
//         ● {project.status.toLowerCase()}
//       </span>
//     </h1>
//     <p className="text-gray-500 text-sm mt-1">
//       {project.sector} · {project.market} · Created{" "}
//       {new Date(project.createdAt).toLocaleDateString()}
//     </p>
//   </div>
// <div className="flex flex-wrap gap-3 w-full lg:w-auto">


//   {/* ACCEPTED */}
//   <div className="flex flex-wrap gap-3">

//   {project.status === "DRAFT" && (
//     <button
//       onClick={moveToTesting}
//       className="
//         bg-blue-600
//         text-white
//         px-4 py-2
//         rounded-lg
//       "
//     >
//       Move To Testing
//     </button>
//   )}

//   {project.status === "TESTING" && (
//     <button
//       onClick={goLive}
//       className="
//         bg-green-600
//         text-white
//         px-4 py-2
//         rounded-lg
//       "
//     >
//       Move To Live
//     </button>
//   )}

//   {project.status === "LIVE" && (
//     <button
//       onClick={moveToHold}
//       className="
//         bg-yellow-500
//         text-white
//         px-4 py-2
//         rounded-lg
//       "
//     >
//       Hold Project
//     </button>
//   )}

//   {project.status === "HOLD" && (
//     <>
//       <button
//         onClick={goLive}
//         className="
//           bg-green-600
//           text-white
//           px-4 py-2
//           rounded-lg
//         "
//       >
//         Resume Live
//       </button>

//       <button
//         onClick={completeProject}
//         className="
//           bg-blue-600
//           text-white
//           px-4 py-2
//           rounded-lg
//         "
//       >
//         Complete Project
//       </button>
//     </>
//   )}

// </div>
// </div>


// </div>
// <div className="border border-gray-200 rounded-xl p-6 bg-white">
//   <div className="flex justify-between items-center mb-4">
//     <h3 className="font-semibold text-lg">Project Lifecycle</h3>
//     <span className="text-sm text-gray-500">
//       Step {activeStep + 1} of {steps.length}
//     </span>
//   </div>

//   <div className="overflow-x-auto">
//   <div className="flex items-start min-w-[700px]">
//     {steps.map((step, i) => (
//       <div key={i} className="flex-1 flex items-center">
        
//         {/* STEP */}
//         <div className="flex flex-col items-center flex-1">
//           <div
//             className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold
//               ${
//                 i < activeStep
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : i === activeStep
//                   ? "border-blue-600 text-blue-600"
//                   : "border-gray-300 text-gray-400"
//               }`}
//           >
//             {i < activeStep ? "✓" : i + 1}
//           </div>

//           <p className="text-[11px] mt-2 text-center whitespace-nowrap">{step}</p>
//         </div>

//         {/* LINE */}
//         {i !== steps.length - 1 && (
//           <div
//             className={`h-[2px] flex-1 mx-2 ${
//               i < activeStep ? "bg-blue-600" : "bg-gray-300"
//             }`}
//           />
//         )}
//       </div>
//     ))}
//   </div>
//   </div>
// </div>
//       {/* SUMMARY CARD */}
// <div className="border border-gray-200 rounded-2xl overflow-hidden mb-8 bg-white">

//   <div className="px-6 py-5 border-b border-gray-200">
//     <h3 className="font-semibold text-lg">Summary</h3>
//   </div>

//   <div className="divide-y divide-gray-200 text-sm">

//     <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//       <span className="text-gray-500">Sector</span>
//       <span className="font-semibold">{project.sector}</span>
//     </div>

//     <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//       <span className="text-gray-500">Market</span>
//       <span className="font-semibold">{project.market}</span>
//     </div>

//     <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//       <span className="text-gray-500">Age Range</span>
//       <span className="font-semibold">
//         {project.ageFrom} – {project.ageTo}
//       </span>
//     </div>

//     <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//       <span className="text-gray-500">Target Completes</span>
//       <span className="font-semibold">{project.targetCompletes}</span>
//     </div>

//     <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//       <span className="text-gray-500">IR</span>
//       <span className="font-semibold">{project.incidence}</span>
//     </div>

//      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//       <span className="text-gray-500">LOI</span>
//       <span className="font-semibold">{project.loi}</span>
//     </div>

//     <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//       <span className="text-gray-500">Total Cost</span>
//       <span className="font-semibold">$ {project.totalCost}</span>
//     </div>

//     <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//       <span className="text-gray-500">Created</span>
//       <span className="font-semibold">
//         {new Date(project.createdAt).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         })}
//       </span>
//     </div>

  

//   </div>
// </div>


// <div className="border rounded-2xl bg-white p-6 mb-8">

//   <h3 className="text-lg font-semibold mb-6">
//     Vendor Integration
//   </h3>

//   <div className="space-y-4">

//     <input
//     value={vendorLinks.vendorName}
// onChange={(e) =>
//   setVendorLinks({
//     ...vendorLinks,
//     vendorName: e.target.value,
//   })
// }
//       placeholder="Vendor Name"
//       className="w-full border rounded-xl p-3"
//     />

//     <input
//     value={vendorLinks.vendorName}
// onChange={(e) =>
//   setVendorLinks({
//     ...vendorLinks,
//     capture: e.target.value,
//   })
// }
//       placeholder="Capture URL"
//       className="w-full border rounded-xl p-3"
//     />

//     <input
//     value={vendorLinks.vendorName}
// onChange={(e) =>
//   setVendorLinks({
//     ...vendorLinks,
//     complete: e.target.value,
//   })
// }
//       placeholder="Complete URL"
//       className="w-full border rounded-xl p-3"
//     />

//     <input
//     value={vendorLinks.vendorName}
// onChange={(e) =>
//   setVendorLinks({
//     ...vendorLinks,
//     disqualified: e.target.value,
//   })
// }
//       placeholder="Disqualified URL"
//       className="w-full border rounded-xl p-3"
//     />

//     <input
//     value={vendorLinks.vendorName}
// onChange={(e) =>
//   setVendorLinks({
//     ...vendorLinks,
//     quotaFull: e.target.value,
//   })
// }
//       placeholder="Quota Full URL"
//       className="w-full border rounded-xl p-3"
//     />

//     <button
//       className="
//         bg-blue-600
//         text-white
//         px-5 py-3
//         rounded-xl
//       "
//       onClick={saveVendorLinks}
//     >
//       Save Vendor Integration
//     </button>

//   </div>

// </div>


// {/* REDIRECT LINKS */}
// {project.status === "TESTING" && project.redirects && (
//   <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white mb-8">

//     <div className="px-6 py-5 border-b border-gray-200">
//       <h3 className="font-semibold text-lg">
//         Redirect Links
//       </h3>
//     </div>

//     <div className="p-6 space-y-6">

//       <ModernLinkBox
//         label="Complete Redirect"
//         badge="COMPLETE"
//         badgeColor="bg-green-100 text-green-700"
//         url={`${base}/redirect/c?tk=${project.redirects.complete?.token}`}
//       />

//       <ModernLinkBox
//         label="Disqualified Redirect"
//         badge="DQ"
//         badgeColor="bg-red-100 text-red-700"
//         url={`${base}/redirect/dq?tk=${project.redirects.disqualified?.token}`}
//       />

//       <ModernLinkBox
//         label="Quota Full Redirect"
//         badge="QF"
//         badgeColor="bg-yellow-100 text-yellow-700"
//         url={`${base}/redirect/qf?tk=${project.redirects.quotaFull?.token}`}
//       />

//     </div>
//   </div>
// )}


// {project.status === "TESTING" && (
// <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white mb-8">

//   <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
//     <h3 className="font-semibold text-lg">Survey Links</h3>

//     <span className="text-sm text-gray-500">
//       3 endpoints
//     </span>
//   </div>

//   <div className="p-6 space-y-6">

//     {/* TEST LINK */}
//     {project.surveyLinks?.test && (
//       <ModernLinkBox
//         label="Test Link"
//         badge="TEST"
//         badgeColor="bg-blue-100 text-blue-700"
//         url={project.surveyLinks.test}
//       />
//     )}

//     {/* LIVE LINK */}
//     {project.surveyLinks?.live && (
//       <ModernLinkBox
//         label="Live Link"
//         badge="LIVE"
//         badgeColor="bg-green-100 text-green-700"
//         url={project.surveyLinks.live}
//       />
//     )}

//     {/* START LINK */}
//     {project.redirects?.start?.token && (
//       <ModernLinkBox
//         label="Start Link — share with supplier"
//         badge="SUPPLIER"
//         badgeColor="bg-gray-100 text-gray-700"
//         url={`${base}/redirect/start?tk=${project.redirects.start?.token}`}
//       />
//     )}

//   </div>
// </div>
// )}
// {project.status === "LIVE" && (
//   <div className="p-6 space-y-6">

//     {/* TEST LINK */}
//     {project.surveyLinks?.test && (
//       <ModernLinkBox
//         label="Test Link"
//         badge="TEST"
//         badgeColor="bg-blue-100 text-blue-700"
//         url={project.surveyLinks.test}
//       />
//     )}

//     {/* LIVE LINK */}
//     {project.surveyLinks?.live && (
//       <ModernLinkBox
//         label="Live Link"
//         badge="LIVE"
//         badgeColor="bg-green-100 text-green-700"
//         url={project.surveyLinks.live}
//       />
//     )}

//     {/* START LINK */}
//     {project.redirects?.start?.token && (
//       <ModernLinkBox
//         label="Start Link — share with supplier"
//         badge="SUPPLIER"
//         badgeColor="bg-gray-100 text-gray-700"
//         url={`${base}/redirect/start?tk=${project.redirects.start?.token}`}
//       />
//     )}

//   </div>
// )}
// {project.status === "LIVE" && (
//   <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">

//     <div className="px-6 py-5 border-b border-gray-200">
//       <h3 className="font-semibold text-lg">
//         Live Stats
//       </h3>
//     </div>

//     <div className="divide-y divide-gray-200 text-sm">

//       <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//         <span className="text-gray-500">Total Responses</span>
//         <span className="font-semibold">
//           {project.totalResponses}
//         </span>
//       </div>

//       <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//         <span className="text-gray-500">Completes</span>
//         <span className="font-semibold">
//           {project.completes}
//         </span>
//       </div>

//       <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//         <span className="text-gray-500">Disqualified</span>
//         <span className="font-semibold">
//           {project.disqualified}
//         </span>
//       </div>

//       <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//         <span className="text-gray-500">Quota Full</span>
//         <span className="font-semibold">
//           {project.quotaFull}
//         </span>
//       </div>

//     </div>
     
//   </div>
  
// )}
//     </div>
    
//   );
// }

// function LinkBox({ label, url }) {
//   return (
//     <div className="flex justify-between border p-2 rounded">
//       <span>{label}</span>
//       <input value={url} readOnly className="text-xs w-[250px]" />
//     </div>
//   );
// }


// function ModernLinkBox({
//   label,
//   badge,
//   badgeColor,
//   url,
// }) {
//   const copyLink = () => {
//     navigator.clipboard.writeText(url);
//   };

//   return (
//     <div>
//       <div className="flex items-center gap-2 mb-2">
//         <p className="text-sm font-medium text-gray-700">
//           {label}
//         </p>

//         <span
//           className={`text-[10px] px-2 py-1 rounded font-semibold ${badgeColor}`}
//         >
//           {badge}
//         </span>
//       </div>

//       <div className="flex flex-col md:flex-row border border-gray-200 rounded-xl overflow-hidden">

//         <input
//           value={url}
//           readOnly
//           className="flex-1 px-4 py-3 outline-none text-sm min-w-0"
//         />

//         <a
//           href={url}
//           target="_blank"
//           rel="noreferrer"
//           className="px-4 py-3 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 hover:bg-gray-50"
//         >
//           ↗
//         </a>

//         <button
//           onClick={copyLink}
//           className="px-4 py-3 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 hover:bg-gray-50"
//         >
//           Copy
//         </button>

//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";

// export default function AdminProjectDetail() {

//   const { id } = useParams();

//   const [project, setProject] =
//     useState(null);

//   const [activeTab, setActiveTab] = useState("vendor");

//   const [vendorLinks, setVendorLinks] =
//     useState({
//       vendorName: "",
//       capture: "",
//       complete: "",
//       disqualified: "",
//       quotaFull: "",
//     });

//   const [saving, setSaving] = useState(false);

//   const base = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

//   const fetchProject = async () => {
//     try {
//       const res = await api.get(
//         `/admin/project/${id}`
//       );

//       const data = res.data;

//       setProject(res.data);

//       const firstVendor = Array.isArray(data.vendorLinks)
//         ? data.vendorLinks[0]
//         : data.vendorLinks;

// if (firstVendor) {
//   setVendorLinks({
//     vendorName:
//     res.data.vendorLinks.vendorName || "",
//     capture:
//       res.data.vendorLinks.capture || "",
//     complete:
//       res.data.vendorLinks.complete || "",
//     disqualified:
//       res.data.vendorLinks.disqualified || "",
//     quotaFull:
//       res.data.vendorLinks.quotaFull || "",
//   });
// }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchProject();
//   }, [id]);

//   // const moveTesting = async () => {
//   //   await api.put(
//   //     `/admin/project/${id}/move-testing`
//   //   );

//   //   fetchProject();
//   // };
//   const moveTesting = async () => {
//     try {
//       await api.put(`/admin/project/${id}/move-testing`);
//       await fetchProject();
//     } catch (err) {
//       console.error("Failed to move project to testing:", err);
//       alert("Failed to move project to testing");
//     }
//   };

//   const saveVendorLinks = async () => {
//   try {
//     setSaving(true);
//     await api.put(
//       `/admin/project/${id}/vendor-links`,
//       {
//         vendorName:  vendorLinks.vendorName,
//         capture: vendorLinks.capture,
//         complete: vendorLinks.complete,
//         disqualified:
//           vendorLinks.disqualified,
//         quotaFull:
//           vendorLinks.quotaFull,
//       }
//     );

//     alert("Vendor links saved");

//     await fetchProject();

//   } catch (err) {

//     console.log(err);

//     alert("Failed to save vendor links");

//   } finally {
//       setSaving(false);
//   }
// };

//   // const moveLive = async () => {
//   //   await api.put(
//   //     `/admin/project/${id}/go-live`
//   //   );

//   //   fetchProject();
//   // };

//    const moveLive = async () => {
//     try {
//       await api.put(`/admin/project/${id}/go-live`);
//       await fetchProject();
//     } catch (err) {
//       console.error("Failed to move project live:", err);
//       alert("Failed to move project live");
//     }
//   };

//   const getBusinessRedirects = () => {
//     if (!project?.redirects) {
//       return {
//         start: "",
//         complete: "",
//         disqualified: "",
//         quotaFull: "",
//       };
//     }

//     return {
//       start: project.redirects.start?.token
//         ? `${base}/redirect/start?tk=${project.redirects.start.token}&RID={RID}`
//         : "",

//       complete: project.redirects.complete?.token
//         ? `${base}/redirect/c?tk=${project.redirects.complete.token}&RID={RID}`
//         : "",

//       disqualified: project.redirects.disqualified?.token
//         ? `${base}/redirect/dq?tk=${project.redirects.disqualified.token}&RID={RID}`
//         : "",

//       quotaFull: project.redirects.quotaFull?.token
//         ? `${base}/redirect/qf?tk=${project.redirects.quotaFull.token}&RID={RID}`
//         : "",
//     };
//   };

//   const businessRedirects = getBusinessRedirects();

//   if (!project) {
//     return (
//       <div className="p-6">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="mb-8">
//       <h1 className="text-3xl font-bold mb-2">
//         {project.name}
//       </h1>

//       <p className="text-gray-500 mb-8">
//         {project.business?.email}
//       </p>
//     </div>
//       <div className="bg-white border rounded-xl p-6 mb-6">

//         <h2 className="font-bold mb-4">
//           Project Information
//         </h2>

//         <p>
//           Status:
//           {" "}
//           <b>{project.status}</b>
//         </p>

//         <p>
//           Survey ID:
//           {" "}
//           {project.surveyId}
//         </p>

//         <p>
//           Completes:
//           {" "}
//           {project.completes}
//         </p>

//       </div>

//       <div className="bg-white border rounded-xl p-6 mb-6">

//         <h2 className="font-bold mb-4">
//           Vendor Redirects
//         </h2>

// <input
//   placeholder="Vendor Name"
//   className="border p-3 w-full mb-3"
//   value={vendorLinks.vendorName || ""}
//   onChange={(e) =>
//     setVendorLinks({
//       ...vendorLinks,
//       vendorName: e.target.value,
//     })
//   }
// />
//         <input
//           placeholder="Capture URL"
//           className="border p-3 w-full mb-3"
//           value={vendorLinks.capture}
//           onChange={(e) =>
//             setVendorLinks({
//               ...vendorLinks,
//               capture: e.target.value,
//             })
//           }
//         />

//         <input
//           placeholder="Complete URL"
//           className="border p-3 w-full mb-3"
//           value={vendorLinks.complete}
//           onChange={(e) =>
//             setVendorLinks({
//               ...vendorLinks,
//               complete: e.target.value,
//             })
//           }
//         />

//         <input
//           placeholder="Disqualified URL"
//           className="border p-3 w-full mb-3"
//           value={vendorLinks.disqualified}
//           onChange={(e) =>
//             setVendorLinks({
//               ...vendorLinks,
//               disqualified: e.target.value,
//             })
//           }
//         />

//         <input
//           placeholder="Quota Full URL"
//           className="border p-3 w-full"
//           value={vendorLinks.quotaFull}
//           onChange={(e) =>
//             setVendorLinks({
//               ...vendorLinks,
//               quotaFull: e.target.value,
//             })
//           }
//         />

//       </div>

//       <button
//   onClick={saveVendorLinks}
//   className="
//     bg-blue-600
//     text-white
//     px-4
//     py-2
//     rounded
//   "
// >
//   Save Vendor Links
// </button>

//       <div className="flex gap-3">

//         <button
//           onClick={moveTesting}
//           className="bg-yellow-500 text-white px-5 py-3 rounded"
//         >
//           Move To Testing
//         </button>

//         <button
//           onClick={moveLive}
//           className="bg-green-600 text-white px-5 py-3 rounded"
//         >
//           Go Live
//         </button>

//       </div>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function AdminProjectDetail() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("vendor");

  const [vendorLinks, setVendorLinks] = useState({
    vendorName: "",
    capture: "",
    complete: "",
    disqualified: "",
    quotaFull: "",
  });

  const [saving, setSaving] = useState(false);

  const base = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  // --------------------------------------------------
  // FETCH PROJECT
  // --------------------------------------------------

  const fetchProject = async () => {
    try {
      const res = await api.get(`/admin/project/${id}`);

      const data = res.data;

      setProject(data);

      // vendorLinks is an ARRAY in MongoDB
      const firstVendor = Array.isArray(data.vendorLinks)
        ? data.vendorLinks[0]
        : data.vendorLinks;

      if (firstVendor) {
        setVendorLinks({
          vendorName: firstVendor.vendorName || "",
          capture: firstVendor.capture || "",
          complete: firstVendor.complete || "",
          disqualified: firstVendor.disqualified || "",
          quotaFull: firstVendor.quotaFull || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch project:", err);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  // --------------------------------------------------
  // SAVE VENDOR LINKS
  // --------------------------------------------------

  const saveVendorLinks = async () => {
    try {
      setSaving(true);

      await api.put(`/admin/project/${id}/vendor-links`, {
        vendorName: vendorLinks.vendorName,
        capture: vendorLinks.capture,
        complete: vendorLinks.complete,
        disqualified: vendorLinks.disqualified,
        quotaFull: vendorLinks.quotaFull,
      });

      alert("Vendor links saved successfully");

      await fetchProject();
    } catch (err) {
      console.error("Failed to save vendor links:", err);
      alert("Failed to save vendor links");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // MOVE TO TESTING
  // --------------------------------------------------

  const moveTesting = async () => {
    try {
      await api.put(`/admin/project/${id}/move-testing`);
      await fetchProject();
    } catch (err) {
      console.error("Failed to move project to testing:", err);
      alert("Failed to move project to testing");
    }
  };

  // --------------------------------------------------
  // GO LIVE
  // --------------------------------------------------

  const moveLive = async () => {
    try {
      await api.put(`/admin/project/${id}/go-live`);
      await fetchProject();
    } catch (err) {
      console.error("Failed to move project live:", err);
      alert("Failed to move project live");
    }
  };

  // --------------------------------------------------
  // BUSINESS GENERATED REDIRECT URLS
  // --------------------------------------------------

  const getBusinessRedirects = () => {
    if (!project?.redirects) {
      return {
        start: "",
        complete: "",
        disqualified: "",
        quotaFull: "",
      };
    }

    return {
      start: project.redirects.start?.token
        ? `${base}/redirect/start?tk=${project.redirects.start.token}&RID={RID}`
        : "",

      complete: project.redirects.complete?.token
        ? `${base}/redirect/c?tk=${project.redirects.complete.token}&RID={RID}`
        : "",

      disqualified: project.redirects.disqualified?.token
        ? `${base}/redirect/dq?tk=${project.redirects.disqualified.token}&RID={RID}`
        : "",

      quotaFull: project.redirects.quotaFull?.token
        ? `${base}/redirect/qf?tk=${project.redirects.quotaFull.token}&RID={RID}`
        : "",
    };
  };

  const businessRedirects = getBusinessRedirects();

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (!project) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* --------------------------------------------- */}
      {/* HEADER */}
      {/* --------------------------------------------- */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {project.name}
        </h1>

        <p className="text-gray-500 mt-1">
          {project.business?.email}
        </p>
      </div>

      {/* --------------------------------------------- */}
      {/* PROJECT INFORMATION */}
      {/* --------------------------------------------- */}

      <div className="bg-white border rounded-xl p-6 mb-6">

        <h2 className="font-bold text-lg mb-5">
          Project Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <p className="font-semibold mt-1">
              {project.status}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Survey ID
            </p>

            <p className="font-semibold mt-1">
              {project.surveyId}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Completes
            </p>

            <p className="font-semibold mt-1">
              {project.completes || 0}
            </p>
          </div>

        </div>

      </div>

      {/* --------------------------------------------- */}
      {/* TABS */}
      {/* --------------------------------------------- */}

      <div className="bg-white border rounded-xl overflow-hidden">

        {/* TAB HEADER */}

        <div className="border-b flex">

          <button
            onClick={() => setActiveTab("vendor")}
            className={`
              px-6
              py-4
              font-medium
              transition
              ${
                activeTab === "vendor"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }
            `}
          >
            Vendor Links
          </button>

          <button
            onClick={() => setActiveTab("business")}
            className={`
              px-6
              py-4
              font-medium
              transition
              ${
                activeTab === "business"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }
            `}
          >
            Business Redirects
          </button>

        </div>

        {/* ------------------------------------------- */}
        {/* VENDOR LINKS TAB */}
        {/* ------------------------------------------- */}

        {activeTab === "vendor" && (
          <div className="p-6">

            <div className="mb-6">

              <h2 className="text-lg font-bold">
                Vendor Redirect Configuration
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Enter the URLs supplied by the vendor.
                These values can be edited by Admin.
              </p>

            </div>

            <div className="space-y-4">

              {/* Vendor Name */}

              <InputField
                label="Vendor Name"
                placeholder="Enter vendor name"
                value={vendorLinks.vendorName}
                onChange={(value) =>
                  setVendorLinks({
                    ...vendorLinks,
                    vendorName: value,
                  })
                }
              />

              {/* Capture */}

              <InputField
                label="Capture URL"
                placeholder="Enter vendor capture URL"
                value={vendorLinks.capture}
                onChange={(value) =>
                  setVendorLinks({
                    ...vendorLinks,
                    capture: value,
                  })
                }
              />

              {/* Complete */}

              <InputField
                label="Complete URL"
                placeholder="Enter vendor complete URL"
                value={vendorLinks.complete}
                onChange={(value) =>
                  setVendorLinks({
                    ...vendorLinks,
                    complete: value,
                  })
                }
              />

              {/* Disqualified */}

              <InputField
                label="Disqualified URL"
                placeholder="Enter vendor disqualified URL"
                value={vendorLinks.disqualified}
                onChange={(value) =>
                  setVendorLinks({
                    ...vendorLinks,
                    disqualified: value,
                  })
                }
              />

              {/* Quota Full */}

              <InputField
                label="Quota Full URL"
                placeholder="Enter vendor quota full URL"
                value={vendorLinks.quotaFull}
                onChange={(value) =>
                  setVendorLinks({
                    ...vendorLinks,
                    quotaFull: value,
                  })
                }
              />

            </div>

            {/* SAVE */}

            <div className="mt-6">

              <button
                onClick={saveVendorLinks}
                disabled={saving}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:bg-blue-300
                  text-white
                  px-5
                  py-2.5
                  rounded-lg
                  font-medium
                  transition
                "
              >
                {saving
                  ? "Saving..."
                  : "Save Vendor Links"}
              </button>

            </div>

          </div>
        )}

        {/* ------------------------------------------- */}
        {/* BUSINESS REDIRECTS TAB */}
        {/* ------------------------------------------- */}

        {activeTab === "business" && (
          <div className="p-6">

            <div className="mb-6">

              <h2 className="text-lg font-bold">
                Business Generated Redirects
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                These URLs are generated by the Business
                panel and are read-only.
              </p>

            </div>

            {/* TEST / LIVE SURVEY URL */}

            <div className="mb-8">

              <h3 className="font-semibold mb-3">
                Survey URLs
              </h3>

              <div className="space-y-3">

                <ReadOnlyLink
                  label="Test Survey"
                  url={project.surveyLinks?.test}
                />

                <ReadOnlyLink
                  label="Live Survey"
                  url={project.surveyLinks?.live}
                />

              </div>

            </div>

            {/* REDIRECT URLS */}

            <div>

              <h3 className="font-semibold mb-3">
                Redirect URLs
              </h3>

              <div className="space-y-3">

                <ReadOnlyLink
                  label="Start URL"
                  url={businessRedirects.start}
                />

                <ReadOnlyLink
                  label="Complete"
                  url={businessRedirects.complete}
                />

                <ReadOnlyLink
                  label="Disqualified"
                  url={businessRedirects.disqualified}
                />

                <ReadOnlyLink
                  label="Quota Full"
                  url={businessRedirects.quotaFull}
                />

              </div>

            </div>

          </div>
        )}

      </div>

      {/* --------------------------------------------- */}
      {/* PROJECT ACTIONS */}
      {/* --------------------------------------------- */}

      <div className="flex gap-3 mt-6">

        <button
          onClick={moveTesting}
          className="
            bg-yellow-500
            hover:bg-yellow-600
            text-white
            px-5
            py-3
            rounded-lg
            font-medium
          "
        >
          Move To Testing
        </button>

        <button
          onClick={moveLive}
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-5
            py-3
            rounded-lg
            font-medium
          "
        >
          Go Live
        </button>

      </div>

      {/* --------------------------------------------- */}
      {/* STATISTICS */}
      {/* --------------------------------------------- */}

      <div className="mt-8">

        <h3 className="text-lg font-semibold mb-4">
          Project Statistics
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          <StatCard
            label="Target Completes"
            value={project.targetCompletes || 0}
          />

          <StatCard
            label="Completes"
            value={project.completes || 0}
          />

          <StatCard
            label="Remaining"
            value={Math.max(
              (project.targetCompletes || 0) -
              (project.completes || 0),
              0
            )}
          />

          <StatCard
            label="DQ"
            value={project.disqualified || 0}
          />

          <StatCard
            label="QF"
            value={project.quotaFull || 0}
          />

          <StatCard
            label="Total Responses"
            value={project.totalResponses || 0}
          />

        </div>

      </div>

    </div>
  );
}


// ==================================================
// INPUT FIELD
// ==================================================

function InputField({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          border
          rounded-lg
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
        "
      />

    </div>
  );
}


// ==================================================
// READ ONLY LINK
// ==================================================

function ReadOnlyLink({
  label,
  url,
}) {
  const copy = async () => {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      alert(`${label} copied`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="
      border
      rounded-lg
      p-3
      bg-gray-50
    ">

      <div className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        gap-3
      ">

        <div className="w-40 shrink-0">

          <p className="font-medium text-sm">
            {label}
          </p>

        </div>

        <div className="flex-1 flex gap-2">

          <input
            value={url || "Not generated"}
            readOnly
            className="
              flex-1
              min-w-0
              border
              rounded-md
              px-3
              py-2
              text-sm
              bg-white
              text-gray-700
            "
          />

          <button
            onClick={copy}
            disabled={!url}
            className="
              bg-black
              hover:bg-gray-800
              disabled:bg-gray-300
              text-white
              px-4
              py-2
              rounded-md
              text-sm
              shrink-0
            "
          >
            Copy
          </button>

        </div>

      </div>

    </div>
  );
}


// ==================================================
// STAT CARD
// ==================================================

function StatCard({
  label,
  value,
}) {
  return (
    <div className="
      bg-white
      border
      rounded-lg
      p-4
    ">

      <p className="
        text-xs
        text-gray-500
        uppercase
      ">
        {label}
      </p>

      <p className="
        text-2xl
        font-bold
        mt-1
      ">
        {value}
      </p>

    </div>
  );
}