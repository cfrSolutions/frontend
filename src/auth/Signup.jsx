import { useState } from "react";
import api from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function Signup() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const ref = params.get("ref");

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("PERSONAL"); // 🔥 NEW

  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
  });

  const [captcha, setCaptcha] = useState(null);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

if (!passwordRegex.test(form.password)) {
  setPasswordError(
    "Password must be at least 8 characters and contain at least one letter and one number."
  );
  return;
}

setPasswordError("");

    if (type === "PERSONAL" && !captcha) {
    alert("Please complete the CAPTCHA");
    return;
  }

    setLoading(true);

    try {
      const payload = {
  name: type === "PERSONAL"
    ? form.name
    : form.companyName,

  email: form.email,
  password: form.password,

  referralCode: type === "PERSONAL" ? ref : undefined,

  captcha: type === "PERSONAL" ? captcha : undefined,

  role: type === "BUSINESS" ? "BUSINESS" : "USER",
};

console.log("SIGNUP PAYLOAD:", payload);

const response = await api.post("/auth/register", payload);

      alert(response.data.message);

      navigate(type === "BUSINESS" ? "/business/login" : "/login");
    } catch (error) {
      // console.error(error.response?.data);
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">

        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {/* 🔥 Toggle (small addition, not redesign) */}
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

        {ref && type === "PERSONAL" && (
          <p className="text-sm text-green-600 mb-3">
            Referral applied 🎉
          </p>
        )}

        <form onSubmit={handleSubmit}>
          
          {/* 👤 PERSONAL */}
          {type === "PERSONAL" && (
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              className="w-full border p-3 mb-4 rounded"
              onChange={handleChange}
            />
          )}

          {/* 🏢 BUSINESS */}
          {type === "BUSINESS" && (
            <input
              name="companyName"
              type="text"
              placeholder="Company Name"
              value={form.companyName}
              className="w-full border p-3 mb-4 rounded"
              onChange={handleChange}
            />
          )}

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
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              setPasswordError("");
            }}
          />
          {passwordError && (
  <p className="text-sm text-red-600 mb-4">
    {passwordError}
  </p>
)}
          {/* 🔐 CAPTCHA only for user */}
          {type === "PERSONAL" && (
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptcha(token)}
              className="mb-4"
            />
          )}

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : type === "BUSINESS"
              ? "Create Business Account"
              : "Create Account"}
          </button>

          <div className="my-4 text-center text-gray-500">OR</div>

          {/* ❌ Google only for personal */}
          {/* {type === "PERSONAL" && (
            <button
              type="button"
              onClick={() =>
                (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?ref=${ref || ""}`)
              }
              className="w-full border p-3 mb-2 rounded flex items-center justify-center gap-2"
            >
              Continue with Google
            </button>
          )} */}
          {/* <button
  type="button"
  onClick={() =>
    (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?role=${type === "BUSINESS" ? "BUSINESS" : "USER"}&ref=${ref || ""}`)
  }
  className="w-full border p-3 mb-2 rounded flex items-center justify-center gap-2"
>
  Continue with Google
</button> */}
 <button
  type="button"
  onClick={() =>
    (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?role=${type === "BUSINESS" ? "BUSINESS" : "USER"}&ref=${ref || ""}`)
  }
  className="w-full border p-3 mb-2 rounded flex items-center justify-center gap-2"
>
  Continue with Google
</button>

          <p>
            Already have an account?
            <span
              onClick={() =>
                navigate(type === "BUSINESS" ? "/business/login" : "/login")
              }
              style={{ color: "blue", cursor: "pointer" }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}





// import { useState } from "react";
// import api from "../services/api";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import ReCAPTCHA from "react-google-recaptcha";

// export default function Signup() {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();
//   const ref = params.get("ref");

//   const [loading, setLoading] = useState(false);
//   const [type, setType] = useState("PERSONAL"); // 🔥 NEW

//   const [form, setForm] = useState({
//     name: "",
//     companyName: "",
//     email: "",
//     password: "",
//   });

//   const [captcha, setCaptcha] = useState(null);
//   const [passwordError, setPasswordError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

// if (!passwordRegex.test(form.password)) {
//   setPasswordError(
//     "Password must be at least 8 characters and contain at least one letter and one number."
//   );
//   return;
// }

// setPasswordError("");

//     if (type === "PERSONAL" && !captcha) {
//     alert("Please complete the CAPTCHA");
//     return;
//   }

//     setLoading(true);

//     try {
//       const payload =
//         type === "PERSONAL"
//           ? {
//               name: form.name,
//               email: form.email,
//               password: form.password,
//               referralCode: ref,
//               captcha,
//               role: "USER",
//             }
//           : {
//               name: form.companyName,
//               email: form.email,
//               password: form.password,
//               role: "BUSINESS",
//             };

//       const response = await api.post("/auth/register", payload);

//       alert(response.data.message);

//       navigate(type === "BUSINESS" ? "/business/login" : "/login");
//     } catch (error) {
//       // console.error(error.response?.data);
//       alert(error.response?.data?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">

//         <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

//         {/* 🔥 Toggle (small addition, not redesign) */}
//         <div className="flex mb-4 border rounded overflow-hidden">
//           <button
//             type="button"
//             onClick={() => setType("PERSONAL")}
//             className={`flex-1 p-2 ${
//               type === "PERSONAL" ? "bg-black text-white" : ""
//             }`}
//           >
//             Personal
//           </button>
//           <button
//             type="button"
//             onClick={() => setType("BUSINESS")}
//             className={`flex-1 p-2 ${
//               type === "BUSINESS" ? "bg-black text-white" : ""
//             }`}
//           >
//             Business
//           </button>
//         </div>

//         {ref && type === "PERSONAL" && (
//           <p className="text-sm text-green-600 mb-3">
//             Referral applied 🎉
//           </p>
//         )}

//         <form onSubmit={handleSubmit}>
          
//           {/* 👤 PERSONAL */}
//           {type === "PERSONAL" && (
//             <input
//               name="name"
//               type="text"
//               placeholder="Name"
//               value={form.name}
//               className="w-full border p-3 mb-4 rounded"
//               onChange={handleChange}
//             />
//           )}

//           {/* 🏢 BUSINESS */}
//           {type === "BUSINESS" && (
//             <input
//               name="companyName"
//               type="text"
//               placeholder="Company Name"
//               value={form.companyName}
//               className="w-full border p-3 mb-4 rounded"
//               onChange={handleChange}
//             />
//           )}

//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             className="w-full border p-3 mb-4 rounded"
//             onChange={handleChange}
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             className="w-full border p-3 mb-4 rounded"
//             onChange={(e) => {
//               setForm({ ...form, password: e.target.value });
//               setPasswordError("");
//             }}
//           />
//           {passwordError && (
//   <p className="text-sm text-red-600 mb-4">
//     {passwordError}
//   </p>
// )}
//           {/* 🔐 CAPTCHA only for user */}
//           {type === "PERSONAL" && (
//             <ReCAPTCHA
//               sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
//               onChange={(token) => setCaptcha(token)}
//               className="mb-4"
//             />
//           )}

//           <button
//             type="submit"
//             className="w-full bg-black text-white p-3 rounded"
//             disabled={loading}
//           >
//             {loading
//               ? "Creating..."
//               : type === "BUSINESS"
//               ? "Create Business Account"
//               : "Create Account"}
//           </button>

//           <div className="my-4 text-center text-gray-500">OR</div>

//           {/* ❌ Google only for personal */}
//           {/* {type === "PERSONAL" && (
//             <button
//               type="button"
//               onClick={() =>
//                 (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?ref=${ref || ""}`)
//               }
//               className="w-full border p-3 mb-2 rounded flex items-center justify-center gap-2"
//             >
//               Continue with Google
//             </button>
//           )} */}
//           {/* <button
//   type="button"
//   onClick={() =>
//     (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?role=${type === "BUSINESS" ? "BUSINESS" : "USER"}&ref=${ref || ""}`)
//   }
//   className="w-full border p-3 mb-2 rounded flex items-center justify-center gap-2"
// >
//   Continue with Google
// </button> */}
//  <button
//   type="button"
//   onClick={() =>
//     (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?role=${type === "BUSINESS" ? "BUSINESS" : "USER"}&ref=${ref || ""}`)
//   }
//   className="w-full border p-3 mb-2 rounded flex items-center justify-center gap-2"
// >
//   Continue with Google
// </button>

//           <p>
//             Already have an account?
//             <span
//               onClick={() =>
//                 navigate(type === "BUSINESS" ? "/business/login" : "/login")
//               }
//               style={{ color: "blue", cursor: "pointer" }}
//             >
//               Login
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }