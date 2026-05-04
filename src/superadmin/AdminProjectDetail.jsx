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


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function AdminProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  // useEffect(() => {
  //   fetchProject();
  // }, [id]);
  useEffect(() => {
  fetchProject();

  const interval = setInterval(fetchProject, 5000);
  return () => clearInterval(interval);
}, [id]);

const moveToTesting = async () => {
  await api.put(`/admin/project/${id}/move-testing`);
  fetchProject();
};

  const fetchProject = async () => {
    const res = await api.get(`/admin/project/${id}`);
    setProject(res.data);
    
  };
 
  if (!project) return <p>Loading...</p>;

  const steps = [
    "Project Created",
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

  const getStep = () => {
    switch (project.status) {
      case "DRAFT":
        return 0;
      case "TESTING":
        return 2;
      case "LIVE":
        return 3;
      case "HOLD":
        return 4;
      case "COMPLETED":
        return 5;
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
    <div className="p-8">

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


<div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-2xl font-bold flex items-center gap-3">
      Project Detail
      <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
        ● Live
      </span>
    </h1>
    <p className="text-gray-500 text-sm mt-1">
      Healthcare · United States · Created May 2, 2026
    </p>
  </div>

  <div className="flex gap-3">
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
  </div>
</div>
<div className="border rounded-xl p-6 bg-white">
  <div className="flex justify-between items-center mb-4">
    <h3 className="font-semibold text-lg">Project Lifecycle</h3>
    <span className="text-sm text-gray-500">
      Step {activeStep + 1} of {steps.length}
    </span>
  </div>

  <div className="flex items-center justify-between">
    {steps.map((step, i) => (
      <div key={i} className="flex-1 flex items-center">
        
        {/* STEP */}
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

          <p className="text-xs mt-2 text-center">{step}</p>
        </div>

        {/* LINE */}
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
      {/* SUMMARY */}
      <div className="border rounded-2xl p-6 w-[350px] mb-6">
        <h3 className="font-semibold mb-4">Summary</h3>

        <div className="text-sm space-y-1">
          <p>Sector – {project.sector}</p>
          <p>Market – {project.market}</p>
          <p>Age – {project.ageFrom} to {project.ageTo}</p>
          <p>Completes – {project.completes}</p>
        </div>
      </div>

     

      {/* 🔥 REDIRECTS (ONLY AFTER ACCEPT) */}
      {project.status === "TESTING" && project.redirects && (
        <div className="space-y-2">

          <h3 className="font-semibold mb-2">Redirect Links</h3>

          <LinkBox
            label="Complete"
            url={`${base}/redirect/c?tk=${project.redirects.complete?.token}`}
          />

          <LinkBox
            label="Disqualified"
            url={`${base}/redirect/dq?tk=${project.redirects.disqualified?.token}`}
          />

          <LinkBox
            label="Quota Full"
            url={`${base}/redirect/qf?tk=${project.redirects.quotaFull?.token}`}
          />

        </div>
      )}

      {
        project.surveyLinks && (
          <div className="mt-6">
            <p>Test Link: {project.surveyLinks.test}</p>
            <p>Live Link: {project.surveyLinks.live}</p>
          </div>
        )
      }
     {project.clientKeysFile && (
        <a
          href={project.clientKeysFile}  
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline mt-4 block"
        >
          Download Client Keys
        </a>
      )}
{/* {project.status === "LIVE" && (
  <button onClick={moveToTesting}>
    Move to Testing 🚀
  </button>
)} */}
      <LinkBox
  label="Start Link (Give to Supplier)"
  url={`${base}/redirect/start?tk=${project.redirects.start?.token}`}
/>
{project.status === "TESTING" && (
  <div className="mb-6">
    <button
      onClick={goLive}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Move to Live 🚀
    </button>
  </div>
)}


{project.status === "LIVE" && (
  <div className="border rounded-2xl p-6 w-[350px] mt-6">
    <h3 className="font-semibold mb-4">Live Stats</h3>

    <div className="text-sm space-y-1">
      <p>Total Responses – {project.totalResponses}</p>
      <p>Completes – {project.completes}</p>
      <p>Disqualified – {project.disqualified}</p>
      <p>Quota Full – {project.quotaFull}</p>
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