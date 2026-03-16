// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// export default function OAuthSuccess() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // 1. Get the token from the URL (?token=...)
//     const token = searchParams.get("token");

//     if (token) {
//       // 2. Save the JWT to localStorage so the app knows we are logged in
//       localStorage.setItem("token", token);
      
//       // 3. Redirect directly to the superadmin dashboard
//       navigate("/superadmin/dashboard"); 
//     } else {
//       // 4. If no token is found, redirect to login page
//       console.error("OAuth Error: No token found in URL");
//       navigate("/login");
//     }
//   }, [searchParams, navigate]);

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
//       {/* A simple tailwind spinner for better UX */}
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
//       <p className="text-lg font-medium text-gray-700">Finalizing Login...</p>
//     </div>
//   );
// }


// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// export default function OAuthSuccess() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const token = searchParams.get("token");
//   //   const role = searchParams.get("role"); // ✅ NEW

//   //   if (token) {
//   //     localStorage.setItem("token", token);

//   //     if (role) {
//   //       localStorage.setItem("role", role);
//   //     }

//   //     // ✅ SAME LOGIC AS NORMAL LOGIN
//   //     if (role === "ADMIN") {
//   //       navigate("/admin/dashboard");
//   //     } else if (role === "SUPERADMIN") {
//   //       navigate("/superadmin/dashboard");
//   //     } else {
//   //       navigate("/dashboard"); // normal user
//   //     }
//   //   } else {
//   //     console.error("OAuth Error: No token found in URL");
//   //     navigate("/login");
//   //   }
//   // }, [searchParams, navigate]);
// useEffect(() => {
//   const role = searchParams.get("role");

//   if (!role) {
//     navigate("/login");
//     return;
//   }

//   localStorage.setItem("role", role); // only role now

//   if (role === "ADMIN") {
//     navigate("/admin/dashboard");
//   } else if (role === "SUPERADMIN") {
//     navigate("/superadmin/dashboard");
//   } else {
//     navigate("/dashboard");
//   }
// }, []);

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
//       <p className="text-lg font-medium text-gray-700">Finalizing Login...</p>
//     </div>
//   );
// }


// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// export default function OAuthSuccess() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     let retryCount = 0;

//     const checkLogin = async () => {
//       try {
//         const res = await api.get("/auth/me");
//         const role = res.data.user.role;

//         localStorage.setItem("role", role);

//         if (role === "ADMIN") {
//           navigate("/admin/dashboard");
//         } else if (role === "SUPERADMIN") {
//           navigate("/superadmin/dashboard");
//         } else {
//           navigate("/user/dashboard");
//         }
//       } catch (err) {
//         if (retryCount < 5) {
//           retryCount++;
//           setTimeout(checkLogin, 500);
//         } else {
//           navigate("/login");
//         }
//       }
//     };

//     checkLogin();
//   }, [navigate]);

//   return (
//     <div className="h-screen flex items-center justify-center">
//       Finalizing login...
//     </div>
//   );
// }


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    let attempts = 0;

    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        const role = res.data.user.role;
        localStorage.setItem("role", role);

        if (role === "ADMIN") navigate("/admin/dashboard");
        else if (role === "SUPERADMIN") navigate("/superadmin/dashboard");
        else navigate("/user/dashboard");
      } catch (err) {
        if (attempts < 5) {
          attempts++;
          console.log(`Attempt ${attempts} failed. Retrying...`);
          setTimeout(checkAuth, 1000); // Wait 1 second and try again
        } else {
          navigate("/login");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p>Finalizing login... Please wait.</p>
    </div>
  );
}