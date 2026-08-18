// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// export default function ProjectDetail() {
// const navigate = useNavigate();
//   const { id } = useParams();

//   const [project, setProject] =
//     useState(null);

//   useEffect(() => {

//     api
//       .get(`/projects/${id}`)
//       .then((res) =>
//         setProject(res.data)
//       );

//   }, [id]);

//   if (!project) return null;

//   return (
//     <div className="p-8">

//       <h1 className="text-3xl font-bold">
//         {project.name}
//       </h1>

//       {project.targetGroups?.length === 0 ? (

//         <div
//           className="
//           mt-10
//           bg-slate-50
//           rounded-xl
//           p-20
//           text-center
//           "
//         >
//           <h2 className="text-3xl mb-4">
//             No target groups
//           </h2>

//           <button
//            onClick={() =>
//     navigate(
//       `/business/dashboard/project/${project._id}/target-group/new`
//     )
//   }
//             className="
//             bg-purple-700
//             text-white
//             px-6
//             py-3
//             rounded-lg
//             "
//           >
//             Add target group
//           </button>

//         </div>

//       ) : (

//           <div className="mt-8 bg-white rounded-xl overflow-hidden">

//     <div className="grid grid-cols-8 px-6 py-4 border-b text-xs font-semibold uppercase">
//       <div>Target Group</div>
//       <div>Status</div>
//       <div>Progress</div>
//       <div>CPI</div>
//       <div>CR</div>
//       <div>IR</div>
//       <div>LOI</div>
//       <div>DOR</div>
//     </div>

//     {project.targetGroups.map((group) => (
//      <div
//   key={group._id}
//   onClick={() =>
//     navigate(
//       `/business/dashboard/project/${project._id}/target-group/${group._id}`
//     )
//   }
//   className="
//     grid
//     grid-cols-8
//     px-6
//     py-5
//     border-b
//     cursor-pointer
//     hover:bg-slate-50
//   "
// >
//         <div
//   onClick={() =>
//     navigate(
//       `/business/dashboard/project/${project._id}/target-group/${group._id}`
//     )
//   }
//   className="
//   cursor-pointer
//   text-purple-700
//   hover:underline
//   "
// >
//   {group.name}
// </div>

//         <div>{group.status}</div>

//         <div>
//           0 / {group.targetCompletes}
//         </div>

//         <div>${group.cpi}</div>

//         <div>-</div>

//         <div>{group.incidence}%</div>

//         <div>{group.loi} min</div>

//         <div>-</div>
//       </div>
//     ))}

//   </div>

//       )}

//     </div>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    api
      .get(`/projects/${id}`)
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => {
        console.error("Failed to load project:", err);
      });
  }, [id]);

  if (!project) return null;

  const hasTargetGroups =
    project.targetGroups &&
    project.targetGroups.length > 0;

  const addTargetGroup = () => {
    navigate(
      `/business/dashboard/project/${project._id}/target-group/new`
    );
  };

  return (
    <div className="p-8">

      {/* PROJECT HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {project.name}
          </h1>

          <p className="text-slate-500 mt-1">
            {project.surveyId}
          </p>
        </div>

        {/* ALWAYS SHOW ADD TARGET GROUP */}
        <button
          onClick={addTargetGroup}
          className="
            bg-purple-700
            hover:bg-purple-800
            text-white
            px-6
            py-3
            rounded-lg
            font-semibold
          "
        >
          + Add Target Group
        </button>
      </div>

      {/* NO TARGET GROUPS */}
      {!hasTargetGroups ? (
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

          <p className="text-slate-500 mb-6">
            Create your first target group to define your audience.
          </p>

          <button
            onClick={addTargetGroup}
            className="
              bg-purple-700
              hover:bg-purple-800
              text-white
              px-6
              py-3
              rounded-lg
              font-semibold
            "
          >
            Add Target Group
          </button>
        </div>
      ) : (

        /* TARGET GROUP TABLE */
        <div className="mt-8 bg-white rounded-xl overflow-hidden">

          <div className="
            grid
            grid-cols-8
            px-6
            py-4
            border-b
            text-xs
            font-semibold
            uppercase
            text-slate-500
          ">
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
              onClick={() =>
                navigate(
                  `/business/dashboard/project/${project._id}/target-group/${group._id}`
                )
              }
              className="
                grid
                grid-cols-8
                px-6
                py-5
                border-b
                cursor-pointer
                hover:bg-slate-50
              "
            >

              <div>
                <div className="
                  font-semibold
                  text-purple-700
                  hover:underline
                ">
                  {group.name}
                </div>

                <div className="text-sm text-slate-500">
                  {group._id?.slice(-6)}
                </div>
              </div>

              <div>
                {group.status}
              </div>

              <div>
                0 / {group.targetCompletes || 0}
              </div>

              <div>
                ${group.cpi || 0}
              </div>

              <div>
                -
              </div>

              <div>
                {group.incidence || "-"}%
              </div>

              <div>
                {group.loi || "-"} min
              </div>

              <div>
                -
              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}