// import { useState } from "react";
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

//     // alert("✅ Project Created Successfully");
//          navigate(`/business/project/${res.data._id}/status`, {
//       state: { project: res.data }
//     });
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

//           <div className="flex gap-4">
//             <select name="sector" onChange={handleChange} className="border p-2 w-full rounded">
//               <option value="">Sector</option>
//               <option>Automobile</option>
//               <option>Healthcare</option>
//             </select>

//             <select name="market" onChange={handleChange} className="border p-2 w-full rounded">
//               <option value="">Market</option>
//               <option>India</option>
//               <option>USA</option>
//             </select>
//           </div>

//           <div className="flex items-center gap-2">
//             <span>Age</span>
//             <input type="number" name="ageFrom" value={form.ageFrom} onChange={handleChange} className="border p-1 w-16" />
//             <span>to</span>
//             <input type="number" name="ageTo" value={form.ageTo} onChange={handleChange} className="border p-1 w-16" />
//           </div>

//           <select name="gender" onChange={handleChange} className="border p-2 w-full rounded">
//             <option>All</option>
//             <option>Male</option>
//             <option>Female</option>
//           </select>

//           {/* DEVICES */}
//           <div>
//             <p className="mb-2 font-medium">Device Convenience</p>
//             <div className="flex gap-4">
//               {["mobile", "desktop", "tablet"].map((d) => (
//                 <label key={d} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={form.devices[d]}
//                     onChange={() => handleDevice(d)}
//                   />
//                   {d}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <span>Open Ended</span>
//             <input
//               type="number"
//               name="openEnded"
//               value={form.openEnded}
//               onChange={handleChange}
//               className="border p-1 w-16"
//             />
//           </div>

//         </div>

//         {/* RIGHT */}
//         <div className="space-y-4">

//           <div>
//             <label>Completes</label>
//             <input type="number" name="completes" value={form.completes} onChange={handleChange} className="border p-2 w-full rounded" />
//           </div>

//           <div>
//             <label>LOI (mins)</label>
//             <input type="number" name="loi" value={form.loi} onChange={handleChange} className="border p-2 w-full rounded" />
//           </div>

//           <div>
//             <label>Incidence %</label>
//             <input type="number" name="incidence" value={form.incidence} onChange={handleChange} className="border p-2 w-full rounded" />
//           </div>

//           <div>
//             <label>Timeline (days)</label>
//             <input type="number" name="timeline" value={form.timeline} onChange={handleChange} className="border p-2 w-full rounded" />
//           </div>

//         </div>

//       </div>

//       {/* DESCRIPTION */}
//       <div className="mt-6">
//         <textarea
//           name="description"
//           maxLength={1000}
//           placeholder="Describe your target audience..."
//           onChange={handleChange}
//           className="w-full border p-3 rounded h-28"
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
//             className="border p-2 ml-2 w-24"
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







// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { formatInTimeZone } from "date-fns-tz";
// import ct from "countries-and-timezones";
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

// const countries = [
//   { code: "US", name: "United States" },
//   { code: "CA", name: "Canada" },
//   { code: "MX", name: "Mexico" },

//   { code: "GB", name: "United Kingdom" },
//   { code: "DE", name: "Germany" },
//   { code: "FR", name: "France" },
//   { code: "ES", name: "Spain" },
//   { code: "IT", name: "Italy" },
//   { code: "NL", name: "Netherlands" },
//   { code: "SE", name: "Sweden" },
//   { code: "NO", name: "Norway" },
//   { code: "DK", name: "Denmark" },
//   { code: "FI", name: "Finland" },
//   { code: "PL", name: "Poland" },

//   { code: "IN", name: "India" },
//   { code: "CN", name: "China" },
//   { code: "JP", name: "Japan" },
//   { code: "KR", name: "South Korea" },
//   { code: "SG", name: "Singapore" },
//   { code: "ID", name: "Indonesia" },
//   { code: "PH", name: "Philippines" },
//   { code: "TH", name: "Thailand" },
//   { code: "VN", name: "Vietnam" },
//   { code: "MY", name: "Malaysia" },

//   { code: "AU", name: "Australia" },
//   { code: "NZ", name: "New Zealand" },

//   { code: "BR", name: "Brazil" },
//   { code: "AR", name: "Argentina" },
//   { code: "CL", name: "Chile" },
//   { code: "CO", name: "Colombia" },
//   { code: "PE", name: "Peru" },

//   { code: "AE", name: "United Arab Emirates" },
//   { code: "SA", name: "Saudi Arabia" },
//   { code: "ZA", name: "South Africa" },
// ];


// export default function CreateProject() {
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const timezones = Intl.supportedValuesOf("timeZone");
//   const countryTimezones = {
//   US: "America/Chicago",
//   IN: "Asia/Kolkata",
//   GB: "Europe/London",
//   CA: "America/Toronto",
//   AU: "Australia/Canberra",
//   SG: "Asia/Singapore",
//   JP: "Asia/Tokyo",
// };




//   const [form, setForm] = useState({
//     sector: "",
//     market: "",
//     targetCompletes: 90,
//     ageFrom: 18,
//     ageTo: 63,
//     gender: "All",
//     loi: 90,
//     incidence: 90,
//     timeline: 90,
//     openEnded: 2,
//     cpi: 0, 
//     totalCost: 0,
//     timezone: "Asia/Kolkata",
//   startTime: "09:00",
//   endTime: "18:00",
//   startDate: "",
//   endDate: "",
//     description: "",
//     devices: {
//       mobile: true,
//       desktop: true,
//       tablet: true,
//     },
//   });

// useEffect(() => {
//   if (form.market) {
//     setForm(prev => ({
//       ...prev,
//       timezone:
//         countryTimezones[form.market] || "UTC"
//     }));
//   }
// }, [form.market]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

// const marketTimezone =
//   countryTimezones[form.market] || "UTC";

// let convertedStart = "";
// let convertedEnd = "";

// if (
//   form.startDate &&
//   form.startTime &&
//   form.endDate &&
//   form.endTime
// ) {
//   const startDateTime = new Date(
//     `${form.startDate}T${form.startTime}`
//   );

//   const endDateTime = new Date(
//     `${form.endDate}T${form.endTime}`
//   );

//   convertedStart = formatInTimeZone(
//     startDateTime,
//     marketTimezone,
//     "MMM d, yyyy hh:mm a"
//   );

//   convertedEnd = formatInTimeZone(
//     endDateTime,
//     marketTimezone,
//     "MMM d, yyyy hh:mm a"
//   );
// }

//   const handleDevice = (type) => {
//     setForm({
//       ...form,
//       devices: {
//         ...form.devices,
//         [type]: !form.devices[type],
//       },
//     });
//   };

// useEffect(() => {

//   async function fetchCPI() {

//     try {

//       const res = await api.post(
//         "/projects/calculate-cpi",
//         {
//           country: form.market,
//           ir: Number(form.incidence),
//           loi: Number(form.loi),
//         }
//       );

//       const cpi = res.data.cpi;

//       setForm(prev => ({
//         ...prev,
//         cpi,
//         totalCost: cpi * prev.targetCompletes,
//       }));

//     } catch (err) {
//       console.log(err);
//     }
//   }

//   if (
//     form.market &&
//     form.incidence &&
//     form.loi
//   ) {
//     fetchCPI();
//   }

// }, [
//   form.market,
//   form.incidence,
//   form.loi,
//   form.targetCompletes
// ]);

//   const navigate = useNavigate();
//   const handleSubmit = async () => {
//   try {
//     const token = localStorage.getItem("token"); // 🔥 get token
    
//     const res = await api.post(
//       "/projects/create",
//       form,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // 🔥 SEND TOKEN
//         },
//       }
//     );

//     // alert("✅ Project Created Successfully");
//      navigate(`/business/dashboard/project/${res.data._id}/status`, {
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
//              <select
//   name="market"
//   value={form.market}
//   onChange={handleChange}
//   className="border rounded-lg px-3 py-2 w-full text-sm"
// >
//   <option value="">
//     Select market
//   </option>

//   {countries.map((country) => (
//     <option
//       key={country.code}
//       value={country.code}
//     >
//       {country.name}
//     </option>
//   ))}
// </select>
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
//                  type="button"
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
//             { label: "Target Completes", name: "targetCompletes", icon: Users },
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
//                 min={1}
//                 max={name === "loi" ? 45 : 100}
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
//       <div className="flex justify-between items-center mt-8 border-t pt-6">

//   <div className="flex gap-10">

//     <div>
//       <p className="text-sm text-gray-500">
//         CPI
//       </p>

//       <h2 className="text-3xl font-bold text-blue-600">
//         ${form.cpi || 0}
//       </h2>
//     </div>

//     <div>
//       <p className="text-sm text-gray-500">
//         Total Cost
//       </p>

//       <h2 className="text-3xl font-bold text-green-600">
//         ${form.totalCost || 0}
//       </h2>
//     </div>

//   </div>
// <button
//   type="button"
//   onClick={() => setShowAdvanced(true)}
//   className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg"
// >
//   Advanced
// </button>
//   <button
//     onClick={handleSubmit}
//     className="
//       bg-blue-600
//       hover:bg-blue-700
//       text-white
//       px-8
//       py-3
//       rounded-xl
//       font-medium
//     "
//   >
//     Launch Project
//   </button>

// </div>

//      {showAdvanced && (
//  <>
  
//     <div
//       onClick={() => setShowAdvanced(false)}
//       className="fixed inset-0 bg-black/30 z-40"
//     />
 

//   <div
//     className={`
//       fixed top-0 right-0 h-screen w-[650px]
//       bg-white z-50 shadow-2xl overflow-y-auto
//       transition-transform duration-300 ease-in-out
//       ${showAdvanced ? "translate-x-0" : "translate-x-full"}
//     `}
//   >
//       <div className="p-8">

//         <h2 className="text-4xl font-bold text-purple-800 mb-10">
//           Advanced Calendar
//         </h2>

//         {/* Date Range */}
//         <div className="mb-8">
//           <label className="block text-sm font-medium mb-2">
//             Start Date
//           </label>

//           <input
//             type="date"
//             value={form.startDate}
//   onChange={(e) =>
//     setForm({
//       ...form,
//       startDate: e.target.value,
//     })
//   }
//             className="w-full border-b py-2"
//           />
//         </div>

//           <div className="mb-8">
//           <label className="block text-sm font-medium mb-2">
//             End Date
//           </label>

//           <input
//   type="date"
//   value={form.endDate}
//   onChange={(e) =>
//     setForm({
//       ...form,
//       endDate: e.target.value,
//     })
//   }
// />
//         </div>

//         {/* Timezone */}
//         <div className="mb-8">
//           <label className="block text-sm font-medium mb-2">
//             TIMEZONE
//           </label>

//           <select
//   value={form.timezone}
//   onChange={(e) =>
//     setForm({
//       ...form,
//       timezone: e.target.value,
//     })
//   }
// >
//             {timezones.map((tz) => (
//     <option key={tz} value={tz}>
//       {tz}
//     </option>
//   ))}
//           </select>
//         </div>

//         {/* Start / End Time */}
//         <div className="grid grid-cols-2 gap-6 mb-8">

//           <div>
//             <label className="block text-sm font-medium mb-2">
//               START TIME
//             </label>

//             <input
//   type="time"
//   value={form.startTime}
//   onChange={(e) =>
//     setForm({
//       ...form,
//       startTime: e.target.value,
//     })
//   }
// />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">
//               END TIME
//             </label>

//            <input
//   type="time"
//   value={form.endTime}
//   onChange={(e) =>
//     setForm({
//       ...form,
//       endTime: e.target.value,
//     })
//   }
// />
//           </div>

//         </div>
// <h3>Convert timezone</h3>

// <table className="w-full mt-4">
//   <thead>
//     <tr>
//       <th></th>
//       <th>{form.timezone}</th>
//       <th>{marketTimezone}</th>
//     </tr>
//   </thead>

//   <tbody>
//     <tr>
//       <td>Start</td>
//       <td>{form.startTime}</td>
//       <td>{convertedStart || "-"}</td>
//     </tr>

//     <tr>
//       <td>End</td>
//       <td>{form.endTime}</td>
//      <td>{convertedEnd || "-"}</td>
//     </tr>
//   </tbody>
// </table>
//         {/* Footer */}
//         <div className="flex justify-end gap-4 mt-20">

//           <button
//           type="button"
//             onClick={() => setShowAdvanced(false)}
//             className="
//               border
//               border-purple-700
//               px-6
//               py-3
//               rounded
//             "
//           >
//             Cancel
//           </button>

//           <button
//           type="button"
//             onClick={() => setShowAdvanced(false)}
//             className="
//               bg-purple-700
//               text-white
//               px-6
//               py-3
//               rounded
//             "
//           >
//             Save
//           </button>

//         </div>

//       </div>
//     </div>
//   </>
// )}
//     </div>
//   );
// }

// function ProjectCard({ p }) {
//   return (
//     <div className="bg-white border p-4 rounded-xl shadow mb-3">
//       <h3 className="font-semibold">
//         {p.sector} - {p.market}
//       </h3>

//       <p className="text-sm text-gray-500">
//         Age: {p.ageFrom} - {p.ageTo}
//       </p>

//       <p className="text-sm mt-1">
//         Status: <span className="font-semibold">{p.status}</span>
//       </p>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import ct from "countries-and-timezones";
import {
  Briefcase,
  Globe,
  Users,
  Clock,
  BarChart3,
  Calendar,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import api from "../services/api";

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },

  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "PL", name: "Poland" },

  { code: "IN", name: "India" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "SG", name: "Singapore" },
  { code: "ID", name: "Indonesia" },
  { code: "PH", name: "Philippines" },
  { code: "TH", name: "Thailand" },
  { code: "VN", name: "Vietnam" },
  { code: "MY", name: "Malaysia" },

  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },

  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "PE", name: "Peru" },

  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "ZA", name: "South Africa" },
];


export default function CreateProject() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const timezones = Intl.supportedValuesOf("timeZone");
  const [marketTimezone, setMarketTimezone] = useState("");
//   const countryTimezones = {
//   US: "America/Chicago",
//   IN: "Asia/Kolkata",
//   GB: "Europe/London",
//   CA: "America/Toronto",
//   AU: "Australia/Canberra",
//   SG: "Asia/Singapore",
//   JP: "Asia/Tokyo",
// };
const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    sector: "",
    market: "",
    targetCompletes: 90,
    overQuotaAction: "QUOTA",
    ageFrom: 18,
    ageTo: 63,
    gender: "All",
    loi: 90,
    incidence: 90,
    timeline: 90,
    openEnded: 2,
    cpi: 0, 
    totalCost: 0,
    timezone: "Asia/Kolkata",
  startTime: "09:00",
  endTime: "18:00",
  startDate: "",
  endDate: "",
    description: "",
    devices: {
      mobile: true,
      desktop: true,
      tablet: true,
    },
  });
const getFieldError = (field) => {
  return errors[field] || "";
};


  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Clear field error when user changes it
  if (errors[name]) {
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }
};

const marketTimezones =
  form.market
    ? ct.getCountry(form.market)?.timezones || []
    : [];

let convertedStart = "";
let convertedEnd = "";

if (
  form.startDate &&
  form.startTime &&
  form.endDate &&
  form.endTime &&
  form.timezone &&
  marketTimezone
) {

  const startLocal =
    `${form.startDate} ${form.startTime}`;

  const endLocal =
    `${form.endDate} ${form.endTime}`;

  const startUtc =
    fromZonedTime(
      startLocal,
      form.timezone
    );

  const endUtc =
    fromZonedTime(
      endLocal,
      form.timezone
    );

  convertedStart =
    formatInTimeZone(
      startUtc,
      marketTimezone,
      "MMM d, yyyy HH:mm"
    );

  convertedEnd =
    formatInTimeZone(
      endUtc,
      marketTimezone,
      "MMM d, yyyy HH:mm"
    );
}


useEffect(() => {
  const zones =
    ct.getCountry(form.market)?.timezones || [];

  if (zones.length) {
    setMarketTimezone(zones[0]);
  }
}, [form.market]);

  const handleDevice = (type) => {
    setForm({
      ...form,
      devices: {
        ...form.devices,
        [type]: !form.devices[type],
      },
    });
  };

useEffect(() => {

  async function fetchCPI() {

    try {

      const res = await api.post(
        "/projects/calculate-cpi",
        {
          country: form.market,
          ir: Number(form.incidence),
          loi: Number(form.loi),
        }
      );

      const cpi = res.data.cpi;

      setForm(prev => ({
        ...prev,
        cpi,
        totalCost: cpi * prev.targetCompletes,
      }));

    } catch (err) {
      console.log(err);
    }
  }

  if (
    form.market &&
    form.incidence &&
    form.loi
  ) {
    fetchCPI();
  }

}, [
  form.market,
  form.incidence,
  form.loi,
  form.targetCompletes
]);

  const navigate = useNavigate();
  const handleSubmit = async () => {
  try {
    setErrors({});
    const token = localStorage.getItem("token"); // 🔥 get token
    
    const res = await api.post(
      "/projects/create",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 SEND TOKEN
        },
      }
    );

    // alert("✅ Project Created Successfully");
     navigate(`/business/dashboard/project/${res.data.project._id}/status`, {
  state: { project: res.data }
});

  } catch (err) {
    // console.log(err);
    const message =
      err.response?.data?.message ||
      "Something went wrong";

    /*
     * Your /create endpoint currently only validates
     * name/description, so these are general errors.
     */
    if (message === "Project name is required") {
      setErrors({
        name: message,
      });
      return;
    }

    if (message === "Invalid description") {
      setErrors({
        description: message,
      });
      return;
    }

    // General backend error
    setErrors({
      general: message,
    });
  
  }
};

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-8">
  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
    Create Project
  </h1>

  <p className="text-slate-500 mt-2">
    Configure your research project and audience requirements.
  </p>
</div>

      {/* GRID */}
     <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold mb-4 text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            AUDIENCE
          </h3>
          <div className="flex gap-4">
              <div className="w-full">
              <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                <Briefcase size={14} /> Sector
              </label>
              <select
                name="sector"
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full text-sm"
              >
                <option value="">Select sector</option>
                <option>Automobile</option>
                <option>Healthcare</option>
              </select>
            </div>

            <div className="w-full">
              <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                <Globe size={14} /> Market
              </label>
             <select
  name="market"
  value={form.market}
  onChange={handleChange}
  className={`border rounded-lg px-3 py-2 w-full text-sm ${
    errors.market
      ? "border-red-500"
      : "border-slate-300"
  }`}
>
  <option value="">
    Select market
  </option>

  {countries.map((country) => (
    <option
      key={country.code}
      value={country.code}
    >
      {country.name}
    </option>
  ))}
</select>
{errors.market && (
  <p className="text-red-500 text-xs mt-1">
    {errors.market}
  </p>
)}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs text-gray-500 mb-1 block">
              Age range
            </label>

            <div className="flex items-center gap-3">
              <input
                type="number"
                name="ageFrom"
                value={form.ageFrom}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-20"
              />
              {errors.ageFrom && (
        <p className="text-red-500 text-xs mt-1">
          {errors.ageFrom}
        </p>
      )}
              <span>to</span>
              <input
                type="number"
                name="ageTo"
                value={form.ageTo}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-20"
              />
              <span className="text-xs text-gray-400">years</span>
              {errors.ageFrom && (
        <p className="text-red-500 text-xs mt-1">
          {errors.ageFrom}
        </p>
      )}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs text-gray-500 mb-1 block">
              Gender
            </label>
            <select
              name="gender"
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full text-sm"
            >
              <option>All</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          {/* DEVICES */}
          <div className="mb-4">
            <label className="text-xs text-gray-500 mb-2 block">
              Device compatibility
            </label>

            <div className="flex gap-3">

              {[
                { key: "mobile", icon: Smartphone },
                { key: "desktop", icon: Monitor },
                { key: "tablet", icon: Tablet },
              ].map(({ key, icon: Icon }) => (
                <button
                 type="button"
                  key={key}
                  onClick={() => handleDevice(key)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all
                    ${
                      form.devices[key]
                        ? "bg-orange-50 border-orange-500 text-orange-600"
                        : "bg-white border-slate-200 text-slate-500"
                    }`}
                >
                  <Icon size={14} />
                  {key}
                </button>
              ))}

            </div>
          </div>

          <div className="flex items-center gap-2">
           <label className="text-xs text-gray-500">
              Open-ended questions
            </label>
            <input
              type="number"
              name="openEnded"
              value={form.openEnded}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-24 mt-1"
            />
          </div>

        </div>

        {/* RIGHT */}
        {/* RIGHT */}
<div className="space-y-4">

  <div>
    <h3 className="text-xs font-semibold mb-4 text-gray-500 flex items-center gap-2">
      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
      PROJECT PARAMETERS
    </h3>

    {[
      {
        label: "Target Completes",
        name: "targetCompletes",
        icon: Users,
      },
      {
        label: "LOI (minutes)",
        name: "loi",
        icon: Clock,
      },
      {
        label: "Incidence (%)",
        name: "incidence",
        icon: BarChart3,
      },
      {
        label: "Timeline (days)",
        name: "timeline",
        icon: Calendar,
      },
    ].map(({ label, name, icon: Icon }) => (
      <div key={name}>

        <div className="mb-4">
          <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
            <Icon size={14} />
            {label}
          </label>

          <input
            type="number"
            name={name}
            value={form[name]}
            onChange={handleChange}
            min={1}
            max={name === "loi" ? 45 : 100}
            className={`border rounded-lg px-3 py-2 w-full ${
              errors[name]
                ? "border-red-500"
                : "border-slate-300"
            }`}
          />

          {errors[name] && (
            <p className="text-red-500 text-xs mt-1">
              {errors[name]}
            </p>
          )}
        </div>

        {/* AFTER TARGET COMPLETES */}
        {name === "targetCompletes" && (
          <div className="mb-4">
            <label className="text-xs text-gray-500 block mb-1">
              After Target Completes
            </label>

            <select
              name="overQuotaAction"
              value={form.overQuotaAction}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full border-slate-300 bg-white"
            >
              <option value="QUOTA">
                Quota Full
              </option>

              <option value="DISQUALIFIED">
                Disqualified
              </option>
            </select>

            <p className="text-xs text-gray-400 mt-1">
              Select what happens when the target completes are reached.
            </p>
          </div>
        )}

      </div>
    ))}
  </div>

</div>

      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <label className="text-xs text-gray-500">
          Target audience description
        </label>

        <textarea
          name="description"
          maxLength={1000}
          placeholder="Describe your target audience, key characteristics, behaviors..."
          onChange={handleChange}
          className="w-full border rounded-xl p-3 mt-2 h-32"
        />

        <p className="text-right text-xs text-gray-400">
          {form.description.length}/1000
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-8 border-t pt-6">

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    <div className="rounded-2xl bg-slate-50 p-6">
      <p className="text-slate-500 text-sm">
        CPI
      </p>

      <h2 className="text-4xl font-bold text-slate-900 mt-2">
        ${form.cpi || 0}
      </h2>
    </div>

    <div className="rounded-2xl bg-orange-50 p-6">
      <p className="text-orange-700 text-sm">
        Total Cost
      </p>

      <h2 className="text-4xl font-bold text-orange-600 mt-2">
        ${form.totalCost || 0}
      </h2>
    </div>

  </div>

<div className="flex flex-col sm:flex-row gap-3 mt-6">
<button
  type="button"
  onClick={() => setShowAdvanced(true)}
  className="h-12
px-6
rounded-xl
border
border-slate-300
text-slate-700
font-medium"
>
  Advanced
</button>
  <button
    onClick={handleSubmit}
    className="
     h-12
px-8
rounded-xl
bg-orange-500
hover:bg-orange-600
text-white
font-semibold
shadow-lg
shadow-orange-200
    "
  >
    Launch Project
  </button>
</div>
</div>

     {showAdvanced && (
 <>
  
    <div
      onClick={() => setShowAdvanced(false)}
      className="fixed inset-0 bg-black/30 z-40"
    />
 

  <div
    className={`
     fixed top-0 right-0
h-dvh
w-full
sm:max-w-[650px] p-5 sm:p-8
      bg-white z-50 shadow-2xl overflow-y-auto overscroll-contain
      transition-transform duration-300 ease-in-out
      ${showAdvanced ? "translate-x-0" : "translate-x-full"}
    `}
  >
      <div>

        <h2 className="text-2xl
sm:text-4xl
font-bold
text-slate-900
mb-6
sm:mb-10">
          Advanced Calendar
        </h2>

        {/* Date Range */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Start Date
          </label>

          <input
            type="date"
             className="
  w-full
  rounded-xl
  border
  border-slate-200
  px-4
  py-3
  "
            value={form.startDate}
  onChange={(e) =>
    setForm({
      ...form,
      startDate: e.target.value,
    })
  }
            // className="w-full border-b py-2"
          />
        </div>

          <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            End Date
          </label>

          <input
  type="date"
   className="
  w-full
  rounded-xl
  border
  border-slate-200
  px-4
  py-3
  "
  value={form.endDate}
  onChange={(e) =>
    setForm({
      ...form,
      endDate: e.target.value,
    })
  }
/>
        </div>

        {/* Timezone */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            TIMEZONE
          </label>

          <select
  value={form.timezone}
  onChange={(e) =>
    setForm({
      ...form,
      timezone: e.target.value,
    })
  }
>
            {timezones.map((tz) => (
    <option key={tz} value={tz}>
      {tz}
    </option>
  ))}
          </select>
        </div>

        {/* Start / End Time */}
        <div className="grid
grid-cols-1
sm:grid-cols-2
gap-4
sm:gap-6
mb-8">

          <div>
            <label className="block text-sm font-medium mb-2">
              START TIME
            </label>

            <input
  type="time"
  className="
  w-full
  rounded-xl
  border
  border-slate-200
  px-4
  py-3
  "
  value={form.startTime}
  onChange={(e) =>
    setForm({
      ...form,
      startTime: e.target.value,
    })
  }
/>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              END TIME
            </label>

           <input
  type="time"
  className="
  w-full
  rounded-xl
  border
  border-slate-200
  px-4
  py-3
  "
  value={form.endTime}
  onChange={(e) =>
    setForm({
      ...form,
      endTime: e.target.value,
    })
  }
/>
          </div>

        </div>
       

<div className="mb-6 sm:mb-8">
  <label className="block text-sm font-medium mb-2">
    MARKET TIMEZONE
  </label>

  <select
    value={marketTimezone}
    onChange={(e) =>
      setMarketTimezone(e.target.value)
    }
    className="w-full
rounded-xl
border
border-slate-200
bg-white
px-4
py-3
text-sm
focus:border-orange-500
focus:ring-4
focus:ring-orange-100
outline-none
transition"
  >
    {marketTimezones.length === 0 ? (
      <option value="">
        Select market first
      </option>
    ) : (
      marketTimezones.map((tz) => (
        <option
          key={tz}
          value={tz}
        >
          {tz}
        </option>
      ))
    )}
  </select>

  <p className="text-xs text-gray-500 mt-1">
    Timezone used for the selected market country
  </p>
</div>
<h3 className="
text-lg
font-semibold
text-slate-900
mb-4
">
  Timezone Conversion
</h3>

<div className="overflow-x-auto mt-4">
<table className="w-full mt-4">
  <thead>
    <tr>
      <th></th>
      <th>{form.timezone}</th>
      <th>{marketTimezone}</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Start</td>
      <td>
  {form.startDate} {form.startTime}
</td>
      <td>{convertedStart || "-"}</td>
    </tr>

    <tr>
      <td>End</td>
     <td>
  {form.endDate} {form.endTime}
</td>
     <td>{convertedEnd || "-"}</td>
    </tr>
  </tbody>
</table>
</div>
        {/* Footer */}
        <div className="flex
  flex-col-reverse
  sm:flex-row
  justify-end
  gap-3
  mt-10">

          <button
          type="button"
            onClick={() => setShowAdvanced(false)}
            className="
              border
              border-purple-700
              px-6
              py-3
              rounded
            "
          >
            Cancel
          </button>

          <button
          type="button"
            onClick={() => setShowAdvanced(false)}
            className="
              bg-purple-700
              text-white
              px-6
              py-3
              rounded
            "
          >
            Save
          </button>

        </div>

      </div>
    </div>
  </>
)}
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <div className="bg-white border p-4 rounded-xl shadow mb-3">
      <h3 className="font-semibold">
        {p.sector} - {p.market}
      </h3>

      <p className="text-sm text-gray-500">
        Age: {p.ageFrom} - {p.ageTo}
      </p>

      <p className="text-sm mt-1">
        Status: <span className="font-semibold">{p.status}</span>
      </p>
    </div>
  );
}