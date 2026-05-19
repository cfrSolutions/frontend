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
// const [messages, setMessages] = useState([]);
// const [message, setMessage] = useState("");
// const [offer, setOffer] = useState("");
// const [finalAmount, setFinalAmount] = useState("");
//   // useEffect(() => {
//   //   fetchProject();
//   // }, [id]);
//   useEffect(() => {
//   fetchProject();

//   // const interval = setInterval(fetchProject, 5000);
//   // return () => clearInterval(interval);
// }, [id]);

// useEffect(() => {

//   socket.emit("join_project", id);

// }, [id]);

// useEffect(() => {

//   socket.on("receive_message", (data) => {

//      setMessages((prev) => {

//     const exists = prev.some(
//       (m) =>
//         m.message === data.message &&
//         m.sender === data.sender &&
//         m.proposedCpi === data.proposedCpi
//     );

//     if (exists) return prev;

//     return [...prev, data];
//   });

//   });

//   return () => {
//     socket.off("receive_message");
//   };

// }, []);

// const sendNegotiation = async () => {

//   const data = {
//     projectId: id,
//     sender: "ADMIN",
//    message: message,
//   proposedCpi: offer,
//   };

//   await api.put(
//     `/admin/project/${id}/negotiate`,
//     data
//   );

//   socket.emit("send_message", data);

//   setMessages((prev) => [...prev, data]);

//   setMessage("");
//   setOffer("");
// };
// const acceptNegotiation = async () => {

//   try {

//     await api.put(
//       `/admin/project/${id}/accept-negotiation`,
//       {
//         amount: finalAmount,
//       }
//     );

//     fetchProject();

//   } catch (err) {
//     console.log(err);
//   }
// };

// const rejectNegotiation = async () => {

//   try {

//     await api.put(
//       `/admin/project/${id}/reject`
//     );

//     fetchProject();

//   } catch (err) {
//     console.log(err);
//   }
// };
// const moveToTesting = async () => {
//   await api.put(`/admin/project/${id}/move-testing`);
//   fetchProject();
// };

//   const fetchProject = async () => {
//     const res = await api.get(`/admin/project/${id}`);
//     setProject(res.data);
//     setMessages(res.data.negotiations || []);
//   };
 
//   if (!project) return <p>Loading...</p>;

//   const steps = [
//     "Project Created",
//     "Negotiation",
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

//   // const getStep = () => {
//   //   switch (project.status) {
//   //     case "DRAFT":
//   //       return 0;
//   //     case "NEGOTIATION":
//   //       return 1;
//   //     case "TESTING":
//   //       return 2;
//   //     case "LIVE":
//   //       return 3;
//   //     case "HOLD":
//   //       return 4;
//   //     case "COMPLETED":
//   //       return 5;
//   //     default:
//   //       return 0;
//   //   }
//   // };

//   const getStep = () => {
//   switch (project.status) {

//     case "DRAFT":
//       return 0;

//     case "NEGOTIATION":
//       return 1;

//     case "ACCEPTED":
//       return 2;

//     case "TESTING":
//       return 3;

//     case "LIVE":
//       return 4;

//     case "HOLD":
//       return 5;

//     case "COMPLETED":
//       return 6;

//     default:
//       return 0;
//   }
// };

// //  const goLive = async () => {
// //   try {
// //     await api.put(`/admin/project/${id}/go-live`);
// //     fetchProject(); 
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };

// const handleAccept = async () => {

//   try {

//     await api.put(
//       `/admin/project/${id}/accept`
//     );

//     fetchProject();

//   } catch (err) {
//     console.log(err);
//   }
// };

// const startNegotiation = async () => {

//   try {

//     await api.put(
//       `/admin/project/${id}/start-negotiation`
//     );

//     fetchProject();

//   } catch (err) {
//     console.log(err);
//   }
// };

// const handleReject = async () => {

//   try {

//     await api.put(
//       `/admin/project/${id}/reject`
//     );

//     fetchProject();

//   } catch (err) {
//     console.log(err);
//   }
// };


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
//     <div className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">

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

//   {/* <div className="flex gap-3">
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
//     <button
//       onClick={goLive}
//       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//     >
//       Move to Live
//     </button>
// )}
//   </div> */}

// <div className="flex flex-wrap gap-3 w-full lg:w-auto">

//   {/* DRAFT ACTIONS */}
//   {project.status === "DRAFT" && (
//     <>

//       <button
//         onClick={handleAccept}
//         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//       >
//         Accept
//       </button>

//       <button
//         onClick={startNegotiation}
//         className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
//       >
//         Negotiation
//       </button>

//       <button
//         onClick={handleReject}
//         className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//       >
//         Reject
//       </button>

//     </>
//   )}

//   {/* ACCEPTED */}
//   {project.status === "ACCEPTED" && (
//     <button
//       onClick={moveToTesting}
//       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//     >
//       Move to Testing ↗
//     </button>
//   )}

//   {project.status === "LIVE" && (
//     <button
//       onClick={moveToTesting}
//       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//     >
//       Move to Testing ↗
//     </button>
//   )}

//   {/* TESTING */}
//   {project.status === "TESTING" && (
//     <button
//       onClick={goLive}
//       className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//     >
//       Move to Live
//     </button>
//   )}

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
//       <span className="text-gray-500">Created</span>
//       <span className="font-semibold">
//         {new Date(project.createdAt).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         })}
//       </span>
//     </div>

//     <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
//       <span className="text-gray-500">Project ID</span>
//       <span className="font-semibold">
//         {project.projectId || project._id}
//       </span>
//     </div>

//   </div>
// </div>


// {project.status === "NEGOTIATION" &&(
//   <div className="border border-gray-200 rounded-2xl bg-white mt-8">

//   <div className="px-6 py-5 border-b border-gray-200">
//     <h3 className="font-semibold text-lg">
//       Negotiation Chat
//     </h3>
//   </div>

//   {/* MESSAGES */}
//   <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">

//     {messages.map((msg, i) => (

//       <div
//         key={i}
//         className={`max-w-[70%] p-4 rounded-2xl

//         ${
//           msg.sender === "ADMIN"
//             ? "bg-blue-600 text-white ml-auto"
//             : "bg-gray-100 text-gray-800"
//         }`}
//       >

//         <p className="text-xs font-semibold mb-1">
//           {msg.sender}
//         </p>

//         <p>{msg.message}</p>

//         {msg.proposedCpi  && (

//           <p className="mt-2 font-bold">
//             Offer: ₹{msg.proposedCpi}
//           </p>

//         )}

//       </div>

//     ))}

//   </div>

//   {/* INPUT */}
//   <div className="border-t border-gray-200 p-4 flex flex-col md:flex-row gap-3">

//     <input
//       type="text"
//       placeholder="Type message..."
//       value={message}
//       onChange={(e) => setMessage(e.target.value)}
//       className="flex-1 border rounded-xl px-4 py-3"
//     />

//     <input
//       type="number"
//       placeholder="Offer"
//       value={offer}
//       onChange={(e) => setOffer(e.target.value)}
//       className="w-full md:w-32 border rounded-xl px-4 py-3"
//     />

//     <button
//       onClick={sendNegotiation}
//       className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full md:w-auto"
//     >
//       Send
//     </button>

//   </div>
// <div className="border-t border-gray-200 p-4">

//   <div className="flex flex-wrap gap-3 w-full lg:w-auto">

//     <input
//       type="number"
//       placeholder="Final agreed amount"
//       value={finalAmount}
//       onChange={(e) => setFinalAmount(e.target.value)}
//       className="flex-1 border rounded-xl px-4 py-3"
//     />

//     <button
//       onClick={acceptNegotiation}
//       className="bg-green-600 text-white px-6 rounded-xl"
//     >
//       Accept Deal
//     </button>

//     <button
//       onClick={handleReject}
//       className="bg-red-600 text-white px-6 rounded-xl"
//     >
//       Reject
//     </button>

//   </div>

// </div>
// </div>

// )}

// {project.status === "ACCEPTED" && (

//   <div className="border border-green-200 bg-green-50 rounded-2xl p-6 mt-8">

//     <h3 className="text-lg font-semibold text-green-800 mb-4">
//       Cost Accepted
//     </h3>

//     <div className="space-y-3 text-sm">

//       <div className="flex justify-between">
//         <span className="text-gray-600">
//           Final Agreed CPI
//         </span>

//         <span className="font-bold text-green-700">
//           ₹{project.budget}
//         </span>
//       </div>

     

//     </div>

//   </div>

// )}







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


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import socket from "../socket";

export default function AdminProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
const [messages, setMessages] = useState([]);
const [message, setMessage] = useState("");
const [offer, setOffer] = useState("");
const [finalAmount, setFinalAmount] = useState("");
  // useEffect(() => {
  //   fetchProject();
  // }, [id]);
  useEffect(() => {
  fetchProject();

  // const interval = setInterval(fetchProject, 5000);
  // return () => clearInterval(interval);
}, [id]);

useEffect(() => {

  socket.emit("join_project", id);

}, [id]);

useEffect(() => {

  socket.on("receive_message", (data) => {

     setMessages((prev) => {

    const exists = prev.some(
      (m) =>
        m.message === data.message &&
        m.sender === data.sender &&
        m.proposedCpi === data.proposedCpi
    );

    if (exists) return prev;

    return [...prev, data];
  });

  });

  return () => {
    socket.off("receive_message");
  };

}, []);

const sendNegotiation = async () => {

  const data = {
    projectId: id,
    sender: "ADMIN",
   message: message,
  proposedCpi: offer,
  };

  await api.put(
    `/admin/project/${id}/negotiate`,
    data
  );

  socket.emit("send_message", data);

  setMessages((prev) => [...prev, data]);

  setMessage("");
  setOffer("");
};
const acceptNegotiation = async () => {

  try {

    await api.put(
      `/admin/project/${id}/accept-negotiation`,
      {
        amount: finalAmount,
      }
    );

    fetchProject();

  } catch (err) {
    console.log(err);
  }
};

const rejectNegotiation = async () => {

  try {

    await api.put(
      `/admin/project/${id}/reject`
    );

    fetchProject();

  } catch (err) {
    console.log(err);
  }
};
const moveToTesting = async () => {
  await api.put(`/admin/project/${id}/move-testing`);
  fetchProject();
};

  const fetchProject = async () => {
    const res = await api.get(`/admin/project/${id}`);
    setProject(res.data);
    setMessages(res.data.negotiations || []);
  };
 
  if (!project) return <p>Loading...</p>;

  const steps = [
    "Project Created",
    "Negotiation",
    "Cost Accepted",
    "Testing Setup",
    "Live",
    "Hold",
    "Completed",
  ];

  // const getStep = () => {
  //   switch (project.status) {
  //     case "DRAFT":
  //       return 0;
  //     case "LIVE":
  //       return 1; // 
  //     case "HOLD":
  //       return 4;
  //     case "CLOSED":
  //       return 5;
  //     default:
  //       return 0;
  //   }
  // };

  // const getStep = () => {
  //   switch (project.status) {
  //     case "DRAFT":
  //       return 0;
  //     case "NEGOTIATION":
  //       return 1;
  //     case "TESTING":
  //       return 2;
  //     case "LIVE":
  //       return 3;
  //     case "HOLD":
  //       return 4;
  //     case "COMPLETED":
  //       return 5;
  //     default:
  //       return 0;
  //   }
  // };

  const getStep = () => {
  switch (project.status) {

    case "DRAFT":
      return 0;

    case "NEGOTIATION":
      return 1;

    case "ACCEPTED":
      return 2;

    case "TESTING":
      return 3;

    case "LIVE":
      return 4;

    case "HOLD":
      return 5;

    case "COMPLETED":
      return 6;

    default:
      return 0;
  }
};

//  const goLive = async () => {
//   try {
//     await api.put(`/admin/project/${id}/go-live`);
//     fetchProject(); 
//   } catch (err) {
//     console.error(err);
//   }
// };

const handleAccept = async () => {

  try {

    await api.put(
      `/admin/project/${id}/accept`
    );

    fetchProject();

  } catch (err) {
    console.log(err);
  }
};

const startNegotiation = async () => {

  try {

    await api.put(
      `/admin/project/${id}/start-negotiation`
    );

    fetchProject();

  } catch (err) {
    console.log(err);
  }
};

const handleReject = async () => {

  try {

    await api.put(
      `/admin/project/${id}/reject`
    );

    fetchProject();

  } catch (err) {
    console.log(err);
  }
};


const goLive = async () => {
  try {
    await api.put(`/admin/project/${id}/go-live`);

    await fetchProject(); 

  } catch (err) {
    console.error(err);
  }
};
  const activeStep = getStep();

  const base = import.meta.env.VITE_API_URL;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-full">

      {/* <h1 className="text-2xl font-bold mb-2">
        Project Detail
      </h1>
{project.status === "LIVE" && (
  <button onClick={moveToTesting}>
    Move to Testing 🚀
  </button>
)}
      
      <div className="flex justify-between mb-10">
        {steps.map((step, i) => (
          <div key={i} className="flex-1 text-center">
            <div
              className={`w-4 h-4 mx-auto rounded-full mb-2 ${
                i <= activeStep ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
            <p className="text-xs">{step}</p>
          </div>
        ))}
      </div> */}


<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
  <div>
    <h1 className="text-2xl font-bold flex items-center gap-3">
      Project Detail
      <span className={`bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full ${
        project.status === "LIVE"
      ? "bg-green-100 text-green-700"
      : project.status === "TESTING"
      ? "bg-yellow-100 text-yellow-700"
      : project.status === "HOLD"
      ? "bg-gray-200 text-gray-700"
      : project.status === "COMPLETED"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-600"
      }`}>
        ● {project.status.toLowerCase()}
      </span>
    </h1>
    <p className="text-gray-500 text-sm mt-1">
      {project.sector} · {project.market} · Created{" "}
      {new Date(project.createdAt).toLocaleDateString()}
    </p>
  </div>

  {/* <div className="flex gap-3">
    <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
      Actions
    </button>

    {project.status === "LIVE" && (
      <button
        onClick={moveToTesting}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Move to Testing ↗
      </button>
    )}

    {project.status === "TESTING" && (
    <button
      onClick={goLive}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      Move to Live
    </button>
)}
  </div> */}

<div className="flex flex-wrap gap-3 w-full lg:w-auto">

  {/* DRAFT ACTIONS */}
  {project.status === "DRAFT" && (
    <>

      <button
        onClick={handleAccept}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Accept
      </button>

      <button
        onClick={startNegotiation}
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
      >
        Negotiation
      </button>

      <button
        onClick={handleReject}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Reject
      </button>

    </>
  )}

  {/* ACCEPTED */}
  {project.status === "ACCEPTED" && (
    <button
      onClick={moveToTesting}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      Move to Testing ↗
    </button>
  )}

  {project.status === "LIVE" && (
    <button
      onClick={moveToTesting}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      Move to Testing ↗
    </button>
  )}

  {/* TESTING */}
  {project.status === "TESTING" && (
    <button
      onClick={goLive}
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
    >
      Move to Live
    </button>
  )}

</div>


</div>
{/* <div className="border border-gray-200 rounded-xl p-6 bg-white">
  <div className="flex justify-between items-center mb-4">
    <h3 className="font-semibold text-lg">Project Lifecycle</h3>
    <span className="text-sm text-gray-500">
      Step {activeStep + 1} of {steps.length}
    </span>
  </div>

  <div className="overflow-x-auto">
  <div className="flex items-start min-w-[700px]">
    {steps.map((step, i) => (
      <div key={i} className="flex-1 flex items-center">
        
        
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold
              ${
                i < activeStep
                  ? "bg-blue-600 text-white border-blue-600"
                  : i === activeStep
                  ? "border-blue-600 text-blue-600"
                  : "border-gray-300 text-gray-400"
              }`}
          >
            {i < activeStep ? "✓" : i + 1}
          </div>

          <p className="text-[11px] mt-2 text-center whitespace-nowrap">{step}</p>
        </div>

        
        {i !== steps.length - 1 && (
          <div
            className={`h-[2px] flex-1 mx-2 ${
              i < activeStep ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        )}
      </div>
    ))}
  </div>
  </div>
</div> */}
<div className="border border-gray-200 rounded-xl p-6 bg-white">
  <div className="flex justify-between items-center mb-4">
    <h3 className="font-semibold text-lg">Project Lifecycle</h3>
    <span className="text-sm text-gray-500">
      Step {activeStep + 1} of {steps.length}
    </span>
  </div>

  <div className="overflow-x-auto md:overflow-visible">
  <div className="flex items-start min-w-[900px] md:min-w-0">
    {steps.map((step, i) => (
      <div key={i} className="flex items-center shrink-0">
        
        
        <div className="flex flex-col items-center min-w-[120px] shrink-0">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold
              ${
                i < activeStep
                  ? "bg-blue-600 text-white border-blue-600"
                  : i === activeStep
                  ? "border-blue-600 text-blue-600"
                  : "border-gray-300 text-gray-400"
              }`}
          >
            {i < activeStep ? "✓" : i + 1}
          </div>

          <p className="text-[11px] mt-2 text-center whitespace-nowrap">{step}</p>
        </div>

        
        {i !== steps.length - 1 && (
          <div
            className={`h-[2px] flex-1 mx-2 ${
              i < activeStep ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        )}
      </div>
    ))}
  </div>
  </div>
</div>
      {/* SUMMARY CARD */}
<div className="border border-gray-200 rounded-2xl overflow-hidden mb-8 bg-white">

  <div className="px-6 py-5 border-b border-gray-200">
    <h3 className="font-semibold text-lg">Summary</h3>
  </div>

  <div className="divide-y divide-gray-200 text-sm">

    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
      <span className="text-gray-500">Sector</span>
      <span className="font-semibold">{project.sector}</span>
    </div>

    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
      <span className="text-gray-500">Market</span>
      <span className="font-semibold">{project.market}</span>
    </div>

    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
      <span className="text-gray-500">Age Range</span>
      <span className="font-semibold">
        {project.ageFrom} – {project.ageTo}
      </span>
    </div>

    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
      <span className="text-gray-500">Target Completes</span>
      <span className="font-semibold">{project.targetCompletes}</span>
    </div>

    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
      <span className="text-gray-500">Created</span>
      <span className="font-semibold">
        {new Date(project.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    </div>

    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
      <span className="text-gray-500">Project ID</span>
      <span className="font-semibold">
        {project.projectId || project._id}
      </span>
    </div>

  </div>
</div>


{project.status === "NEGOTIATION" &&(
  <div className="border border-gray-200 rounded-2xl bg-white mt-8">

  <div className="px-6 py-5 border-b border-gray-200">
    <h3 className="font-semibold text-lg">
      Negotiation Chat
    </h3>
  </div>

  {/* MESSAGES */}
  <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">

    {messages.map((msg, i) => (

      <div
        key={i}
        className={`max-w-[70%] p-4 rounded-2xl

        ${
          msg.sender === "ADMIN"
            ? "bg-blue-600 text-white ml-auto"
            : "bg-gray-100 text-gray-800"
        }`}
      >

        <p className="text-xs font-semibold mb-1">
          {msg.sender}
        </p>

        <p>{msg.message}</p>

        {msg.proposedCpi  && (

          <p className="mt-2 font-bold">
            Offer: ₹{msg.proposedCpi}
          </p>

        )}

      </div>

    ))}

  </div>

  {/* INPUT */}
  <div className="border-t border-gray-200 p-4 flex flex-col md:flex-row gap-3">

    <input
      type="text"
      placeholder="Type message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="flex-1 border rounded-xl px-4 py-3"
    />

    <input
      type="number"
      placeholder="Offer"
      value={offer}
      onChange={(e) => setOffer(e.target.value)}
      className="w-full md:w-32 border rounded-xl px-4 py-3"
    />

    <button
      onClick={sendNegotiation}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full md:w-auto"
    >
      Send
    </button>

  </div>
<div className="border-t border-gray-200 p-4">

  <div className="flex flex-wrap gap-3 w-full lg:w-auto">

    <input
      type="number"
      placeholder="Final agreed amount"
      value={finalAmount}
      onChange={(e) => setFinalAmount(e.target.value)}
      className="flex-1 border rounded-xl px-4 py-3"
    />

    <button
      onClick={acceptNegotiation}
      className="bg-green-600 text-white px-6 rounded-xl"
    >
      Accept Deal
    </button>

    <button
      onClick={handleReject}
      className="bg-red-600 text-white px-6 rounded-xl"
    >
      Reject
    </button>

  </div>

</div>
</div>

)}

{project.status === "ACCEPTED" && (

  <div className="border border-green-200 bg-green-50 rounded-2xl p-6 mt-8">

    <h3 className="text-lg font-semibold text-green-800 mb-4">
      Cost Accepted
    </h3>

    <div className="space-y-3 text-sm">

      <div className="flex justify-between">
        <span className="text-gray-600">
          Final Agreed CPI
        </span>

        <span className="font-bold text-green-700">
          ₹{project.budget}
        </span>
      </div>

     

    </div>

  </div>

)}







{/* REDIRECT LINKS */}
{project.status === "TESTING" && project.redirects && (
  <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white mb-8">

    <div className="px-6 py-5 border-b border-gray-200">
      <h3 className="font-semibold text-lg">
        Redirect Links
      </h3>
    </div>

    <div className="p-6 space-y-6">

      <ModernLinkBox
        label="Complete Redirect"
        badge="COMPLETE"
        badgeColor="bg-green-100 text-green-700"
        url={`${base}/redirect/c?tk=${project.redirects.complete?.token}`}
      />

      <ModernLinkBox
        label="Disqualified Redirect"
        badge="DQ"
        badgeColor="bg-red-100 text-red-700"
        url={`${base}/redirect/dq?tk=${project.redirects.disqualified?.token}`}
      />

      <ModernLinkBox
        label="Quota Full Redirect"
        badge="QF"
        badgeColor="bg-yellow-100 text-yellow-700"
        url={`${base}/redirect/qf?tk=${project.redirects.quotaFull?.token}`}
      />

    </div>
  </div>
)}
{project.status === "TESTING" && (
<div className="border border-gray-200 rounded-2xl overflow-hidden bg-white mb-8">

  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
    <h3 className="font-semibold text-lg">Survey Links</h3>

    <span className="text-sm text-gray-500">
      3 endpoints
    </span>
  </div>

  <div className="p-6 space-y-6">

    {/* TEST LINK */}
    {project.surveyLinks?.test && (
      <ModernLinkBox
        label="Test Link"
        badge="TEST"
        badgeColor="bg-blue-100 text-blue-700"
        url={project.surveyLinks.test}
      />
    )}

    {/* LIVE LINK */}
    {project.surveyLinks?.live && (
      <ModernLinkBox
        label="Live Link"
        badge="LIVE"
        badgeColor="bg-green-100 text-green-700"
        url={project.surveyLinks.live}
      />
    )}

    {/* START LINK */}
    {project.redirects?.start?.token && (
      <ModernLinkBox
        label="Start Link — share with supplier"
        badge="SUPPLIER"
        badgeColor="bg-gray-100 text-gray-700"
        url={`${base}/redirect/start?tk=${project.redirects.start?.token}`}
      />
    )}

  </div>
</div>
)}
{project.status === "LIVE" && (
  <div className="p-6 space-y-6">

    {/* TEST LINK */}
    {project.surveyLinks?.test && (
      <ModernLinkBox
        label="Test Link"
        badge="TEST"
        badgeColor="bg-blue-100 text-blue-700"
        url={project.surveyLinks.test}
      />
    )}

    {/* LIVE LINK */}
    {project.surveyLinks?.live && (
      <ModernLinkBox
        label="Live Link"
        badge="LIVE"
        badgeColor="bg-green-100 text-green-700"
        url={project.surveyLinks.live}
      />
    )}

    {/* START LINK */}
    {project.redirects?.start?.token && (
      <ModernLinkBox
        label="Start Link — share with supplier"
        badge="SUPPLIER"
        badgeColor="bg-gray-100 text-gray-700"
        url={`${base}/redirect/start?tk=${project.redirects.start?.token}`}
      />
    )}

  </div>
)}
{project.status === "LIVE" && (
  <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">

    <div className="px-6 py-5 border-b border-gray-200">
      <h3 className="font-semibold text-lg">
        Live Stats
      </h3>
    </div>

    <div className="divide-y divide-gray-200 text-sm">

      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
        <span className="text-gray-500">Total Responses</span>
        <span className="font-semibold">
          {project.totalResponses}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
        <span className="text-gray-500">Completes</span>
        <span className="font-semibold">
          {project.completes}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
        <span className="text-gray-500">Disqualified</span>
        <span className="font-semibold">
          {project.disqualified}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 sm:px-6 py-4">
        <span className="text-gray-500">Quota Full</span>
        <span className="font-semibold">
          {project.quotaFull}
        </span>
      </div>

    </div>
     
  </div>
  
)}
    </div>
    
  );
}

function LinkBox({ label, url }) {
  return (
    <div className="flex justify-between border p-2 rounded">
      <span>{label}</span>
      <input value={url} readOnly className="text-xs w-[250px]" />
    </div>
  );
}


function ModernLinkBox({
  label,
  badge,
  badgeColor,
  url,
}) {
  const copyLink = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <p className="text-sm font-medium text-gray-700">
          {label}
        </p>

        <span
          className={`text-[10px] px-2 py-1 rounded font-semibold ${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      <div className="flex flex-col md:flex-row border border-gray-200 rounded-xl overflow-hidden w-full">

        <input
          value={url}
          readOnly
          className="flex-1 px-4 py-3 outline-none text-sm min-w-0 w-full overflow-hidden text-ellipsis"
        />

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-3 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 hover:bg-gray-50 shrink-0"
        >
          ↗
        </a>

        <button
          onClick={copyLink}
         className="px-4 py-3 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 hover:bg-gray-50 shrink-0"
        >
          Copy
        </button>

      </div>
    </div>
  );
}