import { ArrowLeft, ArrowRight } from "lucide-react";
import { Linkedin, Youtube, Facebook } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
export default function Footer(){
   const navigate = useNavigate();
    return(
        <footer className="w-full bg-[#3b0d6b] text-white px-6 py-16">

      <div className="max-w-7xl mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* LOGO + SOCIAL */}
          <div>
            <img src="/HomeImage/inputify.png" className="relative right-[10px] w-[200px] lg:w-[200px] sm:w-[100px]"></img>

            <div className="flex gap-4 text-xl">
              <Linkedin className="cursor-pointer" />
              <span className="cursor-pointer">X</span>
              <Youtube className="cursor-pointer" />
              <Facebook className="cursor-pointer" />
            </div>
          </div>

          {/* COLUMN 1 */}
          <div>
            <h4 className="text-pink-400 font-semibold mb-4">What we do</h4>
            <p>
              We provide access to a verified panel of users, ensuring every survey response comes from genuine participants. Launch surveys instantly and reach the right audience with advanced targeting and quota control.
            </p>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h4 className="text-pink-400 font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li onClick={() => navigate("/why-cfr")} className="cursor-pointer hover:text-pink-400">Why CFR</li>
              <li onClick={() => navigate("/solutions")} className="cursor-pointer hover:text-pink-400">Solutions</li>
              <li onClick={() => navigate("/products")} className="cursor-pointer hover:text-pink-400">Products</li>
              <li onClick={() => navigate("/company")} className="cursor-pointer hover:text-pink-400">Company</li>
              
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h4 className="text-pink-400 font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Survey Dashboard</li>
              <li>Audience Panel</li>
              <li>Events</li>
              <li>Reports & Analytics</li>
              <li>Rewards & Wallet</li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div>
            <h4 className="text-pink-400 font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li onClick={() => navigate("/company")} className="cursor-pointer hover:text-pink-400">Contact Us</li>
              <li>Terms & Conditions</li>
              <li>Panel Book</li>
              
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/20 my-10"></div>

        {/* LINKS */}
        <div className="flex flex-wrap gap-6 text-sm text-white/80 mb-6">
          <span>Privacy notice</span>
          <span>Cookie notice</span>
          <span>System status</span>
          <span>Need help taking surveys?</span>
        </div>

        {/* BOTTOM */}
        <div className="text-sm text-white/70">
          © Copyright 2026 – Inputify Group. All Rights Reserved
        </div>

      </div>
    </footer>
    )
} 