// import { Bell, Settings, Plus, Search, Users, Shield } from "lucide-react";
// import api from "../services/api";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// export default function Survey() {
//   const navigate = useNavigate();
//     const [surveys, setSurveys] = useState([]);

//   useEffect(() => {
//     api.get("/surveys")
//       .then(res => setSurveys(res.data))
//       .catch(err => console.error(err));
//   }, []);


  

//   return (
//     <div className="flex min-h-screen bg-gray-50">


//       {/* Main */}
//       <main className="flex-1 p-6">
       

//         {/* Search + Create */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="relative w-80">
//             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//             <input
//               placeholder="Search surveys..."
//               className="pl-9 pr-4 py-2 border rounded-lg text-sm w-full"
//             />
//           </div>
//          <button 
//             onClick={() => navigate("/superadmin/dashboard/create-survey")} 
//             className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
//           >
//             <Plus size={16} /> Create Survey
//           </button>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-xl shadow-sm border">
//           <table className="w-full text-sm">
//             <thead className="text-gray-500 border-b">
//               <tr>
//                 <th className="text-left p-4">Survey</th>
//                 <th>Status</th>
//                 <th>Responses</th>
//                 <th>Points</th>
//                 <th>Difficulty</th>
//                 <th>Created</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* <Row name="Customer Feedback Survey" status="Active" responses="234" points="15 pts" difficulty="Easy" date="Jan 5, 2026" />
//               <Row name="Product Experience Survey" status="Active" responses="156" points="25 pts" difficulty="Medium" date="Jan 3, 2026" />
//               <Row name="Employee Satisfaction" status="Paused" responses="89" points="20 pts" difficulty="Easy" date="Dec 28, 2025" />
//               <Row name="Market Research Q1" status="Active" responses="412" points="30 pts" difficulty="Hard" date="Dec 20, 2025" />
//               <Row name="Brand Awareness Study" status="Draft" responses="0" points="10 pts" difficulty="Easy" date="Jan 6, 2026" /> */}
//               {surveys.map(s => (
//     <Row
//       key={s._id}
//       name={s.title}
//       status={s.status}
//       responses={s.responsesCount}
//       points={`${s.points} pts`}
//       difficulty={s.difficulty}
//       date={new Date(s.createdAt).toLocaleDateString()}
//     />
//   ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }

// function SidebarItem({ label, active, icon }) {
//   return (
//     <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${active ? "bg-green-50 text-green-600" : "text-gray-600 hover:bg-gray-100"}`}>
//       {icon || <div className="w-4" />}
//       {label}
//     </div>
//   );
// }

// function Row({ name, status, responses, points, difficulty, date }) {
//   // Update keys to Uppercase to match the Database values
//   const badge = {
//     ACTIVE: "bg-green-100 text-green-600",
//     PAUSED: "bg-yellow-100 text-yellow-600",
//     DRAFT: "bg-gray-100 text-gray-500",
//   }[status] || "bg-gray-100";

//   const diff = {
//     Easy: "bg-green-100 text-green-600",
//     Medium: "bg-yellow-100 text-yellow-600",
//     Hard: "bg-red-100 text-red-600",
//   }[difficulty];

//   return (
//     <tr className="border-b last:border-0 hover:bg-gray-50">
//       <td className="p-4 font-medium">{name}</td>
//       <td><span className={`px-3 py-1 rounded-full text-[10px] font-bold ${badge}`}>{status}</span></td>
//       <td>{responses || 0}</td>
//       <td>{points}</td>
//       <td><span className={`px-3 py-1 rounded-full text-[10px] font-bold ${diff}`}>{difficulty}</span></td>
//       <td className="text-gray-500">{date}</td>
//       <td className="text-gray-400 px-4 cursor-pointer">•••</td>
//     </tr>
//   );
// }


import { Bell, Settings, Plus, Search, Users, Shield, MoreVertical  } from "lucide-react";
import api from "../services/api";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function Survey() {
  const navigate = useNavigate();
    const [surveys, setSurveys] = useState([]);
   const [activeRow, setActiveRow] = useState(null);
   
  useEffect(() => {
    api.get("/admin/surveys")
      .then(res => setSurveys(res.data))
      .catch(err => console.error(err));
  }, []);

  
const deleteSurvey = async (id) => {
  if(!window.confirm("Delete this survey?")) return;
  await api.delete(`/surveys/${id}`);
  setSurveys((prev)=> prev.filter((s)=>s._id !== id));
  setActiveRow(null);
};

const toggleSurveyStatus = async (survey) =>{
  const newStatus = survey.status === "ACTIVE" ? "PAUSED" : "ACTIVE";
  await api.patch(`/surveys/${survey._id}/status`,{
    status:newStatus,
  });

  setSurveys((prev)=>
    prev.map((s)=> s._id === survey._id ? {...s, status:newStatus}:s)
  );

  setActiveRow(null);
}
  

  return (
    <div
  className="flex min-h-screen bg-gray-50"
  onClick={() => setActiveRow(null)}
>

      <main className="flex-1 p-6">
        {/* Search + Create */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              placeholder="Search surveys..."
              className="pl-9 pr-4 py-2 border rounded-lg text-sm w-full"
            />
          </div>

          <button
            onClick={() =>
              navigate("/superadmin/dashboard/create-survey")
            }
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            <Plus size={16} /> Create Survey
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3">Survey</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Responses</th>
                <th className="text-left px-4 py-3">Points</th>
                <th className="text-left px-4 py-3">Difficulty</th>
                <th className="text-left px-4 py-3">Created</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {surveys.map((s) => (
                <Row
                  key={s._id}
                  survey={s}
                  isOpen={activeRow === s._id}
                  onToggle={()=> setActiveRow(activeRow === s._id ? null : s._id)}
                 onView={async () => {
  console.log("SURVEY:", s);

  if (s.surveyType === "EXTERNAL") {
  const res = await api.post("/responses/start", {
    surveyId: s._id,
  });

  window.open(res.data.redirectUrl, "_blank");
} else {
  navigate(`/survey/${s._id}`);
}

  setActiveRow(null);
}}


                  onDelete={() =>
                    deleteSurvey(s._id)
                  }
                  onToggleStatus={() =>
                    toggleSurveyStatus(s)
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
function SidebarItem({ label, active, icon }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${active ? "bg-green-50 text-green-600" : "text-gray-600 hover:bg-gray-100"}`}>
      {icon || <div className="w-4" />}
      {label}
    </div>
  );
}

function Row({
  survey,
  isOpen,
  onToggle,
  onView,
  onDelete,
  onToggleStatus,
  dropdownRef,
}) {
  const badge = {
    ACTIVE: "bg-green-100 text-green-600",
    PAUSED: "bg-yellow-100 text-yellow-600",
    DRAFT: "bg-gray-100 text-gray-500",
  }[survey.status];

  const diff = {
    Easy: "bg-green-100 text-green-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Hard: "bg-red-100 text-red-600",
  }[survey.difficulty];

  return (
    <tr className="border-b last:border-0 hover:bg-gray-50">
      <td className="px-4 py-3 font-medium">{survey.title}</td>

      <td className="px-4 py-3">
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${badge}`}>
          {survey.status}
        </span>
      </td>

      <td className="px-4 py-3">{survey.responsesCount || 0}</td>
      <td className="px-4 py-3">{survey.points} pts</td>

      <td className="px-4 py-3">
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${diff}`}>
          {survey.difficulty}
        </span>
      </td>

      <td className="px-4 py-3 text-gray-500">
        {new Date(survey.createdAt).toLocaleDateString()}
      </td>

      <td className="relative px-4 py-3 text-right">
  <button
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    className="text-gray-400 hover:text-gray-600"
  >
    <MoreVertical size={16} />
  </button>

  {isOpen && (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-4 top-8 z-20 w-40 bg-white border rounded-lg shadow-md"
    >
      <button onClick={onView} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
        View Form
      </button>

      <button onClick={onToggleStatus} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
        {survey.status === "ACTIVE" ? "Pause Survey" : "Activate Survey"}
      </button>

      <button onClick={onDelete} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
        Delete
      </button>
    </div>
  )}
</td>


    </tr>
    
  );
}
