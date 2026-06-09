import { useState } from "react";
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
     </div>
)
}