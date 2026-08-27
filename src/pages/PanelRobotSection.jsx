// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const STEPS = [
//   {
//     dashboard: "/HomeImage/surveyDashboard.png",
//     robot: "/HomeImage/inputifyRobert.png",
//     message: "Welcome! Let's get started 👋",
//     step: "Sign Up",
//   },
//   {
//     dashboard: "/HomeImage/signup.png",
//     robot: "/HomeImage/inputifyRobert.png",
//     message: "Create your Inputify account ✨",
//     step: "Sign Up",
//   },
//   {
//     dashboard: "/HomeImage/login.png",
//     robot: "/HomeImage/inputifyRobert.png",
//     message: "Great! Now log in to your account 🔐",
//     step: "Login",
//   },
//   {
//     dashboard: "/HomeImage/profile.png",
//     robot: "/HomeImage/inputifyRobert.png",
//     message: "Complete your profile to get matched 🎯",
//     step: "Complete Profile",
//   },
//   {
//     dashboard: "/HomeImage/surveys.png",
//     robot: "/HomeImage/inputifyRobert.png",
//     message: "Here are surveys matched for you 📝",
//     step: "Find Surveys",
//   },
//   {
//     dashboard: "/HomeImage/rewards.png",
//     robot: "/HomeImage/inputifyRobert.png",
//     message: "Complete surveys and earn points 💰",
//     step: "Earn Points",
//   },
//   {
//     dashboard: "/HomeImage/wallet.png",
//     robot: "/HomeImage/inputifyRobert.png",
//     message: "Use your points and unlock rewards 🎁",
//     step: "Rewards",
//   },
// ];

// export default function PanelRobotSection() {
//   const sectionRef = useRef(null);
//   const visualRef = useRef(null);

//   const [activeStep, setActiveStep] = useState(0);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const visual = visualRef.current;

//     if (!section || !visual) return;

//     const ctx = gsap.context(() => {
//       const steps = gsap.utils.toArray(".walkthrough-step");

//       ScrollTrigger.create({
//         trigger: section,
//         start: "top top",
//         end: `+=${steps.length * 100}%`,

//         pin: visual,

//         scrub: false,

//         onUpdate: (self) => {
//           const index = Math.min(
//             steps.length - 1,
//             Math.floor(self.progress * steps.length)
//           );

//           setActiveStep(index);
//         },
//       });
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   const current = STEPS[activeStep];

//   return (
//     <section
//       ref={sectionRef}
//       className="w-full bg-white px-6 py-20 overflow-hidden"
//     >
//       <div className="max-w-7xl mx-auto px-6">

//         <div className="relative">

//           {/* ================================================= */}
//           {/* DASHBOARD + ROBERT */}
//           {/* ================================================= */}

//           <div
//             ref={visualRef}
//             className="
//               relative
//               w-full
//               h-screen
//               flex
//               items-center
//               justify-center
//             "
//           >

//             {/* ================= GLOW ================= */}

//             <div
//               className="
//                 absolute
//                 left-[55%]
//                 top-1/2
//                 -translate-x-1/2
//                 -translate-y-1/2
//                 w-[500px]
//                 h-[500px]
//                 rounded-full
//                 bg-purple-100/50
//                 blur-3xl
//                 pointer-events-none
//               "
//             />

//             {/* ================================================= */}
//             {/* DASHBOARD */}
//             {/* ================================================= */}

//             <div
//               className="
//                 absolute
//                 z-20
//                 left-1/2
//                 top-1/2
//                 -translate-x-[58%]
//                 -translate-y-1/2
//                w-[100%]
//                sm:w-[90%]
//                 md:w-[64%]
//                 lg:w-[65%]
//                 xl:w-[80%]
//               "
//             >
//               <div
//                 key={current.dashboard}
//                 className="animate-[fadeIn_0.5s_ease-out]"
//               >
//                 <img
//                   src={current.dashboard}
//                   alt="Inputify dashboard"
//                   className="
//                     w-full
//                     rounded-3xl
//                     object-cover
//                     shadow-[0_30px_80px_rgba(0,0,0,0.16)]
//                   "
//                 />
//               </div>
//             </div>

//             {/* ================================================= */}
//             {/* ROBERT */}
//             {/* ================================================= */}

//             <div
//               className="
//                 absolute
//                 z-10
//                 right-[0%]
//                 top-1/2
//                 translate-x-[18%]
//                 -translate-y-1/3
//                 w-[30%]
//                 flex
//                 justify-center
//                 pointer-events-none
//               "
//             >
//               <img
//                 key={current.robot}
//                 src={current.robot}
//                 alt="Inputify Robert"
//                 className="
//                   w-[260px]
//                   md:w-[300px]
//                   lg:w-[360px]
//                   xl:w-[390px]
//                   object-contain
//                   animate-[float_4s_ease-in-out_infinite]
//                 "
//               />
//             </div>

//            {/* ================================================= */}
// {/* ROBERT MESSAGE */}
// {/* ================================================= */}

// <div
//   key={activeStep}
//   className="
//     absolute
//     z-40
//     right-[1%]
//     lg:right-[-1%]
//     xl:right-[0%]
//     top-[10%]
//     w-[190px]
//     sm:w-[210px]
//     md:w-[230px]
//     animate-[fadeIn_0.4s_ease-out]
//   "
// >
//   <div
//     className="
//       relative
//       overflow-hidden
//       rounded-[20px]
//       bg-white
//       border
//       border-purple-100
//       px-5
//       py-4
//       shadow-[0_18px_45px_rgba(91,33,182,0.14)]
//     "
//   >

//     {/* Small gradient accent */}

//     <div
//       className="
//         absolute
//         top-0
//         left-0
//         w-full
//         h-[3px]
//         bg-gradient-to-r
//         from-purple-600
//         via-indigo-500
//         to-blue-500
//       "
//     />


//     {/* Robert header */}

//     <div className="flex items-center gap-2.5 mb-3">

//       <div
//         className="
//           relative
//           w-8
//           h-8
//           rounded-full
//           bg-gradient-to-br
//           from-purple-100
//           to-indigo-100
//           flex
//           items-center
//           justify-center
//           text-sm
//           shadow-sm
//         "
//       >
//         🤖

//         {/* online */}

//         <span
//           className="
//             absolute
//             right-0
//             bottom-0
//             w-2
//             h-2
//             rounded-full
//             bg-green-500
//             border-2
//             border-white
//           "
//         />
//       </div>

//       <div>
//         <p className="text-xs font-bold text-gray-900">
//           Robert
//         </p>

//         <p className="text-[9px] text-gray-400">
//           Your guide
//         </p>
//       </div>

//     </div>


//     {/* Message */}

//     <div
//       className="
//         relative
//         bg-gray-50
//         rounded-2xl
//         rounded-tl-sm
//         px-3.5
//         py-3
//         border
//         border-gray-100
//       "
//     >

//       <p
//         className="
//           text-sm
//           md:text-[14px]
//           font-medium
//           leading-5
//           text-gray-700
//         "
//       >
//         {current.message}
//       </p>

//     </div>


//     {/* Current step */}

//     <div className="flex items-center justify-between mt-3">

//       <span
//         className="
//           text-[9px]
//           uppercase
//           tracking-[0.12em]
//           font-semibold
//           text-gray-400
//         "
//       >
//         Step
//       </span>

//       <span
//         className="
//           text-[10px]
//           font-bold
//           text-purple-600
//           bg-purple-50
//           px-2.5
//           py-1
//           rounded-full
//         "
//       >
//         {current.step}
//       </span>

//     </div>


//     {/* Bubble tail */}

//     <div
//       className="
//         absolute
//         -bottom-2
//         left-8
//         w-4
//         h-4
//         bg-gray-50
//         border-r
//         border-b
//         border-gray-100
//         rotate-45
//       "
//     />

//   </div>
// </div>

           

//           </div>


//           {/* ================================================= */}
//           {/* SCROLL TRIGGERS */}
//           {/* ================================================= */}

//           <div
//             className="
//               absolute
//               top-0
//               left-0
//               w-full
//               pointer-events-none
//             "
//           >
//             {STEPS.map((_, index) => (
//               <div
//                 key={index}
//                 data-step={index}
//                 className="walkthrough-step h-screen"
//               />
//             ))}
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    dashboard: "/HomeImage/surveyDashboard.png",
    robot: "/HomeImage/inputifyRobert.png",
    message: "Welcome! Let's get started 👋",
    step: "Sign Up",
  },
  {
    dashboard: "/HomeImage/signup.png",
    robot: "/HomeImage/inputifyRobert.png",
    message: "Create your Inputify account ✨",
    step: "Sign Up",
  },
  {
    dashboard: "/HomeImage/login.png",
    robot: "/HomeImage/inputifyRobert.png",
    message: "Great! Now log in to your account 🔐",
    step: "Login",
  },
  {
    dashboard: "/HomeImage/profile.png",
    robot: "/HomeImage/inputifyRobert.png",
    message: "Complete your profile to get matched 🎯",
    step: "Complete Profile",
  },
  {
    dashboard: "/HomeImage/surveys.png",
    robot: "/HomeImage/inputifyRobert.png",
    message: "Here are surveys matched for you 📝",
    step: "Find Surveys",
  },
  {
    dashboard: "/HomeImage/rewards.png",
    robot: "/HomeImage/inputifyRobert.png",
    message: "Complete surveys and earn points 💰",
    step: "Earn Points",
  },
  {
    dashboard: "/HomeImage/wallet.png",
    robot: "/HomeImage/inputifyRobert.png",
    message: "Use your points and unlock rewards 🎁",
    step: "Rewards",
  },
];

export default function PanelRobotSection() {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;

    if (!section || !visual) return;

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray(".walkthrough-step");

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${steps.length * 100}%`,

        pin: visual,

        scrub: false,

        onUpdate: (self) => {
          const index = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length)
          );

          setActiveStep(index);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const current = STEPS[activeStep];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-6 py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="relative">

          {/* ================================================= */}
          {/* DASHBOARD + ROBERT */}
          {/* ================================================= */}

        <div
  ref={visualRef}
  className="
    relative
    w-full
    h-screen
    flex
    items-center
    justify-center
    max-md:h-auto
    max-md:min-h-screen
    max-md:block
    max-md:pt-16
    max-md:pb-8
  "
>
  {/* ================= GLOW ================= */}

  <div
    className="
      absolute
      left-[55%]
      top-1/2
      -translate-x-1/2
      -translate-y-1/2
      w-[500px]
      h-[500px]
      rounded-full
      bg-purple-100/50
      blur-3xl
      pointer-events-none

      max-md:w-[300px]
      max-md:h-[300px]
      max-md:left-1/2
      max-md:top-[25%]
    "
  />


  {/* ================================================= */}
  {/* DASHBOARD */}
  {/* ================================================= */}

  <div
    className="
      absolute
      z-20
      left-1/2
      top-1/2
      -translate-x-[58%]
      -translate-y-1/2
      w-[100%]
      sm:w-[90%]
      md:w-[64%]
      lg:w-[65%]
      xl:w-[80%]

      max-md:relative
      max-md:left-auto
      max-md:top-auto
      max-md:translate-x-0
      max-md:translate-y-0
      max-md:w-full
    "
  >
    <div
      key={current.dashboard}
      className="animate-[fadeIn_0.5s_ease-out]"
    >
      <img
        src={current.dashboard}
        alt="Inputify dashboard"
        className="
          w-full
          rounded-3xl
          object-contain
          shadow-[0_30px_80px_rgba(0,0,0,0.16)]

          max-md:rounded-2xl
        "
      />
    </div>
  </div>


  {/* ================================================= */}
  {/* MOBILE ROBERT + CHAT AREA */}
  {/* ================================================= */}

  <div
    className="
      hidden

      max-md:flex
      max-md:relative
      max-md:z-30
      max-md:w-full
      max-md:items-center
      max-md:justify-center
      max-md:gap-1
      max-md:mt-6
    "
  >

    {/* ================= CHAT ================= */}

    <div
      key={`mobile-chat-${activeStep}`}
      className="
        w-[52%]
        animate-[fadeIn_0.4s_ease-out]
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[18px]
          bg-white
          border
          border-purple-100
          px-3
          py-3
          shadow-[0_15px_35px_rgba(91,33,182,0.13)]
        "
      >

        {/* Gradient line */}

        <div
          className="
            absolute
            top-0
            left-0
            w-full
            h-[3px]
            bg-gradient-to-r
            from-purple-600
            via-indigo-500
            to-blue-500
          "
        />

        {/* Header */}

        <div className="flex items-center gap-2 mb-2">

          <div
            className="
              relative
              w-7
              h-7
              shrink-0
              rounded-full
              bg-purple-50
              flex
              items-center
              justify-center
              text-xs
            "
          >
            🤖

            <span
              className="
                absolute
                right-0
                bottom-0
                w-2
                h-2
                rounded-full
                bg-green-500
                border-2
                border-white
              "
            />
          </div>

          <div>
            <p className="text-[11px] font-bold text-gray-900">
              Robert
            </p>

            <p className="text-[8px] text-gray-400">
              Your guide
            </p>
          </div>

        </div>

        {/* Message */}

        <div
          className="
            bg-gray-50
            rounded-xl
            rounded-tl-sm
            px-2.5
            py-2.5
            border
            border-gray-100
          "
        >
          <p
            className="
              text-[11px]
              font-medium
              leading-4
              text-gray-700
            "
          >
            {current.message}
          </p>
        </div>

        {/* Step */}

        <div className="flex items-center justify-between mt-2">

          <span
            className="
              text-[8px]
              uppercase
              tracking-wider
              font-semibold
              text-gray-400
            "
          >
            Step
          </span>

          <span
            className="
              text-[8px]
              font-bold
              text-purple-600
              bg-purple-50
              px-2
              py-1
              rounded-full
            "
          >
            {current.step}
          </span>

        </div>

      </div>
    </div>


    {/* ================= ROBERT ================= */}

    <div
      className="
        relative
        w-[90%]
        flex
        justify-center
        pointer-events-none
      "
    >
      <img
        src={current.robot}
        alt="Inputify Robert"
        className="
          w-[300px]
          object-contain
          animate-[float_4s_ease-in-out_infinite]
        "
      />
    </div>

  </div>


  {/* ================================================= */}
  {/* DESKTOP ROBERT */}
  {/* ================================================= */}

  <div
    className="
      absolute
      z-10
      right-[0%]
      top-1/2
      translate-x-[18%]
      -translate-y-1/3
      w-[30%]
      flex
      justify-center
      pointer-events-none

      max-md:hidden
    "
  >
    <img
      key={current.robot}
      src={current.robot}
      alt="Inputify Robert"
      className="
        w-[260px]
        md:w-[300px]
        lg:w-[360px]
        xl:w-[390px]
        object-contain
        animate-[float_4s_ease-in-out_infinite]
      "
    />
  </div>


  {/* ================================================= */}
  {/* DESKTOP ROBERT MESSAGE */}
  {/* ================================================= */}

  <div
    key={`desktop-chat-${activeStep}`}
    className="
      absolute
      z-40
      right-[1%]
      lg:right-[-1%]
      xl:right-[0%]
      top-[10%]
      w-[190px]
      sm:w-[210px]
      md:w-[230px]
      animate-[fadeIn_0.4s_ease-out]

      max-md:hidden
    "
  >
    <div
      className="
        relative
        overflow-hidden
        rounded-[20px]
        bg-white
        border
        border-purple-100
        px-5
        py-4
        shadow-[0_18px_45px_rgba(91,33,182,0.14)]
      "
    >

      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-[3px]
          bg-gradient-to-r
          from-purple-600
          via-indigo-500
          to-blue-500
        "
      />

      <div className="flex items-center gap-2.5 mb-3">

        <div
          className="
            relative
            w-8
            h-8
            rounded-full
            bg-gradient-to-br
            from-purple-100
            to-indigo-100
            flex
            items-center
            justify-center
            text-sm
            shadow-sm
          "
        >
          🤖

          <span
            className="
              absolute
              right-0
              bottom-0
              w-2
              h-2
              rounded-full
              bg-green-500
              border-2
              border-white
            "
          />
        </div>

        <div>
          <p className="text-xs font-bold text-gray-900">
            Robert
          </p>

          <p className="text-[9px] text-gray-400">
            Your guide
          </p>
        </div>

      </div>

      <div
        className="
          bg-gray-50
          rounded-2xl
          rounded-tl-sm
          px-3.5
          py-3
          border
          border-gray-100
        "
      >
        <p
          className="
            text-sm
            md:text-[14px]
            font-medium
            leading-5
            text-gray-700
          "
        >
          {current.message}
        </p>
      </div>

      <div className="flex items-center justify-between mt-3">

        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.12em]
            font-semibold
            text-gray-400
          "
        >
          Step
        </span>

        <span
          className="
            text-[10px]
            font-bold
            text-purple-600
            bg-purple-50
            px-2.5
            py-1
            rounded-full
          "
        >
          {current.step}
        </span>

      </div>

    </div>
  </div>

</div>


          {/* ================================================= */}
          {/* SCROLL TRIGGERS */}
          {/* ================================================= */}

          <div
            className="
              absolute
              top-0
              left-0
              w-full
              pointer-events-none
            "
          >
            {STEPS.map((_, index) => (
              <div
                key={index}
                data-step={index}
                className="walkthrough-step h-screen"
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}