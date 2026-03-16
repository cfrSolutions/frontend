import React from "react";
import { ChevronDown, Play, Square, MoreHorizontal, Plus, Check } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api"; 



export default function SurveyDashboard() {
  const [surveys, setSurveys] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(surveys[0]);
const [surveyId, setSurveyId] = useState(null);


  const [stats, setStats] = useState({
    totalStarted: 0,
    completed: 0,
    pending: 0,
    screenout: 0,
    quota: 0,
    cancelled: 0,
    cleaned: 0,
    incidenceRate: "0.0",
    avgDurationSeconds: 0,
  });

  const [demo, setDemo] = useState({
    gender: {},
    generations: {},
  });
  useEffect(() => {
  if (!surveyId) return;

  api.get(`/surveys/${surveyId}/stats`).then((res) => {
    setStats(res.data);
  });

  api.get(`/surveys/${surveyId}/demographics`).then((res) => {
    console.log("Demographics API:", res.data); 
    setDemo(res.data);
  });
}, [surveyId]);

useEffect(() => {
  // Use the correct endpoint as defined in your router
  api.get("/surveys").then((res) => { 
    setSurveys(res.data);
    if (res.data.length > 0) {
      setSelectedSurvey(res.data[0].title);
      setSurveyId(res.data[0]._id);
    }
  }).catch(err => console.error("Fetch surveys failed:", err));
}, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative w-full sm:w-auto">
  <button
    onClick={() => setOpen(!open)}
    className="w-full sm:w-auto flex items-center justify-between gap-2 bg-white px-4 py-2 rounded-lg shadow text-sm font-medium"
  >
    {selectedSurvey || "Select Survey"}
    <ChevronDown size={16} />
  </button>

  {open && (
    <div className="absolute z-10 mt-2 w-full sm:w-64 bg-white rounded-lg shadow-lg border">
      {surveys.map((s) => (
        <button
          key={s._id}
          onClick={() => {
            setSelectedSurvey(s.title);
            setSurveyId(s._id);
            setOpen(false);
          }}
          className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 ${
            selectedSurvey === s.title
              ? "text-green-600 font-medium"
              : ""
          }`}
        >
          {s.title}
          {selectedSurvey === s.title && <Check size={14} />}
        </button>
      ))}
    </div>
  )}
</div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Panel */}
        <div className="lg:col-span-9 bg-white rounded-xl shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 bg-gray-100 p-3 rounded-md">
            <h2 className="text-lg sm:text-xl font-semibold">LIVE Link</h2>
            <div className="flex items-center gap-7 text-gray-600">
              <Play size={18} />
              <Square size={18} />
              <MoreHorizontal size={18} />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm rounded-full bg-gray-100 font-medium">ALL</button>
              <button className="px-3 py-1 text-sm rounded-full text-gray-500">CANCELLED</button>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm rounded-full bg-gray-100 font-medium">ABSOLUTE</button>
              <button className="px-3 py-1 text-sm rounded-full text-gray-500">RELATIVE</button>
            </div>
          </div>

     
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-8 ">
            <Stat title="Total Started" value={stats.totalStarted} color="text-gray-700"/>
            <Stat title="Completed" value={stats.completed} color="text-green-600" />
            <Stat title="Pending" value="0" color="text-gray-700"/>
            <Stat title="Incidence Rate" value={`${stats.incidenceRate}%`} color="text-gray-700" />
            <Stat title="Length of Interview" value={formatDuration(stats.avgDurationSeconds)} color="text-gray-700" />
          </div>

          {/* Bottom Row – 4 stats (fixed alignment under first 4) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 mb-10 ">
            <Stat title="Cancelled" value={stats.cancelled} color="text-gray-700" />
            <Stat title="Screen Out" value={stats.screenout} color="text-red-700" />
            <Stat title="Quota Out" value={stats.quota} color="text-blue-700" />
            <Stat title="Cleaned Out" value={stats.cleaned} color="text-gray-700" />
            {/* empty placeholder to keep alignment */}
            <div className="hidden lg:block" />
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 p-3 rounded-md">
            <div>
              <h3 className="font-semibold mb-3">Generations</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {Object.entries(demo.generations).map(([gen, count]) => (
    <li key={gen}>
      <b>{count}</b> - {gen}
    </li>
  ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Gender</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {Object.entries(demo.gender).map(([g, count]) => (
    <li key={g}>
      <b>{count}</b> - {g}
    </li>
  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-3 space-y-4">
          <SideCard title="Test Link" status="Testphase" participants="0/-" statusColor="text-orange-500" />
          <SideCard title="LIVE Link" status="Running" participants="462/500" statusColor="text-green-600" highlight />

          <button className="w-full flex items-center justify-center gap-2 border border-dashed border-green-500 text-green-600 rounded-xl py-3 font-medium hover:bg-green-50 transition">
            <Plus size={16} /> ADD ENTRY LINK
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, color = "text-gray-900" }) {
  return (
    <div className="text-center sm:text-left">
      <div className={`text-2xl sm:text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );
}

function SideCard({ title, status, participants, statusColor, highlight }) {
  return (
    <div className={`bg-white rounded-xl shadow p-4 ${highlight ? "border-l-4 border-green-500" : ""}`}>
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="text-sm text-gray-500">Total Participants</div>
      <div className="font-medium mb-2">{participants}</div>
      <div className="flex justify-between text-sm">
        <span>Status</span>
        <span className={statusColor}>{status}</span>
      </div>
    </div>
  );
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}m:${String(s).padStart(2, "0")}s`;
}
