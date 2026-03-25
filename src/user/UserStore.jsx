import {
  Gift,
  Coffee,
  Ticket,
  Headphones,
  Smartphone,
  CreditCard,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function UserStore() {
  const userPoints = 201;
  const [cards, setCards] = useState([]);
  const [wallet, setWallet] = useState({ balance: 0 });
  const [category, setCategory] = useState("GIFT_CARD");

useEffect(() => {
  api.get("/giftcards").then(res => {
    // console.log("CARDS DATA:", res.data); 
    setCards(res.data);
  });
}, []);

  useEffect(() => {
    api.get("/giftcards").then(res => setCards(res.data));
    api.get("/wallet").then(res => setWallet(res.data));
  }, []);
  return (
     <div className="space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Reward Store</h1>
        <div className="flex items-center gap-2 bg-orange-50 text-[#1bbdac] px-4 py-2 rounded-full">
          <Star size={18} /> {wallet.balance} Points Available
        </div>
      </div>
{/* <div className="flex gap-3 mb-6">
  {["GIFT_CARD", "PAYPAL", "PREPAID"].map(t => (
    <button
      key={t}
      onClick={() => setCategory(t)}
      className={category === t ? "bg-orange-500 text-white" : "bg-gray-100"}
    >
      {t}
    </button>
  ))}
</div> */}
<div className="bg-white rounded-2xl border shadow-sm p-6 border-[#bfbfbf]">
        <div className="flex items-center gap-2 mb-6">
          <Gift className="text-orange-400" />
          <h3 className="font-semibold text-lg text-[#74777c]">How to Earn & Redeem</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <Step
            number="1"
            title="Complete Surveys"
            desc="Earn points for every survey"
          />
          <Step
            number="2"
            title="Accumulate Points"
            desc="Watch your balance grow"
          />
          <Step
            number="3"
            title="Redeem Rewards"
            desc="Get instant delivery"
          />
        </div>
      </div>
      {/* GIFT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards
        .filter(card => card.type === category)
        .map(card => {
          const canRedeem = wallet.balance >= card.pointsRequired;

          return (
           <div
      key={card._id}
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
    >
      {/* CARD TOP AREA (The "Visual" part) */}
      <div className="p-3 pb-0">
        <div className="aspect-[4/2] w-full bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Logo Container */}
          <div className="z-10 p-4">
            <img
              src={`https://testflight.tremendous.com/product_images/${card.tremendousProductId}/logo`}
              alt={card.title}
              className="max-h-25 sm:max-h-25 lg:max-h-37 w-auto object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          
          {/* Subtle Background Decoration (Optional, for that premium feel) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
             <Gift size={100} />
          </div>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title matches the image style */}
        <h3 className="text-sm font-medium text-gray-800 mb-3">
          {card.title}
        </h3>

        {/* The two grey "Skeleton" bars from your image */}
        <div className="space-y-2 mb-6">
          <div className="h-1.5 bg-gray-100 rounded-full w-full" />
          <div className="h-1.5 bg-gray-100 rounded-full w-2/3" />
        </div>

        {/* PUSH TO BOTTOM */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Cost</span>
            <span className="text-sm text-emerald-600 font-bold">
              {card.pointsRequired} pts
            </span>
          </div>

          <button
            disabled={!canRedeem}
            onClick={() =>
              api.post(`/giftcards/redeem/${card._id}`).then(() => alert("Redeemed successfully"))
            }
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              canRedeem
                ? "bg-orange-400 text-white hover:bg-orange-600 shadow-sm"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Redeem
          </button>
        </div>
      </div>
    </div>


          );
        })}
      </div>
    

      {/* ================= HOW IT WORKS ================= */}
      {/* <div className="bg-white rounded-2xl border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Gift className="text-orange-400" />
          <h3 className="font-semibold text-lg">How to Earn & Redeem</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <Step
            number="1"
            title="Complete Surveys"
            desc="Earn points for every survey"
          />
          <Step
            number="2"
            title="Accumulate Points"
            desc="Watch your balance grow"
          />
          <Step
            number="3"
            title="Redeem Rewards"
            desc="Get instant delivery"
          />
        </div>
      </div> */}
    </div>
  );
}

/* ================= STEP ================= */

function Step({ number, title, desc }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-[50px] text-gray-600 flex items-center justify-center font-semibold mb-3 transition hover:shadow-xl transaction-all duration-300 hover:-translate-y-1 hover:w-14 h-14 hover:bg-orange-500 hover:text-white rounded-full cursor-pointer">
        {number}
      </div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}
