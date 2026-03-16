// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) return <Navigate to="/login" />;

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/me");
        setAuthorized(true);
      } catch {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/login" />;

  return children;
}
