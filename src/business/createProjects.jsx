import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateProjects(){
     const navigate = useNavigate();
    const [showProjectModal, setShowProjectModal] = useState(false);

const [projectForm, setProjectForm] = useState({
  name: "",
  description: "",
});

const createProject = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const res = await api.post(
      "/projects/create",
      {
        name: projectForm.name,
        description:
          projectForm.description,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    navigate(
      `/business/dashboard/project/${res.data._id}`
    );

  } catch (err) {
    console.log(err);
  }
};

const [projects, setProjects] = useState([]);

const fetchProjects = async () => {
  const res = await api.get("/projects");
  setProjects(res.data);
};

useEffect(() => {
  fetchProjects();
}, []);
const [expanded, setExpanded] = useState(null);

const toggleProject = (projectId) => {
  setExpanded(
    expanded === projectId
      ? null
      : projectId
  );
};

return(
     <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <button
  onClick={() => setShowProjectModal(true)}
  className="
  bg-purple-700
  text-white
  px-6
  py-3
  rounded-lg
  font-semibold
  "
>
  Create Project
</button>
{showProjectModal && (
  <>
    <div
      className="fixed inset-0 bg-black/40 z-40"
      onClick={() => setShowProjectModal(false)}
    />

    <div
      className="
      fixed
      top-1/2
      left-1/2
      -translate-x-1/2
      -translate-y-1/2
      bg-white
      rounded-2xl
      shadow-2xl
      w-[95%]
      max-w-xl
      z-50
      p-8
      "
    >
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        New Project
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Project Name *
        </label>

        <input
          type="text"
          value={projectForm.name}
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              name: e.target.value,
            })
          }
          placeholder="Enter project name"
          className="
          w-full
          border
          border-slate-300
          rounded-xl
          px-4
          py-3
          focus:ring-2
          focus:ring-orange-200
          focus:border-orange-500
          outline-none
          "
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          Description
        </label>

        <textarea
          rows={4}
          value={projectForm.description}
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              description: e.target.value,
            })
          }
          placeholder="Optional description"
          className="
          w-full
          border
          border-slate-300
          rounded-xl
          px-4
          py-3
          resize-none
          focus:ring-2
          focus:ring-orange-200
          focus:border-orange-500
          outline-none
          "
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowProjectModal(false)}
          className="
          px-6
          py-3
          border
          rounded-xl
          "
        >
          Cancel
        </button>

        <button
          onClick={createProject}
          className="
          px-6
          py-3
          bg-orange-500
          hover:bg-orange-600
          text-white
          rounded-xl
          font-semibold
          "
        >
          Create Project
        </button>
      </div>
    </div>
  </>
)}

<div className="mt-10 bg-white rounded-xl overflow-hidden">

  {/* HEADER */}
  <div
    className="
    grid
    grid-cols-5
    px-6
    py-4
    text-xs
    font-semibold
    uppercase
    text-slate-500
    border-b
    "
  >
    <div>Project</div>
    <div>Last Activity</div>
    <div>Completes</div>
    <div>Prescreens</div>
    <div>Statistics</div>
  </div>

  {projects.map((project) => (
    <div
      key={project._id}
      className="border-b border-slate-200"
    >

      {/* PROJECT ROW */}
      <div
        onClick={() =>
          toggleProject(project._id)
        }
        className="
        grid
        grid-cols-5
        items-center
        px-6
        py-6
        cursor-pointer
        hover:bg-slate-50
        "
      >

        {/* PROJECT */}
        <div className="flex items-center gap-4">

          <span className="text-xl">
            {expanded === project._id
              ? "⌄"
              : "›"}
          </span>

          <div>
            <h3 className="font-bold text-xl text-purple-900">
              {project.name}
            </h3>

            <div className="flex items-center gap-3 mt-1">

              <span
                className="
                text-xs
                px-3
                py-1
                border
                rounded-full
                "
              >
                Inactive
              </span>

              <span className="text-slate-500 text-sm">
                {project.surveyId}
              </span>

            </div>

          </div>

        </div>

        {/* LAST ACTIVITY */}
        <div className="text-slate-400">
          —
        </div>

        {/* COMPLETES */}
        <div>

          <div className="h-2 bg-purple-100 rounded-full mb-2">
            <div
              className="h-2 bg-purple-700 rounded-full"
              style={{
                width: "0%",
              }}
            />
          </div>

          <div className="font-semibold">
            {project.completes || 0}
            /
            {project.targetCompletes || 0}
          </div>

        </div>

        {/* PRESCREENS */}
        <div>

          <div className="h-2 bg-purple-100 rounded-full mb-2">
            <div
              className="h-2 bg-purple-700 rounded-full"
              style={{
                width: "0%",
              }}
            />
          </div>

          <div className="font-semibold">
            0 / 0
          </div>

        </div>

        {/* STATISTICS */}
        <div className="text-2xl">
          📊
        </div>

      </div>

      {/* TARGET GROUPS */}
      {expanded === project._id && (

        <div className="bg-slate-50 px-8 py-6">

          <div
            className="
            grid
            grid-cols-8
            text-xs
            uppercase
            text-slate-500
            pb-4
            border-b
            "
          >
            <div>Target Group</div>
            <div>Status</div>
            <div>Progress</div>
            <div>CPI</div>
            <div>CR</div>
            <div>IR</div>
            <div>LOI</div>
            <div>DOR</div>
          </div>

          {project.targetGroups?.length > 0 ? (

            project.targetGroups.map(
              (group) => (

                <div
                  key={group._id}
                  className="
                  grid
                  grid-cols-8
                  py-5
                  items-center
                  border-b
                  "
                >

                  <div>

                    <div className="font-semibold">
                      {group.name}
                    </div>

                    <div className="text-sm text-slate-500">
                      {group._id?.slice(-6)}
                    </div>

                  </div>

                  <div>

                    <span
                      className="
                      px-3
                      py-1
                      border
                      rounded-full
                      text-xs
                      "
                    >
                      {group.status ||
                        "Draft"}
                    </span>

                  </div>

                  <div>
                    0 /
                    {group.targetCompletes ||
                      0}
                  </div>

                  <div>
                    {group.cpi || "-"}
                  </div>

                  <div>-</div>

                  <div>
                    {group.incidence ||
                      "-"}
                  </div>

                  <div>
                    {group.loi || "-"}
                  </div>

                  <div>-</div>

                </div>

              )
            )

          ) : (

            <div className="py-6 text-slate-500">
              No target groups
            </div>

          )}

        </div>

      )}

    </div>
  ))}

</div>
     </div>
)
}