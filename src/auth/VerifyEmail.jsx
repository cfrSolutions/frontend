import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const called = useRef(false); // Track if we already called the API

  useEffect(() => {
    if (called.current) return; // Stop the second call in Strict Mode
    called.current = true;

    api
      .get(`/auth/verify-email/${token}`)
      .then(() => {
        alert("✅ Email verified successfully!");
        navigate("/login");
      })
      .catch((err) => {
        // If it's already verified, just send them to login
        console.log("Verification error:", err.response?.data);
        alert(err.response?.data?.message || "Verification failed");
        navigate("/login");
      });
  }, [token, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">Verifying your account, please wait...</p>
    </div>
  );
}