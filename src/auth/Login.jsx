// import { useState } from "react";
// import { login } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
// // console.log("LOGIN DATA:", {
// //     email,
// //     password,
// //   });
//     try {
//       const data = await login({ email, password });

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);

//       // ROLE BASED REDIRECT
//       if (data.role === "ADMIN") {
//         navigate("/admin/dashboard");
//       } else if (data.role === "SUPERADMIN") {
//         navigate("/superadmin/dashboard");
//       } else if (data.role === "BUSINESS") {
//         navigate("/business/dashboard");
//       } else {
//         navigate("/dashboard");
//       }
//     } catch (err) {
//        console.log("LOGIN ERROR FULL:", err);
  
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="p-6 shadow rounded w-96">
//         <h2 className="text-2xl mb-4">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 w-full mb-3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full mb-3"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button className="bg-black text-white w-full p-2">
//           Login
//         </button>
//         <div className="text-center text-gray-400 my-3">OR</div>
//         <button
//   type="button"
//   onClick={() =>
//     (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`)
//   }
//   className="border w-full p-2 mt-3 rounded flex items-center justify-center gap-2"
// >
//   Continue with Google
// </button>
// <p>
//   Don’t have an account? 
//   <span onClick={() => navigate("/register")} style={{color:"blue", cursor:"pointer"}}>
//     Sign up
//   </span>
// </p>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("PERSONAL"); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

  if (!email.trim() || !password) {
    setError("Please enter your email and password.");
    return;
  }

  setLoading(true);

    try {
      const data = await login({ email, password, role: type === "BUSINESS" ? "BUSINESS" : "USER", });
//       console.log(data);
// console.log("Role:", data.role);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // 🔥 ROLE BASED REDIRECT (already correct)
      if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (data.role === "SUPERADMIN") {
        navigate("/superadmin/dashboard");
      } else if (data.role === "BUSINESS") {
        navigate("/business/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
       const message =
      err.response?.data?.message ||
      "Unable to login. Please check your credentials.";

    setError(message);
    }
    finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 shadow rounded w-96">

        <h2 className="text-2xl mb-4 text-center">Login</h2>

        {/* 🔥 Toggle */}
        <div className="flex mb-4 border rounded overflow-hidden">
          <button
            type="button"
            onClick={() => setType("PERSONAL")}
            className={`flex-1 p-2 ${
              type === "PERSONAL" ? "bg-black text-white" : ""
            }`}
          >
            Personal
          </button>
          <button
            type="button"
            onClick={() => setType("BUSINESS")}
            className={`flex-1 p-2 ${
              type === "BUSINESS" ? "bg-black text-white" : ""
            }`}
          >
            Business
          </button>
        </div>

        <input
          type="email"
          placeholder={type === "BUSINESS" ? "Business Email" : "Email"}
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-black text-white w-full p-2">
          Login
        </button>

        <div className="text-center text-gray-400 my-3">OR</div>

        {/* 🔥 Google with role */}
        <button
          type="button"
          onClick={() =>
            (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?role=${type === "BUSINESS" ? "BUSINESS" : "USER"}`)
          }
          className="border w-full p-2 mt-3 rounded flex items-center justify-center gap-2"
        >
          Continue with Google
        </button>
        {/* <button
          type="button"
          onClick={() =>
            (window.location.href = `http://localhost:5000/api/auth/google?role=${type === "BUSINESS" ? "BUSINESS" : "USER"}`)
          }
          className="border w-full p-2 mt-3 rounded flex items-center justify-center gap-2"
        >
          Continue with Google dev
        </button> */}
 
        <p>
          Don’t have an account?
          <span
            onClick={() => navigate("/register")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Sign up
          </span>
        </p>

      </form>
    </div>
  );
}