import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ProjectDetail() {
const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] =
    useState(null);

  useEffect(() => {

    api
      .get(`/projects/${id}`)
      .then((res) =>
        setProject(res.data)
      );

  }, [id]);

  if (!project) return null;

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        {project.name}
      </h1>

      {project.targetGroups?.length === 0 ? (

        <div
          className="
          mt-10
          bg-slate-50
          rounded-xl
          p-20
          text-center
          "
        >
          <h2 className="text-3xl mb-4">
            No target groups
          </h2>

          <button
           onClick={() =>
    navigate(
      `/business/dashboard/project/${project._id}/target-group/new`
    )
  }
            className="
            bg-purple-700
            text-white
            px-6
            py-3
            rounded-lg
            "
          >
            Add target group
          </button>

        </div>

      ) : (

          <div className="mt-8 bg-white rounded-xl overflow-hidden">

    <div className="grid grid-cols-8 px-6 py-4 border-b text-xs font-semibold uppercase">
      <div>Target Group</div>
      <div>Status</div>
      <div>Progress</div>
      <div>CPI</div>
      <div>CR</div>
      <div>IR</div>
      <div>LOI</div>
      <div>DOR</div>
    </div>

    {project.targetGroups.map((group) => (
      <div
        key={group._id}
        className="grid grid-cols-8 px-6 py-5 border-b"
      >
        <div>{group.name}</div>

        <div>{group.status}</div>

        <div>
          0 / {group.targetCompletes}
        </div>

        <div>${group.cpi}</div>

        <div>-</div>

        <div>{group.incidence}%</div>

        <div>{group.loi} min</div>

        <div>-</div>
      </div>
    ))}

  </div>

      )}

    </div>
  );
}