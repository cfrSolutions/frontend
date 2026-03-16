// import {
//   BarChart3,
//   TrendingUp,
//   Users,
//   Clock,
//   Download,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import api from "../services/api";

// export default function AdminReports() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadReport = async () => {
//       try {
//         const res = await api.get("/surveys/admin/reports/overview");
//         setData(res.data);
//       } catch (err) {
//         console.error("Admin report load failed", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadReport();
//   }, []);

//   if (loading) return <div>Loading report...</div>;
//   if (!data) return <div>No report data available</div>;

//   return (
//     <div className="space-y-6">

//       {/* ================= HEADER ================= */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-2xl font-semibold">Platform Report</h1>
//           <p className="text-sm text-gray-500">
//             Overall performance across all surveys and users
//           </p>
//         </div>

//         <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
//           <Download size={16} />
//           Export
//         </button>
//       </div>

//       {/* ================= MAIN STATS ================= */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//         <StatCard
//           icon={<Users size={20} />}
//           title="Total Started"
//           value={data.totalStarted}
//         />

//         <StatCard
//           icon={<BarChart3 size={20} />}
//           title="Completed"
//           value={data.completed}
//           color="text-green-600"
//         />

//         <StatCard
//           icon={<TrendingUp size={20} />}
//           title="Incidence Rate"
//           value={`${data.incidenceRate}%`}
//         />

//         <StatCard
//           icon={<Clock size={20} />}
//           title="Avg Duration"
//           value={formatDuration(data.avgDurationSeconds)}
//         />
//       </div>

//       {/* ================= SECOND ROW ================= */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//         <SmallStat title="Screen Out" value={data.screenout} />
//         <SmallStat title="Quota Full" value={data.quota} />
//         <SmallStat title="Cancelled" value={data.cancelled} />
//         <SmallStat title="Cleaned" value={data.cleaned} />
//       </div>

//       {/* ================= DEMOGRAPHICS ================= */}
//       <div className="grid md:grid-cols-2 gap-6">

//         <DemoCard title="Gender Distribution" data={data.gender} />
//         <DemoCard title="Generations" data={data.generations} />

//       </div>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function StatCard({ icon, title, value, color = "text-gray-900" }) {
//   return (
//     <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
//       <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
//         {icon}
//       </div>
//       <div>
//         <div className={`text-2xl font-bold ${color}`}>{value}</div>
//         <div className="text-sm text-gray-500">{title}</div>
//       </div>
//     </div>
//   );
// }

// function SmallStat({ title, value }) {
//   return (
//     <div className="bg-white rounded-xl shadow p-4 text-center">
//       <div className="text-xl font-semibold">{value}</div>
//       <div className="text-sm text-gray-500">{title}</div>
//     </div>
//   );
// }

// function DemoCard({ title, data }) {
//   return (
//     <div className="bg-white rounded-xl shadow p-6">
//       <h3 className="font-semibold mb-4">{title}</h3>
//       <ul className="space-y-2 text-sm">
//         {Object.entries(data || {}).length === 0 ? (
//           <li className="text-gray-400">No data</li>
//         ) : (
//           Object.entries(data).map(([key, val]) => (
//             <li key={key}>
//               <b>{val}</b> - {key}
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// }

// function formatDuration(seconds) {
//   const m = Math.floor(seconds / 60);
//   const s = seconds % 60;
//   return `${String(m).padStart(2, "0")}m:${String(s).padStart(2, "0")}s`;
// }


import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Legend
} from "recharts";

import { useEffect, useState } from "react";
import api from "../services/api";

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6"];

export default function AdminReports() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/surveys/admin/reports/overview")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div>Loading report...</div>;

  /* ================= PREPARE GRAPH DATA ================= */

  const statusData = [
    { name: "Completed", value: data.completed },
    { name: "Screenout", value: data.screenout },
    { name: "Quota", value: data.quota },
    { name: "Cancelled", value: data.cancelled },
    { name: "Cleaned", value: data.cleaned },
  ];

  const genderData = Object.entries(data.gender || {}).map(([key, val]) => ({
    name: key,
    value: val
  }));

  const ageData = Object.entries(data.ageGroups || {}).map(([key, val]) => ({
    name: key,
    value: val
  }));

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-semibold">Platform Analytics</h1>

      {/* ================= STATUS BAR CHART ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="mb-4 font-semibold">Survey Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= GENDER PIE CHART ================= */}
      <div className="bg-white p-2 rounded-xl shadow">
        <h3 className="mb-4 font-semibold">Gender Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              outerRadius={130}
              label
            >
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ================= AGE GROUP BAR ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="mb-4 font-semibold">Age Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= QUICK KPI CARDS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <KPI title="Total Started" value={data.totalStarted} />
        <KPI title="Incidence Rate" value={`${data.incidenceRate}%`} />
        <KPI title="Avg Duration" value={`${Math.round(data.avgDurationSeconds/60)} min`} />
        <KPI title="Total Completed" value={data.completed} />

      </div>

    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <div className="text-2xl font-bold text-green-600">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );
}