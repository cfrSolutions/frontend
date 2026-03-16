import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function UserSettings() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm(
    "Are you sure? You will receive an email to confirm deletion."
  );

  if (!confirmDelete) return;

  try {
    await api.post("/auth/request-delete");
    alert("Confirmation email sent. Please check your email.");
  } catch (err) {
    alert("Failed to send confirmation email");
  }
};

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);
    window.location.reload(); // simple reload for now
  };

 return (
  <div className="w-80 space-y-4">

      <h2 className="text-xl font-semibold text-center">Settings</h2>

      {/* PROFILE REDIRECT */}
      <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium">Profile Settings</h3>
          <p className="text-sm text-gray-500">
            Update your personal information
          </p>
        </div>
        <button
          onClick={() => navigate("/user/dashboard/profile")}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg"
        >
          Go to Profile
        </button>
      </div>

      {/* LANGUAGE */}
      <div className="border border-gray-300 rounded-lg p-4">
        <h3 className="font-medium mb-2">Language</h3>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="border border-gray-300 px-3 py-2 rounded w-full"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="gu">Gujarati</option>
        </select>
      </div>

      {/* DELETE ACCOUNT */}
      <div className="border rounded-lg p-4 border-red-300 bg-red-50">
        <h3 className="font-medium text-red-600">Delete Account</h3>
        <p className="text-sm text-gray-600 mb-3">
          This action cannot be undone.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Delete Account
        </button>
      </div>

    </div>
  
);
}