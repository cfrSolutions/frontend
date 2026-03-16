import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateSurvey() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("INTERNAL");

  const [form, setForm] = useState({
    title: "",
    description: "",
    points: 10,
    timeLimit: 10,
    difficulty: "Easy",
    category: "GENERAL",
    countries: "ALL",
 
    surveyType: "",
    externalSurveyUrl: "",
   trackingParam: "",
    randomizeQuestions: false,
    allowBackNavigation: true,
    showProgressBar: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (status = "DRAFT") => {
    try {
      const payload = {
        title: form.title,
        description: form.description,
        points: Number(form.points),
        timeLimit: Number(form.timeLimit),
        difficulty: form.difficulty,
        category: form.category,
        countries: form.countries === "ALL" ? ["ALL"] : [form.countries],
        status,
        surveyType: activeTab,
        // ✅ IMPORTANT
        companySurveyUrl:
    activeTab === "EXTERNAL" ? form.externalSurveyUrl : null,

  trackingParam:
    activeTab === "EXTERNAL" ? form.trackingParam : null,
      };

      await api.post("/surveys", payload);
      alert("Survey created successfully");
      navigate("/superadmin/dashboard/surveys");
    } catch (err) {
      console.error(err);
      alert(
        "Failed to create survey: " +
          (err.response?.data?.message || "Server Error")
      );
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* ================= HEADER TABS ================= */}
      <div className="flex gap-4 border-b">
        <TabButton
          label="Create Own Survey"
          active={activeTab === "INTERNAL"}
          onClick={() => {
            setActiveTab("INTERNAL");
            setForm((f) => ({ ...f, surveyType: "INTERNAL" }));
          }}
        />

        <TabButton
          label="Direct Survey (External)"
          active={activeTab === "EXTERNAL"}
          onClick={() => {
            setActiveTab("EXTERNAL");
            setForm((f) => ({ ...f, surveyType: "EXTERNAL" }));
          }}
        />
      </div>

      {/* ================= BASIC INFO ================= */}
      <section className="bg-white p-6 rounded-xl border space-y-4">
        <h3 className="font-semibold">Basic Information</h3>

        <div>
          <label className="text-sm font-medium">Survey Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>

        {activeTab === "EXTERNAL" && (
          <div>
            <label className="text-sm font-medium">
              External Survey URL
            </label>
            <input
              name="externalSurveyUrl"
              value={form.externalSurveyUrl}
              onChange={handleChange}
              placeholder="https://forms.google.com/..."
              className="w-full mt-1 border rounded px-3 py-2"
            />
          </div>
        )}

        {activeTab === "EXTERNAL" && (
  <div>
    <label className="text-sm font-medium">
      Tracking Placeholder (from company)
    </label>
    <input
      name="trackingParam"
      value={form.trackingParam || ""}
      onChange={handleChange}
      placeholder="{ID} or {uid}"
      className="w-full mt-1 border rounded px-3 py-2"
    />
  </div>
)}

<div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Reward Points</label>
                <input
                  type="number"
                  name="points"
                  value={form.points}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  name="timeLimit"
                  value={form.timeLimit}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Difficulty</label>
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Country Availability
                </label>
                <select
                  name="countries"
                  value={form.countries}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                >
                  <option value="ALL">All Countries</option>
                  <option value="IN">India</option>
                  <option value="US">US</option>
                </select>
              </div>
            </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full mt-1 border rounded px-3 py-2"
            rows={3}
          />
        </div>

        {/* INTERNAL ONLY SETTINGS */}
        {activeTab === "INTERNAL" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Reward Points</label>
                <input
                  type="number"
                  name="points"
                  value={form.points}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  name="timeLimit"
                  value={form.timeLimit}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Difficulty</label>
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Country Availability
                </label>
                <select
                  name="countries"
                  value={form.countries}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                >
                  <option value="ALL">All Countries</option>
                  <option value="IN">India</option>
                  <option value="US">US</option>
                </select>
              </div>
            </div>
          </>
        )}
      </section>

      {/* ================= SETTINGS (INTERNAL ONLY) ================= */}
      {activeTab === "INTERNAL" && (
        <section className="bg-white p-6 rounded-xl border">
          <h3 className="font-semibold mb-4">Survey Settings</h3>

          <SettingRow
            label="Randomize Questions"
            desc="Show questions in random order"
            name="randomizeQuestions"
            checked={form.randomizeQuestions}
            onChange={handleChange}
          />

          <SettingRow
            label="Allow Back Navigation"
            desc="Let users go back to previous questions"
            name="allowBackNavigation"
            checked={form.allowBackNavigation}
            onChange={handleChange}
          />

          <SettingRow
            label="Show Progress Bar"
            desc="Display completion progress"
            name="showProgressBar"
            checked={form.showProgressBar}
            onChange={handleChange}
          />
        </section>
      )}

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => handleSubmit("DRAFT")}
          className="px-4 py-2 border rounded"
        >
          Save as Draft
        </button>

        <button
          onClick={() => handleSubmit("ACTIVE")}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Publish Survey
        </button>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 font-medium text-sm ${
        active
          ? "border-b-2 border-green-600 text-green-600"
          : "text-gray-500"
      }`}
    >
      {label}
    </button>
  );
}

function SettingRow({ label, desc, name, checked, onChange }) {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-none">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-10 h-5 accent-green-600"
      />
    </div>
  );
}
