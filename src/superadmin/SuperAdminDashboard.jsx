// import { Outlet, NavLink } from "react-router-dom";
// import { Bell, Settings, Search } from "lucide-react";
// import {
//   LayoutDashboard,
//   ClipboardList,
//   PlusCircle,
//   FileText,
//   BarChart3,
//   Users,
//   Flag,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// import { getUser, getUserInitials } from "../utils/auth";
// import { useEffect, useState } from "react";
// import api from "../services/api";
// function SidebarLink({ label, to }) {
//   return (
//     <NavLink
//       to={to}
//       end
//       className={({ isActive }) =>
//         `block px-3 py-2 rounded ${
//           isActive
//             ? "bg-[green-50] text-[green]-600 font-medium"
//             : "text-gray-600 hover:bg-gray-100"
//         }`
//       }
//     >
//       {label}
//     </NavLink>
//   );
// }
// const menu = [
//   { label: "Dashboard", icon: LayoutDashboard, to: "/superadmin/dashboard" },
//   { label: "Surveys", icon: ClipboardList, to: "/superadmin/dashboard/surveys" },
//   { label: "Create Survey", icon: PlusCircle, to: "/superadmin/dashboard/create-survey" },
//   { label: "Responses", icon: FileText, to: "/superadmin/dashboard/responses" },
//   { label: "Reports", icon: BarChart3, to: "/superadmin/dashboard/reports" },
//   { label: "Add Admin", icon: Users, to: "/superadmin/dashboard/add-admin" },
//   { label: "Fraud & Flags", icon: Flag, to: "/superadmin/dashboard/fraud" },
//   { label: "Settings", icon: Settings, to: "/superadmin/dashboard/settings" },
// ];
// export default function SuperAdminDashboard() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//  const [collapsed, setCollapsed] = useState(false);

//   useEffect(() => {
//     api.get("/auth/me")
//       .then((res) => {
//         setUser(res.data);
//       })
//       .catch(() => {
//         console.error("Not authorized");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   const initials = getUserInitials();

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* ================= SIDEBAR ================= */}
//    <aside
//         className={`bg-white border-r transition-all duration-300 flex flex-col
//         ${collapsed ? "w-20" : "w-64"}`}
//       >
//         {/* LOGO + TOGGLE */}
//         <div className="flex items-center justify-between px-4 py-4 border-b border-greem-500">
//           <div className="flex items-center gap-3">
//             <div className={`rounded-lg flex items-center justify-center overflow-hidden transition-all
//     ${collapsed ? "w-8 h-8" : "w-18 h-18"}
//   `}>
//               <img
//     src="/HomeImage/cfr.png"
//     alt="CFR Solutions"
//     className="w-full h-full object-contain"
//   />
//             </div>
//             {!collapsed && (
//               <span className="text-lg font-semibold">SurveyAdmin</span>
//             )}
//           </div>

//           <button onClick={() => setCollapsed(!collapsed)}>
//             {collapsed ? <ChevronRight /> : <ChevronLeft />}
//           </button>
//         </div>

//         {/* MENU */}
//         <nav className="flex-1 px-3 py-4 space-y-2">
//           {menu.map((item) => (
//             <NavLink
//               key={item.label}
//               to={item.to}
//               end
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md transition
//                 ${
//                   isActive
//                     ? "bg-green-100 text-green-600"
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
//         <div className="flex justify-between items-center px-6 py-[29.9px] bg-white border-b border-green-600">
//           <div>
//             <h1 className="text-lg font-semibold">
//               Welcome,{" "}
//               <span className="text-green-600">
//                 {user?.name || "Admin"}
//               </span>
//             </h1>
//             <p className="text-xs text-gray-500">
//               Here’s your admin overview
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

//             {/* USER AVATAR */}
//             <div className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
//               {initials}
//             </div>
//           </div>
//         </div>

//         {/* ================= PAGE CONTENT ================= */}
//         <main className="p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  FileText,
  BarChart3,
  Users,
  Flag,
  LogOut,
  Bell,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../services/api";
import { getUserInitials } from "../utils/auth";

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/superadmin/dashboard" },
  { label: "Surveys", icon: ClipboardList, to: "/superadmin/dashboard/surveys" },
  { label: "Create Survey", icon: PlusCircle, to: "/superadmin/dashboard/create-survey" },
  { label: "Responses", icon: FileText, to: "/superadmin/dashboard/responses" },
  { label: "Reports", icon: BarChart3, to: "/superadmin/dashboard/reports" },
  { label: "Add Admin", icon: Users, to: "/superadmin/dashboard/add-admin" },
  { label: "Fraud & Flags", icon: Flag, to: "/superadmin/dashboard/fraud" },
  { label: "Settings", icon: Settings, to: "/superadmin/dashboard/settings" },
];

export default function SuperAdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => console.error("Not authorized"))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  const initials = getUserInitials();

  return (
    <div className="h-screen bg-gradient-to-br from-white-50 flex overflow-hidden">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed inset-y-0 left-0 bg-[#f7f7f7] border-r border-gray-300
          flex flex-col transition-all duration-300 z-50
          ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        {/* LOGO */}
        <div className="flex items-center lg:justify-between px-6 py-7 border-b border-gray-300 h-[93px]">
          <div className="flex items-center justify-center w-full lg:w-auto">
            <div className={`rounded-lg overflow-hidden transition-all ${collapsed ? "lg:w-10 lg:h-10" : "lg:w-40 lg:h-40"}  w-40 h-40`}>
              <img
                src="/HomeImage/cfr.png"
                alt="CFR"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Desktop Toggle */}
          <button className="hidden lg:block" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Mobile Close */}
          <button className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {mainMenu.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition hover:shadow-md duration-300 hover:-translate-y-0.5
                ${
                  isActive
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon size={20} className="shrink-0" />
              {(!collapsed || mobileOpen) && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="px-3 py-4 border-t border-gray-300">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-red-500 rounded-lg w-full"
          >
            <LogOut size={20} />
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
        className={`flex-1 flex flex-col transition-all duration-300
        ${collapsed ? "lg:ml-20" : "lg:ml-64"}
        ml-0`}
      >
        {/* TOP BAR */}
        <div className="flex justify-between items-center px-5 py-4 bg-white border-b border-gray-300">

          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div>
              <h1 className="text-lg font-semibold">
                Welcome,{" "}
                <span className="text-green-600">
                  {user?.name || "Admin"}
                </span>
              </h1>
              <p className="text-sm text-gray-500">
                Here’s your admin overview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <div className="relative hidden sm:block">
              <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="pl-8 pr-3 py-1.5 border rounded text-sm"
              />
            </div>

            <Bell size={18} className="cursor-pointer" />
            <Settings size={18} className="cursor-pointer" />

            <div className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
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