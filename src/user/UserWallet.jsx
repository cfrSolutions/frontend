// import {
//   Wallet,
//   ArrowUpRight,
//   ArrowDownLeft,
//   Calendar,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import api from "../services/api";




// /* ================= MAIN ================= */

// export default function UserWallet() {
//   const [wallet, setWallet] = useState({ balance: 0, earnedToday: 0, totalRedeemed: 0 });
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     // Fetch both in a single effect
//     const fetchData = async () => {
//       try {
//         const [walletRes, txRes] = await Promise.all([
//           api.get("/wallet"),
//           api.get("/wallet/transactions")
//         ]);
//         setWallet(walletRes.data);
//         setTransactions(txRes.data);
//       } catch (err) {
//         console.error("Failed to fetch wallet data", err);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="space-y-8">

//       {/* ================= WALLET SUMMARY ================= */}
//       <div className="bg-white rounded-2xl p-4 xl:p-6 border border-gray-300 shadow-sm">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-4">
//             <div className="w-15 h-12 xl:w-12 xl:h-12 bg-[#feb531] rounded-xl flex items-center justify-center text-white">
//               <Wallet size={22} />
//             </div>
//             <div>
//               <h3 className="font-semibold text-lg">Your Wallet</h3>
//               <p className="text-sm text-gray-500">Manage your earnings</p>
//             </div>
//           </div>

//           <button className="bg-[#feb531] hover:bg-orange-200 text-white px-2 xl:px-4 py-2 rounded-lg text-sm">
//             Withdraw
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
       

//           {wallet && (
//   <>
//     <WalletCard label="Balance" value={wallet.balance} icon={<ArrowUpRight />}/>
//     <WalletCard label="Earned Today" value={wallet.earnedToday} icon={<ArrowUpRight />} highlight="text-green-600"/>
//     <WalletCard label="Redeemed" value={wallet.totalRedeemed}  icon={<ArrowDownLeft />} highlight="text-blue-600"/>
//   </>
// )}

//         </div>
//       </div>

//       {/* ================= TRANSACTION HISTORY ================= */}
//       <div className="bg-white rounded-2xl border border-gray-300 shadow-sm">
//         <div className="px-6 py-4 border-b">
//           <h3 className="font-semibold text-lg">Transaction History</h3>
//           <p className="text-sm text-gray-500">
//             Your recent earnings and redemptions
//           </p>
//         </div>

//         <div className="divide-y divide-gray-200 ">
//           {transactions.map((tx) => (
//             <TransactionRow key={tx._id}
//   tx={{
//     title: tx.description,
//     points: tx.type === "EARN" ? tx.points : -tx.points,
//     date: new Date(tx.createdAt).toLocaleString(),
//   }} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function WalletCard({ label, value, icon, highlight }) {
//   return (
//     <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 hover:shadow-xl transaction-all duration-300 hover:-translate-y-1 cursor pointer">
//       <div className="w-10 h-10 bg-[#E67E22]rounded-lg flex items-center justify-center">
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <h3 className={`text-xl font-semibold ${highlight || ""}`}>
//           {value} <span className="text-sm font-normal">points</span>
//         </h3>
//       </div>
//     </div>
//   );
// }

// function TransactionRow({ tx }) {
//   const isEarn = tx.points > 0;

//   return (
//     <div className="px-6 py-4 flex justify-between items-center hover:shadow-xl transaction-all duration-300 hover:-translate-y-1 cursor pointer">
//       {/* LEFT */}
//       <div className="flex items-start gap-4">
//         <div
//           className={`w-10 h-10 rounded-full flex items-center justify-center
//             ${isEarn ? "bg-orange-200 text-orange-600" : "bg-blue-100 text-blue-600"}
//           `}
//         >
//           {isEarn ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
//         </div>

//         <div>
//           <h4 className="font-medium">{tx.title}</h4>
//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <Calendar size={14} />
//             {tx.date}
//           </div>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div
//         className={`font-semibold ${
//           isEarn ? "text-[#E67E22]" : "text-gray-600"
//         }`}
//       >
//         {isEarn ? "+" : ""}
//         {tx.points} pts
//       </div>
//     </div>
//   );
// }

import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api";
import {Link} from 'react-router-dom'
/* ================= MAIN ================= */

export default function UserWallet() {
  const [wallet, setWallet] = useState({
    balance: 0,
    earnedToday: 0,
    totalRedeemed: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [walletNumber, setWalletNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, txRes, meRes] = await Promise.all([
  api.get("/wallet"),
  api.get("/wallet/transactions"),
  api.get("/auth/me"), // ⭐ ADD THIS
]);
        
        setWallet(walletRes.data);
        setTransactions(txRes.data);
        setWalletNumber(meRes.data.user.walletNumber || "0000");
      } catch (err) {
        console.error("Failed to fetch wallet data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. TOP HEADER SECTION (Title and Withdraw Button) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#feb531] rounded-xl flex items-center justify-center text-white shadow-sm">
            <Wallet size={22} />
          </div>
          <div>
            <h3 className="font-bold text-2xl text-gray-800">Your Wallet</h3>
            <p className="text-sm text-gray-500">Manage your earnings and progress</p>
          </div>
        </div>
       <Link to="/user/dashboard/store"> <button className="bg-[#feb531] hover:bg-orange-400 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
          Withdraw Funds
        </button></Link>
      </div>

      {/* 2. THE TWO SEPARATE BOXES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Box 1: The Credit Card View */}
        <div className="bg-white rounded-2xl p-6 border border-gray-300 shadow-sm flex flex-col justify-center">
           <h3 className="font-semibold text-gray-700 mb-4">Balance Overview</h3>
          <WalletCreditCard wallet={wallet} walletNumber={walletNumber} />

        </div>

        {/* Box 2: The Progress View */}
        <div className="bg-white rounded-2xl p-6 border border-gray-300 shadow-sm">
          <WalletProgress earnedToday={wallet.earnedToday} max={500} />
        </div>
      </div>

      {/* ================= TRANSACTION HISTORY ================= */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-lg">
            Transaction History
          </h3>
          <p className="text-sm text-gray-500">
            Your recent earnings and redemptions
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <TransactionRow
              key={tx._id}
              tx={{
                title: tx.description,
                points:
                  tx.type === "EARN"
                    ? tx.points
                    : -tx.points,
                date: new Date(
                  tx.createdAt
                ).toLocaleString(),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= WALLET CREDIT CARD ================= */

function WalletCreditCard({ wallet, walletNumber  }) {
  const last4 = walletNumber?.slice(-4) || "0000";

  return (
    <div
      className="
        relative
        w-full
       max-w-md          
        mx-auto          
        aspect-[13/9]  
        lg: aspect-[1.6/1]  
        rounded-2xl
        p-6
        text-white
        shadow-xl
        bg-[linear-gradient(135deg,#FF9F1C,#FFB703,#FB8500)]
        overflow-hidden
      "
    >
      {/* Decorative shapes */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/20 rounded-full" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <Wallet size={24} />
          <span className="font-semibold text-xl">
            Wallet Card
          </span>
        </div>
        <span className="tracking-widest text-base opacity-90">
          VISA
        </span>
      </div>

      {/* Values */}
      <div className="grid grid-cols-3 gap-6 relative z-10">
        
        <div>
          <p className="text-sm uppercase opacity-80 mb-1">
            Balance
          </p>
          <h3 className="text-2xl font-bold">
            {wallet.balance}
            <span className="text-base font-normal ml-1">
              pts
            </span>
          </h3>
        </div>

        <div>
          <p className="text-sm uppercase opacity-80 mb-1">
            Earned Today
          </p>
          <h3 className="text-2xl font-bold text-orange-400">
            {wallet.earnedToday}
            <span className="text-base font-normal ml-1">
              pts
            </span>
          </h3>
        </div>

        <div>
          <p className="text-sm uppercase opacity-80 mb-1">
            Redeemed
          </p>
          <h3 className="text-2xl font-bold text-blue-200">
            {wallet.totalRedeemed}
            <span className="text-base font-normal ml-1">
              pts
            </span>
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 text-sm opacity-90 relative z-10">
        <span>Member Wallet</span>
        <span>•••• {last4}</span>

      </div>
    </div>
  );
}

/* ================= TRANSACTION ROW ================= */

function TransactionRow({ tx }) {
  const isEarn = tx.points > 0;

  return (
    <div className="px-6 py-4 flex justify-between items-center hover:shadow-md transition-all duration-300">
      {/* LEFT */}
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isEarn
              ? "bg-orange-200 text-orange-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {isEarn ? (
            <ArrowUpRight size={18} />
          ) : (
            <ArrowDownLeft size={18} />
          )}
        </div>

        <div>
          <h4 className="font-medium">{tx.title}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={14} />
            {tx.date}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className={`font-semibold ${
          isEarn ? "text-[#E67E22]" : "text-gray-600"
        }`}
      >
        {isEarn ? "+" : ""}
        {tx.points} pts
      </div>
    </div>
  );
}
function WalletProgress({ earnedToday, max }) {
  const progress = Math.min((earnedToday / max) * 100, 100);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
      {/* HEADER */}
      
      <div>
        
        <h3 className="text-lg font-semibold mb-1">
          Today’s Progress
        </h3>
        
        <p className="text-sm text-gray-500">
          Earnings timeline (0 → {max} pts)
        </p>
      </div>

      {/* GRAPH */}
      <div className="mt-6">
        {/* Labels */}
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>0 pts</span>
          <span>{max / 2} pts</span>
          <span>{max} pts</span>
        </div>

        {/* Progress bar */}
        <div className="relative h-4 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full rounded-full
                       bg-gradient-to-r from-orange-400 to-orange-600
                       transition-all duration-700"
            style={{ width: `${progress}%` }}
          />

          {/* Marker */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full
                       bg-white border-4 border-orange-600 shadow"
            style={{ left: `calc(${progress}% - 8px)` }}
          />
        </div>

        {/* Value */}
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold text-orange-600">
            {earnedToday} pts
          </p>
          <p className="text-sm text-gray-500">
            earned today
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 text-xs text-gray-400 text-center">
        Complete surveys to move forward 🚀
      </div>
    </div>
  );
}
