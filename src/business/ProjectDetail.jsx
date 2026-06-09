import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProjectDetail() {

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

        <div>
          Target groups table here
        </div>

      )}

    </div>
  );
}