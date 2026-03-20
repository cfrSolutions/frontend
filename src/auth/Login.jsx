import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
// console.log("LOGIN DATA:", {
//     email,
//     password,
//   });
    try {
      const data = await login({ email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // ROLE BASED REDIRECT
      if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (data.role === "SUPERADMIN") {
        navigate("/superadmin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
       console.log("LOGIN ERROR FULL:", err);
  
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 shadow rounded w-96">
        <h2 className="text-2xl mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
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
        <button
  type="button"
  onClick={() =>
    (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`)
  }
  className="border w-full p-2 mt-3 rounded flex items-center justify-center gap-2"
>
  Continue with Google
</button>
<p>
  Don’t have an account? 
  <span onClick={() => navigate("/register")} style={{color:"blue", cursor:"pointer"}}>
    Sign up
  </span>
</p>
      </form>
    </div>
  );
}
