// export default function PanelRobotSection() {
//   return (
//     <section className="w-full bg-white px-6 py-20">

//       <div className="max-w-7xl mx-auto">

//         <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6 items-center">

//           {/* ================= PANEL ================= */}
//           <div className="relative">

//             <img
//               src="/HomeImage/surveyDashboard.PNG"
//               alt="Inputify research panel"
//               className="w-full rounded-3xl object-cover shadow-xl"
//             />

//           </div>


//           {/* ================= ROBOT ================= */}
//           <div className="relative min-h-[500px] flex items-center justify-center">

//             {/* Soft background shape */}
//             <div className="absolute w-[300px] h-[300px] rounded-full bg-purple-100 blur-2xl" />

//             {/* Speech bubble */}
//             <div className="absolute top-10 right-0 z-20 bg-white px-5 py-3 rounded-2xl shadow-lg">

//               <p className="text-sm font-medium text-gray-800">
//                 Need insights?
//               </p>

//             </div>


//             {/* ROBOT IMAGE */}
//             <img
//               src="/HomeImage/inputifyRobert.png"
//               alt="Inputify research assistant"
//               className="
//                 relative
//                 z-10
//                 w-[280px]
//                 md:w-[320px]
//                 lg:w-[360px]
//                 object-contain
//                 animate-bounce
//                 [animation-duration:4s]
//               "
//             />


//             {/* SMALL INFORMATION CARD */}
//             <div className="absolute bottom-12 left-0 z-20 bg-white px-5 py-4 rounded-2xl shadow-lg">

//               <p className="text-xs text-gray-500">
//                 Research Panel
//               </p>

//               <p className="font-semibold text-gray-900">
//                 Real users. Real insights.
//               </p>

//             </div>


//             {/* COUNTRY CARD */}
//             <div className="absolute bottom-28 right-0 z-20 bg-white px-5 py-4 rounded-2xl shadow-lg">

//               <p className="text-xs text-gray-500">
//                 Global reach
//               </p>

//               <p className="font-semibold text-gray-900">
//                 130+ Countries
//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }


export default function PanelRobotSection() {
  return (
    <section className="w-full bg-white px-6 py-20 overflow-hidden">

      <div className="max-w-7xl mx-auto">

        <div className="relative flex items-center min-h-[520px]">

          {/* ================= ROBOT ================= */}
          {/* Robert stays behind the dashboard */}
          <div
            className="
              absolute
              right-[2%]
              top-1/2
              -translate-y-1/2
              z-10
              w-[30%]
              flex
              justify-center
            "
          >

            <img
              src="/HomeImage/inputifyRobert.png"
              alt="Inputify research assistant"
              className="
                w-[270px]
                md:w-[300px]
                lg:w-[400px]
                object-contain
                animate-[float_4s_ease-in-out_infinite]
              "
            />

          </div>


          {/* ================= DASHBOARD ================= */}
          <div
            className="
              relative
              z-20
              w-[76%]
            "
          >

            <img
              src="/HomeImage/surveyDashboard.png"
              alt="Inputify research panel"
              className="
                w-full
                rounded-3xl
                object-cover
                shadow-[0_25px_60px_rgba(0,0,0,0.15)]
              "
            />

          </div>


          {/* ================= SPEECH ================= */}
          <div
            className="
              absolute
              z-30
              right-0
              top-16
              bg-white
              px-5
              py-3
              rounded-2xl
              shadow-xl
            "
          >
            <p className="text-sm font-semibold text-gray-800">
              Need insights? 👋
            </p>
          </div>


          {/* ================= GLOBAL REACH ================= */}
          <div
            className="
              absolute
              z-30
              right-0
              bottom-14
              bg-white
              px-5
              py-4
              rounded-2xl
              shadow-xl
            "
          >
            <p className="text-xs text-gray-500">
              Global reach
            </p>

            <p className="font-semibold text-gray-900">
              130+ Countries
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}