import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function ConfirmDelete() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Processing...");

  useEffect(() => {
    const confirmDelete = async () => {
      try {
        const res = await api.get(`/auth/confirm-delete/${token}`);
        setMessage("Account deleted successfully.");
        setTimeout(() => navigate("/"), 2000);
      } catch (err) {
        setMessage("Invalid or expired link.");
      }
    };

    confirmDelete();
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-lg font-semibold">{message}</h2>
      </div>
    </div>
  );
}