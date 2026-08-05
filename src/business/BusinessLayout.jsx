// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Folder,
//   CheckCircle,
//   PauseCircle,
//   FileText,
//   User,
//   Shield,
//   File,
//   LogOut,
//   Bell,
//   Settings,
//   Search,
//   Menu,
//   X,
// } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import api from "../services/api";

// const mainMenu = [
//   { label: "Dashboard", icon: LayoutDashboard, to: "/business/dashboard" },
//   { label: "Create Projects", icon: Folder, to: "/business/dashboard/projects" },
//   { label: "Live Projects", icon: CheckCircle, to: "/business/dashboard/live" },
//   { label: "Hold Projects", icon: PauseCircle, to: "/business/dashboard/hold" },
//   { label: "Closed Projects", icon: FileText, to: "/business/dashboard/closed" },
//   { label: "Draft Projects", icon: FileText, to: "/business/dashboard/drafts" },
// ];

// const bottomMenu = [
//   { label: "Profile", icon: User, to: "/business/dashboard/profile" },
//   { label: "Terms & Conditions", icon: File, to: "/business/dashboard/termcon" },
//   { label: "Privacy Policy", icon: Shield, to: "/business/dashboard/privacy" },
// ];

// export default function BusinessLayout() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [notifOpen, setNotifOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     api.get("/auth/me").then(res => setUser(res.data.user));
//     api.get("/notifications").then(res => setNotifications(res.data));
//   }, []);

//   const handleLogout = async () => {
//     await api.post("/auth/logout");
//     navigate("/login");
//   };

//   return (
//     <div className="h-screen flex overflow-hidden bg-gray-100">

//       {/* SIDEBAR */}
//       <aside
//   className={`fixed lg:static inset-y-0 left-0 bg-white border-r z-50 transform transition-all duration-300
//   ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//   ${collapsed ? "lg:w-20" : "lg:w-64"}`}
// >

//         <div className="p-5 border-b flex justify-between items-center">
//           <h2 className="font-bold text-lg text-orange-500">Inputify</h2>
//           <button className="lg:hidden" onClick={() => setMobileOpen(false)}>
//             <X size={18} />
//           </button>
//         </div>

//         <nav className="p-3 space-y-1">
//           {mainMenu.map(item => (
//             <NavLink
//               key={item.label}
//               to={item.to}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-2 rounded-lg ${
//                   isActive ? "bg-orange-50 text-orange-600" : "hover:bg-gray-100"
//                 }`
//               }
//             >
//               <item.icon size={18} />
//               {item.label}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="border-t p-3 space-y-1">
//           {bottomMenu.map(item => (
//             <NavLink
//               key={item.label}
//               to={item.to}
//               className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
//             >
//               <item.icon size={18} />
//               {item.label}
//             </NavLink>
//           ))}

//           <button onClick={handleLogout} className="flex gap-3 p-2 text-red-500">
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* OVERLAY */}
//       {mobileOpen && (
//         <div className="fixed inset-0 bg-black/30 lg:hidden" onClick={() => setMobileOpen(false)} />
//       )}

//       {/* MAIN */}
//       <div className="flex-1 flex flex-col">

//         {/* TOPBAR */}
//         <div className="flex justify-between items-center bg-white border-b px-6 py-4">
//           <div className="flex items-center gap-3">
//             <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
//               <Menu size={20} />
//             </button>

//             <div>
//               <h1 className="font-semibold">
//                 Welcome, <span className="text-orange-500">{user?.name || "Business"}</span>
//               </h1>
//               <p className="text-sm text-gray-500">Manage your projects</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Search size={14} className="absolute left-2 top-2 text-gray-400" />
//               <input className="pl-7 pr-2 py-1 border rounded text-sm" placeholder="Search..." />
//             </div>

//             <Bell size={18} className="cursor-pointer" />

//             <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">
//               {user?.name?.[0] || "B"}
//             </div>
//           </div>
//         </div>

//         {/* CONTENT */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  CheckCircle,
  PauseCircle,
  FileText,
  User,
  Shield,
  File,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../services/api";

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/business/dashboard" },
  { label: "Create Projects", icon: Folder, to: "/business/dashboard/projects" },
  { label: "Live Projects", icon: CheckCircle, to: "/business/dashboard/live" },
  { label: "Hold Projects", icon: PauseCircle, to: "/business/dashboard/hold" },
  { label: "Closed Projects", icon: FileText, to: "/business/dashboard/closed" },
  { label: "Draft Projects", icon: FileText, to: "/business/dashboard/drafts" },
  { label: "Survey Builder", icon: FileText, to: "/business/dashboard/survey-builder" },
  { label: "Survey Forms", icon: FileText, to: "/business/dashboard/survey-forms" },
];

const bottomMenu = [
  { label: "Profile", icon: User, to: "/business/dashboard/profile" },
  { label: "Terms & Conditions", icon: File, to: "/business/dashboard/termcon" },
  { label: "Privacy Policy", icon: Shield, to: "/business/dashboard/privacy" },
];

export default function BusinessLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/auth/me").then(res => setUser(res.data.user));
  }, []);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white-100">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-100 border-r border-gray-300 z-50 transform transition-all duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >

        {/* ===== LOGO + COLLAPSE ===== */}
        <div className="relative flex items-center justify-center px-6 py-6 border-b border-gray-300 h-[93px]">

          {/* LOGO */}
          <div className="flex items-center justify-center w-full">
            <div
              className={`transition-all duration-300 ${
                collapsed ? "w-30 h-30" : "w-28 h-28"
              }`}
            >
              <img
                src="/HomeImage/inputify.png"
                alt="Inputify"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* COLLAPSE BUTTON */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100 hidden lg:flex"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          {/* MOBILE CLOSE */}
          <button
            className="lg:hidden absolute right-4"
            onClick={() => setMobileOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* ===== MENU ===== */}
        <nav className="p-3 space-y-1">
          {mainMenu.map(item => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <item.icon size={18} />
              {!collapsed && item.label}
            </NavLink>
          ))}
        </nav>

        {/* ===== BOTTOM MENU ===== */}
        <div className="border-t border-gray-300 p-3 space-y-1 mt-auto">
          {bottomMenu.map(item => (
            <NavLink
              key={item.label}
              to={item.to}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
            >
              <item.icon size={18} />
              {!collapsed && item.label}
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 text-red-500 w-full"
          >
            <LogOut size={18} />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= MAIN ================= */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
        ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}
      >

        {/* ===== TOPBAR ===== */}
        <div className="flex justify-between items-center bg-white border-b border-gray-300 px-6 py-6">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div>
              <h1 className="font-semibold">
                Welcome,{" "}
                <span className="text-orange-500">
                  {user?.name || "Business"}
                </span>
              </h1>
              <p className="text-sm text-gray-500">
                Manage your projects
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-2 top-2 text-gray-400"
              />
              <input
                className="pl-7 pr-2 py-1 border rounded text-sm"
                placeholder="Search..."
              />
            </div>

            <Bell size={18} className="cursor-pointer" />

            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">
              {user?.name?.[0] || "B"}
            </div>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <main className="flex-1 overflow-x-auto overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}