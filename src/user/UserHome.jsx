// import {
//   BarChart3,
//   Star,
//   CheckCircle2,
//   Clock,
//   Wallet,
//   ArrowUpRight,
//   ArrowDownLeft,
//   Play,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// /* ================= MAIN ================= */

// export default function UserHome() {
//   const [surveys, setSurveys] = useState([]);
//   const navigate = useNavigate();
// const difficultyStyles = {
//   Easy: "bg-green-100 text-green-600",
//   Medium: "bg-yellow-100 text-yellow-600",
//   Hard: "bg-red-100 text-red-600",
// };

//   useEffect(() => {
//     api
//       .get("/user-surveys/available")
//       .then((res) => setSurveys(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // // ✅ NEW SURVEYS (last 3 days)
//   // const newSurveys = surveys.filter(
//   //   (s) =>
//   //     Date.now() - new Date(s.createdAt).getTime() <
//   //     3 * 24 * 60 * 60 * 1000
//   // );

//   // // show max 3 on home
//   // const visibleSurveys = newSurveys.slice(0, 3);
//   // sort latest first
// const sortedSurveys = [...surveys].sort(
//   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
// );

// // surveys from last 3 days
// const recentSurveys = sortedSurveys.filter((s) => {
//   if (!s.createdAt) return false;
//   return (
//     Date.now() - new Date(s.createdAt).getTime() <
//     3 * 24 * 60 * 60 * 1000
//   );
// });

// // fallback logic
// const visibleSurveys =
//   recentSurveys.length > 0
//     ? recentSurveys.slice(0, 3)
//     : sortedSurveys.slice(0, 3);


//   return (
//     <div className="space-y-8">
//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//         <Stat title="Total Surveys" value="48" gradient="from-teal-400 to-emerald-500" icon={<BarChart3 />} />
//         <Stat title="Available" value="5" gradient="from-green-500 to-emerald-600" icon={<Star />} />
//         <Stat title="Completed" value="32" gradient="from-blue-500 to-sky-500" icon={<CheckCircle2 />} />
//         <Stat title="Pending" value="11" gradient="from-yellow-400 to-orange-400" icon={<Clock />} />
//       </div>

//       {/* ================= WALLET ================= */}
//       <div className="bg-white rounded-2xl p-6 border shadow-sm border-gray-300">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="font-semibold text-lg">Your Wallet</h3>
//           <button className="bg-[#1bbdac] text-white px-4 py-2 rounded-lg text-sm">
//             Withdraw
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <WalletCard label="Balance" value="201" icon={<ArrowUpRight />} />
//           <WalletCard label="Earned Today" value="45" icon={<ArrowUpRight />} highlight="text-green-600" />
//           <WalletCard label="Redeemed" value="150" icon={<ArrowDownLeft />} highlight="text-blue-600" />
//         </div>
//       </div>

//       {/* ================= NEW SURVEYS ONLY ================= */}
//       {visibleSurveys.length > 0 && (
//         <div className="bg-white rounded-2xl border border-gray-300 shadow-sm ">
//           <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 ">
//             <div>
//               <h3 className="font-semibold text-lg">New Surveys</h3>
//               <p className="text-sm text-gray-500">
//                 Recently added surveys for you
//               </p>
//             </div>

//             {surveys.length > visibleSurveys.length && (
//               <button
//                 onClick={() => navigate("/user/dashboard/surveys")}
//                 className="text-sm text-[#1bbdac] font-medium"
//               >
//                 View all
//               </button>
//             )}
//           </div>

//           <div className="divide-y divide-gray-300 ">
//             {visibleSurveys.map((survey) => (
//               <SurveyRow
//                 key={survey._id}
//                 survey={survey}
//                 onStart={() => startSurvey(survey)}

//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// /* ================= COMPONENTS ================= */

// function Stat({ title, value, subtitle, gradient, icon }) {
//   return (
//     <div className={`relative rounded-2xl sm:p-6 p-4 text-white border-gray-300 bg-gradient-to-r ${gradient} `}>
//      <div className="space-y-1 sm:space-y-2">
//         <p className="text-xs sm:text-sm">{title}</p>
//         <h2 className="text-2xl sm:text-4xl font-bold">{value}</h2>

//         {subtitle && (
//           <p className="text-[10px] sm:text-xs opacity-90">
//             {subtitle}
//           </p>
//         )}
//       </div>

//       {/* ICON */}
//       <div
//         className="
//           mt-3 sm:mt-0
//           sm:absolute sm:top-4 sm:right-4
//           bg-white/25 p-2 sm:p-3 rounded-xl
//           w-fit
//         "
//       >
//         {icon}
//       </div>
//     </div>
//   );
// }

// function WalletCard({ label, value, icon, highlight }) {
//   return (
//     <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 hover:shadow-xl transaction-all duration-300 hover:-translate-y-1 cursor pointer">
//       <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <h3 className={`text-xl font-semibold ${highlight || ""}`}>
//           {value} <span className="text-sm font-normal">points</span>
//         </h3>
//       </div>
//     </div>
//   );
// }
// const startSurvey = async (survey) => {
//   try {
//     const res = await api.post("/responses/start", {
//       surveyId: survey._id,
//     });

//     const { redirectUrl } = res.data;

//     if (!redirectUrl) {
//       alert("Redirect URL not received");
//       return;
//     }

//     window.open(redirectUrl, "_blank");
//   } catch (err) {
//     console.error(err);
//     alert("Failed to start survey");
//   }
// };

// function SurveyRow({ survey, onStart }) {
//   const difficultyStyles = {
//     Easy: "bg-green-100 text-green-600",
//     Medium: "bg-yellow-100 text-yellow-600",
//     Hard: "bg-red-100 text-red-600",
//   };

//   return (
//     <div className="px-6 py-5 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      
//       {/* LEFT */}
//       <div>
//         <div className="flex items-center gap-2 mb-1">
//           <h4 className="font-medium">{survey.title}</h4>

//           <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
//             New
//           </span>
//         </div>

//         <p className="text-sm text-gray-500 mb-2">
//           {survey.description}
//         </p>

//         <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
//           <span className="flex items-center gap-1">
//             ⭐ {survey.points} pts
//           </span>

//           {survey.timeLimit && (
//             <span className="flex items-center gap-1">
//               ⏱ {survey.timeLimit} min
//             </span>
//           )}

//           <span
//             className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//               difficultyStyles[survey.difficulty]
//             }`}
//           >
//             {survey.difficulty}
//           </span>
//         </div>
//       </div>

//       {/* BUTTON (CENTERED TEXT FIXED) */}
//       <button
//         onClick={onStart}
//         className="
//           flex items-center justify-center
//           gap-2
//           bg-[#1bbdac] hover:bg-emerald-600
//           text-white
//           px-5 py-2
//           rounded-lg
//           text-sm font-medium
//           w-full sm:w-[130px]
//         "
//       >
//         <Play size={16} />
//         Start
//       </button>
//     </div>
//   );
// }


// import {
//   BarChart3,
//   Star,
//   CheckCircle2,
//   Clock,
//   Wallet,
//   Play,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// /* ================= MAIN ================= */

// export default function UserHome() {
//   const [surveys, setSurveys] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     api
//       .get("/user-surveys/available")
//       .then((res) => setSurveys(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // sort latest first
//   const sortedSurveys = [...surveys].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//   // last 3 days surveys
//   const recentSurveys = sortedSurveys.filter((s) => {
//     if (!s.createdAt) return false;
//     return (
//       Date.now() - new Date(s.createdAt).getTime() <
//       3 * 24 * 60 * 60 * 1000
//     );
//   });

//   const visibleSurveys =
//     recentSurveys.length > 0
//       ? recentSurveys.slice(0, 3)
//       : sortedSurveys.slice(0, 3);

//   return (
//     <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e9fff7,transparent_40%),radial-gradient(circle_at_top_right,#eef3ff,transparent_45%),radial-gradient(circle_at_bottom_left,#fff6dd,transparent_40%)] p-8 space-y-10">

//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//         <Stat title="Total Surveys" value="48" icon={<BarChart3 size={18} />} />
//         <Stat title="Available Surveys" value="5" icon={<Star size={18} />} />
//         <Stat title="Completed Surveys" value="32" icon={<CheckCircle2 size={18} />} />
//         <Stat title="Pending Surveys" value="11" icon={<Clock size={18} />} />
//       </div>

//       {/* ================= WALLET + SURVEYS ================= */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

//         {/* WALLET */}
//         <WalletGlass />

//         {/* SURVEYS */}
//         <div className="xl:col-span-2">
//           <SurveysGlass
//             surveys={visibleSurveys}
//             onViewAll={() => navigate("/user/dashboard/surveys")}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function Stat({ title, value, icon }) {
//   return (
//     <div className="relative rounded-3xl p-6 bg-[rgba(245,250,255,0.75)] backdrop-blur-xl border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
//       <p className="text-sm text-gray-600">{title}</p>
//       <h2 className="text-4xl font-semibold text-gray-900 mt-2">
//         {value}
//       </h2>

//       <div className="absolute bottom-5 right-5 w-10 h-10 bg-white/60 rounded-full flex items-center justify-center">
//         {icon}
//       </div>
//     </div>
//   );
// }

// /* ================= WALLET ================= */

// function WalletGlass() {
//   return (
//     <div className="rounded-3xl p-6 bg-[rgba(235,243,255,0.85)] backdrop-blur-xl border border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="font-semibold">Wallet</h3>
//         <Wallet size={18} className="text-gray-400" />
//       </div>

//       <h1 className="text-4xl font-bold mb-2">$124.50</h1>
//       <p className="text-sm text-gray-500">Earned Today: $8.75</p>
//       <p className="text-sm text-gray-500 mb-6">Redeemed: $75.00</p>

//       {/* Progress */}
//       <div className="w-full h-2 bg-white/50 rounded-full mb-2">
//         <div className="h-full w-[70%] bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full" />
//       </div>

//       <p className="text-xs text-gray-500 mb-6">
//         🔥 $25.50 until your next $150 bonus!
//       </p>

//       <button className="w-full py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-medium">
//         Withdraw
//       </button>
//     </div>
//   );
// }

// /* ================= SURVEYS ================= */

// function SurveysGlass({ surveys, onViewAll }) {
//   return (
//     <div className="rounded-3xl p-6 bg-[rgba(245,248,255,0.75)] backdrop-blur-xl border border-white/50">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="font-semibold">New Surveys</h3>
//         <button onClick={onViewAll} className="text-sm text-emerald-600 font-medium">
//           View all
//         </button>
//       </div>

//       <div className="space-y-4">
//         {surveys.map((survey) => (
//           <SurveyGlassRow
//             key={survey._id}
//             survey={survey}
//             onStart={() => startSurvey(survey)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function SurveyGlassRow({ survey, onStart }) {
//   const difficultyColor =
//     survey.difficulty === "Easy"
//       ? "bg-green-100 text-green-600"
//       : survey.difficulty === "Medium"
//       ? "bg-yellow-100 text-yellow-600"
//       : "bg-red-100 text-red-600";

//   return (
//     <div className="rounded-2xl p-4 bg-[rgba(255,255,255,0.6)] backdrop-blur border border-white/50 flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
//       <div>
//         <h4 className="font-medium">{survey.title}</h4>
//         <p className="text-sm text-gray-500">{survey.description}</p>

//         <div className="flex gap-3 text-xs text-gray-500 mt-2">
//           {survey.timeLimit && <span>⏱ {survey.timeLimit} min</span>}
//           <span className={`px-2 py-0.5 rounded-full ${difficultyColor}`}>
//             {survey.difficulty}
//           </span>
//         </div>
//       </div>

//       <div className="flex flex-col items-end gap-2">
//         <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">
//           ⭐ {survey.points} Pts
//         </span>

//         <button
//           onClick={onStart}
//           className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500 text-white text-sm"
//         >
//           <Play size={14} />
//           Start
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ================= START SURVEY (UNCHANGED) ================= */

// const startSurvey = async (survey) => {
//   try {
//     const res = await api.post("/responses/start", {
//       surveyId: survey._id,
//     });

//     const { redirectUrl } = res.data;

//     if (!redirectUrl) {
//       alert("Redirect URL not received");
//       return;
//     }

//     window.open(redirectUrl, "_blank");
//   } catch (err) {
//     console.error(err);
//     alert("Failed to start survey");
//   }
// };



// import {
//   BarChart3,
//   Star,
//   CheckCircle2,
//   Clock,
//   Wallet,
//   Play,
//   Search,
//   Bell
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// /* ================= MAIN ================= */

// export default function UserHome() {
//   const [surveys, setSurveys] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     api
//       .get("/user-surveys/available")
//       .then((res) => setSurveys(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const sortedSurveys = [...surveys].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//   const visibleSurveys = sortedSurveys.slice(0, 3);

//   return (
//     // Professional background with soft yellow/blue radial hints
//     <div className="min-h-screen p-4 md:p-8 space-y-10 font-sans">
      
//       {/* ================= HEADER AREA ================= */}
     

//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//         <Stat title="Total Surveys" value="48" icon={<BarChart3 className="text-amber-600" size={20} />} color="bg-amber-50" />
//         <Stat title="Available" value="5" icon={<Star className="text-blue-600" size={20} />} color="bg-blue-50" />
//         <Stat title="Completed" value="32" icon={<CheckCircle2 className="text-emerald-600" size={20} />} color="bg-emerald-50" />
//         <Stat title="Pending" value="11" icon={<Clock className="text-purple-600" size={20} />} color="bg-purple-50" />
//       </div>

//       {/* ================= CONTENT GRID ================= */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//         <WalletGlass />
//         <div className="xl:col-span-2">
//           <SurveysGlass
//             surveys={visibleSurveys}
//             onViewAll={() => navigate("/user/dashboard/surveys")}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function Stat({ title, value, icon, color }) {
//   return (
//     <div className="relative group overflow-hidden rounded-[1rem] p-6 bg-white/70 backdrop-blur-md border border-gray-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
//       <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
//       <h2 className="text-4xl font-bold text-slate-900 mt-2">{value}</h2>
//       <div className={`absolute -bottom-2 -right-2 w-16 h-16 ${color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
//         {icon}
//       </div>
//     </div>
//   );
// }

// function WalletGlass() {
//   return (
//     <div className="rounded-[2.5rem] p-8 bg-white/80 backdrop-blur-1xl border border-gray-300 shadow-[0_30px_60px_rgba(0,0,0,0.05)] relative overflow-hidden">
//       {/* Subtle Yellow Glow in Wallet */}
//       <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/20 blur-3xl rounded-full"></div>
      
//       <div className="flex justify-between items-center mb-8">
//         <h3 className="font-semibold text-lg">My Wallet</h3>
//         <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Wallet size={20} /></div>
//       </div>

//       <div className="space-y-1">
//         <h1 className="text-5xl font-black text-slate-900 tracking-tight">$124.50</h1>
//         <div className="flex gap-4 pt-2">
//             <span className="text-xs font-semibold text-slate-400 uppercase">Redeemed: $75.00</span>
//         </div>
//       </div>

//       <div className="mt-8 space-y-4">
//         <div className="flex justify-between text-sm mb-1">
//             <span className="text-slate-600 font-medium">Goal Progress</span>
//             <span className="text-amber-600 font-bold">80%</span>
//         </div>
//         <div className="w-full h-3 bg-slate-100 rounded-full p-0.5">
//           <div className="h-full w-[80%] bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.4)]" />
//         </div>
//         <p className="text-xs text-slate-500 flex items-center gap-2 font-medium">
//           🔥 <span className="text-slate-800">$25.50</span> more for next bonus
//         </p>
//       </div>

//       <button className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white font-bold text-lg shadow-[0_10px_25px_rgba(251,191,36,0.3)] hover:shadow-[0_15px_30px_rgba(251,191,36,0.4)] transition-all active:scale-[0.98]">
//         Withdraw Funds
//       </button>
//     </div>
//   );
// }

// function SurveysGlass({ surveys, onViewAll }) {
//   return (
//     <div className="rounded-[2.5rem] p-8 bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)]">
//       <div className="flex justify-between items-center mb-8">
//         <h3 className="text-xl font-bold text-slate-800">New Surveys</h3>
//         <button onClick={onViewAll} className="px-4 py-2 rounded-xl text-sm text-amber-600 font-bold hover:bg-amber-50 transition-colors">
//           View all marketplace
//         </button>
//       </div>

//       <div className="grid gap-4">
//         {surveys.map((survey) => (
//           <SurveyGlassRow key={survey._id} survey={survey} onStart={() => startSurvey(survey)} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function SurveyGlassRow({ survey, onStart }) {
//   const diffStyles = {
//     Easy: "bg-emerald-50 text-emerald-600",
//     Medium: "bg-amber-50 text-amber-600",
//     Hard: "bg-rose-50 text-rose-600"
//   };

//   return (
//     <div className="group rounded-3xl p-5 bg-white/80 hover:bg-white border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
//       <div className="flex items-center gap-5 w-full md:w-auto">
//         <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-500 transition-colors">
//             <BarChart3 size={24} />
//         </div>
//         <div>
//           <h4 className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors">{survey.title}</h4>
//           <p className="text-sm text-slate-500 line-clamp-1">{survey.description}</p>
//           <div className="flex gap-4 items-center mt-2">
//             <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
//               <Clock size={14} /> {survey.timeLimit || 10} min
//             </span>
//             <span className={`px-3 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${diffStyles[survey.difficulty] || "bg-slate-100"}`}>
//               {survey.difficulty}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
//         <div className="text-right">
//           <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Reward</p>
//           <span className="text-lg font-black text-emerald-600">⭐ {survey.points} <span className="text-sm font-bold">Pts</span></span>
//         </div>

//         <button
//           onClick={onStart}
//           className="group/btn flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-amber-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-amber-200"
//         >
//           <Play size={16} fill="currentColor" />
//           Start
//         </button>
//       </div>
//     </div>
//   );
// }
// /* ================= START SURVEY (UNCHANGED) ================= */

// const startSurvey = async (survey) => {
//   try {
//     const res = await api.post("/responses/start", {
//       surveyId: survey._id,
//     });

//     const { redirectUrl } = res.data;

//     if (!redirectUrl) {
//       alert("Redirect URL not received");
//       return;
//     }

//     window.open(redirectUrl, "_blank");
//   } catch (err) {
//     console.error(err);
//     alert("Failed to start survey");
//   }
// };


// import {
//   BarChart3,
//   Star,
//   CheckCircle2,
//   Clock,
//   Wallet,
//   Play,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { useSearchParams } from "react-router-dom";

// /* ================= MAIN ================= */

// export default function UserHome() {
//   const [params] = useSearchParams();
//   const [surveys, setSurveys] = useState([]);
//   const [stats, setStats] = useState({
//   totalSurveys: 0,
//   available: 0,
//   completed: 0,
//   pending: 0
// });

//   const navigate = useNavigate();
// const [wallet, setWallet] = useState({
//     balance: 0,
//     earnedToday: 0,
//     totalRedeemed: 0,
//   });


//   useEffect(() => {
//   const status = params.get("st");

//   if (status === "com") {
//     // refresh data after completion
//     fetchDashboardData();
//     fetchSurveys();
//   }
// }, []);

//   useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const [walletRes, txRes, meRes] = await Promise.all([
//     api.get("/wallet"),
//     api.get("/wallet/transactions"),
//     api.get("/auth/me"), // ⭐ ADD THIS
//   ]);
          
//           setWallet(walletRes.data);
//           const statsRes = await api.get("/user-dashboard/stats");
// setStats(statsRes.data);

//         //  setTransactions(txRes.data);
//          // setWalletNumber(meRes.data.user.walletNumber || "0000");
//         } catch (err) {
//           console.error("Failed to fetch wallet data", err);
//         }
//       };
  
//       fetchData();
//     }, []);
// const fetchDashboardData = async () => {
//   const [walletRes, statsRes] = await Promise.all([
//     api.get("/wallet"),
//     api.get("/user-dashboard/stats"),
//   ]);

//   setWallet(walletRes.data);
//   setStats(statsRes.data);
// };

// const fetchSurveys = async () => {
//   const res = await api.get("/user-surveys/available");
//   setSurveys(res.data);
// };

//   useEffect(() => {
//     api
//       .get("/user-surveys/available")
//       .then((res) => setSurveys(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const sortedSurveys = [...surveys].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );
  

//   const visibleSurveys = sortedSurveys.slice(0, 3);

//   return (
//     <div
//       className="min-h-screen p-6 md:p-10 space-y-12 font-sans
//       bg-[#F7F9FB]
//       bg-[radial-gradient(circle_at_15%_10%,rgba(251,191,36,0.12),transparent_40%),
//           radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.08),transparent_45%)]"
//     >
//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
//   <Stat
//     title="Total Surveys"
//     value={stats.totalSurveys}
//     icon={<BarChart3 size={26} />}
//     gradient="bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-300"
//   />

//   <Stat
//     title="Available"
//     value={stats.available}
//     icon={<Star size={26} />}
//     gradient="bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-300"
//   />

//   <Stat
//     title="Completed"
//     value={stats.completed}
//     icon={<CheckCircle2 size={26} />}
//     gradient="bg-gradient-to-br from-emerald-500 via-green-400 to-lime-300"
//   />

//   <Stat
//     title="Pending"
//     value={stats.pending}
//     icon={<Clock size={26} />}
//     gradient="bg-gradient-to-br from-purple-500 via-fuchsia-400 to-pink-300"
//   />
// </div>


//       {/* ================= CONTENT ================= */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//         <WalletGlass wallet={wallet} earnedToday={wallet.earnedToday} max={500} />
//         <div className="xl:col-span-2">
//           <SurveysGlass
//             surveys={visibleSurveys}
//             onViewAll={() => navigate("/user/dashboard/surveys")}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= STAT CARD ================= */

// function Stat({ title, value, icon, gradient }) {
//   return (
//     <div
//       className={`
//       relative overflow-hidden
//       rounded-3xl p-6 h-[140px]
//       text-white
//       ${gradient}
//       shadow-[0_20px_50px_rgba(0,0,0,0.18)]
//       hover:shadow-[0_30px_70px_rgba(0,0,0,0.25)]
//       hover:-translate-y-1
//       transition-all duration-300
//       `}
//     >
//       {/* Glass shine */}
//       <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

//       {/* Diagonal light reflection */}
//       <div className="absolute -top-10 -right-20 w-72 h-72 bg-white/10 rotate-12 rounded-full" />

//       {/* Content */}
//       <div className="relative z-10 flex justify-between items-start h-full">
//         <div>
//           <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
//             {title}
//           </p>
//           <h2 className="text-4xl font-extrabold mt-3 tracking-tight">
//             {value}
//           </h2>
//         </div>

//         <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
//           {icon}
//         </div>
//       </div>

//       {/* Card chip (Visa vibe) */}
//       <div className="absolute bottom-4 left-6 w-10 h-7 rounded-md bg-white/30 backdrop-blur-sm" />
//     </div>
//   );
// }


// /* ================= WALLET ================= */

// function WalletGlass({wallet, earnedToday, max}) {
//   const progress = Math.min((earnedToday / max) * 100, 100);
//   const remaining = Math.max(max - earnedToday, 0);
//   return (
//     <div
//       className="rounded-3xl p-8
//       bg-white/90 backdrop-blur-xl
//       border border-slate-200
//       shadow-[0_20px_50px_rgba(0,0,0,0.06)]
//       relative overflow-hidden"
//     >
//       <div className="absolute -top-24 -right-24 w-56 h-56 bg-amber-300/20 blur-3xl rounded-full"></div>

//       <div className="flex justify-between items-center mb-8">
//         <h3 className="text-lg font-semibold text-slate-800">My Wallet</h3>
//         <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
//           <Wallet size={20} />
//         </div>
//       </div>

//       <h1 className="text-5xl font-bold text-slate-900">{wallet.balance} pts</h1>
//       <p className="text-sm text-slate-500 mt-2">Redeemed: {wallet.totalRedeemed} pts</p>

//       <div className="mt-8">
//         <div className="flex justify-between text-sm mb-2">
//           <span className="text-slate-600 font-medium">Goal Progress</span>
//           <span className="text-amber-600 font-semibold">
//   {Math.round(progress)}%
// </span>

//         </div>

//         <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
//           <div
//   className="h-full bg-amber-400 rounded-full transition-all duration-700"
//   style={{ width: `${progress}%` }}
// />

//         </div>

//         <p className="text-xs text-slate-500 mt-3">
//           🔥 <span className="font-semibold text-slate-800">
//   {remaining} pts
// </span>{" "}
// more for next bonus

//         </p>
//       </div>

//       <button
//         className="w-full mt-8 py-4 rounded-2xl
//         bg-slate-900 hover:bg-amber-500
//         text-white font-semibold text-sm
//         shadow-lg transition-all active:scale-[0.98]"
//       >
//         Withdraw Funds
//       </button>
//     </div>
//   );
// }

// /* ================= SURVEYS ================= */

// function SurveysGlass({ surveys, onViewAll }) {
//   return (
//     <div
//       className="rounded-3xl p-8
//       bg-white/90 backdrop-blur-xl
//       border border-slate-200
//       shadow-[0_20px_50px_rgba(0,0,0,0.06)]
//       relative overflow-hidden"
//     >
//         <div className="absolute -top-24 -right-24 w-56 h-56 bg-amber-300/20 blur-3xl rounded-full"></div>
//       <div className="flex justify-between items-center mb-8">
//         <h3 className="text-xl font-semibold text-slate-800">New Surveys</h3>
//         <button
//           onClick={onViewAll}
//           className="px-4 py-2 rounded-xl text-sm font-semibold
//           text-amber-600 hover:bg-amber-50 transition"
//         >
//           View all marketplace
//         </button>
//       </div>

//       <div className="space-y-4">
//         {surveys.map((survey) => (
//           <SurveyRow
//             key={survey._id}
//             survey={survey}
//             onStart={() => startSurvey(survey)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ================= SURVEY ROW ================= */

// function SurveyRow({ survey, onStart }) {
//   const diffColor = {
//     Easy: "bg-emerald-50 text-emerald-600",
//     Medium: "bg-amber-50 text-amber-600",
//     Hard: "bg-rose-50 text-rose-600",
//   };

//   return (
//     <div
//       className="rounded-2xl p-5
//       bg-white hover:bg-slate-50
//       border border-slate-200
//       flex flex-col md:flex-row justify-between items-center gap-5
//       shadow-sm hover:shadow-md transition"
//     >
//       <div className="flex gap-5 items-center">
//         <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
//           <BarChart3 size={24} />
//         </div>

//         <div>
//           <h4 className="font-semibold text-slate-800">{survey.title}</h4>
//           <p className="text-sm text-slate-500 line-clamp-1">
//             {survey.description}
//           </p>

//           <div className="flex gap-3 items-center mt-2">
//             <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
//               <Clock size={14} /> {survey.timeLimit || 10} min
//             </span>
//             <span
//               className={`px-3 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${
//                 diffColor[survey.difficulty] || "bg-slate-100 text-slate-500"
//               }`}
//             >
//               {survey.difficulty}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-6">
//         <div className="text-right">
//           <p className="text-xs font-semibold text-slate-400 uppercase">
//             Reward
//           </p>
//           <p className="text-lg font-bold text-emerald-600">
//             ⭐ {survey.points} Pts
//           </p>
//         </div>

//         <button
//           onClick={onStart}
//           className="flex items-center gap-2 px-6 py-3
//           rounded-xl bg-[#feb531] hover:bg-amber-500
//           text-white font-semibold text-sm
//           shadow-md transition"
//         >
//           <Play size={16} />
//           Start
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ================= START SURVEY ================= */

// const startSurvey = async (survey) => {
//   try {
//     const res = await api.post("/responses/start", {
//       surveyId: survey._id,
//     });

//     const { redirectUrl } = res.data;

//     if (!redirectUrl) {
//       alert("Redirect URL not received");
//       return;
//     }

//     window.open(redirectUrl, "_blank");
//   } catch (err) {
//     console.error(err);
//     alert("Failed to start survey");
//   }
// };


import {
  BarChart3,
  Star,
  CheckCircle2,
  Clock,
  Wallet,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useSearchParams } from "react-router-dom";
import {Link} from 'react-router-dom'
/* ================= MAIN ================= */

export default function UserHome() {
 const navigate = useNavigate();
  const [params] = useSearchParams();

  const [surveys, setSurveys] = useState([]);
  const [stats, setStats] = useState({
    totalSurveys: 0,
    available: 0,
    completed: 0,
    pending: 0,
  });

  const [wallet, setWallet] = useState({
    balance: 0,
    earnedToday: 0,
    totalRedeemed: 0,
  });

  /* ================= FETCH FUNCTIONS ================= */

  const fetchDashboardData = async () => {
  try {
    const statsRes = await api.get("/user-dashboard/stats");
    const [walletRes] = await Promise.all([
      api.get("/wallet"),
      api.get("/user-dashboard/stats"),
    ]);

    console.log("Stats from server:", statsRes.data);
    setWallet(walletRes.data);
    setStats(statsRes.data); 
  } catch (err) {
    console.error("Dashboard fetch failed", err);
  }
};

const fetchSurveys = async () => {
  try {
    const res = await api.get("/user-surveys/available");
    setSurveys(res.data);
  } catch (err) {
    console.error(err);
  }
};

  /* ================= INITIAL LOAD ================= */

 const status = params.get("st");

// 1. Single source of truth for loading data
// UserHome.jsx
useEffect(() => {
  const loadDashboard = async () => {
    // If we just finished a survey, wait 500ms for DB to sync
    if (status === "com") {
      await new Promise(resolve => setTimeout(resolve, 800)); 
    }
    
    try {
      await Promise.all([
        fetchDashboardData(),
        fetchSurveys()
      ]);
    } catch (err) {
      console.error("Reload failed", err);
    }
  };

  loadDashboard();
}, [status]); // Triggered when URL changes to ?st=com
// 2. Specific logic for successful completion (Toast notifications, etc.)
useEffect(() => {
  if (status === "com") {
    console.log("Success! Survey marked as complete.");
    // You could trigger a success toast here
  }
}, [status]);





  /* ================= SORT ================= */

  const sortedSurveys = [...surveys].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const visibleSurveys = sortedSurveys.slice(0, 3);

  return (
    <div
      className="min-h-screen p-6 md:p-10 space-y-12 font-sans
      bg-[#F7F9FB]
      bg-[radial-gradient(circle_at_15%_10%,rgba(251,191,36,0.12),transparent_40%),
          radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.08),transparent_45%)]"
    >
      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
  <Stat
    title="Total Surveys"
    value={stats.totalSurveys}
    icon={<BarChart3 size={26} />}
    gradient="bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-300"
  />

  <Stat
    title="Available"
    value={stats.available}
    icon={<Star size={26} />}
    gradient="bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-300"
  />

  <Stat
    title="Completed"
    value={stats.completed}
    icon={<CheckCircle2 size={26} />}
    gradient="bg-gradient-to-br from-emerald-500 via-green-400 to-lime-300"
  />

  <Stat
    title="Pending"
    value={stats.pending}
    icon={<Clock size={26} />}
    gradient="bg-gradient-to-br from-purple-500 via-fuchsia-400 to-pink-300"
  />
</div>

{/* ================= BRAND CARD ================= */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
  <div className="xl:col-span-3">
    <BrandCard />
  </div>
</div>


      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <WalletGlass wallet={wallet} earnedToday={wallet.earnedToday} max={500} />
        <div className="xl:col-span-2">
          <SurveysGlass
            surveys={visibleSurveys}
            onViewAll={() => navigate("/user/dashboard/surveys")}
          />
        </div>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function Stat({ title, value, icon, gradient }) {
  return (
    <div
      className={`
      relative overflow-hidden
      rounded-3xl p-6 h-[140px]
      text-white
      ${gradient}
      shadow-[0_20px_50px_rgba(0,0,0,0.18)]
      hover:shadow-[0_30px_70px_rgba(0,0,0,0.25)]
      hover:-translate-y-1
      transition-all duration-300
      `}
    >
      {/* Glass shine */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

      {/* Diagonal light reflection */}
      <div className="absolute -top-10 -right-20 w-72 h-72 bg-white/10 rotate-12 rounded-full" />

      {/* Content */}
      <div className="relative z-10 flex justify-between items-start h-full">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
            {title}
          </p>
          <h2 className="text-5xl font-extrabold mt-3 tracking-tight">
            {value}
          </h2>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Card chip (Visa vibe) */}
      {/* <div className="absolute bottom-6 left-6 w-10 h-2 rounded-md bg-white/30 backdrop-blur-sm" /> */}
    </div>
  );
}


/* ================= WALLET ================= */

function WalletGlass({wallet, earnedToday, max}) {
  const progress = Math.min((earnedToday / max) * 100, 100);
  const remaining = Math.max(max - earnedToday, 0);
  return (
    <div
      className="rounded-3xl p-8
      bg-white/90 backdrop-blur-xl
      border border-slate-200
      shadow-[0_20px_50px_rgba(0,0,0,0.06)]
      relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-56 h-56 bg-amber-300/20 blur-3xl rounded-full"></div>

      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-semibold text-slate-800">My Wallet</h3>
        <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
          <Wallet size={20} />
        </div>
      </div>

      <h1 className="text-5xl font-bold text-slate-900">{wallet.balance} pts</h1>
      <p className="text-sm text-slate-500 mt-2">Redeemed: {wallet.totalRedeemed} pts</p>

      <div className="mt-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-600 font-medium">Goal Progress</span>
          <span className="text-amber-600 font-semibold">
  {Math.round(progress)}%
</span>

        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
  className="h-full bg-amber-400 rounded-full transition-all duration-700"
  style={{ width: `${progress}%` }}
/>

        </div>

        <p className="text-xs text-slate-500 mt-3">
          🔥 <span className="font-semibold text-slate-800">
  {remaining} pts
</span>{" "}
more for next bonus

        </p>
      </div>

      <Link to="/user/dashboard/store"><button
        className="w-full mt-8 py-4 rounded-2xl
        bg-slate-900 hover:bg-amber-500
        text-white font-semibold text-sm
        shadow-lg transition-all active:scale-[0.98]"
      >
        Withdraw Funds
      </button></Link>
    </div>
  );
}

/* ================= SURVEYS ================= */

function SurveysGlass({ surveys, onViewAll }) {
  return (
    <div
      className="rounded-3xl p-8
      bg-white/90 backdrop-blur-xl
      border border-slate-200
      shadow-[0_20px_50px_rgba(0,0,0,0.06)]
      relative overflow-hidden"
    >
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-amber-300/20 blur-3xl rounded-full"></div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold text-slate-800">New Surveys</h3>
        <button
          onClick={onViewAll}
          className="px-4 py-2 rounded-xl text-sm font-semibold
          text-amber-600 hover:bg-amber-50 transition"
        >
          View all marketplace
        </button>
      </div>

      <div className="space-y-4">
        {surveys.map((survey) => (
          <SurveyRow
            key={survey._id}
            survey={survey}
            onStart={() => startSurvey(survey)}
          />
        ))}
      </div>
    </div>
  );
}

/* ================= SURVEY ROW ================= */

function SurveyRow({ survey, onStart }) {
  const diffColor = {
    Easy: "bg-emerald-50 text-emerald-600",
    Medium: "bg-amber-50 text-amber-600",
    Hard: "bg-rose-50 text-rose-600",
  };

  return (
    <div
      className="rounded-2xl p-5
      bg-white hover:bg-slate-50
      border border-slate-200
      flex flex-col md:flex-row justify-between items-center gap-5
      shadow-sm hover:shadow-md transition"
    >
      <div className="flex gap-5 items-center">
        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
          <BarChart3 size={24} />
        </div>

        <div>
          <h4 className="font-semibold text-slate-800">{survey.title}</h4>
          <p className="text-sm text-slate-500 line-clamp-1">
            {survey.description}
          </p>

          <div className="flex gap-3 items-center mt-2">
            <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
              <Clock size={14} /> {survey.timeLimit || 10} min
            </span>
            <span
              className={`px-3 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${
                diffColor[survey.difficulty] || "bg-slate-100 text-slate-500"
              }`}
            >
              {survey.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-xs font-semibold text-slate-400 uppercase">
            Reward
          </p>
          <p className="text-lg font-bold text-emerald-600">
            ⭐ {survey.points} Pts
          </p>
        </div>

        <button
          disabled={survey.completed}
  onClick={onStart}
          className={`flex items-center gap-2 h-[48px] w-[140px]
          rounded-xl bg-[#feb531] hover:bg-amber-500 px-6 py-3
          text-white font-semibold text-sm
          shadow-md transition
          ${
      survey.completed
        ? "bg-gray-300 cursor-not-allowed text-gray-500 px-6 py-3"
        : "bg-[#E2852E] hover:bg-orange-300 text-white active:scale-95"
    }
          `}
        >
          <Play size={16} />
         {survey.completed ? "Completed" : "Start"}
        </button>
      </div>
    </div>
  );
}

/* ================= START SURVEY ================= */

const startSurvey = async (survey) => {
  try {
    const res = await api.post("/responses/start", {
      surveyId: survey._id,
    });

    const { redirectUrl } = res.data;

    if (!redirectUrl) {
      alert("Redirect URL not received");
      return;
    }

    window.open(redirectUrl, "_blank");
  } catch (err) {
    console.error(err);
    alert("Failed to start survey");
  }
};


// function BrandCard() {
//   const brands = [
//     "/brands/google.png",
//     "/brands/microsoft.png",
//     "/brands/apple.png",
//     "/brands/amazon.jpg",
//     "/brands/adidas.png",
//     "/brands/dominos.png",
//     "/brands/starbucks.png",
//   ];

//   return (
//     // <div
//     //   className="
//     //     rounded-3xl p-8
//     //     bg-white/90 backdrop-blur-xl
//     //     border border-slate-200
//     //     shadow-[0_20px_50px_rgba(0,0,0,0.06)]
//     //     relative overflow-hidden
//     //   "
//     // >

//       <div
//       className="
//         rounded-3xl p-8
//         backdrop-blur-xl
//         relative overflow-hidden
//       "
//     >
//       <h3 className="text-lg text-gray-400 text-center font-semibold mb-15">
//         Trusted by leading brands we collaborate with
//       </h3>

//       <div className="overflow-hidden hide-scrollbar">
//         <div className="flex gap-12 auto-scroll whitespace-nowrap">
//           {[...brands, ...brands].map((logo, index) => (
//             <img
//               key={index}
//               src={logo}
//               alt="brand"
//               className="h-40 object-contain opacity-70 hover:opacity-100 transition"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

function BrandCard() {
  const brands = [
    "/brands/swiggy.png",
    "/brands/levis.png",
    "/brands/shoppersstop.png",
    "/brands/amazon.jpg",
    "/brands/adidas.png",
    "/brands/dominos.png",
    "/brands/starbucks.png",
  ];

  return (
    <div className="rounded-3xl p-8 relative overflow-hidden">
      <h3 className="text-lg text-gray-400 text-center font-semibold mb-15">
        Trusted by leading brands we collaborate with
      </h3>

      <div className="scroll-wrapper">
        <div className="scroll-content">
          {[...brands, ...brands].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="brand"
              className="h-40 object-contain opacity-70 hover:opacity-100 transition shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
