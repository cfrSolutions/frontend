import {
  Download,
  BarChart3,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";


import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";

export default function UserReports() {
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
  })

  const fetchDashboardData = async()=>{
    try{
      const [walletRes, statsRes] = await Promise.all([
      api.get("/wallet"),
      api.get("/user-dashboard/stats"),
    ]);

    setWallet(walletRes.data);
    setStats(statsRes.data);
    }
    catch(err){
      console.error("Dashboard fetch failed", err);
    }
  };

  const fetchSurveys = async ()=>{
    try{
      const res = await api.get("/user-surveys/available");
      setSurveys(res.data);
    }
    catch(err){
      console.error(err);
    }
  };

  const status = params.get("st");
  useEffect(() => {
  const loadDashboard = async () => {
    try {
      const [
        walletRes,
        statsRes,
        reportRes,
        activityRes,
        surveysRes
      ] = await Promise.all([
        api.get("/wallet"),
        api.get("/user-dashboard/stats"),
        api.get("/user-dashboard/report-stats"),
        api.get("/user-dashboard/activity"),
        api.get("/user-surveys/available")
      ]);

      setWallet(walletRes.data);
      setStats(statsRes.data);
      setReport(reportRes.data);
      setActivity(activityRes.data);
      setSurveys(surveysRes.data);

    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };

  loadDashboard();
}, [status]);

  useEffect(()=>{
    if(status === "com"){
      console.log("Success! Survey marked as compl")
    }
  }, [status]);
  
const [report, setReport] = useState({
  avgTimeMinutes: 0,
  streakDays: 0
});

const [activity, setActivity] = useState([]);

  const pointsEarned = wallet.totalEarned || 0;

const avgPerSurvey =
  stats.completed > 0
    ? (pointsEarned / stats.completed).toFixed(1)
    : 0;

const completionRate =
  stats.totalSurveys > 0
    ? Math.round((stats.completed / stats.totalSurveys) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Reports</h1>
          <p className="text-sm text-gray-500">
            View your activity and earnings reports
          </p>
        </div>

        <button className="flex items-center gap-2 border border-blue px-4 py-2 rounded-lg text-sm hover:bg-white">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MONTHLY OVERVIEW */}
        <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-orange-200 text-orange-600 rounded-xl flex items-center justify-center">
              <BarChart3 size={20} />
            </div>
            <h3 className="font-semibold text-lg">Monthly Overview</h3>
          </div>

          <div className="space-y-3 text-sm">
            <Row label="Surveys Completed" value={stats.completed} />
           <Row label="Points Earned" value={`${pointsEarned} pts`} />
<Row label="Average per Survey" value={`${avgPerSurvey} pts`} />

          </div>
        </div>

        {/* PERFORMANCE */}
        <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-orange-200 text-orange-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-semibold text-lg">Performance</h3>
          </div>

          <div className="space-y-3 text-sm">
            <Row
              label="Completion Rate"
              value={<span className="text-green-600 font-medium">{completionRate}%</span>}
            />
            <Row label="Avg. Time per Survey" value={`${report.avgTimeMinutes} min`} />
<Row label="Streak Days" value={report.streakDays} />

          </div>
        </div>
      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-sm">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-300">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <Calendar size={20} />
          </div>
          <h3 className="font-semibold text-lg">Recent Activity</h3>
        </div>

        <div className="p-6 h-[300px]">
  {activity.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <BarChart3 size={40} />
      <p className="text-sm mt-2">No activity yet</p>
    </div>
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={activity}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="_id"
          tick={{ fontSize: 12 }}
        />

        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12 }}
        />

        <Tooltip
          formatter={(value) => [`${value} pts`, "Earned"]}
        />

        <Line
          type="monotone"
          dataKey="points"
          stroke="#f59e0b"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )}
</div>

      </div>
    </div>
  );
}

/* ================= SMALL ROW COMPONENT ================= */

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}
