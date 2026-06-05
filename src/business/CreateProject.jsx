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




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [form, setForm] = useState({
    sector: "",
    market: "",
    targetCompletes: 90,
    ageFrom: 18,
    ageTo: 63,
    gender: "All",
    loi: 90,
    incidence: 90,
    timeline: 90,
    openEnded: 2,
    budget: 18,
    cpi: 0, 
    totalCost: 0,
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

useEffect(() => {

  async function fetchCPI() {

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
      totalCost:
        cpi * prev.targetCompletes,
    }));
  }

  fetchCPI();

}, [
  form.market,
  form.incidence,
  form.loi,
  form.targetCompletes
]);

  const navigate = useNavigate();
  const handleSubmit = async () => {
  try {
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
     navigate(`/business/dashboard/project/${res.data._id}/status`, {
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
  className="border rounded-lg px-3 py-2 w-full text-sm"
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
              <span>to</span>
              <input
                type="number"
                name="ageTo"
                value={form.ageTo}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-20"
              />
              <span className="text-xs text-gray-400">years</span>
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
                  key={key}
                  onClick={() => handleDevice(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm capitalize transition
                    ${
                      form.devices[key]
                        ? "bg-blue-50 border-blue-500 text-blue-600"
                        : "border-gray-300"
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
        <div className="space-y-4">

         <div>
          <h3 className="text-xs font-semibold mb-4 text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            PROJECT PARAMETERS
          </h3>

          {[
            { label: "Target Completes", name: "targetCompletes", icon: Users },
            { label: "LOI (minutes)", name: "loi", icon: Clock },
            { label: "Incidence (%)", name: "incidence", icon: BarChart3 },
            { label: "Timeline (days)", name: "timeline", icon: Calendar },
          ].map(({ label, name, icon: Icon }) => (
            <div key={name} className="mb-4">
              <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                <Icon size={14} />
                {label}
              </label>

              <input
                type="number"
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full"
              />
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

  <div className="flex gap-10">

    <div>
      <p className="text-sm text-gray-500">
        CPI
      </p>

      <h2 className="text-3xl font-bold text-blue-600">
        ${form.cpi || 0}
      </h2>
    </div>

    <div>
      <p className="text-sm text-gray-500">
        Total Cost
      </p>

      <h2 className="text-3xl font-bold text-green-600">
        ${form.totalCost || 0}
      </h2>
    </div>

  </div>

  <button
    onClick={handleSubmit}
    className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-8
      py-3
      rounded-xl
      font-medium
    "
  >
    Launch Project
  </button>

</div>

      <div className="flex gap-10 mt-8">

  <div>
    <p className="text-sm text-gray-500">
      CPI
    </p>

    <h2 className="text-3xl font-bold text-blue-600">
      ${form.cpi}
    </h2>
  </div>

  <div>
    <p className="text-sm text-gray-500">
      Total Cost
    </p>

    <h2 className="text-3xl font-bold text-green-600">
      ${form.totalCost}
    </h2>
  </div>

</div>
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