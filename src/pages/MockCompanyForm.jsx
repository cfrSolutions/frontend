import { useSearchParams } from "react-router-dom";

export default function MockCompanyForm() {
  const [params] = useSearchParams();

  // 🔑 get FIRST param dynamically
  const paramEntries = Array.from(params.entries());
  const [paramName, responseId] = paramEntries[0] || [];

  if (!responseId) {
    return <h2 style={{ color: "red" }}>Response ID missing</h2>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🧪 Mock Company Survey</h1>

      <p>
        Param: <b>{paramName}</b>
      </p>
      <p>
        Response ID: <b>{responseId}</b>
      </p>

      <p>Simulate company decision:</p>

      <div style={{ display: "flex", gap: 20 }}>
        <button
          onClick={() =>
    window.location.href =
      `${import.meta.env.VITE_API_URL}/return/complete?uid=${responseId}`
  }
        >
          ✅ Complete
        </button>

        <button
         onClick={() =>
    window.location.href =
      `${import.meta.env.VITE_API_URL}/return/screenout?uid=${responseId}`
  }
        >
          ❌ Screenout
        </button>

        <button
          onClick={() =>
    window.location.href =
      `${import.meta.env.VITE_API_URL}/return/quota?uid=${responseId}`
  }
        >
          🚫 Quota Full
        </button>
      </div>
    </div>
  );
}
