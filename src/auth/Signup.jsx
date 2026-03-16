import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useSearchParams } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
const [params] = useSearchParams();
const ref = params.get("ref");
const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
const [captcha, setCaptcha] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
if (loading) return;

  setLoading(true);
    try {
      const response = await api.post("/auth/register", {
      ...form,
      referralCode: ref,
      captcha,
    });

      alert(response.data.message); // "Signup successful. Please login."
      navigate("/login");

    } catch (error) {
      console.error(error.response?.data);
alert(error.response?.data?.message);


     
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {ref && (
  <p className="text-sm text-green-600 mb-3">
    Referral applied 🎉
  </p>
)}

     <form action="" onSubmit={handleSubmit}>
        <input
        name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
        name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />
<ReCAPTCHA
  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
  onChange={(token) => setCaptcha(token)}
  className="mb-4"
/>

        <button type="submit" className="w-full bg-black text-white p-3 rounded">
          Create Account
        </button>
<button disabled={loading}>
  {loading ? "Creating..." : "Create Account"}
</button>

        <div className="my-4 text-center text-gray-500">OR</div>

        <button 
        type="button"
        onClick={() =>window.location.href = `http://localhost:5000/api/auth/google?ref=${ref || ""}`}
        className="w-full border p-3 mb-2 rounded flex items-center justify-center gap-2">
          Continue with Google
        </button>

        <button
        type="button"
        className="w-full border p-3 rounded flex items-center justify-center gap-2">
          Continue with GitHub
        </button>
        </form>
      </div>
    </div>
  );
}

