import Footer from "./Footer";
import Navbar from "./Navbar";
import {  useEffect, useState, useRef } from "react";
export default function Products(){
const [active, setActive] = useState(0);
const section1Ref = useRef(null);
const [scrolled, setScrolled] = useState(false);
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

   
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const tabs = [
    {
      name: "Survey Management System",
      title: "Build & Launch Surveys in Minutes",
      desc1:
        "Create custom surveys with flexible question types, Logic-based flows (skip logic, branching), Multi-language support, Mobile-optimized surveys",
      image: "/HomeImage/surveymanagement.png",
    },
    {
      name: "Audience & Panel Management",
      title: "Reach the Right Audience",
      desc1:
        "Access a verified user panel, Target users by demographics (age, gender, location), Control quotas & participation limits, Real-time participant tracking",
      image: "/HomeImage/admininputify.PNG",
    },
    {
      name: "Real-Time Analytics & Reports",
      title: "Turn Responses into Insights",
      desc1:
        "Live dashboards with response tracking, Advanced reports (completion rate, IR, drop-offs), Data visualization (charts, graphs), Export reports instantly",
      image: "/HomeImage/inputify4.PNG",
    },
    {
      name: "Reward & Wallet System",
      title: "Built-in Rewards System",
      desc1:
        "Points-based earning system for users, Wallet & redemption (gift cards, cash), Automated reward distribution, Fraud detection & validation",
      desc2:
        "Expand your research without limits.",
      image: "/HomeImage/inputify3.PNG",
    },
  ];


    return(
        <>
        <Navbar/>
        
                {/* firstpart */}
                <div className="w-full px-6 py-10 bg-white">
          {/* <div className="max-w-7xl mx-auto bg-gray-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"> */}
        <div
    className="max-w-7xl mx-auto bg-gray-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
  >

            {/* LEFT TEXT */}
            <div className="flex-1">
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                Product
              </span>
        
              <h2 className="text-6xl lg:text-8xl font-bold mt-4">
                Powerful Market Research Platform for Smarter Decisions
              </h2>
        
              <p className="text-gray-600 mt-6 text-md">
                Create surveys, reach targeted audiences, and get real-time insights — all in one place.
              </p>
            </div>
        
            {/* IMAGE */}
            <div className="flex-1">
              <img
                src="/HomeImage/product.png"
                className="rounded-xl w-full h-[400px] lg:h-[600px] object-cover"
              />
            </div>
        
            {/* PURPLE CORNER */}
            <div className="absolute top-0 right-0 w-25 h-20 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-bl-[100px]"></div>
        
          </div>
        </div>

{/* Second card */}
      <div className="w-full px-6 py-16 bg-white">

  <div className="max-w-7xl mx-auto">

    {/* 🔥 TABS CONTAINER */}
    <div className="flex justify-center mb-16">
      <div className="flex gap-2 bg-white border-b border-blue-500 rounded-full p-5">

        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-2 py-1 lg:px-6 lg:py-2 rounded-full text-[13px] lg:text-[20px] transition
              ${
                active === i
                  ? "border-2 border-dashed border-purple-500 text-purple-600 bg-purple-50"
                  : "text-gray-600"
              }`}
          >
            {tab.name}
          </button>
        ))}

      </div>
    </div>

    {/* 🔥 CONTENT SECTION */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

      {/* LEFT TEXT */}
      <div>

        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
          {tabs[active].name}
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight text-gray-900">
          {tabs[active].title}
        </h2>

        <p className="text-gray-600 mt-6 text-sm leading-relaxed">
          {tabs[active].desc1}
        </p>

        <p className="text-gray-600 mt-4 text-sm leading-relaxed">
          {tabs[active].desc2}
        </p>

      
      </div>

      {/* RIGHT IMAGE */}
      <div>
        <img
          src={tabs[active].image}
          className="w-full h-[450px] object-contain rounded-xl"
        />
      </div>

    </div>

  </div>
</div>

<Footer/>
        </>
    )
}