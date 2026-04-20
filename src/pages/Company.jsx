// import Footer from "./Footer";
// import Navbar from "./navbar";

// export default function Company(){
//     return(
//         <>
//         <Navbar/>
        //   <div className="w-full px-6 py-16 bg-white">
        //   <div className="max-w-7xl mx-auto bg-gray-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        
        //     {/* LEFT TEXT */}
        //     <div className="flex-1">
        //       <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
        //        About CFR
        //       </span>
        
        //       <h2 className="text-6xl lg:text-8xl font-bold mt-4">
        //        Building the Future of Market Research
        //       </h2>
        
        //       <p className="text-gray-600 mt-6 text-md">
        //         We connect businesses with real people to deliver fast, reliable, and actionable insights through a powerful research platform.
        //       </p>
        //     </div>
        
        //     {/* IMAGE */}
        //     <div className="flex-1">
        //       <img
        //         src="/HomeImage/product.png"
        //         className="rounded-xl w-full h-[600px] object-cover"
        //       />
        //     </div>
        
        //     {/* PURPLE CORNER */}
        //     <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-bl-[100px]"></div>
        
        //   </div>
        // </div>
        
//         <div className="w-full px-6 py-16 bg-white">
//           <div className="max-w-7xl mx-auto bg-gray-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
           
//             {/* LEFT TEXT */}
//             <div className="flex-1">
//               <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
//                 Our Story
//               </span>
        
//               <h2 className="text-3xl lg:text-2xl font-bold mt-4">
//                 Building the Future of Market Research
//               </h2>
        
//               <p className="text-gray-600 mt-6 text-md">
//                 CFR was built with a simple mission — to make market research faster, smarter, and more accessible.
//               </p>
//               <p className="text-gray-600 mt-6 text-md">
//                 Traditional research methods are slow, expensive, and often unreliable. We created a platform that connects businesses directly with a verified panel of users, enabling real-time data collection and better decision-making.
//               </p>
//               <p className="text-gray-600 mt-6 text-md">Today, we continue to innovate by combining technology, data intelligence, and user engagement to redefine how insights are gathered.</p>
//               <h2 className="text-3xl lg:text-2xl font-bold mt-4">
//                 Our Mission And Vision
//               </h2>
//               <p className="text-gray-600 mt-6 text-md">
//                 To empower businesses with accurate, real-time insights by connecting them to the right audience through a seamless and intelligent research platform.
//               </p>
//               <p className="text-gray-600 mt-6 text-md">
//                 To become a global leader in market research by building the most trusted and scalable platform for data-driven decision-making.
//               </p>
//             </div>
        
//             {/* IMAGE */}
//             <div className="flex-1">
//               <img
//                 src="/HomeImage/product.png"
//                 className="rounded-xl w-full h-[600px] object-cover"
//               />
//             </div>
        
//           </div>
//         </div>
//         <Footer/>
//         </>
//     )
// }

import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
export default function Company() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      {/* 🔥 HERO */}
                <div className="w-full px-6 py-16 bg-white">
          <div className="max-w-7xl mx-auto bg-gray-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        
            {/* LEFT TEXT */}
            <div className="flex-1">
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
               About CFR
              </span>
        
              <h2 className="text-6xl lg:text-8xl lg:text-8xl font-bold mt-4">
               Building the Future of Market Research
              </h2>
        
              <p className="text-gray-600 mt-6 text-md">
                We connect businesses with real people to deliver fast, reliable, and actionable insights through a powerful research platform.
              </p>
            </div>
        
            {/* IMAGE */}
            <div className="flex-1">
              <img
                src="/HomeImage/company.png"
                className="rounded-xl w-full h-[400px] lg:h-[600px] object-cover"
              />
            </div>
        
            {/* PURPLE CORNER */}
            <div className="absolute top-0 right-0 w-25 h-25 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-bl-[100px]"></div>
        
          </div>
        </div>

      {/* 🟡 OUR STORY */}
      <section className="w-full px-6 py-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">

  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
    Our Story
  </h2>

  {/* SCROLL CONTAINER */}
  <div className="overflow-x-auto scrollbar-hide">
    
    <div className="flex gap-10 min-w-[900px] px-4">

      {[
        {
          title: "The Beginning",
          desc: "CFR was built with a simple mission — to make market research faster, smarter, and more accessible.",
        },
        {
          title: "The Problem",
          desc: "Traditional research methods are slow, expensive, and often unreliable.",
        },
        {
          title: "Our Solution",
          desc: "We created a platform that connects businesses directly with a verified panel of users, enabling real-time data collection and better decision-making.",
        },
        {
          title: "Today",
          desc: "We continue to innovate by combining technology, data intelligence, and user engagement to redefine how insights are gathered.",
        },
        
      ].map((item, i) => (
        <div key={i} className="relative min-w-[250px]">

          {/* LINE */}
          <div className="absolute top-4 left-0 w-full h-[2px] bg-purple-200"></div>

          {/* DOT */}
          <div className="w-6 h-6 bg-purple-600 rounded-full border-4 border-white shadow relative z-10"></div>

          {/* CARD */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>

        </div>
      ))}

    </div>

  </div>

</section>
      
    

<section className="w-full px-6 py-24 bg-white">

  {/* 🔥 BOX CONTAINER */}
  

    {/* HEADING */}
    <h2 className="text-4xl md:text-7xl font-bold mb-10 text-center text-indigo-600">
      Global Reach, Real Insights
    </h2>

    <p className="text-gray-600 max-w-9xl mx-auto text-center">
      We connect businesses with users across the world — delivering insights from real people in real time.
    </p>

    {/* CARDS
    <div className="grid md:grid-cols-2 gap-8">

      <FlipCard
        title="Mission"
        content="To empower businesses with accurate, real-time insights by connecting them to the right audience through a seamless and intelligent research platform."
      />

      <FlipCard
        title="Vision"
        content="To become a global leader in market research by building the most trusted and scalable platform for data-driven decision-making."
      />

    </div> */}
    <section className="w-full px-6 py-10 text-center">

  {/* TITLE */}
  

  
  {/* MAP CONTAINER */}
  <div className="relative max-w-7xl mx-auto">

  {/* MAP */}
  <img
    src="/HomeImage/worldmap.png"
    className="w-full opacity-80"
  />

  {/* 🇨🇦 CANADA */}
  <Pin top="15%" left="15%" label="Canada" color="bg-blue-500" />

  {/* 🇺🇸 France */}
  <Pin top="20%" left="47%" label="France" color="bg-indigo-500" />

  {/* 🇲🇽 MEXICO */}
  <Pin top="35%" left="19%" label="Mexico" color="bg-red-500" />

  {/* 🇧🇷 BRAZIL */}
  <Pin top="55%" left="32%" label="Brazil" color="bg-pink-500" />

  {/* 🇩🇪 GERMANY */}
  <Pin top="20%" left="49%" label="Germany" color="bg-blue-600" />

  {/* 🇫🇷 USA */}
  <Pin top="10%" left="5%" label="USA" color="bg-indigo-600" />

</div>
</section>

    {/* CTA */}
    {/* <div className="mt-16 flex justify-center gap-4">

      <button onClick={() => navigate("/register")} className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:scale-105 transition">
        Get Started
      </button>

      <button onClick={() => window.open("https://wa.me/7506966099", "_blank")} className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition">
        Contact Us
      </button>

    </div> */}

</section>

<section className="w-full px-6 py-5 bg-white">

  <div className="max-w-8xl mx-auto bg-gray-100 rounded-3xl p-10 md:p-14">

    {/* HEADING */}
    <h2 className="text-4xl font-bold text-purple-600 mb-10">
      Contacts
    </h2>

    {/* GRID */}
    <div className="grid md:grid-cols-2 gap-10">

      {/* LEFT */}
      <div className="space-y-8">

        <div>
          <h3 className="font-semibold text-lg">
            For inquiries about Panel
          </h3>
          <p className="text-gray-700 mt-1">
            infoinputify@gmail.com
          </p>
        </div>

        {/* <div>
          <h3 className="font-semibold text-lg">
            For PR inquiries & media opps (Sweden only)
          </h3>
          <p className="text-gray-700 mt-1">
            social@competentfieldwork.com
          </p>
        </div> */}

      </div>

      {/* RIGHT */}
      <div className="space-y-8">

        <div>
          <h3 className="font-semibold text-lg">
            For all other inquiries
          </h3>
          <p className="text-gray-700 mt-1">
           social@competentfieldwork.com
          </p>
        </div>

        {/* <div>
          <h3 className="font-semibold text-lg">
            Investor relations
          </h3>
          <p className="text-gray-700 mt-1">
            patrik.linzenbold@cint.com
          </p>
        </div> */}

      </div>

    </div>

  </div>

</section>
      <Footer />
    </>
  );
}




function FlipCard({ title, content }) {
  return (
    
    <div className="group h-[250px] perspective">

      <div className="relative w-full h-full duration-700 preserve-3d group-hover:rotate-y-180">

        {/* FRONT */}
        {/* <div className="absolute w-full h-full bg-white p-8 rounded-2xl border border-gray-400 flex items-center justify-center backface-hidden">
          <h3 className="text-xl font-semibold">{title}</h3>
        </div> */}

         <div className="absolute w-full h-full rounded-2xl bg-white text-Purple flex flex-col items-center justify-center gap-3 shadow-xl backface-hidden">

        
          <h3 className="text-3xl md:text-4xl font-semibold text-black">{title}</h3>

        </div>

        {/* BACK */}
        <div className="absolute w-full h-full bg-purple-600 text-white p-8 rounded-2xl flex items-center justify-center rotate-y-180 backface-hidden">
          <p className="text-center">{content}</p>
        </div>

      </div>

    </div>
  );
}


function Pin({ top, left, label, color }) {
  return (
    <div
      className="absolute group"
      style={{ top: top, left: left }}
    >
      <div className={`w-4 h-4 ${color} rounded-full animate-ping absolute`}></div>
      <div className={`w-4 h-4 ${color} rounded-full relative`}></div>

      <span className="opacity-0 group-hover:opacity-100 transition absolute top-6 left-[-30px] bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}