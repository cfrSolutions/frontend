import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function AdminProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    const res = await api.get(`/admin/project/${id}`);
    setProject(res.data);
  };

  if (!project) return <p>Loading...</p>;

  const steps = [
    "Project Created",
    "Cost Accepted",
    "Testing Setup",
    "Live",
    "Hold",
    "Completed",
  ];

  const getStep = () => {
    switch (project.status) {
      case "DRAFT":
        return 0;
      case "LIVE":
        return 1; // 👉 COST ACCEPTED PHASE
      case "HOLD":
        return 4;
      case "CLOSED":
        return 5;
      default:
        return 0;
    }
  };

  const activeStep = getStep();

  const base = import.meta.env.VITE_API_URL;

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-2">
        Project Detail
      </h1>

      {/* TIMELINE */}
      <div className="flex justify-between mb-10">
        {steps.map((step, i) => (
          <div key={i} className="flex-1 text-center">
            <div
              className={`w-4 h-4 mx-auto rounded-full mb-2 ${
                i <= activeStep ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
            <p className="text-xs">{step}</p>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="border rounded-2xl p-6 w-[350px] mb-6">
        <h3 className="font-semibold mb-4">Summary</h3>

        <div className="text-sm space-y-1">
          <p>Sector – {project.sector}</p>
          <p>Market – {project.market}</p>
          <p>Age – {project.ageFrom} to {project.ageTo}</p>
          <p>Completes – {project.completes}</p>
        </div>
      </div>

      {/* 🔥 REDIRECTS (ONLY AFTER ACCEPT) */}
      {project.status === "LIVE" && project.redirects && (
        <div className="space-y-2">

          <h3 className="font-semibold mb-2">Redirect Links</h3>

          <LinkBox
            label="Complete"
            url={`${base}/api/survey/c?tk=${project.redirects.complete?.token}`}
          />

          <LinkBox
            label="Disqualified"
            url={`${base}/api/survey/dq?tk=${project.redirects.disqualified?.token}`}
          />

          <LinkBox
            label="Quota Full"
            url={`${base}/api/survey/qf?tk=${project.redirects.quotaFull?.token}`}
          />

        </div>
      )}

    </div>
  );
}

function LinkBox({ label, url }) {
  return (
    <div className="flex justify-between border p-2 rounded">
      <span>{label}</span>
      <input value={url} readOnly className="text-xs w-[250px]" />
    </div>
  );
}