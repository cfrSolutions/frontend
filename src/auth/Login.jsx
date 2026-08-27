// import { useState } from "react";
// import { login } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [type, setType] = useState("PERSONAL"); 
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//   if (!email.trim() || !password) {
//     setError("Please enter your email and password.");
//     return;
//   }

//   setLoading(true);

//     try {
//       const data = await login({ email, password, role: type === "BUSINESS" ? "BUSINESS" : "USER", });
// //       console.log(data);
// // console.log("Role:", data.role);

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);

//       // 🔥 ROLE BASED REDIRECT (already correct)
//       if (data.role === "ADMIN") {
//         navigate("/admin/dashboard");
//       } else if (data.role === "SUPERADMIN") {
//         navigate("/superadmin/dashboard");
//       } else if (data.role === "BUSINESS") {
//         navigate("/business/dashboard");
//       } else {
//         navigate("/user/dashboard");
//       }
//     } catch (err) {
//        const message =
//       err.response?.data?.message ||
//       "Unable to login. Please check your credentials.";

//     setError(message);
//     }
//     finally {
//     setLoading(false);
//   }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="p-6 shadow rounded w-96">

//         <h2 className="text-2xl mb-4 text-center">Login</h2>

//         {/* 🔥 Toggle */}
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

//         <input
//           type="email"
//           placeholder={type === "BUSINESS" ? "Business Email" : "Email"}
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

//         {/* 🔥 Google with role */}
//         <button
//           type="button"
//           onClick={() =>
//             (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?role=${type === "BUSINESS" ? "BUSINESS" : "USER"}`)
//           }
//           className="border w-full p-2 mt-3 rounded flex items-center justify-center gap-2"
//         >
//           Continue with Google
//         </button>
//         {/* <button
//           type="button"
//           onClick={() =>
//             (window.location.href = `http://localhost:5000/api/auth/google?role=${type === "BUSINESS" ? "BUSINESS" : "USER"}`)
//           }
//           className="border w-full p-2 mt-3 rounded flex items-center justify-center gap-2"
//         >
//           Continue with Google dev
//         </button> */}
 
//         <p>
//           Don’t have an account?
//           <span
//             onClick={() => navigate("/register")}
//             style={{ color: "blue", cursor: "pointer" }}
//           >
//             Sign up
//           </span>
//         </p>

//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";

const ROBERT_MESSAGES = {
  PERSONAL: "Hey! 👋 Welcome back. Ready to continue?",
  BUSINESS: "Welcome back! 🤖 Let's get your business moving.",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("PERSONAL");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Custom message modal
  const [messageModal, setMessageModal] = useState({
    open: false,
    type: "error",
    message: "",
  });

  const navigate = useNavigate();

  const closeModal = () => {
    setMessageModal({
      open: false,
      type: "error",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setMessageModal({
        open: true,
        type: "warning",
        message: "Please enter your email and password.",
      });
      return;
    }

    setLoading(true);

    try {
      // =====================================================
      // BACKEND LOGIN — UNCHANGED
      // =====================================================

      const data = await login({
        email,
        password,
        role: type === "BUSINESS" ? "BUSINESS" : "USER",
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // =====================================================
      // ROLE BASED REDIRECT — UNCHANGED
      // =====================================================

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

      setMessageModal({
        open: true,
        type: "error",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* =====================================================
          PAGE
      ===================================================== */}

      <main
        className="
          min-h-[calc(100dvh-132px)]
          w-full
          bg-[#F7F7F8]
          flex
          items-center
          justify-center
          px-4
          py-6
          overflow-hidden
        "
      >
        <div
          className="
            w-full
            max-w-[1050px]
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
                LEFT — LOGIN CARD
            ===================================================== */}

            <div
              className="
                w-full
                max-w-[635px]
                bg-white
                border
                border-[#E7E7E7]
                rounded-[24px]
                shadow-[0_20px_60px_rgba(0,0,0,0.07)]
                p-5
                sm:p-6
                md:p-7
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
                      {ROBERT_MESSAGES[type]}
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
                  Welcome back
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-400
                    mt-1
                  "
                >
                  Sign in to continue to your Inputify account.
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
                  onClick={() => {
                    setType("PERSONAL");
                    setError("");
                  }}
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
                  onClick={() => {
                    setType("BUSINESS");
                    setError("");
                  }}
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
                  FORM
              ===================================================== */}

              <form onSubmit={handleSubmit}>

                {/* EMAIL */}

                <div className="mb-2.5">

                  <input
                    type="email"
                    placeholder={
                      type === "BUSINESS"
                        ? "Business Email"
                        : "Email address"
                    }
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
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
                      text-[#333333]
                      outline-none
                      transition
                      focus:bg-white
                      focus:border-[#FFB15C]
                      focus:ring-4
                      focus:ring-[#FFF4E6]
                    "
                    required
                  />

                </div>


                {/* PASSWORD */}

                <div className="mb-2.5">

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
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
                      text-[#333333]
                      outline-none
                      transition
                      focus:bg-white
                      focus:border-[#FFB15C]
                      focus:ring-4
                      focus:ring-[#FFF4E6]
                    "
                    required
                  />

                </div>


                {/* =====================================================
                    LOGIN BUTTON
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
                    disabled:cursor-not-allowed
                  "
                >
                  {loading ? "Signing in..." : "Login"}
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
                      }`)
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
                    SIGN UP
                ===================================================== */}

                <p
                  className="
                    text-center
                    text-xs
                    text-gray-400
                    mt-3
                  "
                >
                  Don't have an account?{" "}

                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="
                      text-[#D96F00]
                      font-semibold
                      hover:text-[#FF8A00]
                    "
                  >
                    Sign up
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


              {/* Robert area */}

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
                      {ROBERT_MESSAGES[type]}
                    </p>

                  </div>


                  {/* Chat tail */}

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


      {/* =========================================================
          CUSTOM MESSAGE MODAL
      ========================================================= */}

      {messageModal.open && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-[#333333]/40
            backdrop-blur-[3px]
            px-4
          "
          onClick={closeModal}
        >

          <div
            className="
              relative
              w-full
              max-w-[420px]
              bg-white
              rounded-[24px]
              border
              border-[#E7E7E7]
              shadow-[0_25px_80px_rgba(0,0,0,0.18)]
              p-6
              animate-[fadeIn_0.2s_ease-out]
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close */}

            <button
              type="button"
              onClick={closeModal}
              className="
                absolute
                right-4
                top-4
                w-8
                h-8
                rounded-full
                bg-[#F7F7F8]
                text-gray-400
                hover:bg-[#EEEEEE]
                hover:text-[#333333]
                transition
                text-lg
                leading-none
              "
            >
              ×
            </button>


            {/* Icon */}

            <div
              className={`
                w-12
                h-12
                rounded-2xl
                flex
                items-center
                justify-center
                text-xl
                font-bold
                mb-4

                ${
                  messageModal.type === "warning"
                    ? "bg-[#FFF7E8] text-[#D96F00]"
                    : "bg-[#FFF1F1] text-[#D64545]"
                }
              `}
            >
              {messageModal.type === "warning" ? "!" : "×"}
            </div>


            {/* Title */}

            <h3
              className="
                text-[20px]
                font-bold
                text-[#333333]
                mb-1
              "
            >
              {messageModal.type === "warning"
                ? "Almost there"
                : "Unable to login"}
            </h3>


            {/* Message */}

            <p
              className="
                text-sm
                leading-6
                text-gray-500
                pr-4
              "
            >
              {messageModal.message}
            </p>


            {/* Button */}

            <button
              type="button"
              onClick={closeModal}
              className="
                w-full
                h-[46px]
                mt-6
                rounded-xl
                bg-[#333333]
                hover:bg-[#222222]
                text-white
                text-sm
                font-semibold
                transition
              "
            >
              Okay
            </button>

          </div>

        </div>
      )}

    </>
  );
}