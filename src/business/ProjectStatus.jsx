// import {useLocation} from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../services/api";
// export default function ProjectStatus(){
//    const { id } = useParams();
// const [project, setProject] = useState(null);
// const base = import.meta.env.VITE_API_URL;
// const [test, setTest] = useState("");
// const [live, setLive] = useState("");
// const [file, setFile] = useState(null);


// useEffect(() => {
//   fetchProject();
// }, []);
 
// const fetchProject = async () => {
//   const res = await api.get(`/projects/${id}`);
//   setProject(res.data);
//   setTest(res.data?.surveyLinks?.test || "");
//   setLive(res.data?.surveyLinks?.live || "");
// };
//     const steps = [
//         "Project Created",
//         "Cost Accepted",
//         "Testing Setup",
//         "Live",
//         "Hold",
//         "Completed",
//     ];

//     // const getStep = () =>{
//     //     switch(project?.status){
//     //         case "DRAFT":
//     //             return 0;
//     //         case "LIVE":
//     //             return 1;
//     //         case "HOLD":
//     //             return 4;
//     //         case "CLOSED":
//     //             return 5;
//     //         default:
//     //             return 0;
//     //     }
//     // };
//     const getStep = () => {
//   switch (project?.status) {
//     case "DRAFT":
//       return 0;
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
// const handleSave = async () => {
//   await api.put(`/projects/${id}/survey-links`, { test, live });
//   alert("Saved");

//   fetchProject(); 
// };

// const handleFile = (e) => {
//   setFile(e.target.files[0]);
// };

// const uploadFile = async () => {
//   const formData = new FormData();
//   formData.append("file", file);

//   await api.put(`/projects/${id}/upload-keys`, formData);
//   alert("Uploaded");
//   fetchProject();
// };
//     const activeStep = getStep();
    
//     return (
//   <div className="p-8">

//    <h1 className="text-2xl font-bold mb-2">
//   {project?.status === "LIVE"
//     ? "Project is Live"
//     : project?.status === "DRAFT"
//     ? "Waiting for Approval"
//     : project?.status === "HOLD"
//     ? "Project On Hold"
//     : "Project Closed"}
// </h1>
//     <p className="text-gray-500 mb-8">
//       Your project has been successfully sent for review.
//     </p>

//     {/* TIMELINE */}
//     <div className="flex items-center justify-between mb-10">
//       {steps.map((step, i) => (
//         <div key={i} className="flex-1 text-center">
//           <div
//             className={`w-4 h-4 mx-auto rounded-full mb-2 ${
//               i <= activeStep ? "bg-blue-600" : "bg-gray-300"
//             }`}
//           />
//           <p className="text-xs">{step}</p>
//         </div>
//       ))}
//     </div>

//     {/* SUMMARY */}
//     <div className="border rounded-2xl p-6 w-[350px]">
//       <h3 className="font-semibold mb-4">Summary</h3>

//       <div className="text-sm space-y-1">
//         <p>Sector – {project?.sector}</p>
//         <p>Market – {project?.market}</p>
//         <p>Age – {project?.ageFrom} to {project?.ageTo}</p>
//         <p>Gender – {project?.gender}</p>
//         <p>Completes – {project?.completes}</p>
//         <p>Incidence – {project?.incidence}%</p>
//         <p>LOI – {project?.loi} mins</p>
//         <p>Open Ended – {project?.openEnded}</p>
//         <p>
//           Devices – {Object.keys(project?.devices || {})
//             .filter(k => project.devices[k])
//             .join(", ")}
//         </p>
//         <p>Timeline – {project?.timeline} days</p>
//         <p>Budget – ${project?.budget}</p>
//       </div>
//     </div>

//     {/* 🔥 REDIRECTS (PUT HERE) */}
//     {project?.status === "LIVE" && project?.redirects && (
//       <div className="mt-8 border rounded-xl p-6 w-[500px]">

//         <h3 className="font-semibold mb-4">
//           Redirect Links
//         </h3>
         
//         <div className="space-y-3">

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

//       </div>
//     )}

//     <div className="mt-10 border p-6 rounded-xl w-[500px]">

//   <h3 className="font-semibold mb-4">
//     Insert your Survey Link Below
//   </h3>

//   <input
//     placeholder="Insert test link"
//     className="border w-full mb-3 p-2"
//     value={test}
//     onChange={(e) => setTest(e.target.value)}
//   />

//   <input
//     placeholder="Insert live link"
//     className="border w-full mb-3 p-2"
//     value={live}
//     onChange={(e) => setLive(e.target.value)}
//   />

//   <button
//     onClick={handleSave}
//     className="bg-blue-600 text-white px-4 py-2 rounded"
//   >
//     Submit
//   </button>

//   <div className="mt-4">
//     <input type="file" onChange={handleFile} />
//     <button
//   onClick={uploadFile}
//   className="bg-green-600 text-white px-4 py-2 rounded mt-2"
// >
//   Upload Keys
// </button>
//   </div>

// </div>

//   </div>
// );
// }


// function LinkBox({ label, url }) {
//   const copy = () => {
//     navigator.clipboard.writeText(url);
//     alert("Copied!");
//   };

//   return (
//     <div className="flex justify-between items-center border p-2 rounded">
//       <span className="text-sm">{label}</span>

//       <div className="flex gap-2">
//         <input
//           value={url}
//           readOnly
//           className="text-xs w-[260px] border px-2"
//         />

//         <button
//           onClick={copy}
//           className="bg-black text-white px-3 py-1 text-xs"
//         >
//           Copy
//         </button>
//       </div>
//     </div>
//   );
// }

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProjectStatus() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const base = import.meta.env.VITE_API_URL;

  const [test, setTest] = useState("");
  const [live, setLive] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    const res = await api.get(`/projects/${id}`);
    setProject(res.data);
    setTest(res.data?.surveyLinks?.test || "");
    setLive(res.data?.surveyLinks?.live || "");
  };

  const steps = [
    "Project Created",
    "Cost Accepted",
    "Testing Setup",
    "Live",
    "Hold",
    "Completed",
  ];

  const getStep = () => {
    switch (project?.status) {
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

  const activeStep = getStep();

  const handleSave = async () => {
    await api.put(`/projects/${id}/survey-links`, { test, live });
    alert("Saved & moved to TESTING");
    fetchProject();
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await api.put(`/projects/${id}/upload-keys`, formData);
    alert("Uploaded");
    fetchProject();
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="p-8">

      {/* ✅ STATUS FIX */}
      <h1 className="text-2xl font-bold mb-2">
        {project.status === "LIVE"
          ? "Project is Live"
          : project.status === "TESTING"
          ? "Testing Phase"
          : project.status === "DRAFT"
          ? "Waiting for Approval"
          : project.status === "HOLD"
          ? "Project On Hold"
          : "Project Closed"}
      </h1>

      <p className="text-gray-500 mb-8">
        Your project has been successfully sent for review.
      </p>

      {/* TIMELINE */}
      <div className="flex items-center justify-between mb-10">
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
      <div className="border rounded-2xl p-6 w-[350px]">
        <h3 className="font-semibold mb-4">Summary</h3>

        <div className="text-sm space-y-1">
          <p>Sector – {project.sector}</p>
          <p>Market – {project.market}</p>
          <p>Age – {project.ageFrom} to {project.ageTo}</p>
          <p>Gender – {project.gender}</p>
          <p>Completes – {project.completes}</p>
          <p>Incidence – {project.incidence}%</p>
          <p>LOI – {project.loi} mins</p>
          <p>Open Ended – {project.openEnded}</p>
          <p>
            Devices – {Object.keys(project.devices || {})
              .filter(k => project.devices[k])
              .join(", ")}
          </p>
          <p>Timeline – {project.timeline} days</p>
          <p>Budget – ${project.budget}</p>
        </div>
      </div>

      {/* 🔥 REDIRECTS (TESTING + LIVE) */}
      {project.status !== "DRAFT" && project.redirects && (
        <div className="mt-8 border rounded-xl p-6 w-[500px]">

          <h3 className="font-semibold mb-4">
            Redirect Links
          </h3>

          <div className="space-y-3">

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
        </div>
      )}

      {/* 🔥 COUNTS ONLY IN LIVE */}
      {project.status === "LIVE" && (
        <div className="mt-4 border p-4 rounded bg-gray-50 w-[500px]">
          <p>✅ Completes: {project.completes}</p>
          <p>❌ Disqualified: {project.disqualified}</p>
          <p>⚠️ Quota Full: {project.quotaFull}</p>
        </div>
      )}

      {/* INPUT SECTION */}
      <div className="mt-10 border p-6 rounded-xl w-[500px]">

        <h3 className="font-semibold mb-4">
          Insert your Survey Link Below
        </h3>

        <input
          placeholder="Insert test link"
          className="border w-full mb-3 p-2"
          value={test}
          onChange={(e) => setTest(e.target.value)}
        />

        <input
          placeholder="Insert live link"
          className="border w-full mb-3 p-2"
          value={live}
          onChange={(e) => setLive(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>

        <div className="mt-4">
          <input type="file" onChange={handleFile} />

          <button
            onClick={uploadFile}
            className="bg-green-600 text-white px-4 py-2 rounded mt-2"
          >
            Upload Keys
          </button>
        </div>

      </div>
    </div>
  );
}

function LinkBox({ label, url }) {
  const copy = () => {
    navigator.clipboard.writeText(url);
    alert("Copied!");
  };

  return (
    <div className="flex justify-between items-center border p-2 rounded">
      <span className="text-sm">{label}</span>

      <div className="flex gap-2">
        <input
          value={url}
          readOnly
          className="text-xs w-[260px] border px-2"
        />

        <button
          onClick={copy}
          className="bg-black text-white px-3 py-1 text-xs"
        >
          Copy
        </button>
      </div>
    </div>
  );
}