import {
  Gift,
  Copy,
  Users,
  CheckCircle2,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../services/api";
export default function UserReferEarn() {
  // const referralLink = "https://surveypanel.com/ref/NIKHIL2024";
  const [copied, setCopied] = useState(false);
const [referralLink, setReferralLink] = useState("");

  const [stats, setStats] = useState({
    totalReferrals: 0,
    successful: 0,
    pointsEarned: 0
  });
useEffect(() => {
  const loadReferral = async () => {
    try {
      const meRes = await api.get("/auth/me");

      console.log("ME RESPONSE:", meRes.data); // DEBUG

      const code = meRes.data?.user?.referralCode;

      if (!code) {
        console.log("No referral code found");
        return;
      }

      const link = `${window.location.origin}/register?ref=${code}`;
      setReferralLink(link);

      const statsRes = await api.get("/referral/stats");
      setStats({
  totalReferrals: statsRes.data.totalReferrals || 0,
  successful: statsRes.data.successful || 0,
  pointsEarned: statsRes.data.pointsEarned || 0
});

console.log("REFERRAL STATS:", statsRes.data);

    } catch (err) {
      console.error("Referral load error:", err);
    }
  };

  loadReferral();
   const interval = setInterval(loadReferral, 5000); // refresh every 5 sec

  return () => clearInterval(interval);
}, []);


const handleCopy = () => {
  try {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch {
    const input = document.createElement("input");
    input.value = referralLink;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }

  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};


  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold">Refer & Earn</h1>
        <p className="text-sm text-gray-500">
          Invite friends and earn bonus points
        </p>
      </div>

      {/* ================= REFERRAL CARD ================= */}
      <div className="bg-gradient-to-r from-orange-400 to-teal-200 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4 mb-6 relative left-[-10px] xl:left-[10px]">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Gift size={22} />
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Earn 50 points per referral!
            </h3>
            <p className="text-sm opacity-90">
              Your friend gets 25 bonus points too
            </p>
          </div>
        </div>

        <div className="mt-4">
  <p className="text-sm mb-2 font-medium text-white ">
    Your referral link
  </p>

  <div className="
    flex flex-col gap-3 sm:flex-row sm:items-center
    bg-white/20
    backdrop-blur-md
    border border-white/30
    rounded-xl
    p-3
  ">
    <input
      readOnly
      value={referralLink}
      className="
       w-full sm:flex-1
        bg-transparent
        text-white
        placeholder-white/70
        px-3 py-2
        outline-none
        border border-white/20 rounded-lg
      "
    />
{copied && (
  <div className="
    fixed
    top-6
    right-6
    bg-white
    border
    border-emerald-200
    shadow-lg
    rounded-xl
    px-4
    py-3
    flex
    items-center
    gap-3
    animate-fade-in
    z-50
  ">
    <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
      ✓
    </div>
    <span className="text-sm font-medium text-gray-700">
      Referral link copied
    </span>
  </div>
)}
    <button
      onClick={handleCopy}
      className="
        bg-white
        text-emerald-600
        px-4
        rounded-lg
        flex
        justify-center
        items-center
        gap-2
        font-medium
      "
    >
      <Copy size={16} />
      Copy
    </button>
  </div>
</div>


      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Users />}
          label="Total Referrals"
         value={stats.totalReferrals}
          bg="bg-orange-200"
          color="text-emerald-600"
        />

        <StatCard
          icon={<CheckCircle2 />}
          label="Successful"
          value={stats.successful}
          bg="bg-green-100"
          color="text-green-600"
        />

        <StatCard
          icon={<Star />}
          label="Points Earned"
          value={stats.pointsEarned}
          bg="bg-yellow-100"
          color="text-yellow-600"
        />
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-6">
        <h3 className="font-semibold text-lg mb-6">How it works</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <Step
            step="1"
            title="Share your link"
            desc="Send your unique referral link to friends"
          />

          <Step
            step="2"
            title="They sign up"
            desc="Your friend creates an account"
          />

          <Step
            step="3"
            title="You both earn"
            desc="Get 50 pts when they complete their first survey"
          />
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ icon, label, value, bg, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm flex items-center gap-4 transition hover:shadow-xl transaction-all duration-300 hover:-translate-y-1 cursor pointer">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-md text-gray-500">{label}</p>
        <h3 className="text-2xl font-semibold">{value}</h3>
      </div>
    </div>
  );
}

function Step({ step, title, desc }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[50px] text-black flex items-center justify-center font-semibold mb-3 transition hover:shadow-xl transaction-all duration-300 hover:-translate-y-1 hover:w-14 h-14 hover:bg-emerald-500 hover:text-white rounded-full cursor pointer ">
        {step}
      </div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}
