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
        className="absolute top-4 left-4 w-16 sm:w-20 md:w-24 z-10"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[120px] text-emerald-900 font-bold mb-8">
          CFR Survey Panel
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-white rounded-2xl border shadow-md hover:shadow-lg transition w-48"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-white rounded-2xl border shadow-md hover:shadow-lg transition w-48"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
