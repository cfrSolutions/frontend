// import { Clock, Star, Play, CheckCircle } from "lucide-react";

// /* ================= MOCK DATA ================= */

// const surveys = [
//   {
//     id: 1,
//     title: "Customer Feedback Survey",
//     desc: "Share your shopping experience with us",
//     points: 15,
//     time: "5 min",
//     difficulty: "Easy",
//     isNew: true,
//   },
//   {
//     id: 2,
//     title: "Product Research Study",
//     desc: "Help us improve our product lineup",
//     points: 25,
//     time: "10 min",
//     difficulty: "Medium",
//   },
//   {
//     id: 3,
//     title: "Brand Awareness Survey",
//     desc: "Tell us about brands you recognize",
//     points: 10,
//     time: "3 min",
//     difficulty: "Easy",
//   },
//   {
//     id: 4,
//     title: "Tech Usage Patterns",
//     desc: "Share how you use technology daily",
//     points: 30,
//     time: "12 min",
//     difficulty: "Medium",
//     isNew: true,
//   },
// ];

// /* ================= PAGE ================= */

// export default function UserSurveys() {
//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div>
//         <h1 className="text-2xl font-semibold">All Surveys</h1>
//         <p className="text-sm text-gray-500">
//           Browse and complete surveys to earn points
//         </p>
//       </div>

//       {/* CARD */}
//       <div className="bg-white rounded-2xl border border-gray-300 shadow-sm">
//         {/* CARD HEADER */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
//           <div>
//             <h3 className="font-semibold text-lg">Available Surveys</h3>
//             <p className="text-sm text-gray-500">
//               Complete surveys to earn points
//             </p>
//           </div>

//           <span className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-full">
//             <CheckCircle size={14} />
//             {surveys.length} available
//           </span>
//         </div>

//         {/* LIST */}
//         <div className="divide-y divide-gray-300 ">
//           {surveys.map((survey) => (
//             <SurveyRow key={survey.id} survey={survey} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SURVEY ROW ================= */

// function SurveyRow({ survey }) {
//   return (
//     <div className="px-6 py-5 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center hover:shadow-xl transaction-all duration-300 hover:-translate-y-1 cursor pointer">
//       {/* LEFT */}
//       <div>
//         <div className="flex items-center gap-3 mb-1">
//           <h4 className="font-medium">{survey.title}</h4>

//           {survey.isNew && (
//             <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
//               New
//             </span>
//           )}
//         </div>

//         <p className="text-sm text-gray-500 mb-2">{survey.desc}</p>

//         <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
//           <span className="flex items-center gap-1">
//             <Star size={14} className="text-yellow-500" />
//             {survey.points} pts
//           </span>

//           <span className="flex items-center gap-1">
//             <Clock size={14} />
//             {survey.time}
//           </span>

//           <span
//             className={`px-2 py-0.5 rounded-full text-xs ${
//               survey.difficulty === "Easy"
//                 ? "bg-green-100 text-green-600"
//                 : "bg-yellow-100 text-yellow-600"
//             }`}
//           >
//             {survey.difficulty}
//           </span>
//         </div>
//       </div>

//       {/* BUTTON */}
//       <button
//         className="
//           flex items-center justify-center gap-2
//           bg-[#1bbdac] hover:bg-emerald-600 text-white
//           px-4 py-2 rounded-lg
//           w-full sm:w-auto
//         "
//       >
//         Start <Play size={16} />
//       </button>
//     </div>
//   );
// }


// import { Clock, Star, Play, CheckCircle } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../services/api";

// /* ================= PAGE ================= */

// export default function UserSurveys() {
//   const [surveys, setSurveys] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();
//   useEffect(() => {
//     api
//       .get("/user-surveys/available")
//       .then((res) => setSurveys(res.data))
//       .catch((err) => console.error(err));
//   }, []);




// const queryParams = new URLSearchParams(location.search);
//   const search = queryParams.get("search") || "";

//   useEffect(() => {
//     api
//       .get("/user-surveys/available")
//       .then((res) => setSurveys(res.data))
//       .catch((err) => console.error(err));
//   }, []);

// const startSurvey = async (survey) => {
//   try {
//     const res = await api.post("/responses/start", {
//       surveyId: survey._id,
//     });

//     const { redirectUrl } = res.data;

//     // 🔥 Redirect user to company form
//     window.location.href = redirectUrl;
//   } catch (err) {
//     alert("Failed to start survey");
//   }
// };


  

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div>
//         <h1 className="text-2xl font-semibold">All Surveys</h1>
//         <p className="text-sm text-gray-500">
//           Browse and complete surveys to earn points
//         </p>
//       </div>

//       {/* CARD */}
//       <div className="bg-white rounded-2xl border border-gray-300 shadow-sm">
//         {/* CARD HEADER */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
//           <div>
//             <h3 className="font-semibold text-lg">Available Surveys</h3>
//             <p className="text-sm text-gray-500">
//               Complete surveys to earn points
//             </p>
//           </div>

//           <span className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-full">
//             <CheckCircle size={14} />
//             {surveys.length} available
//           </span>
//         </div>

//         {/* LIST */}
//         <div className="divide-y divide-gray-300">
//           {surveys.map((survey) => (
//             <SurveyRow
//               key={survey._id}
//               survey={survey}
//               onStart={() => startSurvey(survey)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SURVEY ROW ================= */

// function SurveyRow({ survey, onStart }) {
//   const isNew =
//     Date.now() - new Date(survey.createdAt).getTime() <
//     3 * 24 * 60 * 60 * 1000; // 3 days

//   return (
//     <div className="px-6 py-5 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
//       {/* LEFT */}
//       <div>
//         <div className="flex items-center gap-3 mb-1">
//           <h4 className="font-medium">{survey.title}</h4>

//           {survey.completed && (
//   <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
//     Completed
//   </span>
// )}

//           {isNew && (
//             <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
//               New
//             </span>
//           )}
//         </div>

//         <p className="text-sm text-gray-500 mb-2">
//           {survey.description}
//         </p>

//         <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
//           {/* POINTS */}
//           <span className="flex items-center gap-1">
//             <Star size={14} className="text-yellow-500" />
//             {survey.points} pts
//           </span>

//           {/* TIME */}
//           {survey.timeLimit && (
//             <span className="flex items-center gap-1">
//               <Clock size={14} />
//               {survey.timeLimit} min
//             </span>
//           )}

//           {/* DIFFICULTY */}
//           <span
//             className={`px-2 py-0.5 rounded-full text-xs ${
//               survey.difficulty === "Easy"
//                 ? "bg-green-100 text-green-600"
//                 : survey.difficulty === "Medium"
//                 ? "bg-yellow-100 text-yellow-600"
//                 : "bg-red-100 text-red-600"
//             }`}
//           >
//             {survey.difficulty}
//           </span>
//         </div>
//       </div>

//       {/* BUTTON */}
//       <button
//   disabled={survey.completed}
//   onClick={onStart}
//   className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg w-full sm:w-auto
//     ${
//       survey.completed
//         ? "bg-gray-300 cursor-not-allowed text-gray-500"
//         : "bg-[#E2852E] hover:bg-orange-300 text-white"
//     }
//   `}
// >
//   {survey.completed ? "Completed" : "Start"}
// </button>

//     </div>
//   );
// }



import { Clock, Star, Play, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

export default function UserSurveys() {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get search from URL
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");

  useEffect(() => {
    api
      .get("/user-surveys/available")
      .then((res) => setSurveys(res.data))
      .catch((err) => console.error(err));
  }, []);

  const startSurvey = async (survey) => {
    try {
      const res = await api.post("/responses/start", {
        surveyId: survey._id,
      });

      const { redirectUrl } = res.data;
      window.location.href = redirectUrl;
    } catch (err) {
      alert("Failed to start survey");
    }
  };

  // ✅ SAFE FILTER LOGIC
  const filteredSurveys = search
    ? surveys.filter((survey) =>
        survey.title?.toLowerCase().includes(search.toLowerCase())
      )
    : surveys;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">All Surveys</h1>
        <p className="text-sm text-gray-500">
          Browse and complete surveys to earn points
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
          <div>
            <h3 className="font-semibold text-lg">Available Surveys</h3>
            <p className="text-sm text-gray-500">
              Complete surveys to earn points
            </p>
          </div>

          <span className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-full">
            <CheckCircle size={14} />
            {filteredSurveys.length} available
          </span>
        </div>

        <div className="divide-y divide-gray-300">
          {filteredSurveys.length === 0 ? (
            <p className="p-6 text-sm text-gray-500 text-center">
              No surveys found
            </p>
          ) : (
            filteredSurveys.map((survey) => (
              <SurveyRow
                key={survey._id}
                survey={survey}
                onStart={() => startSurvey(survey)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
/* ================= SURVEY ROW ================= */

function SurveyRow({ survey, onStart }) {
  const isNew =
    Date.now() - new Date(survey.createdAt).getTime() <
    3 * 24 * 60 * 60 * 1000; // 3 days

  return (
    <div className="px-6 py-5 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      {/* LEFT */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h4 className="font-medium">{survey.title}</h4>

          {survey.completed && (
  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
    Completed
  </span>
)}

          {isNew && (
            <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-2">
          {survey.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          {/* POINTS */}
          <span className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500" />
            {survey.points} pts
          </span>

          {/* TIME */}
          {survey.timeLimit && (
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {survey.timeLimit} min
            </span>
          )}

          {/* DIFFICULTY */}
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              survey.difficulty === "Easy"
                ? "bg-green-100 text-green-600"
                : survey.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {survey.difficulty}
          </span>
        </div>
      </div>

      {/* BUTTON */}
      <button
  disabled={survey.completed}
  onClick={onStart}
  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg w-full sm:w-auto
    ${
      survey.completed
        ? "bg-gray-300 cursor-not-allowed text-gray-500"
        : "bg-[#E2852E] hover:bg-orange-300 text-white"
    }
  `}
>
  {survey.completed ? "Completed" : "Start"}
</button>

    </div>
  );
}



