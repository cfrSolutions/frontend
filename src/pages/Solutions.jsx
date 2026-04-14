// import Footer from "./Footer";
// import Navbar from "./navbar";

// export default function Solutions(){
//     return(
//         <>
//         <Navbar/>

//         {/* firstpart */}
//         <div className="w-full px-6 py-16 bg-white">
//   <div className="max-w-7xl mx-auto bg-gray-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">

//     {/* LEFT TEXT */}
//     <div className="flex-1">
//       <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
//         Source respondents
//       </span>

//       <h2 className="text-8xl font-bold mt-4">
//         Connect with the right people, quickly and efficiently
//       </h2>

//       <p className="text-gray-600 mt-6 text-md">
//         Launch surveys, reach verified users, and collect high-quality insights in real time. Inputify helps businesses make smarter decisions with fast, reliable, and scalable research solutions.
//       </p>
//     </div>

//     {/* IMAGE */}
//     <div className="flex-1">
//       <img
//         src="/HomeImage/solutions.jpg"
//         className="rounded-xl w-full h-[600px] object-cover"
//       />
//     </div>

//     {/* PURPLE CORNER */}
//     <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-bl-[100px]"></div>

//   </div>
// </div>

// {/* <div className="text-center max-w-3xl mx-auto px-6 py-10">
//   <h2 className="text-3xl font-bold">
//     Unlock important insights from real people
//   </h2>

//   <p className="text-gray-600 mt-4 text-sm">
//     Traditional surveys are slow and costly. The Cint Exchange gives you programmatic
//     access to millions of respondents worldwide, ensuring you get high-quality data fast.
//   </p>

//   <p className="text-purple-600 mt-3 text-sm cursor-pointer">
//     Unlock a new era of research efficiency today.
//   </p>
// </div> */}


// {/* <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">

//   {[
//     { value: "300,000", label: "Surveys answered daily." },
//     { value: "130+", label: "Countries." },
//     { value: "4,600+", label: "Survey panels." },
//   ].map((item, i) => (
//     <div key={i} className="bg-gray-100 p-6 rounded-xl text-center">
//       <h3 className="text-purple-600 text-2xl font-bold">{item.value}</h3>
//       <p className="text-gray-600 text-sm mt-1">{item.label}</p>
//     </div>
//   ))}

// </div> */}


// {/* <div className="flex justify-center gap-10 mt-10 flex-wrap px-6">

//   {[
//     "Survey participants",
//     "Research marketplace",
//     "Data quality",
//     "Global scale",
//   ].map((tab, i) => (
//     <button
//       key={i}
//       className={`px-5 py-2 rounded-full text-sm border 
//       ${i === 0 
//         ? "bg-purple-100 text-purple-600 border-purple-300" 
//         : "bg-white text-gray-600 border-gray-500"
//       }`}
//     >
//       {tab}
//     </button>
//   ))}

// </div> */}

// <div className="max-w-[1300px] rounded-2xl mb-15 mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">

//   {/* LEFT TEXT */}
//   <div>
//     <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
//       Audience Targeting
//     </span>

//     <h2 className="text-5xl font-bold mt-4">
//       Reach the Right Audience Every Time
//     </h2>

//     <p className="text-white mt-4 text-sm">
//       Target users based on demographics, behavior, and custom criteria. Our panel ensures your surveys reach the most relevant audience for accurate and meaningful insights.
//     </p>
//  <p className="text-white mt-4 text-sm">
//   Motivate users with a seamless rewards system including points, wallet, and instant redemption — increasing engagement and survey success.
//  </p>
    
//   </div>

//   {/* IMAGE */}
//   <div>
//     <img
//       src="/HomeImage/solution1.png"
//       className="rounded-xl w-full h-[350px] object-cover"
//     />
//   </div>


// {/* second box */}
// <div className="mt-20">
//     <img
//       src="/HomeImage/solution2.png"
//       className="rounded-xl w-full h-[350px] object-cover"
//     />
// </div>
// <div>
//     <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
//       Survey Distribution
//     </span>

//     <h2 className="text-5xl font-bold mt-4">
//       Launch Surveys at Scale
//     </h2>

//     <p className="text-white mt-4 text-sm">
//       Distribute surveys instantly across a growing panel of active users. Control quotas, manage participation, and scale responses without delays.
//     </p>
//     <p className="text-white mt-4 text-sm">
//   From survey creation to analytics and reporting, CFR provides a complete solution without the need for multiple tools.
//  </p>
//   </div>

// {/* Third box */}
// <div>
//     <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
//       Real-Time Insights
//     </span>

//     <h2 className="text-5xl font-bold mt-4">
//       Get Insights as Responses Come In
//     </h2>

//     <p className="text-white mt-4 text-sm">
//       Track performance live with dashboards showing starts, completes, drop-offs, and engagement — enabling faster decision-making.
//     </p>
//     <p className="text-white mt-4 text-sm">
//       Run large-scale surveys with targeted audiences and deliver insights to clients faster.
//     </p>

//   </div>
// <div className="mt-20">
//     <img
//       src="/HomeImage/solution4.png"
//       className="rounded-xl w-full h-[350px] object-cover"
//     />
// </div>



// </div>
// <Footer/>
// </>
//     )
// }










import Footer from "./Footer";
import Navbar from "./navbar";
import { useEffect, useState, useRef } from "react";
export default function Solutions(){
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrolled1, setScrolled1] = useState(false);
  // useEffect(()=>{
  //   const handleScroll = () =>{
  //     setScrolled(window.scrollY > 50);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);


  // useEffect(()=>{
  //   const handleScroll1 = () =>{
  //     setScrolled1(window.scrollY > 50);
  //   };

  //   window.addEventListener("scroll", handleScroll1);
  //   return () => window.removeEventListener("scroll", handleScroll1);
  // }, []);

  useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const triggerLine = scrollY + window.innerHeight * 0.5; // middle of screen

    // SECTION 1
    if (section1Ref.current) {
      const top = section1Ref.current.offsetTop;
      const bottom = top + section1Ref.current.offsetHeight;

      const inView = triggerLine > top && triggerLine < bottom;

      setScrolled(!inView);
    }

    // SECTION 2
    if (section2Ref.current) {
      const top = section2Ref.current.offsetTop;
      const bottom = top + section2Ref.current.offsetHeight;

      const inView = triggerLine > top && triggerLine < bottom;

      setScrolled1(!inView);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

    return(
        <>
        <Navbar/>

        {/* firstpart */}
        <div className="w-full py-2 pb-10 bg-white flex justify-center transition-all duration-700">

  <div ref={section1Ref}
    className={`
      ${scrolled ? "max-w-7xl rounded-2xl px-8" : "w-full rounded-2xl px-6"}
      transition-all duration-700
      bg-gray-100 p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden
    `}
  >

    {/* LEFT TEXT */}
    <div className="flex-1">
      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
        Source respondents
      </span>

      <h2 className="text-8xl font-bold mt-4">
        Connect with the right people, quickly and efficiently
      </h2>

      <p className="text-gray-600 mt-6 text-md">
        Launch surveys, reach verified users, and collect high-quality insights in real time. Inputify helps businesses make smarter decisions with fast, reliable, and scalable research solutions.
      </p>
    </div>

    {/* IMAGE */}
    <div className="flex-1">
      <img
        src="/HomeImage/solutions.jpg"
        className="rounded-xl w-full h-[600px] object-cover"
      />
    </div>

    {/* PURPLE CORNER */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-bl-[100px]"></div>

  </div>
</div>

{/* <div className="text-center max-w-3xl mx-auto px-6 py-10">
  <h2 className="text-3xl font-bold">
    Unlock important insights from real people
  </h2>

  <p className="text-gray-600 mt-4 text-sm">
    Traditional surveys are slow and costly. The Cint Exchange gives you programmatic
    access to millions of respondents worldwide, ensuring you get high-quality data fast.
  </p>

  <p className="text-purple-600 mt-3 text-sm cursor-pointer">
    Unlock a new era of research efficiency today.
  </p>
</div> */}


{/* <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">

  {[
    { value: "300,000", label: "Surveys answered daily." },
    { value: "130+", label: "Countries." },
    { value: "4,600+", label: "Survey panels." },
  ].map((item, i) => (
    <div key={i} className="bg-gray-100 p-6 rounded-xl text-center">
      <h3 className="text-purple-600 text-2xl font-bold">{item.value}</h3>
      <p className="text-gray-600 text-sm mt-1">{item.label}</p>
    </div>
  ))}

</div> */}


{/* <div className="flex justify-center gap-10 mt-10 flex-wrap px-6">

  {[
    "Survey participants",
    "Research marketplace",
    "Data quality",
    "Global scale",
  ].map((tab, i) => (
    <button
      key={i}
      className={`px-5 py-2 rounded-full text-sm border 
      ${i === 0 
        ? "bg-purple-100 text-purple-600 border-purple-300" 
        : "bg-white text-gray-600 border-gray-500"
      }`}
    >
      {tab}
    </button>
  ))}

</div> */}

{/* <div className="max-w-[1300px] rounded-2xl mb-15 mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white"> */}
<div ref={section2Ref} className={`${scrolled1 ? "w-[1300px] rounded-2xl px-8" : "w-full rounded-2xl px-6"} transition-all duration-700 mb-15 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white
`}
>

  {/* <div
  className={`
    ${scrolled 
      ? "w-[1300px] rounded-2xl px-8"   
      : "w-full rounded-none px-6"}     
    transition-all duration-700 mb-15 mx-auto
    grid grid-cols-1 md:grid-cols-2 gap-10 items-center
    bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white
  `}
></div> */}
  {/* LEFT TEXT */}
  <div>
    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
      Audience Targeting
    </span>

    <h2 className="text-5xl font-bold mt-4">
      Reach the Right Audience Every Time
    </h2>

    <p className="text-white mt-4 text-sm">
      Target users based on demographics, behavior, and custom criteria. Our panel ensures your surveys reach the most relevant audience for accurate and meaningful insights.
    </p>
 <p className="text-white mt-4 text-sm">
  Motivate users with a seamless rewards system including points, wallet, and instant redemption — increasing engagement and survey success.
 </p>
    
  </div>

  {/* IMAGE */}
  <div>
    <img
      src="/HomeImage/solution1.png"
      className="rounded-xl w-full h-[350px] object-cover"
    />
  </div>


{/* second box */}
<div className="mt-20">
    <img
      src="/HomeImage/solution2.png"
      className="rounded-xl w-full h-[350px] object-cover"
    />
</div>
<div>
    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
      Survey Distribution
    </span>

    <h2 className="text-5xl font-bold mt-4">
      Launch Surveys at Scale
    </h2>

    <p className="text-white mt-4 text-sm">
      Distribute surveys instantly across a growing panel of active users. Control quotas, manage participation, and scale responses without delays.
    </p>
    <p className="text-white mt-4 text-sm">
  From survey creation to analytics and reporting, CFR provides a complete solution without the need for multiple tools.
 </p>
  </div>

{/* Third box */}
<div>
    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
      Real-Time Insights
    </span>

    <h2 className="text-5xl font-bold mt-4">
      Get Insights as Responses Come In
    </h2>

    <p className="text-white mt-4 text-sm">
      Track performance live with dashboards showing starts, completes, drop-offs, and engagement — enabling faster decision-making.
    </p>
    <p className="text-white mt-4 text-sm">
      Run large-scale surveys with targeted audiences and deliver insights to clients faster.
    </p>

  </div>
<div className="mt-20">
    <img
      src="/HomeImage/solution4.png"
      className="rounded-xl w-full h-[350px] object-cover"
    />
</div>



</div>
<Footer/>
</>
    )
}