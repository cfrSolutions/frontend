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

      <h1 className="text-2xl font-bold mb-2">
        Project Detail
      </h1>

      {/* TIMELINE */}
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
{project.status === "DRAFT" && (
  <button onClick={moveToTesting}>
    Move to Testing 🚀
  </button>
)}
      <LinkBox
  label="Start Link (Give to Supplier)"
  url={`${base}/redirect/start?tk=${project.redirects.complete?.token}`}
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