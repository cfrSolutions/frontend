import {useLocation} from "react-router-dom";

export default function ProjectStatus(){
    const {state} = useLocation();
    const project = state?.project;
    const steps = [
        "Project Created",
        "Cost Accepted",
        "Testing Setup",
        "Live",
        "Hold",
        "Completed",
    ];

    const getStep = () =>{
        switch(project?.status){
            case "DRAFT":
                return 0;
            case "LIVE":
                return 3;
            case "HOLD":
                return 4;
            case "CLOSED":
                return 5;
            default:
                return 0;
        }
    };

    const activeStep = getStep();
    
    return (
        <div className="p-8">

      <h1 className="text-2xl font-bold mb-2">
        Congratulations
      </h1>

      <p className="text-gray-500 mb-8">
        Your project has been successfully sent for review.
      </p>

      {/* TIMELINE */}
      <div className="flex items-center justify-between mb-10">

        {steps.map((step, i) => (
          <div key={i} className="flex-1 text-center">

            <div
              className={`w-4 h-4 mx-auto rounded-full mb-2 ${
                i <= activeStep
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            />

            <p className="text-xs">{step}</p>

          </div>
        ))}

      </div>

      {/* SUMMARY */}
      <div className="border rounded-2xl p-6 w-[350px]">
        <h3 className="font-semibold mb-4">Summary</h3>

        <div className="text-sm space-y-1">
          <p>Sector – {project?.sector}</p>
          <p>Market – {project?.market}</p>
          <p>Age – {project?.ageFrom} to {project?.ageTo}</p>
          <p>Gender – {project?.gender}</p>
          <p>Completes – {project?.completes}</p>
          <p>Incidence – {project?.incidence}%</p>
          <p>LOI – {project?.loi} mins</p>
          <p>Open Ended – {project?.openEnded}</p>
          <p>
            Devices – {Object.keys(project?.devices || {})
              .filter(k => project.devices[k])
              .join(", ")}
          </p>
          <p>Timeline – {project?.timeline} days</p>
          <p>Budget – ${project?.budget}</p>
        </div>
      </div>

    </div>
    );
}