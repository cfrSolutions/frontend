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

//     if (!captcha) {
//     alert("Please complete the CAPTCHA");
//     return;
//   }

//     setLoading(true);

//     try {
//       const payload = {
//   name: type === "PERSONAL"
//     ? form.name
//     : form.companyName,

//   email: form.email,
//   password: form.password,

//   referralCode: type === "PERSONAL" ? ref : undefined,

//   captcha: captcha,

//   role: type === "BUSINESS" ? "BUSINESS" : "USER",
// };

// // console.log("SIGNUP PAYLOAD:", payload);

// const response = await api.post("/auth/register", payload);

//       alert(response.data.message);

//       navigate("/login");
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
         
//             <ReCAPTCHA
//               sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
//               onChange={(token) => setCaptcha(token)}
//               className="mb-4"
//             />
          

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
//                 navigate(type === "BUSINESS" ? "/login" : "/login")
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




// import { useState } from "react";
// import api from "../services/api";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import Navbar from "../pages/Navbar";
// import ReCAPTCHA from "react-google-recaptcha";
// import {
//   User,
//   Building2,
//   Mail,
//   Lock,
//   ArrowRight,
//   Check,
// } from "lucide-react";

// const ROBERT_MESSAGES = {
//   PERSONAL: {
//     message: "Hey! 👋 Let's get your Inputify account ready.",
//   },
//   BUSINESS: {
//     message: "Welcome! 🤖 Let's get your business started.",
//   },
// };

// export default function Signup() {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();
//   const ref = params.get("ref");

//   const [loading, setLoading] = useState(false);
//   const [type, setType] = useState("PERSONAL");

//   const [form, setForm] = useState({
//     name: "",
//     companyName: "",
//     email: "",
//     password: "",
//   });

//   const [captcha, setCaptcha] = useState(null);
//   const [passwordError, setPasswordError] = useState("");

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (loading) return;

//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

//     if (!passwordRegex.test(form.password)) {
//       setPasswordError(
//         "Password must be at least 8 characters and contain at least one letter and one number."
//       );
//       return;
//     }

//     setPasswordError("");

//     if (!captcha) {
//       alert("Please complete the CAPTCHA");
//       return;
//     }

//     setLoading(true);

//     try {
//       const payload = {
//         name: type === "PERSONAL"
//           ? form.name
//           : form.companyName,

//         email: form.email,
//         password: form.password,

//         referralCode:
//           type === "PERSONAL"
//             ? ref
//             : undefined,

//         captcha: captcha,

//         role:
//           type === "BUSINESS"
//             ? "BUSINESS"
//             : "USER",
//       };

//       const response = await api.post(
//         "/auth/register",
//         payload
//       );

//       alert(response.data.message);

//       navigate("/login");
//     } catch (error) {
//       alert(error.response?.data?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass = `
//     w-full
//     h-[52px]
//     bg-white
//     border
//     border-[#FFE0BD]
//     rounded-xl
//     pl-11
//     pr-4
//     text-sm
//     text-[#333333]
//     placeholder:text-gray-400
//     outline-none
//     transition-all
//     duration-200
//     focus:border-[#FF8A00]
//     focus:ring-4
//     focus:ring-[#FFF4E6]
//   `;

//  return (
//   <>
//   <Navbar />
//   <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center px-4 py-8">

//     <div className="w-full max-w-[1050px]">

//       {/* Main layout */}
//       <div className="grid md:grid-cols-[1fr_430px] items-center gap-8 lg:gap-14">


//         {/* =====================================================
//             LEFT — SIGNUP
//         ===================================================== */}

//         <div
//           className="
//             w-full
//             bg-white
//             border
//             border-[#E7E7E7]
//             rounded-[24px]
//             shadow-[0_20px_60px_rgba(0,0,0,0.07)]
//             p-6
//             sm:p-8
//           "
//         >

//           {/* =====================================================
//               MOBILE ROBERT
//           ===================================================== */}

//           <div className="md:hidden flex items-center justify-center mb-6">

//             <div className="relative flex items-center">

//               {/* Robot */}

//               <img
//                 src="/HomeImage/inputifyRobert.png"
//                 alt="Inputify Robert"
//                 className="
//                   w-[115px]
//                   h-[125px]
//                   object-contain
//                 "
//               />

//               {/* Chat */}

//               <div
//                 className="
//                   absolute
//                   left-[-175px]
//                   top-[5px]
//                   w-[175px]
//                   bg-white
//                   border
//                   border-[#E7E7E7]
//                   rounded-2xl
//                   shadow-[0_10px_30px_rgba(0,0,0,0.07)]
//                   p-3
//                 "
//               >

//                 <div className="flex items-center gap-1.5 mb-1.5">

//                   <span className="text-xs">
//                     🤖
//                   </span>

//                   <span className="text-[10px] font-bold text-[#333333]">
//                     Robert
//                   </span>

//                   <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500" />

//                 </div>

//                 <p className="text-[10px] leading-4 text-gray-500">
//                   {type === "PERSONAL"
//                     ? "Let's get your account ready 👋"
//                     : "Let's get your business started 🤖"}
//                 </p>

//               </div>

//             </div>

//           </div>


//           {/* =====================================================
//               HEADER
//           ===================================================== */}

//           <div className="mb-6">

//             <div
//               className="
//                 inline-flex
//                 items-center
//                 gap-2
//                 px-2.5
//                 py-1
//                 rounded-full
//                 bg-[#FFF0DD]
//                 mb-3
//               "
//             >

//               <span
//                 className="
//                   w-1.5
//                   h-1.5
//                   rounded-full
//                   bg-[#FF8A00]
//                 "
//               />

//               <span
//                 className="
//                   text-[9px]
//                   font-bold
//                   uppercase
//                   tracking-[0.15em]
//                   text-[#D96F00]
//                 "
//               >
//                 Inputify
//               </span>

//             </div>

//             <h2
//               className="
//                 text-[26px]
//                 font-bold
//                 tracking-tight
//                 text-[#333333]
//               "
//             >
//               Create your account
//             </h2>

//             <p className="text-sm text-gray-400 mt-1">
//               Join Inputify and get started in a few simple steps.
//             </p>

//           </div>


//           {/* =====================================================
//               PERSONAL / BUSINESS
//           ===================================================== */}

//           <div
//             className="
//               flex
//               p-1
//               rounded-xl
//               bg-[#F7F7F8]
//               border
//               border-[#E8E8E8]
//               mb-5
//             "
//           >

//             <button
//               type="button"
//               onClick={() => setType("PERSONAL")}
//               className={`
//                 flex-1
//                 h-[40px]
//                 rounded-lg
//                 text-xs
//                 font-semibold
//                 transition-all
//                 ${
//                   type === "PERSONAL"
//                     ? "bg-white text-[#333333] shadow-sm border border-[#E5E5E5]"
//                     : "text-gray-400"
//                 }
//               `}
//             >
//               Personal
//             </button>

//             <button
//               type="button"
//               onClick={() => setType("BUSINESS")}
//               className={`
//                 flex-1
//                 h-[40px]
//                 rounded-lg
//                 text-xs
//                 font-semibold
//                 transition-all
//                 ${
//                   type === "BUSINESS"
//                     ? "bg-white text-[#333333] shadow-sm border border-[#E5E5E5]"
//                     : "text-gray-400"
//                 }
//               `}
//             >
//               Business
//             </button>

//           </div>


//           {/* Referral */}

//           {ref && type === "PERSONAL" && (
//             <div
//               className="
//                 flex
//                 items-center
//                 gap-2
//                 bg-[#FFF7ED]
//                 border
//                 border-[#FFE5C7]
//                 rounded-lg
//                 px-3
//                 py-2
//                 mb-4
//               "
//             >

//               <span className="text-sm">
//                 🎉
//               </span>

//               <span className="text-[11px] text-[#B85C00]">
//                 Referral applied
//               </span>

//             </div>
//           )}


//           {/* =====================================================
//               FORM
//           ===================================================== */}

//           <form onSubmit={handleSubmit}>

//             {/* Name / Company */}

//             {type === "PERSONAL" && (
//               <div className="mb-3">

//                 <input
//                   name="name"
//                   type="text"
//                   placeholder="Name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="
//                     w-full
//                     h-[50px]
//                     px-4
//                     rounded-xl
//                     border
//                     border-[#E5E5E5]
//                     bg-[#FAFAFA]
//                     text-sm
//                     outline-none
//                     transition
//                     focus:bg-white
//                     focus:border-[#FFB15C]
//                     focus:ring-4
//                     focus:ring-[#FFF4E6]
//                   "
//                 />

//               </div>
//             )}

//             {type === "BUSINESS" && (
//               <div className="mb-3">

//                 <input
//                   name="companyName"
//                   type="text"
//                   placeholder="Company Name"
//                   value={form.companyName}
//                   onChange={handleChange}
//                   className="
//                     w-full
//                     h-[50px]
//                     px-4
//                     rounded-xl
//                     border
//                     border-[#E5E5E5]
//                     bg-[#FAFAFA]
//                     text-sm
//                     outline-none
//                     transition
//                     focus:bg-white
//                     focus:border-[#FFB15C]
//                     focus:ring-4
//                     focus:ring-[#FFF4E6]
//                   "
//                 />

//               </div>
//             )}


//             {/* Email */}

//             <div className="mb-3">

//               <input
//                 name="email"
//                 type="email"
//                 placeholder="Email address"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="
//                   w-full
//                   h-[50px]
//                   px-4
//                   rounded-xl
//                   border
//                   border-[#E5E5E5]
//                   bg-[#FAFAFA]
//                   text-sm
//                   outline-none
//                   transition
//                   focus:bg-white
//                   focus:border-[#FFB15C]
//                   focus:ring-4
//                   focus:ring-[#FFF4E6]
//                 "
//               />

//             </div>


//             {/* Password */}

//             <div className="mb-3">

//               <input
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={(e) => {
//                   setForm({
//                     ...form,
//                     password: e.target.value,
//                   });

//                   setPasswordError("");
//                 }}
//                 className="
//                   w-full
//                   h-[50px]
//                   px-4
//                   rounded-xl
//                   border
//                   border-[#E5E5E5]
//                   bg-[#FAFAFA]
//                   text-sm
//                   outline-none
//                   transition
//                   focus:bg-white
//                   focus:border-[#FFB15C]
//                   focus:ring-4
//                   focus:ring-[#FFF4E6]
//                 "
//               />

//               {passwordError && (
//                 <p className="text-[11px] text-red-500 mt-1.5">
//                   {passwordError}
//                 </p>
//               )}

//             </div>


//             {/* CAPTCHA */}

//             <div className="flex justify-center py-2 mb-3 overflow-hidden">

//               <ReCAPTCHA
//                 sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
//                 onChange={(token) => setCaptcha(token)}
//               />

//             </div>


//             {/* Create */}

//             <button
//               type="submit"
//               disabled={loading}
//               className="
//                 w-full
//                 h-[50px]
//                 rounded-xl
//                 bg-[#333333]
//                 hover:bg-[#222222]
//                 text-white
//                 text-sm
//                 font-semibold
//                 transition-all
//                 disabled:opacity-50
//               "
//             >

//               {loading
//                 ? "Creating..."
//                 : type === "BUSINESS"
//                 ? "Create Business Account"
//                 : "Create Account"}

//             </button>


//             {/* OR */}

//             <div className="flex items-center gap-3 my-5">

//               <div className="flex-1 h-px bg-[#EEEEEE]" />

//               <span className="text-[10px] text-gray-400">
//                 OR
//               </span>

//               <div className="flex-1 h-px bg-[#EEEEEE]" />

//             </div>


//             {/* Google */}

//             <button
//               type="button"
//               onClick={() =>
//                 (window.location.href =
//                   `${import.meta.env.VITE_API_URL}/auth/google?role=${
//                     type === "BUSINESS"
//                       ? "BUSINESS"
//                       : "USER"
//                   }&ref=${ref || ""}`)
//               }
//               className="
//                 w-full
//                 h-[50px]
//                 rounded-xl
//                 border
//                 border-[#E5E5E5]
//                 bg-white
//                 hover:bg-[#FAFAFA]
//                 text-sm
//                 font-medium
//                 text-[#333333]
//                 transition
//               "
//             >

//               <span className="flex items-center justify-center gap-2">

//                 <span
//                   className="
//                     w-7
//                     h-7
//                     rounded-full
//                     bg-[#F7F7F7]
//                     flex
//                     items-center
//                     justify-center
//                     text-xs
//                     font-bold
//                   "
//                 >
//                   G
//                 </span>

//                 Continue with Google

//               </span>

//             </button>


//             {/* Login */}

//             <p className="text-center text-xs text-gray-400 mt-5">

//               Already have an account?{" "}

//               <button
//                 type="button"
//                 onClick={() => navigate("/login")}
//                 className="
//                   text-[#D96F00]
//                   font-semibold
//                   hover:text-[#FF8A00]
//                 "
//               >
//                 Login
//               </button>

//             </p>

//           </form>

//         </div>
//  {/* =====================================================
//             RIGHT — ROBERT / BRAND AREA
//         ===================================================== */}

//    <div className="hidden md:flex relative min-h-[620px] items-center justify-center">

//           {/* subtle background circle */}

//           <div
//             className="
//               absolute
//               w-[430px]
//               h-[430px]
//               rounded-full
//               bg-[#FFF0DD]
//               opacity-70
//             "
//           />

//           {/* soft circle */}

//           <div
//             className="
//               absolute
//               w-[320px]
//               h-[320px]
//               rounded-full
//               border
//               border-[#FFE4C5]
//             "
//           />

//           {/* Robert */}

//           <div className="relative z-10 flex flex-col items-center">

//             {/* Chat */}

//             <div
//               className="
//                 relative
//                 w-[250px]
//                 bg-white
//                 rounded-[20px]
//                 border
//                 border-[#E9E9E9]
//                 shadow-[0_15px_40px_rgba(0,0,0,0.08)]
//                 p-4
//                 mb-[-20px]
//                 ml-[90px]
//                 z-20
//               "
//             >

//               {/* Header */}

//               <div className="flex items-center gap-2.5 mb-3">

//                 <div
//                   className="
//                     w-8
//                     h-8
//                     rounded-full
//                     bg-[#FFF0DD]
//                     flex
//                     items-center
//                     justify-center
//                     text-sm
//                   "
//                 >
//                   🤖
//                 </div>

//                 <div>

//                   <p className="text-xs font-bold text-[#333333]">
//                     Robert
//                   </p>

//                   <p className="text-[9px] text-gray-400">
//                     Your Inputify guide
//                   </p>

//                 </div>

//                 <span
//                   className="
//                     ml-auto
//                     w-2
//                     h-2
//                     rounded-full
//                     bg-green-500
//                   "
//                 />

//               </div>


//               {/* Message */}

//               <div
//                 className="
//                   bg-[#F7F7F8]
//                   rounded-xl
//                   rounded-tl-sm
//                   px-3
//                   py-2.5
//                   border
//                   border-[#EEEEEE]
//                 "
//               >

//                 <p className="text-[12px] leading-[18px] text-[#555555]">
//                   {type === "PERSONAL"
//                     ? "Hey! 👋 Let's get your Inputify account ready."
//                     : "Welcome! 🤖 Let's get your business started."}
//                 </p>

//               </div>

//               {/* small tail */}

//               <div
//                 className="
//                   absolute
//                   -bottom-2
//                   left-8
//                   w-4
//                   h-4
//                   bg-[#F7F7F8]
//                   border-r
//                   border-b
//                   border-[#EEEEEE]
//                   rotate-45
//                 "
//               />

//             </div>


//             {/* Robert */}

//             <img
//               src="/HomeImage/inputifyRobert.png"
//               alt="Inputify Robert"
//               className="
//                 relative
//                 z-10
//                 w-[300px]
//                 lg:w-[400px]
//                 object-contain
//                 animate-[float_4s_ease-in-out_infinite]
//               "
//             />

//           </div>

//         </div>
//       </div>

//     </div>
//   </div>
//   </>
// );
// }


import { useState } from "react";
import api from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../pages/Navbar";
import ReCAPTCHA from "react-google-recaptcha";

const ROBERT_MESSAGES = {
  PERSONAL: {
    message: "Hey! 👋 Let's get your Inputify account ready.",
  },
  BUSINESS: {
    message: "Welcome! 🤖 Let's get your business started.",
  },
};

export default function Signup() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const ref = params.get("ref");

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("PERSONAL");

  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
  });

  const [captcha, setCaptcha] = useState(null);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

    if (!captcha) {
      alert("Please complete the CAPTCHA");
      return;
    }

    setLoading(true);

    try {
      // BACKEND PAYLOAD — UNCHANGED
      const payload = {
        name:
          type === "PERSONAL"
            ? form.name
            : form.companyName,

        email: form.email,
        password: form.password,

        referralCode:
          type === "PERSONAL"
            ? ref
            : undefined,

        captcha: captcha,

        role:
          type === "BUSINESS"
            ? "BUSINESS"
            : "USER",
      };

      const response = await api.post(
        "/auth/register",
        payload
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* =====================================================
          PAGE
          Fits inside remaining viewport after Navbar
      ===================================================== */}

      <main
        className="
          h-[calc(100dvh-132px)]
          w-full
          bg-[#F7F7F8]
          flex
          items-center
          justify-center
          px-4
          overflow-hidden
        "
      >

        <div
          className="
            w-full
            max-w-[1050px]
            h-full
            flex
            items-center
          "
        >

          <div
            className="
              grid
              md:grid-cols-[1fr_430px]
              items-center
              gap-6
              lg:gap-10
              w-full
            "
          >

            {/* =====================================================
                LEFT — SIGNUP
            ===================================================== */}

            <div
              className="
                w-full
                bg-white
                border
                border-[#E7E7E7]
                rounded-[24px]
                shadow-[0_20px_60px_rgba(0,0,0,0.07)]
                p-5
                sm:p-6
              "
            >

              {/* =====================================================
                  MOBILE ROBERT
              ===================================================== */}

              <div
                className="
                  md:hidden
                  flex
                  items-center
                  justify-center
                  mb-3
                "
              >

                <div className="relative flex items-center">

                  {/* Robert */}

                  <img
                    src="/HomeImage/inputifyRobert.png"
                    alt="Inputify Robert"
                    className="
                      w-[90px]
                      h-[95px]
                      object-contain
                    "
                  />

                  {/* Chat */}

                  <div
                    className="
                      absolute
                      left-[-155px]
                      top-0
                      w-[155px]
                      bg-white
                      border
                      border-[#E7E7E7]
                      rounded-2xl
                      shadow-[0_10px_30px_rgba(0,0,0,0.07)]
                      p-3
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        mb-1.5
                      "
                    >

                      <span className="text-xs">
                        🤖
                      </span>

                      <span
                        className="
                          text-[10px]
                          font-bold
                          text-[#333333]
                        "
                      >
                        Robert
                      </span>

                      <span
                        className="
                          ml-auto
                          w-1.5
                          h-1.5
                          rounded-full
                          bg-green-500
                        "
                      />

                    </div>

                    <p
                      className="
                        text-[10px]
                        leading-4
                        text-gray-500
                      "
                    >
                      {type === "PERSONAL"
                        ? "Let's get your account ready 👋"
                        : "Let's get your business started 🤖"}
                    </p>

                  </div>

                </div>

              </div>


              {/* =====================================================
                  HEADER
              ===================================================== */}

              <div className="mb-4">

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-2.5
                    py-1
                    rounded-full
                    bg-[#FFF0DD]
                    mb-2
                  "
                >

                  <span
                    className="
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-[#FF8A00]
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-[#D96F00]
                    "
                  >
                    Inputify
                  </span>

                </div>

                <h2
                  className="
                    text-[24px]
                    font-bold
                    tracking-tight
                    text-[#333333]
                  "
                >
                  Create your account
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-400
                    mt-1
                  "
                >
                  Join Inputify and get started in a few simple steps.
                </p>

              </div>


              {/* =====================================================
                  PERSONAL / BUSINESS
              ===================================================== */}

              <div
                className="
                  flex
                  p-1
                  rounded-xl
                  bg-[#F7F7F8]
                  border
                  border-[#E8E8E8]
                  mb-3
                "
              >

                <button
                  type="button"
                  onClick={() => setType("PERSONAL")}
                  className={`
                    flex-1
                    h-[36px]
                    rounded-lg
                    text-xs
                    font-semibold
                    transition-all
                    ${
                      type === "PERSONAL"
                        ? "bg-white text-[#333333] shadow-sm border border-[#E5E5E5]"
                        : "text-gray-400"
                    }
                  `}
                >
                  Personal
                </button>

                <button
                  type="button"
                  onClick={() => setType("BUSINESS")}
                  className={`
                    flex-1
                    h-[36px]
                    rounded-lg
                    text-xs
                    font-semibold
                    transition-all
                    ${
                      type === "BUSINESS"
                        ? "bg-white text-[#333333] shadow-sm border border-[#E5E5E5]"
                        : "text-gray-400"
                    }
                  `}
                >
                  Business
                </button>

              </div>


              {/* =====================================================
                  REFERRAL
              ===================================================== */}

              {ref && type === "PERSONAL" && (
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    bg-[#FFF7ED]
                    border
                    border-[#FFE5C7]
                    rounded-lg
                    px-3
                    py-2
                    mb-3
                  "
                >

                  <span className="text-sm">
                    🎉
                  </span>

                  <span
                    className="
                      text-[11px]
                      text-[#B85C00]
                    "
                  >
                    Referral applied
                  </span>

                </div>
              )}


              {/* =====================================================
                  FORM
              ===================================================== */}

              <form onSubmit={handleSubmit}>

                {/* NAME */}

                {type === "PERSONAL" && (
                  <div className="mb-2.5">

                    <input
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                      className="
                        w-full
                        h-[46px]
                        px-4
                        rounded-xl
                        border
                        border-[#E5E5E5]
                        bg-[#FAFAFA]
                        text-sm
                        outline-none
                        transition
                        focus:bg-white
                        focus:border-[#FFB15C]
                        focus:ring-4
                        focus:ring-[#FFF4E6]
                      "
                    />

                  </div>
                )}


                {/* COMPANY */}

                {type === "BUSINESS" && (
                  <div className="mb-2.5">

                    <input
                      name="companyName"
                      type="text"
                      placeholder="Company Name"
                      value={form.companyName}
                      onChange={handleChange}
                      className="
                        w-full
                        h-[46px]
                        px-4
                        rounded-xl
                        border
                        border-[#E5E5E5]
                        bg-[#FAFAFA]
                        text-sm
                        outline-none
                        transition
                        focus:bg-white
                        focus:border-[#FFB15C]
                        focus:ring-4
                        focus:ring-[#FFF4E6]
                      "
                    />

                  </div>
                )}


                {/* EMAIL */}

                <div className="mb-2.5">

                  <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={handleChange}
                    className="
                      w-full
                      h-[46px]
                      px-4
                      rounded-xl
                      border
                      border-[#E5E5E5]
                      bg-[#FAFAFA]
                      text-sm
                      outline-none
                      transition
                      focus:bg-white
                      focus:border-[#FFB15C]
                      focus:ring-4
                      focus:ring-[#FFF4E6]
                    "
                  />

                </div>


                {/* PASSWORD */}

                <div className="mb-2.5">

                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        password: e.target.value,
                      });

                      setPasswordError("");
                    }}
                    className="
                      w-full
                      h-[46px]
                      px-4
                      rounded-xl
                      border
                      border-[#E5E5E5]
                      bg-[#FAFAFA]
                      text-sm
                      outline-none
                      transition
                      focus:bg-white
                      focus:border-[#FFB15C]
                      focus:ring-4
                      focus:ring-[#FFF4E6]
                    "
                  />

                  {passwordError && (
                    <p
                      className="
                        text-[10px]
                        text-red-500
                        mt-1.5
                      "
                    >
                      {passwordError}
                    </p>
                  )}

                </div>


                {/* =====================================================
                    CAPTCHA
                ===================================================== */}

                <div
                  className="
                    flex
                    justify-center
                    py-1
                    mb-2
                    overflow-hidden
                  "
                >

                  <ReCAPTCHA
                    sitekey={
                      import.meta.env.VITE_RECAPTCHA_SITE_KEY
                    }
                    onChange={(token) => setCaptcha(token)}
                  />

                </div>


                {/* =====================================================
                    CREATE ACCOUNT
                ===================================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    h-[46px]
                    rounded-xl
                    bg-[#333333]
                    hover:bg-[#222222]
                    text-white
                    text-sm
                    font-semibold
                    transition-all
                    disabled:opacity-50
                  "
                >

                  {loading
                    ? "Creating..."
                    : type === "BUSINESS"
                    ? "Create Business Account"
                    : "Create Account"}

                </button>


                {/* =====================================================
                    OR
                ===================================================== */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    my-3
                  "
                >

                  <div className="flex-1 h-px bg-[#EEEEEE]" />

                  <span
                    className="
                      text-[10px]
                      text-gray-400
                    "
                  >
                    OR
                  </span>

                  <div className="flex-1 h-px bg-[#EEEEEE]" />

                </div>


                {/* =====================================================
                    GOOGLE
                ===================================================== */}

                <button
                  type="button"
                  onClick={() =>
                    (window.location.href =
                      `${import.meta.env.VITE_API_URL}/auth/google?role=${
                        type === "BUSINESS"
                          ? "BUSINESS"
                          : "USER"
                      }&ref=${ref || ""}`)
                  }
                  className="
                    w-full
                    h-[46px]
                    rounded-xl
                    border
                    border-[#E5E5E5]
                    bg-white
                    hover:bg-[#FAFAFA]
                    text-sm
                    font-medium
                    text-[#333333]
                    transition
                  "
                >

                  <span
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >

                    <span
                      className="
                        w-7
                        h-7
                        rounded-full
                        bg-[#F7F7F7]
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-bold
                      "
                    >
                      G
                    </span>

                    Continue with Google

                  </span>

                </button>


                {/* =====================================================
                    LOGIN
                ===================================================== */}

                <p
                  className="
                    text-center
                    text-xs
                    text-gray-400
                    mt-3
                  "
                >

                  Already have an account?{" "}

                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="
                      text-[#D96F00]
                      font-semibold
                      hover:text-[#FF8A00]
                    "
                  >
                    Login
                  </button>

                </p>

              </form>

            </div>


            {/* =====================================================
                RIGHT — ROBERT
            ===================================================== */}

            <div
              className="
                hidden
                md:flex
                relative
                h-[560px]
                items-center
                justify-center
              "
            >

              {/* Background circle */}

              <div
                className="
                  absolute
                  w-[390px]
                  h-[390px]
                  rounded-full
                  bg-[#FFF0DD]
                  opacity-70
                "
              />

              {/* Outer ring */}

              <div
                className="
                  absolute
                  w-[300px]
                  h-[300px]
                  rounded-full
                  border
                  border-[#FFE4C5]
                "
              />


              {/* Robert wrapper */}

              <div
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  items-center
                "
              >

                {/* =================================================
                    CHAT
                ================================================= */}

                <div
                  className="
                    relative
                    w-[240px]
                    bg-white
                    rounded-[20px]
                    border
                    border-[#E9E9E9]
                    shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                    p-4
                    mb-[-15px]
                    ml-[80px]
                    z-20
                  "
                >

                  {/* Header */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2.5
                      mb-2.5
                    "
                  >

                    <div
                      className="
                        w-8
                        h-8
                        rounded-full
                        bg-[#FFF0DD]
                        flex
                        items-center
                        justify-center
                        text-sm
                      "
                    >
                      🤖
                    </div>

                    <div>

                      <p
                        className="
                          text-xs
                          font-bold
                          text-[#333333]
                        "
                      >
                        Robert
                      </p>

                      <p
                        className="
                          text-[9px]
                          text-gray-400
                        "
                      >
                        Your Inputify guide
                      </p>

                    </div>

                    <span
                      className="
                        ml-auto
                        w-2
                        h-2
                        rounded-full
                        bg-green-500
                      "
                    />

                  </div>


                  {/* Message */}

                  <div
                    className="
                      bg-[#F7F7F8]
                      rounded-xl
                      rounded-tl-sm
                      px-3
                      py-2.5
                      border
                      border-[#EEEEEE]
                    "
                  >

                    <p
                      className="
                        text-[12px]
                        leading-[18px]
                        text-[#555555]
                      "
                    >
                      {ROBERT_MESSAGES[type].message}
                    </p>

                  </div>


                  {/* Tail */}

                  <div
                    className="
                      absolute
                      -bottom-2
                      left-8
                      w-4
                      h-4
                      bg-[#F7F7F8]
                      border-r
                      border-b
                      border-[#EEEEEE]
                      rotate-45
                    "
                  />

                </div>


                {/* =================================================
                    ROBERT IMAGE
                ================================================= */}

                <img
                  src="/HomeImage/inputifyRobert.png"
                  alt="Inputify Robert"
                  className="
                    relative
                    z-10
                    w-[280px]
                    lg:w-[360px]
                    object-contain
                    animate-[float_4s_ease-in-out_infinite]
                  "
                />

              </div>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}