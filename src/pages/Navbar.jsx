import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Menu, X } from "lucide-react";
export default function Navbar(){
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const menuItems = [
  { name: "Why CFR?", path: "/why-cfr" },
  { name: "Solutions", path: "/solutions" },
  { name: "Products", path: "/products" },
  { name: "Company", path: "/company" },
];
    return(
         <header className="w-full flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        
        {/* Logo */}
        <img
          src="/HomeImage/inputify.png"
          alt="CFR"
          className="w-30 lg:w-40 cursor-pointer relative left-3 lg:left-10"
          onClick={() => navigate("/")}
        />

        {/* Menu */}
       <nav className="hidden md:flex items-center gap-8 bg-gray-100 px-10 py-5 rounded-full shadow-sm">
        
        {menuItems.map((item, i) => (
    <div
      key={i}
      onClick={() => navigate(item.path)}
      className="flex items-center gap-1 cursor-pointer text-black-700 hover:text-purple-700 transition"
    >
      <span>{item.name}</span>
      <ChevronDown size={16} />
    </div>
  ))}
      </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="hidden sm:block px-5 py-2 border rounded-full hover:bg-gray-100"
          >
            Login
          </button>

          <button
             onClick={() => navigate("/register")}
            className="px-5 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800"
          >
            Demo
          </button>
        </div>
         {/* 🍔 MOBILE BUTTON */}
      <div className="md:hidden">
        <Menu onClick={() => setOpen(true)} className="cursor-pointer" />
      </div>

 
    {/* OVERLAY */}
<div
  className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
    open ? "opacity-100 visible" : "opacity-0 invisible"
  }`}
  onClick={() => setOpen(false)}
/>

{/* SIDEBAR */}
<div
  className={`fixed top-0 left-0 h-screen w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
    open ? "translate-x-0" : "-translate-x-full"
  }`}
>

  {/* HEADER */}
  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-400">
    <span className="text-lg font-semibold">Menu</span>
    <X onClick={() => setOpen(false)} className="cursor-pointer" />
  </div>

  {/* MENU ITEMS */}
  <div className="flex flex-col px-6 py-6 gap-6">

    {menuItems.map((item, i) => (
      <div
        key={i}
        onClick={() => {
          navigate(item.path);
          setOpen(false);
        }}
        className="text-lg font-medium cursor-pointer hover:text-purple-600 transition"
      >
        {item.name}
      </div>
    ))}

    {/* BUTTONS */}
    <div className="mt-6 flex flex-col gap-4">

      <button
        onClick={() => navigate("/login")}
        className="w-full py-2 border border-blue-500 rounded-full"
      >
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
        className="w-full py-2 bg-purple-700 border border-white-200 text-white rounded-full"
      >
        Demo
      </button>

    </div>

  </div>
</div>
      </header>

    )
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Menu, X, ChevronDown } from "lucide-react";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const menuItems = [
//     { name: "Why CFR?", path: "/why-cfr" },
//     { name: "Solutions", path: "/solutions" },
//     { name: "Products", path: "/products" },
//     { name: "Company", path: "/company" },
//   ];

//   return (
//     <header className="w-full flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">

//       {/* LOGO */}
//       <img
//         src="/HomeImage/cfr.png"
//         alt="CFR"
//         className="w-24 cursor-pointer"
//         onClick={() => navigate("/")}
//       />

//       {/* DESKTOP MENU */}
//       <nav className="hidden md:flex items-center gap-8 bg-gray-100 px-10 py-5 rounded-full shadow-sm">
//         {menuItems.map((item, i) => (
//           <div
//             key={i}
//             onClick={() => navigate(item.path)}
//             className= "w-30 cursor-pointer relative left-10 flex items-center gap-1 cursor-pointer hover:text-purple-700 transition"
//           >
//             <span>{item.name}</span>
//             <ChevronDown size={16} />
//           </div>
//         ))}
//       </nav>

//       {/* RIGHT BUTTONS (DESKTOP) */}
//       <div className="hidden md:flex items-center gap-4">
//         <button
//           onClick={() => navigate("/login")}
//           className="px-5 py-2 border rounded-full hover:bg-gray-100"
//         >
//           Login
//         </button>

//         <button
//           onClick={() => navigate("/register")}
//           className="px-5 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800"
//         >
//           Demo
//         </button>
//       </div>

//       {/* 🍔 MOBILE MENU BUTTON */}
//       <div className="md:hidden">
//         {open ? (
//           <X onClick={() => setOpen(false)} className="cursor-pointer" />
//         ) : (
//           <Menu onClick={() => setOpen(true)} className="cursor-pointer" />
//         )}
//       </div>

//       {/* 📱 MOBILE DROPDOWN */}
//       {open && (
//         <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 md:hidden">

//           {menuItems.map((item, i) => (
//             <div
//               key={i}
//               onClick={() => {
//                 navigate(item.path);
//                 setOpen(false);
//               }}
//               className="cursor-pointer hover:text-purple-600"
//             >
//               {item.name}
//             </div>
//           ))}

//           <button
//             onClick={() => navigate("/login")}
//             className="px-5 py-2 border rounded-full"
//           >
//             Login
//           </button>

//           <button
//             onClick={() => navigate("/register")}
//             className="px-5 py-2 bg-purple-700 text-white rounded-full"
//           >
//             Demo
//           </button>

//         </div>
//       )}
//     </header>
//   );
// }


