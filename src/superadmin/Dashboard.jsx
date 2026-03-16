// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";
// import { useEffect, useState } from "react";
// import api from "../services/api";
// export default function Dashboard() {
//   // 🔹 MOCK DATA (replace with API later)
//   const [stats, setStats] = useState([]);
//   const [responseData, setResponseData] = useState([]);
//   const [completionData, setCompletionData] = useState([]);

//   useEffect(() => {
//     const loadDashboard = async () => {
//       try {
//         const res = await api.get("/surveys/admin/dashboard-summary");
//         const data = res.data;

//         setStats([
//           {
//             title: "Total Surveys",
//             value: data.totalSurveys,
//             change: "",
//             color: "bg-green-500",
//           },
//           {
//             title: "Active Surveys",
//             value: data.activeSurveys,
//             change: "",
//             color: "bg-sky-500",
//           },
//           {
//             title: "Total Responses",
//             value: data.totalResponses,
//             change: "",
//             color: "bg-orange-400",
//           },
//           {
//             title: "Flagged",
//             value: data.flagged,
//             change: "",
//             color: "bg-purple-500",
//           },
//         ]);

//         // Convert last7Days to readable format
//         const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
//         const formatted = data.last7Days.map(d => ({
//           day: days[d._id - 1],
//           value: d.count
//         }));

//         setResponseData(formatted);

//         const formattedCompletion = data.completion.map(c => ({
//           name: c._id,
//           completed: c.completed,
//           dropped: c.dropped
//         }));

//         setCompletionData(formattedCompletion);

//       } catch (err) {
//         console.error("Dashboard load failed", err);
//       }
//     };

//     loadDashboard();
//   }, []);

//   return (
//     <div className="space-y-6">
//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {stats.map((item) => (
//           <div
//             key={item.title}
//             className={`rounded-xl p-5 text-white ${item.color}`}
//           >
//             <p className="text-sm opacity-90">{item.title}</p>
//             <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
//             <p className="text-xs mt-2 opacity-90">{item.change}</p>
//           </div>
//         ))}
//       </div>

//       {/* ================= CHARTS ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Responses Overview */}
//         <div className="bg-white rounded-xl p-5 shadow-sm">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h3 className="font-semibold">Responses Overview</h3>
//               <p className="text-xs text-gray-500">
//                 Daily survey responses this week
//               </p>
//             </div>
//             <select className="border text-sm rounded px-2 py-1">
//               <option>This Week</option>
//               <option>Last Week</option>
//             </select>
//           </div>

//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={responseData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="day" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#22c55e"
//                   strokeWidth={3}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Completion Rates */}
//         <div className="bg-white rounded-xl p-5 shadow-sm">
//           <h3 className="font-semibold mb-1">Completion Rates</h3>
//           <p className="text-xs text-gray-500 mb-4">
//             Survey completion vs drop-off
//           </p>

//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={completionData} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number" />
//                 <YAxis dataKey="name" type="category" />
//                 <Tooltip />
//                 <Bar dataKey="completed" fill="#22c55e" radius={[0, 6, 6, 0]} />
//                 <Bar dataKey="dropped" fill="#f59e0b" radius={[0, 6, 6, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import {
  BarChart3,
  Star,
  CheckCircle2,
  Clock,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../services/api";

/* ================= PREMIUM STAT CARD ================= */

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
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
      <div className="absolute -top-10 -right-20 w-72 h-72 bg-white/10 rotate-12 rounded-full" />

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
    </div>
  );
}

/* ================= DASHBOARD ================= */

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalSurveys: 0,
    activeSurveys: 0,
    totalResponses: 0,
    flagged: 0,
  });

  const [responseData, setResponseData] = useState([]);
  const [completionData, setCompletionData] = useState([]);
const top5Completion = completionData
  .sort((a, b) => b.completed - a.completed)
  .slice(0, 5);
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await api.get("/surveys/admin/dashboard-summary");
        const data = res.data;

        /* ===== STAT CARDS ===== */
        setStats({
          totalSurveys: data.totalSurveys,
          activeSurveys: data.activeSurveys,
          totalResponses: data.totalResponses,
          flagged: data.flagged,
        });

        /* ===== LAST 7 DAYS LINE CHART ===== */
        const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

        const formatted = data.last7Days.map(d => ({
          day: days[d._id - 1],
          value: d.count
        }));

        setResponseData(formatted);

        /* ===== COMPLETION BAR CHART ===== */
        const formattedCompletion = data.completion.map(c => ({
          name: c._id,
          completed: c.completed,
          dropped: c.dropped
        }));

        setCompletionData(formattedCompletion);

      } catch (err) {
        console.error("Dashboard load failed", err);
      }
    };

    loadDashboard();
  }, []);

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
          title="Active Surveys"
          value={stats.activeSurveys}
          icon={<Star size={26} />}
          gradient="bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-300"
        />

        <Stat
          title="Total Responses"
          value={stats.totalResponses}
          icon={<CheckCircle2 size={26} />}
          gradient="bg-gradient-to-br from-emerald-500 via-green-400 to-lime-300"
        />

        <Stat
          title="Flagged"
          value={stats.flagged}
          icon={<Clock size={26} />}
          gradient="bg-gradient-to-br from-purple-500 via-fuchsia-400 to-pink-300"
        />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Responses Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="font-semibold mb-4">Responses Overview</h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Completion Rates */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
  <h3 className="font-semibold mb-4">
    Completion vs Drop-off (Top 5)
  </h3>

  {/* <div className="h-96">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={completionData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Bar
          dataKey="completed"
          fill="#22c55e"
          radius={[0, 6, 6, 0]}
        />
        <Bar
          dataKey="dropped"
          fill="#f59e0b"
          radius={[0, 6, 6, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div> */}
  <div className="bg-white rounded-2xl p-6 shadow-md">
 

  <div className="h-96">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={top5Completion} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Bar
          dataKey="completed"
          fill="#22c55e"
          radius={[0, 6, 6, 0]}
        />
        <Bar
          dataKey="dropped"
          fill="#f59e0b"
          radius={[0, 6, 6, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
</div>

      </div>
    </div>
  );
}