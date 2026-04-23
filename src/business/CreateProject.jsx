import { useState } from "react";
import api from "../services/api";

export default function CreateProject() {
  const [form, setForm] = useState({
    sector: "",
    market: "",
    completes: 90,
    ageFrom: 18,
    ageTo: 63,
    gender: "All",
    loi: 90,
    incidence: 90,
    timeline: 90,
    openEnded: 2,
    budget: 18,
    description: "",
    devices: {
      mobile: true,
      desktop: true,
      tablet: true,
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDevice = (type) => {
    setForm({
      ...form,
      devices: {
        ...form.devices,
        [type]: !form.devices[type],
      },
    });
  };

  const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token"); // 🔥 get token
    //console.log("TOKEN 👉", token); 
    await api.post(
      "/projects/create",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 SEND TOKEN
        },
      }
    );

    // alert("✅ Project Created Successfully");
         navigate(`/business/project/${res.data._id}/status`, {
      state: { project: res.data }
    });
  } catch (err) {
    console.log(err);
    alert("❌ Error creating project");
  }
};

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-5xl mx-auto">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-2">Create New Project</h1>
      <p className="text-gray-500 mb-6">
        Fill details to create your research project
      </p>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT */}
        <div className="space-y-4">

          <div className="flex gap-4">
            <select name="sector" onChange={handleChange} className="border p-2 w-full rounded">
              <option value="">Sector</option>
              <option>Automobile</option>
              <option>Healthcare</option>
            </select>

            <select name="market" onChange={handleChange} className="border p-2 w-full rounded">
              <option value="">Market</option>
              <option>India</option>
              <option>USA</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span>Age</span>
            <input type="number" name="ageFrom" value={form.ageFrom} onChange={handleChange} className="border p-1 w-16" />
            <span>to</span>
            <input type="number" name="ageTo" value={form.ageTo} onChange={handleChange} className="border p-1 w-16" />
          </div>

          <select name="gender" onChange={handleChange} className="border p-2 w-full rounded">
            <option>All</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          {/* DEVICES */}
          <div>
            <p className="mb-2 font-medium">Device Convenience</p>
            <div className="flex gap-4">
              {["mobile", "desktop", "tablet"].map((d) => (
                <label key={d} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.devices[d]}
                    onChange={() => handleDevice(d)}
                  />
                  {d}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span>Open Ended</span>
            <input
              type="number"
              name="openEnded"
              value={form.openEnded}
              onChange={handleChange}
              className="border p-1 w-16"
            />
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-4">

          <div>
            <label>Completes</label>
            <input type="number" name="completes" value={form.completes} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          <div>
            <label>LOI (mins)</label>
            <input type="number" name="loi" value={form.loi} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          <div>
            <label>Incidence %</label>
            <input type="number" name="incidence" value={form.incidence} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          <div>
            <label>Timeline (days)</label>
            <input type="number" name="timeline" value={form.timeline} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

        </div>

      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <textarea
          name="description"
          maxLength={1000}
          placeholder="Describe your target audience..."
          onChange={handleChange}
          className="w-full border p-3 rounded h-28"
        />
        <p className="text-right text-xs text-gray-400">
          {form.description.length}/1000
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <label>Budget ($)</label>
          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="border p-2 ml-2 w-24"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Briefcase,
//   Globe,
//   Users,
//   Clock,
//   BarChart3,
//   Calendar,
//   Smartphone,
//   Monitor,
//   Tablet,
// } from "lucide-react";
// import api from "../services/api";

// export default function CreateProject() {
//   const [form, setForm] = useState({
//     sector: "",
//     market: "",
//     completes: 90,
//     ageFrom: 18,
//     ageTo: 63,
//     gender: "All",
//     loi: 90,
//     incidence: 90,
//     timeline: 90,
//     openEnded: 2,
//     budget: 18,
//     description: "",
//     devices: {
//       mobile: true,
//       desktop: true,
//       tablet: true,
//     },
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleDevice = (type) => {
//     setForm({
//       ...form,
//       devices: {
//         ...form.devices,
//         [type]: !form.devices[type],
//       },
//     });
//   };

//   const navigate = useNavigate();
//   const handleSubmit = async () => {
//   try {
//     const token = localStorage.getItem("token"); // 🔥 get token
//     //console.log("TOKEN 👉", token); 
//     await api.post(
//       "/projects/create",
//       form,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // 🔥 SEND TOKEN
//         },
//       }
//     );

//     // alert("✅ Project Created Successfully");
    //  navigate(`/business/project/${res.data._id}/status`, {
    //   state: { project: res.data }
    // });
//   } catch (err) {
//     console.log(err);
//     alert("❌ Error creating project");
//   }
// };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow max-w-5xl mx-auto">

//       {/* HEADER */}
//       <h1 className="text-2xl font-bold mb-2">Create New Project</h1>
//       <p className="text-gray-500 mb-6">
//         Fill details to create your research project
//       </p>

//       {/* GRID */}
//       <div className="grid md:grid-cols-2 gap-6">

//         {/* LEFT */}
//         <div className="space-y-4">
//           <h3 className="text-xs font-semibold mb-4 text-gray-500 flex items-center gap-2">
//             <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//             AUDIENCE
//           </h3>
//           <div className="flex gap-4">
//               <div className="w-full">
//               <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
//                 <Briefcase size={14} /> Sector
//               </label>
//               <select
//                 name="sector"
//                 onChange={handleChange}
//                 className="border rounded-lg px-3 py-2 w-full text-sm"
//               >
//                 <option value="">Select sector</option>
//                 <option>Automobile</option>
//                 <option>Healthcare</option>
//               </select>
//             </div>

//             <div className="w-full">
//               <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
//                 <Globe size={14} /> Market
//               </label>
//               <select
//                 name="market"
//                 onChange={handleChange}
//                 className="border rounded-lg px-3 py-2 w-full text-sm"
//               >
//                 <option value="">Select market</option>
//                 <option>India</option>
//                 <option>USA</option>
//               </select>
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="text-xs text-gray-500 mb-1 block">
//               Age range
//             </label>

//             <div className="flex items-center gap-3">
//               <input
//                 type="number"
//                 name="ageFrom"
//                 value={form.ageFrom}
//                 onChange={handleChange}
//                 className="border rounded px-3 py-2 w-20"
//               />
//               <span>to</span>
//               <input
//                 type="number"
//                 name="ageTo"
//                 value={form.ageTo}
//                 onChange={handleChange}
//                 className="border rounded px-3 py-2 w-20"
//               />
//               <span className="text-xs text-gray-400">years</span>
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="text-xs text-gray-500 mb-1 block">
//               Gender
//             </label>
//             <select
//               name="gender"
//               onChange={handleChange}
//               className="border rounded-lg px-3 py-2 w-full text-sm"
//             >
//               <option>All</option>
//               <option>Male</option>
//               <option>Female</option>
//             </select>
//           </div>
//           {/* DEVICES */}
//           <div className="mb-4">
//             <label className="text-xs text-gray-500 mb-2 block">
//               Device compatibility
//             </label>

//             <div className="flex gap-3">

//               {[
//                 { key: "mobile", icon: Smartphone },
//                 { key: "desktop", icon: Monitor },
//                 { key: "tablet", icon: Tablet },
//               ].map(({ key, icon: Icon }) => (
//                 <button
//                   key={key}
//                   onClick={() => handleDevice(key)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm capitalize transition
//                     ${
//                       form.devices[key]
//                         ? "bg-blue-50 border-blue-500 text-blue-600"
//                         : "border-gray-300"
//                     }`}
//                 >
//                   <Icon size={14} />
//                   {key}
//                 </button>
//               ))}

//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//            <label className="text-xs text-gray-500">
//               Open-ended questions
//             </label>
//             <input
//               type="number"
//               name="openEnded"
//               value={form.openEnded}
//               onChange={handleChange}
//               className="border rounded px-3 py-2 w-24 mt-1"
//             />
//           </div>

//         </div>

//         {/* RIGHT */}
//         <div className="space-y-4">

//          <div>
//           <h3 className="text-xs font-semibold mb-4 text-gray-500 flex items-center gap-2">
//             <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//             PROJECT PARAMETERS
//           </h3>

//           {[
//             { label: "Completes", name: "completes", icon: Users },
//             { label: "LOI (minutes)", name: "loi", icon: Clock },
//             { label: "Incidence (%)", name: "incidence", icon: BarChart3 },
//             { label: "Timeline (days)", name: "timeline", icon: Calendar },
//           ].map(({ label, name, icon: Icon }) => (
//             <div key={name} className="mb-4">
//               <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
//                 <Icon size={14} />
//                 {label}
//               </label>

//               <input
//                 type="number"
//                 name={name}
//                 value={form[name]}
//                 onChange={handleChange}
//                 className="border rounded-lg px-3 py-2 w-full"
//               />
//             </div>
//           ))}
//         </div>

//         </div>

//       </div>

//       {/* DESCRIPTION */}
//       <div className="mt-6">
//         <label className="text-xs text-gray-500">
//           Target audience description
//         </label>

//         <textarea
//           name="description"
//           maxLength={1000}
//           placeholder="Describe your target audience, key characteristics, behaviors..."
//           onChange={handleChange}
//           className="w-full border rounded-xl p-3 mt-2 h-32"
//         />

//         <p className="text-right text-xs text-gray-400">
//           {form.description.length}/1000
//         </p>
//       </div>

//       {/* FOOTER */}
//       <div className="flex justify-between items-center mt-6">
//         <div>
//           <label>Budget ($)</label>
//           <input
//             type="number"
//             name="budget"
//             value={form.budget}
//             onChange={handleChange}
//             className="border rounded px-3 py-2 ml-3 w-24 mt-1"
//           />
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import {
//   Briefcase,
//   Globe,
//   Users,
//   Clock,
//   BarChart3,
//   Calendar,
//   Smartphone,
//   Monitor,
//   Tablet,
// } from "lucide-react";
// import api from "../services/api";

// export default function CreateProject() {
//   const [form, setForm] = useState({
//     sector: "",
//     market: "",
//     completes: 90,
//     ageFrom: 18,
//     ageTo: 63,
//     gender: "All",
//     loi: 90,
//     incidence: 90,
//     timeline: 90,
//     openEnded: 2,
//     budget: 18,
//     description: "",
//     devices: {
//       mobile: true,
//       desktop: true,
//       tablet: true,
//     },
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleDevice = (type) => {
//     setForm({
//       ...form,
//       devices: {
//         ...form.devices,
//         [type]: !form.devices[type],
//       },
//     });
//   };

//   const handleSubmit = async () => {
//   try {
//     const token = localStorage.getItem("token"); // 🔥 get token
//     //console.log("TOKEN 👉", token); 
//     await api.post(
//       "/projects/create",
//       form,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // 🔥 SEND TOKEN
//         },
//       }
//     );

//     alert("✅ Project Created Successfully");
//   } catch (err) {
//     console.log(err);
//     alert("❌ Error creating project");
//   }
// };

//   return (
//   <div className="max-w-6xl mx-auto p-6">
//     <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">

//       {/* HEADER */}
//       <h1 className="text-2xl font-semibold mb-1">
//         Create New Project
//       </h1>
//       <p className="text-gray-500 text-sm mb-6">
//         Fill in the details below to launch your research project.
//       </p>

//       <div className="grid md:grid-cols-2 gap-10">

//         {/* ================= LEFT ================= */}
//         <div>
//           <h3 className="text-sm font-semibold mb-4 text-gray-600">
//             AUDIENCE
//           </h3>

//           {/* Sector + Market */}
//           <div className="flex gap-4 mb-4">
//             <select
//               name="sector"
//               onChange={handleChange}
//               className="border rounded-lg px-3 py-2 w-full text-sm"
//             >
//               <option value="">Select sector</option>
//               <option>Automobile</option>
//               <option>Healthcare</option>
//             </select>

//             <select
//               name="market"
//               onChange={handleChange}
//               className="border rounded-lg px-3 py-2 w-full text-sm"
//             >
//               <option value="">Select market</option>
//               <option>India</option>
//               <option>USA</option>
//             </select>
//           </div>

//           {/* Age */}
//           <div className="flex items-center gap-3 mb-4">
//             <span className="text-sm">Age</span>
//             <input
//               type="number"
//               name="ageFrom"
//               value={form.ageFrom}
//               onChange={handleChange}
//               className="border rounded px-2 py-1 w-16"
//             />
//             <span>to</span>
//             <input
//               type="number"
//               name="ageTo"
//               value={form.ageTo}
//               onChange={handleChange}
//               className="border rounded px-2 py-1 w-16"
//             />
//             <span className="text-sm text-gray-500">years</span>
//           </div>

//           {/* Gender */}
//           <select
//             name="gender"
//             onChange={handleChange}
//             className="border rounded-lg px-3 py-2 w-full mb-4 text-sm"
//           >
//             <option>All</option>
//             <option>Male</option>
//             <option>Female</option>
//           </select>

//           {/* Devices */}
//           <div className="mb-4">
//             <p className="text-sm font-medium mb-2">Device compatibility</p>

//             <div className="flex gap-3">
//               {["mobile", "desktop", "tablet"].map((d) => (
//                 <button
//                   key={d}
//                   onClick={() => handleDevice(d)}
//                   className={`px-4 py-2 rounded-lg border text-sm capitalize transition
//                     ${
//                       form.devices[d]
//                         ? "bg-blue-50 border-blue-500 text-blue-600"
//                         : "border-gray-300"
//                     }`}
//                 >
//                   {d}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Open ended */}
//           <div className="mb-4">
//             <label className="text-sm">Open-ended questions</label>
//             <input
//               type="number"
//               name="openEnded"
//               value={form.openEnded}
//               onChange={handleChange}
//               className="border rounded px-2 py-1 w-20 ml-3"
//             />
//           </div>
//         </div>

//         {/* ================= RIGHT ================= */}
//         <div>
//           <h3 className="text-sm font-semibold mb-4 text-gray-600">
//             PROJECT PARAMETERS
//           </h3>

//           {[
//             { label: "Completes", name: "completes" },
//             { label: "LOI (minutes)", name: "loi" },
//             { label: "Incidence (%)", name: "incidence" },
//             { label: "Timeline (days)", name: "timeline" },
//           ].map((item) => (
//             <div key={item.name} className="mb-4">
//               <label className="text-sm text-gray-600">
//                 {item.label}
//               </label>
//               <input
//                 type="number"
//                 name={item.name}
//                 value={form[item.name]}
//                 onChange={handleChange}
//                 className="border rounded-lg px-3 py-2 w-full"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* DESCRIPTION */}
//       <div className="mt-6">
//         <label className="text-sm text-gray-600">
//           Target audience description
//         </label>

//         <textarea
//           name="description"
//           maxLength={1000}
//           placeholder="Describe your target audience..."
//           onChange={handleChange}
//           className="w-full border rounded-xl p-3 mt-2 h-32"
//         />

//         <p className="text-right text-xs text-gray-400">
//           {form.description.length}/1000
//         </p>
//       </div>

//       {/* FOOTER */}
//       <div className="flex justify-between items-center mt-6 border-t pt-4">

//         <div className="text-sm">
//           <span className="text-gray-500">Estimated budget</span>
//           <div className="font-semibold text-lg">${form.budget}</div>
//         </div>

//         <div className="flex gap-3">
//           <button className="px-4 py-2 border rounded-lg text-sm">
//             Save draft
//           </button>

//           <button
//             onClick={handleSubmit}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Submit Project
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }