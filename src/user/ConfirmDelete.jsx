// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../services/api";

// export default function ConfirmDelete() {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("Processing...");

//   useEffect(() => {
//     const confirmDelete = async () => {
//       try {
//         const res = await api.get(`/auth/confirm-delete/${token}`);
//         setMessage("Account deleted successfully.");
//         setTimeout(() => navigate("/"), 2000);
//       } catch (err) {
//         setMessage("Invalid or expired link.");
//       }
//     };

//     confirmDelete();
//   }, [token]);

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="bg-white shadow-lg rounded-lg p-8 text-center">
//         <h2 className="text-lg font-semibold">{message}</h2>
//       </div>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function ConfirmDelete() {
  const navigate = useNavigate();

  const [selectedReason, setSelectedReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const reasons = [
    "No longer using the service/platform",
    "Found a better alternative",
    "Privacy concerns",
    "Too many emails/notifications",
    "Difficulty navigating the platform",
    "Account security concerns",
    "Personal reasons",
    "Others",
  ];

  const handleDelete = async () => {
    try {
      setLoading(true);

      await api.delete("/auth/delete-account", {
        data: {
          reason: selectedReason,
          feedback,
        },
      });

      setMessage("Account deleted successfully.");

      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">

        <h2 className="text-xl font-semibold mb-2">Delete Account</h2>
        <p className="text-sm text-gray-500 mb-4">
          If you need to delete your account, please tell us why.
        </p>

        {/* Reasons */}
        <div className="space-y-2">
          {reasons.map((reason, i) => (
            <label key={i} className="flex items-center gap-2 p-2 border rounded cursor-pointer">
              <input
                type="radio"
                name="reason"
                value={reason}
                checked={selectedReason === reason}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              <span>{reason}</span>
            </label>
          ))}
        </div>

        {/* Feedback */}
        {selectedReason === "Others" && (
          <textarea
            placeholder="Write your message..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full mt-3 p-2 border rounded"
          />
        )}

        {/* Delete Button */}
        <button
          onClick={() => setShowConfirm(true)}
          disabled={!selectedReason}
          className="w-full mt-5 bg-black text-white py-2 rounded disabled:opacity-50"
        >
          Delete
        </button>

        {/* Message */}
        {message && (
          <p className="text-center mt-4 text-sm">{message}</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center w-80">

            <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
            <p className="text-sm text-gray-500 mb-4">
              This will permanently delete your account.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-500 text-white py-2 rounded"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>

              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}