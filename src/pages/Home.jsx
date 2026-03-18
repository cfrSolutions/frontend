import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url("/HomeImage/SurveyPanel.png")`,
      }}
    >
      {/* CFR Logo */}
      <img
        src="/HomeImage/cfr.png"
        alt="CFR Solutions"
        className="absolute top-6 left-6 w-24 z-10"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-[150px] text-emerald-900 font-bold mb-12">
          CFR Survey Panel
        </h1>

        <div className="flex gap-8">
          <button
            onClick={() => navigate("/register")}
            className="px-10 py-4 bg-white rounded-2xl border shadow-md hover:shadow-lg transition"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-10 py-4 bg-white rounded-2xl border shadow-md hover:shadow-lg transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
