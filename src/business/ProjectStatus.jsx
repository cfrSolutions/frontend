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
//   ? "Project is Live"
//   : project?.status === "TESTING"
//   ? "Testing in Progress"
//   : project?.status === "DRAFT"
//   ? "Waiting for Approval"
//   : project?.status === "HOLD"
//   ? "Project On Hold"
//   : "Project Completed"}
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
//     {project?.status === "TESTING" && project?.redirects && (
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



import {useLocation} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
export default function ProjectStatus(){
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

    // const getStep = () =>{
    //     switch(project?.status){
    //         case "DRAFT":
    //             return 0;
    //         case "LIVE":
    //             return 1;
    //         case "HOLD":
    //             return 4;
    //         case "CLOSED":
    //             return 5;
    //         default:
    //             return 0;
    //     }
    // };
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
const handleSave = async () => {
  await api.put(`/projects/${id}/survey-links`, { test, live });
  alert("Saved");

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
    const activeStep = getStep();
    
    return (
  <div className="p-8">

  {/* HEADER */}
<div className="flex items-start justify-between mb-8">

  <div>
    <div className="flex items-center gap-3 mb-2">

      <h1 className="text-3xl font-bold text-gray-900">

        {project?.status === "LIVE"
          ? "Project is Live"
          : project?.status === "TESTING"
          ? "Testing in Progress"
          : project?.status === "DRAFT"
          ? "Waiting for Approval"
          : project?.status === "HOLD"
          ? "Project On Hold"
          : "Project Completed"}

      </h1>

      <span
        className={`text-sm px-3 py-1 rounded-full capitalize font-medium
        ${
          project?.status === "LIVE"
            ? "bg-green-100 text-green-700"
            : project?.status === "TESTING"
            ? "bg-yellow-100 text-yellow-700"
            : project?.status === "HOLD"
            ? "bg-gray-200 text-gray-700"
            : project?.status === "COMPLETED"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        ● {project?.status?.toLowerCase()}
      </span>

    </div>

    <p className="text-gray-500">
      Your project has been successfully sent for review.
    </p>
  </div>

</div>



{/* TIMELINE */}
<div className="border border-gray-200 rounded-2xl p-8 bg-white mb-10">

  <div className="flex justify-between items-center mb-8">

    <h3 className="text-xl font-semibold text-gray-900">
      Project Lifecycle
    </h3>

    <span className="text-sm text-gray-500">
      Step {activeStep + 1} of {steps.length}
    </span>

  </div>

  <div className="flex items-center justify-between">

    {steps.map((step, i) => (

      <div
        key={i}
        className="flex items-center flex-1"
      >

        {/* STEP */}
        <div className="flex flex-col items-center flex-1">

          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300

            ${
              i < activeStep
                ? "bg-blue-600 border-blue-600 text-white"
                : i === activeStep
                ? "border-blue-600 text-blue-600 bg-blue-50"
                : "border-gray-300 text-gray-400"
            }`}
          >

            {i < activeStep ? "✓" : i + 1}

          </div>

          <p
            className={`text-sm mt-3 text-center max-w-[100px]

            ${
              i <= activeStep
                ? "text-gray-900 font-medium"
                : "text-gray-400"
            }`}
          >
            {step}
          </p>

        </div>

        {/* LINE */}
        {i !== steps.length - 1 && (

          <div
            className={`h-[3px] flex-1 mx-3 rounded-full

            ${
              i < activeStep
                ? "bg-blue-600"
                : "bg-gray-200"
            }`}
          />

        )}

      </div>

    ))}

  </div>

</div>

    <div className="border rounded-2xl p-6 w-[350px]">
      <h3 className="font-semibold mb-4">Summary</h3>

      <div className="text-sm space-y-1">
        <p>Sector – {project?.sector}</p>
        <p>Market – {project?.market}</p>
        <p>Age – {project?.ageFrom} to {project?.ageTo}</p>
        <p>Gender – {project?.gender}</p>
        <p>Completes – {project?.completes} / {project?.targetCompletes}</p>
        <p>Incidence – {project?.incidence}%</p>
        <p>LOI – {project?.loi} mins</p>
        <p>Open Ended – {project?.openEnded}</p>
        <p>
          Devices – {Object.keys(project?.devices || {})
            .filter(k => project.devices[k])
            .join(", ")}
        </p>
        <p>Timeline – {project?.timeline} days</p>
        <p>Budget – ${project?.budget}</p>
      </div>
    </div>


    {project?.status === "TESTING" && project?.redirects && (
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

{project.status === "LIVE" && (
  <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">

    <div className="px-6 py-5 border-b border-gray-200">
      <h3 className="font-semibold text-lg">
        Live Stats
      </h3>
    </div>

    <div className="divide-y divide-gray-200 text-sm">

      <div className="flex justify-between px-6 py-4">
        <span className="text-gray-500">Total Responses</span>
        <span className="font-semibold">
          {project.totalResponses}
        </span>
      </div>

      <div className="flex justify-between px-6 py-4">
        <span className="text-gray-500">Completes</span>
        <span className="font-semibold">
          {project.completes}
        </span>
      </div>

      <div className="flex justify-between px-6 py-4">
        <span className="text-gray-500">Disqualified</span>
        <span className="font-semibold">
          {project.disqualified}
        </span>
      </div>

      <div className="flex justify-between px-6 py-4">
        <span className="text-gray-500">Quota Full</span>
        <span className="font-semibold">
          {project.quotaFull}
        </span>
      </div>

    </div>
  </div>
)}

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
