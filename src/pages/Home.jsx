// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="fixed inset-0 w-screen h-screen bg-cover bg-center overflow-hidden"
//       style={{
//         backgroundImage: `url("/HomeImage/SurveyPanel.png")`,
//       }}
//     >
//       {/* CFR Logo */}
//       <img
//         src="/HomeImage/cfr.png"
//         alt="CFR Solutions"
//         className="absolute top-4 left-4 w-16 sm:w-20 md:w-24 z-10"
//       />

//       {/* Content */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
//         <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[120px] text-emerald-900 font-bold mb-8">
//           CFR Survey Panels
//         </h1>

//         <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
//           <button
//             onClick={() => navigate("/register")}
//             className="px-8 py-3 bg-white rounded-2xl border shadow-md hover:shadow-lg transition w-48"
//           >
//             Sign Up
//           </button>

//           <button
//             onClick={() => navigate("/login")}
//             className="px-8 py-3 bg-white rounded-2xl border shadow-md hover:shadow-lg transition w-48"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Search, ChevronDown } from "lucide-react";
// import { useRef } from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { Linkedin, Youtube, Facebook } from "lucide-react";

// import './homeCss.css';
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// export default function Home() {
//   const navigate = useNavigate();
// const [active, setActive] = useState(0);

//   const data = [
//     {
//       title: "Verified Panel of Real Users",
//       content:
//         "Our platform connects you with a growing panel of genuine users. Every response comes from real people, ensuring your research is accurate, reliable, and trustworthy.",
//     },
//     {
//       title: "Smart Rewards That Drive Engagement",
//       content: "Users are motivated through a seamless points and wallet system. Higher engagement means better completion rates and faster survey results for your business.",
//     },
//     {
//       title: "Complete Survey & Quota Control",
//       content: "Define your target audience, set quotas, and manage participation in real time. You stay in control of who answers your surveys and how data is collected.",
//     },
//     {
//       title: "Track Everything Live",
//       content: "Monitor starts, completes, drop-offs, and performance metrics instantly through your dashboard — no waiting, no delays.",
//     },
//   ];
// const scrollRef = useRef();

//   const scroll = (direction) => {
//     if (direction === "left") {
//       scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
//     } else {
//       scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
//     }
//   };

//   const logos = [
//     "/logos/meta.png",
//     "/logos/indianoil.jpg",
//     "/logos/lexus.png",
//     "/logos/cartier.jpg",
//     "/logos/lamborghini.jpg",
//   ];
// //   const scrollRef = useRef();

// // const scroll = (direction) => {
// //   const container = scrollRef.current;

// //   if (direction === "left") {
// //     container.scrollBy({
// //       left: -300,
// //       behavior: "smooth",
// //     });
// //   } else {
// //     container.scrollBy({
// //       left: 300,
// //       behavior: "smooth",
// //     });
// //   }
// // };
//   return (
//     <div className="w-full min-h-screen">

     
//       <Navbar />
//       {/* HERO SECTION */}
//       <div className="flex items-center justify-center px-6 py-16 bg-gray-100 rounded-4xl">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
//           {/* LEFT */}
//           <div className="max-w-xl">
//             <h1 className="text-4xl sm:text-5xl lg:text-[100px] font-bold text-gray-900 relative lg:left-[50px]">
//               Get insights from real people, in real time
//             </h1>

//             <p className="mt-4 text-gray-600 max-w-md relative md:left-[50px]">
//               Inputify connects your business with the right audience to deliver accurate, high-quality market research — faster and smarter.
//             </p>

//             <div className="mt-6 flex gap-4">
//               <button
//                  onClick={() => navigate("/register")}
//                 className="px-6 py-3 bg-purple-700 text-white rounded-full shadow hover:bg-purple-800 relative md:left-[50px]"
//               >
//                 Find out how
//               </button>
//             </div>
//           </div>

//           {/* RIGHT (Hover Card) */}
//           <div className="phone relative mt-10 lg:left-[150px]">
//             <div className="notch"></div>
//        <div className="card">

//   <img
//     src="/HomeImage/phoneimage.png"
//     className="card-img"
//   />

//   <div className="blue-overlay">

//     {/* CURVE */}
//     <div className="curve">


//   <div className="ball"></div> {/* 👈 add this */}
// </div>

//     {/* CONTENT */}
//     <div className="content">
//       <h3>
//         How likely would you be to invest in a portable, solar-powered data tablet (like the one held by the man) for outdoor work?
//       </h3>

//       {[
//         { label: "Very likely", value: 34 },
//         { label: "Likely", value: 27 },
//         { label: "Neutral", value: 18 },
//         { label: "Unlikely", value: 15 },
//         { label: "Very unlikely", value: 6 },
//       ].map((item, i) => (
//         <div key={i} className="bar-row">
//           <div className="bar-label">
//             <span>{item.label}</span>
//             <span>{item.value}%</span>
//           </div>

//           <div className="bar">
//             <div
//               className="bar-fill"
//               style={{ width: `${item.value}%` }}
//             />
//           </div>
//         </div>
//       ))}
//     </div>

//   </div>

// </div>
// </div>
// </div>
// </div>


// {/* second section */}
// {/* <div className="w-full py-20 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">

//   <div className="max-w-7xl mx-auto text-center">

   
//     <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm mb-6">
//       Research Platform
//     </div>

    
//     <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
//       Market research, audience insights, and data-driven decisions
//     </h2>

    
//     <p className="mt-6 text-white/80 max-w-2xl mx-auto text-sm md:text-base">
//       Our advanced research platform connects your surveys to the right audience at the right time. Collect reliable insights, measure performance, and make confident business decisions — all from a single platform.
//     </p>

    
//     <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

      
//       <div className="bg-white text-black rounded-2xl p-6 text-left shadow-lg">
//         <h3 className="font-semibold text-lg mb-3">Reach the right audience</h3>
//         <p className="text-sm text-gray-600 mb-4">
//           Access a global panel of verified users. Target specific demographics and ensure your surveys reach the people who matter most.
//         </p>
        
//       </div>

    
//       <div className="bg-white text-black rounded-2xl p-6 text-left shadow-lg">
//         <h3 className="font-semibold text-lg mb-3">
//           Measure performance instantly
//         </h3>
//         <p className="text-sm text-gray-600 mb-4">
//           Track survey responses, completion rates, and engagement in real time with powerful analytics dashboards.
//         </p>
//       </div>

   
//       <div className="bg-white text-black rounded-2xl p-6 text-left shadow-lg">
//         <h3 className="font-semibold text-lg mb-3">
//           Reward and engage users
//         </h3>
//         <p className="text-sm text-gray-600 mb-4">
//           Motivate users with a built-in rewards system including points, wallet, and instant redemptions.
//         </p>
       
//       </div>

//     </div>
//   </div>
// </div> */}


// {/* CARDS */}
// <div className="w-full py-20 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
//     <h2 className="text-4xl md:text-5xl font-bold mt-5 leading-tight max-w-3xl mx-auto max-w-7xl mx-auto text-center">
//       Market research, audience insights, and data-driven decisions
//     </h2>

// <div className="mt-24 relative max-w-7xl mx-auto text-center">

//   {/* TOP BAR */}
//   <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[75%] h-[6px] bg-white/40 rounded-full"></div>

//   <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20">

//     {/* CARD 1 */}
//     <div className="relative flex flex-col items-center">

//       {/* STRING */}
//       <div className="absolute -top-20 flex flex-col items-center">
//         <div className="w-[2px] h-16 border-l-2 border-dashed border-white/60"></div>

//         {/* HOOK */}
//         <div className="w-5 h-5 rounded-full border-2 border-white bg-purple-600 shadow-md"></div>
//       </div>

//       {/* CARD */}
//       <div className="bg-white text-black rounded-2xl p-6 shadow-2xl hover:-translate-y-3 hover:rotate-1 transition duration-300 w-full">
//         <h3 className="font-semibold text-lg mb-3">
//           Reach the right audience
//         </h3>
//         <p className="text-sm text-gray-600">
//           Access a global panel of verified users. Target specific demographics and ensure your surveys reach the people who matter most.
//         </p>
//       </div>
//     </div>

//     {/* CARD 2 */}
//     <div className="relative flex flex-col items-center">

//       <div className="absolute -top-20 flex flex-col items-center">
//         <div className="w-[2px] h-16 border-l-2 border-dashed border-white/60"></div>
//         <div className="w-5 h-5 rounded-full border-2 border-white bg-indigo-600 shadow-md"></div>
//       </div>

//       <div className="bg-white text-black rounded-2xl p-6 shadow-2xl hover:-translate-y-3 hover:-rotate-1 transition duration-300 w-full">
//         <h3 className="font-semibold text-lg mb-3">
//           Measure performance instantly
//         </h3>
//         <p className="text-sm text-gray-600">
//           Track survey responses, completion rates, and engagement in real time with powerful analytics dashboards.
//         </p>
//       </div>
//     </div>

//     {/* CARD 3 */}
//     <div className="relative flex flex-col items-center">

//       <div className="absolute -top-20 flex flex-col items-center">
//         <div className="w-[2px] h-16 border-l-2 border-dashed border-white/60"></div>
//         <div className="w-5 h-5 rounded-full border-2 border-white bg-blue-600 shadow-md"></div>
//       </div>

//       <div className="bg-white text-black rounded-2xl p-6 shadow-2xl hover:-translate-y-3 hover:rotate-1 transition duration-300 w-full">
//         <h3 className="font-semibold text-lg mb-3">
//           Reward and engage users
//         </h3>
//         <p className="text-sm text-gray-600">
//           Motivate users with a built-in rewards system including points, wallet, and instant redemptions.
//         </p>
//       </div>
//     </div>

//   </div>
// </div>
// </div>

// {/* third section */}
//         {/* LEFT */}
        
//      <div className="w-full px-6 py-16 bg-white">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

//         {/* LEFT */}
//         <div>
//           <h2 className="text-4xl font-bold mb-10">
//             Why choose Inputify?
//           </h2>

//           <div className="space-y-4">
//             {data.map((item, i) => (
//               <div
//                 key={i}
//                 onClick={() => setActive(i)}
//                 className={`rounded-2xl p-6 cursor-pointer transition-all duration-300 
//                 ${active === i 
//                   ? "bg-gray-100 shadow-sm" 
//                   : "bg-white"
//                 }`}
//               >
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-semibold text-lg">
//                     {item.title}
//                   </h3>

//                   <span className="text-xl">
//                     {active === i ? "−" : "+"}
//                   </span>
//                 </div>

//                 {/* CONTENT */}
//                 <div
//                   className={`overflow-hidden transition-all duration-500 ${
//                     active === i ? "max-h-40 mt-4" : "max-h-0"
//                   }`}
//                 >
//                   <p className="text-gray-600 text-sm">
//                     {item.content}
//                   </p>
//                 </div>

//                 {/* LEFT BAR */}
//                 <div
//                   className={`absolute left-0 top-0 h-full w-1 rounded-full 
//                   ${active === i ? "bg-purple-600" : "bg-gray-200"}`}
//                 ></div>
//               </div>
//             ))}
//           </div>

//           {/* BUTTON */}
//           <button className="mt-8 bg-purple-800 text-white px-6 py-3 rounded-full flex items-center gap-2">
           
//             Get started
//           </button>
//         </div>

//         {/* RIGHT IMAGE */}
//         <div className="flex justify-center">
//           <div className="w-[350px] h-[500px] rounded-[180px] overflow-hidden shadow-lg">
//             <img
//               src="/HomeImage/whychooseus.png"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>

//       </div>
//     </div>

    
//       {/* Forth Section */}
//        <div className="w-full px-6 py-16 bg-white">
      
//       <div className="max-w-9xl mx-auto bg-white rounded-2xl p-10 relative">

        
//         {/* <p className="text-center text-gray-700 mb-10">
//           Trusted by over 4,000 insights-driven companies.
//         </p> */}

        
//         <div className="absolute right-6 top-6 flex gap-3">
//           <button
//             onClick={() => scroll("left")}
//             className="bg-purple-900 text-white p-3 rounded-md"
//           >
//             <ArrowLeft size={18} />
//           </button>

//           <button
//             onClick={() => scroll("right")}
//             className="bg-purple-900 text-white p-3 rounded-md"
//           >
//             <ArrowRight size={18} />
//           </button>
//         </div>

        
//         {/* <div
//           ref={scrollRef}
//           className="flex gap-12 overflow-x-auto scrollbar-hide items-center justify-start"
//         >
//           {logos.map((logo, i) => (
//             <img
//               key={i}
//               src={logo}
//               alt="logo"
//               className="h-60 object-contain hover:grayscale-0 transition"
//             />
//           ))}
//         </div> */}

//         <div ref={scrollRef} className="overflow-hidden relative w-full mt-20">
//   <div className="flex gap-12 animate-scroll">

//     {[...logos, ...logos].map((logo, i) => (
//       <img
//         key={i}
//         src={logo}
//         alt="logo"
//         className="h-60 object-contain hover:grayscale-0 transition"
//       />
//     ))}

//   </div>
// </div>

//       </div>
//     </div>
//   <Footer />
//     </div>
//   );
// }




import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PanelRobotSection from "./PanelRobotSection";
import { Linkedin, Youtube, Facebook } from "lucide-react";

import './homeCss.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Home() {
  const navigate = useNavigate();
const [active, setActive] = useState(0);

  const data = [
    {
      title: "Verified Panel of Real Users",
      content:
        "Our platform connects you with a growing panel of genuine users. Every response comes from real people, ensuring your research is accurate, reliable, and trustworthy.",
    },
    {
      title: "Smart Rewards That Drive Engagement",
      content: "Users are motivated through a seamless points and wallet system. Higher engagement means better completion rates and faster survey results for your business.",
    },
    {
      title: "Complete Survey & Quota Control",
      content: "Define your target audience, set quotas, and manage participation in real time. You stay in control of who answers your surveys and how data is collected.",
    },
    {
      title: "Track Everything Live",
      content: "Monitor starts, completes, drop-offs, and performance metrics instantly through your dashboard — no waiting, no delays.",
    },
  ];
const scrollRef = useRef();

  const scroll = (direction) => {
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const logos = [
    "/logos/meta.png",
    "/logos/indianoil.jpg",
    "/logos/lexus.png",
    "/logos/cartier.jpg",
    "/logos/lamborghini.jpg",
  ];
//   const scrollRef = useRef();

// const scroll = (direction) => {
//   const container = scrollRef.current;

//   if (direction === "left") {
//     container.scrollBy({
//       left: -300,
//       behavior: "smooth",
//     });
//   } else {
//     container.scrollBy({
//       left: 300,
//       behavior: "smooth",
//     });
//   }
// };
  return (
    <div className="w-full min-h-screen">

     
      <Navbar />
      {/* HERO SECTION */}
      <div className="flex items-center justify-center px-6 py-16 bg-gray-100 rounded-4xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* LEFT */}
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[100px] font-bold text-gray-900 relative lg:left-[50px]">
              Get insights from real people, in real time
            </h1>

            <p className="mt-4 text-gray-600 max-w-md relative md:left-[50px]">
              Inputify connects your business with the right audience to deliver accurate, high-quality market research — faster and smarter.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                 onClick={() => navigate("/register")}
                className="px-6 py-3 bg-purple-700 text-white rounded-full shadow hover:bg-purple-800 relative md:left-[50px]"
              >
                Find out how
              </button>
            </div>
          </div>

          {/* RIGHT (Hover Card) */}
          <div className="phone relative mt-10 left-[10px] md:left-[70px] lg:left-[150px] flex justify-center lg:mt-0 w-[300px] sm:w-[300px] md:w-[390px] lg:w-[390px] xl:w-[390px] h-[550px] sm:h-[500px] md:h-[600px] lg:h-[600px] xl:h-[600px]">
            <div className="notch"></div>
       <div className="card">

  <img
    src="/HomeImage/phoneimage.png"
    className="card-img"
  />

  <div className="blue-overlay">

    {/* CURVE */}
    <div className="curve">


  <div className="ball"></div> {/* 👈 add this */}
</div>

    {/* CONTENT */}
    <div className="content">
      <h3>
        How likely would you be to invest in a portable, solar-powered data tablet (like the one held by the man) for outdoor work?
      </h3>

      {[
        { label: "Very likely", value: 34 },
        { label: "Likely", value: 27 },
        { label: "Neutral", value: 18 },
        { label: "Unlikely", value: 15 },
        { label: "Very unlikely", value: 6 },
      ].map((item, i) => (
        <div key={i} className="bar-row">
          <div className="bar-label">
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </div>

          <div className="bar">
            <div
              className="bar-fill"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>

  </div>

</div>
</div>
</div>
</div>


{/* second section */}
{/* <div className="w-full py-20 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">

  <div className="max-w-7xl mx-auto text-center">

   
    <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm mb-6">
      Research Platform
    </div>

    
    <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
      Market research, audience insights, and data-driven decisions
    </h2>

    
    <p className="mt-6 text-white/80 max-w-2xl mx-auto text-sm md:text-base">
      Our advanced research platform connects your surveys to the right audience at the right time. Collect reliable insights, measure performance, and make confident business decisions — all from a single platform.
    </p>

    
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

      
      <div className="bg-white text-black rounded-2xl p-6 text-left shadow-lg">
        <h3 className="font-semibold text-lg mb-3">Reach the right audience</h3>
        <p className="text-sm text-gray-600 mb-4">
          Access a global panel of verified users. Target specific demographics and ensure your surveys reach the people who matter most.
        </p>
        
      </div>

    
      <div className="bg-white text-black rounded-2xl p-6 text-left shadow-lg">
        <h3 className="font-semibold text-lg mb-3">
          Measure performance instantly
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Track survey responses, completion rates, and engagement in real time with powerful analytics dashboards.
        </p>
      </div>

   
      <div className="bg-white text-black rounded-2xl p-6 text-left shadow-lg">
        <h3 className="font-semibold text-lg mb-3">
          Reward and engage users
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Motivate users with a built-in rewards system including points, wallet, and instant redemptions.
        </p>
       
      </div>

    </div>
  </div>
</div> */}


{/* CARDS */}
<div className="w-full py-20 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
    <h2 className="text-4xl md:text-5xl font-bold mt-5 leading-tight max-w-3xl mx-auto max-w-7xl mx-auto text-center">
      Market research, audience insights, and data-driven decisions
    </h2>

<div className="mt-24 relative max-w-7xl mx-auto text-center">

  {/* TOP BAR */}
  <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[75%] h-[6px] bg-white/40 rounded-full"></div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20">

    {/* CARD 1 */}
    <div className="relative flex flex-col items-center">

      {/* STRING */}
      <div className="absolute -top-20 flex flex-col items-center">
        <div className="w-[2px] h-16 border-l-2 border-dashed border-white/60"></div>

        {/* HOOK */}
        <div className="w-5 h-5 rounded-full border-2 border-white bg-purple-600 shadow-md"></div>
      </div>

      {/* CARD */}
      <div className="bg-white text-black rounded-2xl p-6 shadow-2xl hover:-translate-y-3 hover:rotate-1 transition duration-300 w-full">
        <h3 className="font-semibold text-lg mb-3">
          Reach the right audience
        </h3>
        <p className="text-sm text-gray-600">
          Access a global panel of verified users. Target specific demographics and ensure your surveys reach the people who matter most.
        </p>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="relative flex flex-col items-center">

      <div className="absolute -top-20 flex flex-col items-center">
        <div className="w-[2px] h-16 border-l-2 border-dashed border-white/60"></div>
        <div className="w-5 h-5 rounded-full border-2 border-white bg-indigo-600 shadow-md"></div>
      </div>

      <div className="bg-white text-black rounded-2xl p-6 shadow-2xl hover:-translate-y-3 hover:-rotate-1 transition duration-300 w-full">
        <h3 className="font-semibold text-lg mb-3">
          Measure performance instantly
        </h3>
        <p className="text-sm text-gray-600">
          Track survey responses, completion rates, and engagement in real time with powerful analytics dashboards.
        </p>
      </div>
    </div>
    
    {/* CARD 3 */}
    <div className="relative flex flex-col items-center">

      <div className="absolute -top-20 flex flex-col items-center">
        <div className="w-[2px] h-16 border-l-2 border-dashed border-white/60"></div>
        <div className="w-5 h-5 rounded-full border-2 border-white bg-blue-600 shadow-md"></div>
      </div>

      <div className="bg-white text-black rounded-2xl p-6 shadow-2xl hover:-translate-y-3 hover:rotate-1 transition duration-300 w-full">
        <h3 className="font-semibold text-lg mb-3">
          Reward and engage users
        </h3>
        <p className="text-sm text-gray-600">
          Motivate users with a built-in rewards system including points, wallet, and instant redemptions.
        </p>
      </div>
    </div>

  </div>
</div>
</div>
<PanelRobotSection />
{/* third section */}
        {/* LEFT */}
        
     <div className="w-full px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-10">
            Why choose Inputify?
          </h2>

          <div className="space-y-4">
            {data.map((item, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-2xl relative left-[-10px] p-6 cursor-pointer transition-all duration-300 
                ${active === i 
                  ? "bg-gray-100 shadow-sm" 
                  : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  <span className="text-xl">
                    {active === i ? "−" : "+"}
                  </span>
                </div>

                {/* CONTENT */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    active === i ? "max-h-40 mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm">
                    {item.content}
                  </p>
                </div>

                {/* LEFT BAR */}
                <div
                  className={`absolute left-0 top-0 h-full w-1 rounded-full 
                  ${active === i ? "bg-purple-600" : "bg-gray-200"}`}
                ></div>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button className="mt-8 bg-purple-800 text-white px-6 py-3 rounded-full flex items-center gap-2">
           
            Get started
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <div className="w-[300px] h-[450px] lg:w-[400px] lg:h-[500px] rounded-[180px] overflow-hidden shadow-lg">
            <img
              src="/HomeImage/whychooseus.png"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>

    
      {/* Forth Section */}
       <div className="w-full px-6 py-16 bg-white">
      
      <div className="max-w-9xl mx-auto bg-white rounded-2xl p-10 relative">

        
        {/* <p className="text-center text-gray-700 mb-10">
          Trusted by over 4,000 insights-driven companies.
        </p> */}

        
        <div className="absolute right-6 top-6 flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="bg-purple-900 text-white p-3 rounded-md"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="bg-purple-900 text-white p-3 rounded-md"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        
        {/* <div
          ref={scrollRef}
          className="flex gap-12 overflow-x-auto scrollbar-hide items-center justify-start"
        >
          {logos.map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt="logo"
              className="h-60 object-contain hover:grayscale-0 transition"
            />
          ))}
        </div> */}

        <div ref={scrollRef} className="overflow-hidden relative w-full mt-20">
  <div className="flex gap-12 animate-scroll">

    {[...logos, ...logos].map((logo, i) => (
      <img
        key={i}
        src={logo}
        alt="logo"
        className="h-30 lg:h-60 object-contain hover:grayscale-0 transition"
      />
    ))}

  </div>
</div>

      </div>
    </div>
  <Footer />
    </div>
  );
}




