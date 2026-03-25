// import { Outlet, NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Wallet,
//   ClipboardList,
//   FileText,
//   Gift,
//   LogOut,
//   Bell,
//   Settings,
//   Search,
//   ChevronLeft,
//   ChevronRight,
  
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import api from "../services/api";
// import { getUserInitials } from "../utils/auth";

// const menu = [
//   { label: "Dashboard", icon: LayoutDashboard, to: "/user/dashboard" },
//   { label: "Survey", icon: ClipboardList, to: "/user/dashboard/surveys" },
//   { label: "Wallet", icon: Wallet, to: "/user/dashboard/wallet" },
//   { label: "Report", icon: FileText, to: "/user/dashboard/report" },
//   { label: "Refer & Earn", icon: Gift, to: "/user/dashboard/refer" },
  
// ];

// export default function UserDashboardLayout() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     api.get("/auth/me").then(res => setUser(res.data));
//   }, []);

//   const initials = getUserInitials();

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
//       {/* ================= SIDEBAR ================= */}
//       <aside
//         className={`bg-white border-r border-gray-300 transition-all duration-300 flex flex-col
//         ${collapsed ? "w-20" : "w-64"}`}
//       >
//         {/* LOGO */}
//         <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300">
//           <div className="flex items-center gap-3">
//             <div
//               className={`rounded-lg overflow-hidden transition-all
//               ${collapsed ? "w-8 h-8" : "w-12 h-12"}`}
//             >
//               <img
//                 src="/HomeImage/cfr.png"
//                 alt="CFR"
//                 className="w-full h-full object-contain"
//               />
//             </div>
//             {!collapsed && <span className="font-semibold">Survey Panel</span>}
//           </div>

//           <button onClick={() => setCollapsed(!collapsed)}>
//             {collapsed ? <ChevronRight /> : <ChevronLeft />}
//           </button>
//         </div>

//         {/* MENU */}
//         <nav className="flex-1 px-3 py-4 space-y-2">
//           {menu.map(item => (
//             <NavLink
//               key={item.label}
//               to={item.to}
//               end
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md transition
//                 ${
//                   isActive
//                     ? "bg-[#3cb99e] text-white"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <item.icon size={20} />
//               {!collapsed && <span>{item.label}</span>}
//             </NavLink>
//           ))}
//         </nav>

//         {/* LOGOUT */}
//         <div className="px-3 py-4 border-t">
//           <button className="flex items-center gap-3 text-gray-600 hover:text-red-500 w-full px-3 py-2">
//             <LogOut size={20} />
//             {!collapsed && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* ================= MAIN ================= */}
//       <div className="flex-1">
//         {/* TOP BAR */}
//         <div className="flex justify-between items-center px-6 py-5 bg-white border-b border-gray-300">
//           <div>
//             <h1 className="text-lg font-semibold">
//               Welcome,{" "}
//               <span className="text-[#1bbdac]">
//                 {user?.name || "User"}
//               </span>
//             </h1>
//             <p className="text-xs text-gray-500">
//               Here’s your survey dashboard
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
//               <input
//                 placeholder="Search..."
//                 className="pl-8 pr-3 py-1.5 border rounded text-sm"
//               />
//             </div>

//             <Bell size={18} />
//             <Settings size={18} />

//             <div className="w-9 h-9 bg-[#1bbdac] text-white rounded-full flex items-center justify-center font-semibold text-sm">
//               {initials}
//             </div>
//           </div>
//         </div>

//         {/* PAGE CONTENT */}
//         <main className="p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// import { Outlet, NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Wallet,
//   FileText,
//   ClipboardList,
//   Gift,
//   User,
//   Shield,
//   File,
//   LogOut,
//   Bell,
//   Settings,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   Store,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import api from "../services/api";
// import { getUserInitials } from "../utils/auth";

// const mainMenu = [
//   { label: "Dashboard", icon: LayoutDashboard, to: "/user/dashboard" },
//   { label: "Wallet", icon: Wallet, to: "/user/dashboard/wallet" },
//   {label:"Store", icon:Store, to:"/user/dashboard/store"},
//   { label: "Report", icon: FileText, to: "/user/dashboard/report" },
//   { label: "Surveys", icon: ClipboardList, to: "/user/dashboard/surveys" },
//   { label: "Refer & Earn", icon: Gift, to: "/user/dashboard/refer" },
// ];

// const bottomMenu = [
//   { label: "Profile", icon: User, to: "/user/dashboard/profile" },
//   { label: "Terms & Conditions", icon: File, to: "/user/dashboard/termcon" },
//   { label: "Privacy Policy", icon: Shield, to: "/user/dashboard/privacy" },
// ];

// export default function UserDashboardLayout() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     api.get("/auth/me").then((res) => setUser(res.data));
//   }, []);

//   const initials = getUserInitials();

//   return (
//     <div className="h-screen bg-gradient-to-br from-white-50">
//       {/* ================= SIDEBAR ================= */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-screen bg-[#f7f7f7] border-r border-gray-300
//           flex flex-col transition-all duration-300 z-50
//           ${collapsed ? "w-20" : "w-64"}
//           overflow-hidden
//         `}
//       >
//         {/* LOGO */}
//         <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300">
//           <div className="flex items-center gap-3">
//             <div
//               className={`rounded-lg overflow-hidden transition-all
//               ${collapsed ? "w-8 h-8" : "w-12 h-12"}`}
//             >
//               <img
//                 src="/HomeImage/cfr.png"
//                 alt="CFR"
//                 className="w-full h-full object-contain"
//               />
//             </div>
//             {!collapsed && (
//               <span className="font-semibold text-lg">Survey Panel</span>
//             )}
//           </div>

//           <button onClick={() => setCollapsed(!collapsed)}>
//             {collapsed ? <ChevronRight /> : <ChevronLeft />}
//           </button>
//         </div>

//         {/* MENU */}
//         <nav className="flex-1 px-3 py-4 space-y-1 ">
//           {mainMenu.map((item) => (
//             <NavLink
//               key={item.label}
//               to={item.to}
//               end
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg transition hover:shadow-xl transaction-all duration-300 hover:-translate-y-1 cursor pointer
//                 ${
//                   isActive
//                     ? "bg-orange-50 text-orange-600 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <item.icon size={20} />
//               {!collapsed && <span>{item.label}</span>}
//             </NavLink>
//           ))}
//         </nav>

//         {/* BOTTOM MENU */}
//         <div className="px-3 py-4 border-t border-gray-300 space-y-1">
//           {bottomMenu.map((item) => (
//             <NavLink
//               key={item.label}
//               to={item.to}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg transition
//                 ${
//                   isActive
//                     ? "bg-emerald-50 text-emerald-600 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <item.icon size={20} />
//               {!collapsed && <span>{item.label}</span>}
//             </NavLink>
//           ))}

//           <button className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-red-500 rounded-lg">
//             <LogOut size={20} />
//             {!collapsed && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* ================= MAIN ================= */}
//       <div
//         className={`h-screen transition-all duration-300
//         ${collapsed ? "ml-20" : "ml-64"}
//         flex flex-col`}
//       >
//         {/* TOP BAR */}
//         <div className="flex justify-between items-center px-1 py-3 xl:px-6 xl:py-5 bg-white border-b border-gray-300">
//           <div>
//             <h1 className="text-lg font-semibold">
//               Welcome,{" "}
//               <span className="text-orange-400">
//                 {user?.name || "User"}
//               </span>
//             </h1>
//             <p className="text-xs text-gray-500">
//               Here’s your survey dashboard
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Search
//                 size={14}
//                 className="absolute left-3 top-2.5 text-gray-400"
//               />
//               <input
//                 placeholder="Search..."
//                 className="pl-8 pr-3 py-1.5 border rounded text-sm"
//               />
//             </div>

//             <Bell size={18} />
//             <Settings size={18} />

//             <div className="w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
//               {initials}
//             </div>
//           </div>
//         </div>

//         {/* PAGE CONTENT (SCROLLS) */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }




// import { Outlet, NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Wallet,
//   FileText,
//   ClipboardList,
//   Gift,
//   User,
//   Shield,
//   File,
//   LogOut,
//   Bell,
//   Settings,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   Store,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import api from "../services/api";
// import { getUserInitials } from "../utils/auth";

// /* ================= MENU ================= */

// const mainMenu = [
//   { label: "Dashboard", icon: LayoutDashboard, to: "/user/dashboard" },
//   { label: "Wallet", icon: Wallet, to: "/user/dashboard/wallet" },
//   { label: "Store", icon: Store, to: "/user/dashboard/store" },
//   { label: "Report", icon: FileText, to: "/user/dashboard/report" },
//   { label: "Surveys", icon: ClipboardList, to: "/user/dashboard/surveys" },
//   { label: "Refer & Earn", icon: Gift, to: "/user/dashboard/refer" },
// ];

// const bottomMenu = [
//   { label: "Profile", icon: User, to: "/user/dashboard/profile" },
//   { label: "Terms & Conditions", icon: File, to: "/user/dashboard/termcon" },
//   { label: "Privacy Policy", icon: Shield, to: "/user/dashboard/privacy" },
// ];

// /* ================= LAYOUT ================= */

// export default function UserDashboardLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     api.get("/auth/me").then((res) => setUser(res.data));
//   }, []);

//   const initials = getUserInitials();

//   return (
//     <div className="h-screen bg-[#F7F9FB] relative overflow-hidden">
//       {/* ================= SIDEBAR ================= */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-screen w-64
//           bg-[#f7f7f7]
//           border-r border-gray-300
//           flex flex-col
//           transition-transform duration-300
//           z-50
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         {/* LOGO */}
//         <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-lg overflow-hidden">
//               <img
//                 src="/HomeImage/cfr.png"
//                 alt="CFR"
//                 className="w-full h-full object-contain"
//               />
//             </div>
//             <span className="font-semibold text-lg">Survey Panel</span>
//           </div>

//          <button
//   onClick={() => setSidebarOpen(false)}
//   className="p-2 rounded-lg hover:bg-gray-200 transition"
// >
//   <ChevronLeft size={20} />
// </button>

//         </div>

//         {/* MENU */}
//         <nav className="flex-1 px-3 py-4 space-y-1">
//           {mainMenu.map((item) => (
//             <NavLink
//               key={item.label}
//               to={item.to}
//               end
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg transition
//                 ${
//                   isActive
//                     ? "bg-orange-50 text-orange-600 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <item.icon size={20} />
//               <span>{item.label}</span>
//             </NavLink>
//           ))}
//         </nav>

//         {/* BOTTOM MENU */}
//         <div className="px-3 py-4 border-t border-gray-300 space-y-1">
//           {bottomMenu.map((item) => (
//             <NavLink
//               key={item.label}
//               to={item.to}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg transition
//                 ${
//                   isActive
//                     ? "bg-emerald-50 text-emerald-600 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <item.icon size={20} />
//               <span>{item.label}</span>
//             </NavLink>
//           ))}

//           <button className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-red-500 rounded-lg">
//             <LogOut size={20} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* ================= OVERLAY ================= */}
//       {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black/30 z-40"
//         />
//       )}

//       {/* ================= MAIN ================= */}
//       <div className="h-screen flex flex-col relative z-10">
//         {/* TOP BAR */}
//         <div className="flex justify-between items-center px-4 py-4 bg-white border-b border-gray-300">
//           <div className="flex items-center gap-3">
//            {!sidebarOpen && (
//   <button
//     onClick={() => setSidebarOpen(true)}
//     className="p-2 rounded-lg hover:bg-gray-200 transition"
//   >
//     <ChevronRight size={20} />
//   </button>
// )}


//             <div>
//               <h1 className="text-lg font-semibold">
//                 Welcome,{" "}
//                 <span className="text-orange-400">
//                   {user?.name || "User"}
//                 </span>
//               </h1>
//               <p className="text-xs text-gray-500">
//                 Here’s your survey dashboard
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Search
//                 size={14}
//                 className="absolute left-3 top-2.5 text-gray-400"
//               />
//               <input
//                 placeholder="Search..."
//                 className="pl-8 pr-3 py-1.5 border rounded text-sm"
//               />
//             </div>

//             <Bell size={18} />
//             <Settings size={18} />

//             <div className="w-9 h-9 bg-orange-400 text-white rounded-full flex items-center justify-center font-semibold text-sm">
//               {initials}
//             </div>
//           </div>
//         </div>

//         {/* PAGE CONTENT */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }







// import { Outlet, NavLink } from "react-router-dom";
// import {
//   LayoutDashboard, Wallet, FileText, ClipboardList, Gift, User,
//   Shield, File, LogOut, Bell, Settings, Search, ChevronLeft,
//   ChevronRight, Store, Menu
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import api from "../services/api";
// import { getUserInitials } from "../utils/auth";

// const mainMenu = [
//   { label: "Dashboard", icon: LayoutDashboard, to: "/user/dashboard" },
//   { label: "Wallet", icon: Wallet, to: "/user/dashboard/wallet" },
//   { label: "Store", icon: Store, to: "/user/dashboard/store" },
//   { label: "Report", icon: FileText, to: "/user/dashboard/report" },
//   { label: "Surveys", icon: ClipboardList, to: "/user/dashboard/surveys" },
//   { label: "Refer & Earn", icon: Gift, to: "/user/dashboard/refer" },
// ];

// const bottomMenu = [
//   { label: "Profile", icon: User, to: "/user/dashboard/profile" },
//   { label: "Terms & Conditions", icon: File, to: "/user/dashboard/termcon" },
//   { label: "Privacy Policy", icon: Shield, to: "/user/dashboard/privacy" },
// ];

// export default function UserDashboardLayout() {
//   const [isExpanded, setIsExpanded] = useState(true); // Desktop: Mini vs Full
//   const [mobileOpen, setMobileOpen] = useState(false); // Mobile: Drawer Open/Close
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     api.get("/auth/me").then((res) => setUser(res.data));
//   }, []);

//   const initials = getUserInitials();

//   return (
//     <div className="h-screen bg-[#F7F9FB] flex overflow-hidden">
      
//       {/* ================= SIDEBAR ================= */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-50 bg-[#f7f7f7] border-r border-gray-300 transition-all duration-300 flex flex-col
//           ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"}
//           ${isExpanded ? "lg:w-64" : "lg:w-20"}
//         `}
//       >
//         {/* LOGO AREA */}
//         <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300 h-[73px]">
//           <div className="flex items-center gap-3 overflow-hidden">
//             <div className="min-w-[40px] w-10 h-10 rounded-lg overflow-hidden shrink-0">
//               <img src="/HomeImage/cfr.png" alt="CFR" className="w-full h-full object-contain" />
//             </div>
//             {isExpanded && <span className="font-semibold text-lg truncate transition-opacity duration-300">Survey Panel</span>}
//           </div>
          
//           {/* Desktop Toggle Button */}
//           <button 
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-200 transition text-gray-500"
//           >
//             {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
//           </button>
//         </div>

//         {/* NAVIGATION */}
//         <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
//           {mainMenu.map((item) => (
//             <NavLink
//               key={item.label}
//               to={item.to}
//               end
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
//                 ${isActive ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700 hover:bg-gray-100"}`
//               }
//             >
//               <item.icon size={22} className="shrink-0" />
//               <span className={`transition-all duration-300 whitespace-nowrap ${isExpanded ? "opacity-100" : "lg:opacity-0 lg:w-0"}`}>
//                 {item.label}
//               </span>
//               {/* Tooltip for mini sidebar */}
//               {!isExpanded && (
//                 <div className="absolute left-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity hidden lg:block z-50">
//                   {item.label}
//                 </div>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* BOTTOM MENU */}
//         <div className="px-3 py-4 border-t border-gray-300 space-y-2">
//           {bottomMenu.map((item) => (
//             <NavLink
//               key={item.label}
//               to={item.to}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
//                 ${isActive ? "bg-emerald-50 text-emerald-600 font-medium" : "text-gray-700 hover:bg-gray-100"}`
//               }
//             >
//               <item.icon size={22} className="shrink-0" />
//               <span className={`transition-all duration-300 whitespace-nowrap ${isExpanded ? "opacity-100" : "lg:opacity-0 lg:w-0"}`}>
//                 {item.label}
//               </span>
//             </NavLink>
//           ))}
//           <button className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:text-red-500 rounded-lg w-full">
//             <LogOut size={22} className="shrink-0" />
//             <span className={`transition-all duration-300 whitespace-nowrap ${isExpanded ? "opacity-100" : "lg:opacity-0 lg:w-0"}`}>
//               Logout
//             </span>
//           </button>
//         </div>
//       </aside>

//       {/* ================= MOBILE OVERLAY ================= */}
//       {mobileOpen && (
//         <div 
//           onClick={() => setMobileOpen(false)} 
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden" 
//         />
//       )}

//       {/* ================= MAIN CONTENT AREA ================= */}
//       <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isExpanded ? "lg:ml-64" : "lg:ml-20"}`}>
        
//         {/* TOP BAR */}
//         <header className="h-[73px] flex justify-between items-center px-6 bg-white border-b border-gray-300 shrink-0">
//           <div className="flex items-center gap-4">
//             {/* Mobile Hamburger Menu */}
//             <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
//               <Menu size={20} />
//             </button>
            
//             <div className="hidden sm:block">
//               <h1 className="text-lg font-semibold leading-none">
//                 Welcome, <span className="text-orange-400">{user?.name || "User"}</span>
//               </h1>
//               <p className="text-[11px] text-gray-500 mt-1">Here’s your survey dashboard</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 md:gap-6">
//             <div className="hidden md:flex relative">
//               <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
//               <input placeholder="Search..." className="pl-9 pr-3 py-1.5 border rounded-lg text-sm bg-gray-50 focus:bg-white outline-none w-48 lg:w-64 transition-all" />
//             </div>
//             <div className="flex items-center gap-3 text-gray-500">
//                <button className="p-2 hover:bg-gray-100 rounded-full transition"><Bell size={18} /></button>
//                <button className="p-2 hover:bg-gray-100 rounded-full transition"><Settings size={18} /></button>
//             </div>
//             <div className="w-9 h-9 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
//               {initials}
//             </div>
//           </div>
//         </header>

//         {/* PAGE CONTENT */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }




import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard, Wallet, FileText, ClipboardList, Gift, User,
  Shield, File, LogOut, Bell, Settings, Search, ChevronLeft,
  ChevronRight, Store, Menu, X
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import UserSettings from "./UserSettings";
import { getUserInitials } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/user/dashboard" },
  { label: "Wallet", icon: Wallet, to: "/user/dashboard/wallet" },
  { label: "Store", icon: Store, to: "/user/dashboard/store" },
  { label: "Report", icon: FileText, to: "/user/dashboard/report" },
  { label: "Surveys", icon: ClipboardList, to: "/user/dashboard/surveys" },
  { label: "Refer & Earn", icon: Gift, to: "/user/dashboard/refer" },
];

const bottomMenu = [
  { label: "Profile", icon: User, to: "/user/dashboard/profile" },
  { label: "Terms & Conditions", icon: File, to: "/user/dashboard/termcon" },
  { label: "Privacy Policy", icon: Shield, to: "/user/dashboard/privacy" },
];

export default function UserDashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile state
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

useEffect(() => {
  function handleClickOutside(event) {
    if (
      settingsRef.current &&
      !settingsRef.current.contains(event.target)
    ) {
      setSettingsOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


const [notifOpen, setNotifOpen] = useState(false);
const [notifications, setNotifications] = useState([]);
const notifRef = useRef(null);
useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      // console.error("Notification fetch error:", err);
    }
  };

  fetchNotifications();
}, []);
  // useEffect(() => {
  //   api.get("/auth/me").then((res) => setUser(res.data));
  // }, []);
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  fetchUser();
}, []);

  const initials = user?.name
  ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  : "U";

  const navigate = useNavigate();
  const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
    navigate("/login");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

useEffect(() => {
  const timeout = setTimeout(() => {
    if (location.pathname.includes("surveys")) {
      if (searchTerm.trim() !== "") {
        navigate(`/user/dashboard/surveys?search=${searchTerm}`);
      } else {
        navigate(`/user/dashboard/surveys`);
      }
    }
  }, 300);

  return () => clearTimeout(timeout);
}, [searchTerm, location.pathname]);

  return (
    <div className="h-screen bg-gradient-to-br from-white-50 flex overflow-hidden">
      
      {/* ================= SIDEBAR ================= */}
      {/* Mobile logic: -translate-x-full hides it. lg:translate-x-0 shows it on desktop */}
      <aside
        className={`
          fixed inset-y-0 left-0 h-screen bg-[#f7f7f7] border-r border-gray-300
          flex flex-col transition-all duration-300 z-50
          ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          overflow-hidden
        `}
      >
        {/* LOGO */}
        <div className="flex items-center lg:justify-between px-6 py-7 border-b border-gray-300 h-[93px]">
          <div className="flex items-center justify-center w-full lg:w-auto">
            <div className={`rounded-lg overflow-hidden transition-all ${collapsed ? "lg:w-8 lg:h-8" : "lg:w-40 lg:h-40"} w-40 h-40`}>
              <img src="/HomeImage/cfr.png" alt="CFR" className="w-full h-full object-contain" />
            </div>
            {/* {(!collapsed || mobileOpen) && <span className="font-semibold text-lg">Survey Panel</span>} */}
          </div>

          {/* Desktop Toggle */}
          <button className="hidden lg:block" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Mobile Close Button */}
          <button className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
          {mainMenu.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end
              onClick={() => setMobileOpen(false)} // Close on click for mobile
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition hover:shadow-xl transaction-all duration-300 hover:-translate-y-1 cursor-pointer
                ${isActive ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              <item.icon size={20} className="shrink-0" />
              {(!collapsed || mobileOpen) && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* BOTTOM MENU */}
        <div className="px-3 py-4 border-t border-gray-300 space-y-1">
          {bottomMenu.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition hover:shadow-xl transaction-all duration-300 hover:-translate-y-1 cursor-pointer
                ${isActive ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              <item.icon size={20} className="shrink-0" />
              {(!collapsed || mobileOpen) && <span>{item.label}</span>}
            </NavLink>
          ))}

          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-red-500 rounded-lg w-full">
            <LogOut size={20} className="shrink-0" />
            {(!collapsed || mobileOpen) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div
        className={`h-screen flex-1 flex flex-col transition-all duration-300
        ${collapsed ? "lg:ml-20" : "lg:ml-64"} 
        ml-0`} 
      >
        {/* TOP BAR */}
        <div className="flex justify-between items-center px-5 py-4 xl:px-6 xl:py-5 bg-white border-b border-gray-300">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Trigger */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div>
              <h1 className="text-lg md:text-lg font-semibold whitespace-nowrap">
               Welcome,{" "}
<span className="text-orange-400">
  {user?.name ? user.name : "User"}
</span>
              </h1>
              <p className="md:block text-md text-gray-500">
                Here’s your survey dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden sm:block">
              <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
              <input
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search surveys..."
  className="pl-8 pr-3 py-1.5 border rounded text-sm w-32 md:w-auto"
/>
{searchTerm && (
    <button
      onClick={() => {
        setSearchTerm("");
        navigate(location.pathname); // remove ?search
      }}
      className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 text-sm"
    >
      ✕
    </button>
  )}
            </div>

            {/* <Bell size={18} className="cursor-pointer" /> */}
            <div className="relative" ref={notifRef}>
  <div
    className="relative cursor-pointer"
    onClick={(e) => {
      e.stopPropagation();
      setNotifOpen((prev)=> !prev);
    }}
  >
    <Bell size={18} />

    {/* Unread Count Badge */}
    {notifications.filter(n => !n.read).length > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
        {notifications.filter(n => !n.read).length}
      </span>
    )}
  </div>

  {notifOpen && (
    <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border border-gray-300 z-50">

      <div className="px-4 py-3 border-b border-orange-300 font-semibold">
        Notifications
      </div>

      <div className="max-h-72 overflow-y-auto">

        {notifications.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">
            No notifications
          </p>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className={`px-4 py-3 text-sm border-b cursor-pointer hover:bg-gray-50 ${
                !n.read ? "bg-orange-50 font-medium" : ""
              }`}
              onClick={async () => {
                await api.put(`/notifications/${n._id}/read`);

                setNotifications((prev) =>
                  prev.map((item) =>
                    item._id === n._id
                      ? { ...item, read: true }
                      : item
                  )
                );

                if (n.link) navigate(n.link);

                setNotifOpen(false);
              }}
            >
              <p className="font-medium">{n.title}</p>
              <p className="text-xs text-gray-500">{n.message}</p>
            </div>
          ))
        )}

      </div>

    </div>
  )}
</div>
            {/* <Settings size={18} className="cursor-pointer" onClick={() => navigate("/user/dashboard/settings")}/> */}
            <div className="relative">
  <Settings
    size={18}
    className="cursor-pointer"
    onClick={() => setSettingsOpen(!settingsOpen)}
  />

  {settingsOpen && (
    <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-lg border border-gray-300 p-4 z-50">
      <UserSettings />
    </div>
  )}
</div>
            <div className="w-8 h-8 md:w-9 md:h-9 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-xs md:text-sm">
              {initials}
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}