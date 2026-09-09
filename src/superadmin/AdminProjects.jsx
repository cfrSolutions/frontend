// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function AdminProjects() {
//   const [projects, setProjects] = useState([]);
//   const navigate = useNavigate();

//   const fetchProjects = async () => {
//     try {
//       const res = await api.get("/admin/projects", {
//         withCredentials: true,
//       });

//       setProjects(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">
//         Projects
//       </h1>

//       <div className="space-y-4">
//         {projects.map((project) => (
//           <div
//             key={project._id}
//             onClick={() =>
//               navigate(
//                 `/superadmin/dashboard/project/${project._id}`
//               )
//             }
//             className="border rounded-xl p-5 bg-white cursor-pointer hover:bg-gray-50"
//           >
//             <h2 className="font-bold text-lg">
//               {project.name}
//             </h2>

//             <p className="text-gray-500">
//               {project.business?.email}
//             </p>

//             <p>
//               Survey ID:
//               {" "}
//               {project.surveyId}
//             </p>

//             <p>
//               Status:
//               {" "}
//               <b>{project.status}</b>
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedBusiness, setExpandedBusiness] =
    useState(null);

  const navigate = useNavigate();

  // =====================================================
  // FETCH ALL PROJECTS
  // =====================================================

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        "/admin/projects",
        {
          withCredentials: true,
        }
      );

      console.log(
        "ADMIN PROJECTS:",
        res.data
      );

      setProjects(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (err) {
      console.error(
        "FETCH ADMIN PROJECTS ERROR:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // =====================================================
  // GROUP PROJECTS BY BUSINESS
  // =====================================================

  const businesses = useMemo(() => {
    const grouped = {};

    projects.forEach((project) => {
      const businessId =
        project.business?._id ||
        project.business ||
        "unknown";

      const businessName =
        project.business?.name ||
        "Unknown Business";

      const businessEmail =
        project.business?.email ||
        "";

      if (!grouped[businessId]) {
        grouped[businessId] = {
          id: businessId,
          name: businessName,
          email: businessEmail,
          projects: [],
        };
      }

      grouped[businessId].projects.push(
        project
      );
    });

    return Object.values(grouped);
  }, [projects]);

  // =====================================================
  // TOGGLE BUSINESS
  // =====================================================

  const toggleBusiness = (
    businessId
  ) => {
    setExpandedBusiness(
      expandedBusiness === businessId
        ? null
        : businessId
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Projects
        </h1>

        <p className="mt-4 text-gray-500">
          Loading projects...
        </p>
      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="p-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <p className="text-gray-500 mt-1">
          Projects organized by business
        </p>

        <div className="mt-3 text-sm text-gray-500">
          {businesses.length} Businesses
          {" · "}
          {projects.length} Projects
        </div>
      </div>

      {/* =================================================
          NO PROJECTS
      ================================================= */}

      {businesses.length === 0 ? (
        <div className="border rounded-xl p-8 bg-white text-gray-500">
          No projects found.
        </div>
      ) : (
        <div className="space-y-4">

          {businesses.map(
            (business) => {

              const isExpanded =
                expandedBusiness ===
                business.id;

              return (
                <div
                  key={business.id}
                  className="
                    bg-white
                    border
                    rounded-2xl
                    overflow-hidden
                  "
                >

                  {/* ======================================
                      BUSINESS HEADER
                  ====================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      toggleBusiness(
                        business.id
                      )
                    }
                    className="
                      w-full
                      px-6
                      py-5
                      flex
                      items-center
                      justify-between
                      text-left
                      hover:bg-gray-50
                    "
                  >

                    <div className="flex items-center gap-4">

                      {/* ARROW */}

                      <span className="text-xl">
                        {isExpanded
                          ? "⌄"
                          : "›"}
                      </span>

                      {/* BUSINESS INFO */}

                      <div>
                        <h2 className="text-lg font-bold text-slate-900">
                          {business.name}
                        </h2>

                        {business.email && (
                          <p className="text-sm text-gray-500 mt-1">
                            {business.email}
                          </p>
                        )}
                      </div>

                    </div>

                    {/* PROJECT COUNT */}

                    <div className="
                      px-4
                      py-2
                      rounded-full
                      bg-purple-50
                      text-purple-700
                      text-sm
                      font-semibold
                    ">
                      {business.projects.length}
                      {" "}
                      {business.projects.length === 1
                        ? "Project"
                        : "Projects"}
                    </div>

                  </button>

                  {/* ======================================
                      BUSINESS PROJECTS
                  ====================================== */}

                  {isExpanded && (
                    <div className="
                      border-t
                      bg-slate-50
                      p-5
                    ">

                      <div className="space-y-3">

                        {business.projects.map(
                          (project) => {

                            const completes =
                              project.completes ||
                              0;

                            const target =
                              project.targetCompletes ||
                              0;

                            const progress =
                              target > 0
                                ? Math.min(
                                    (completes /
                                      target) *
                                      100,
                                    100
                                  )
                                : 0;

                            return (
                              <div
                                key={
                                  project._id
                                }
                                onClick={() =>
                                  navigate(
                                    `/superadmin/dashboard/project/${project._id}`
                                  )
                                }
                                className="
                                  bg-white
                                  border
                                  rounded-xl
                                  p-5
                                  cursor-pointer
                                  hover:border-purple-400
                                  hover:shadow-sm
                                  transition
                                "
                              >

                                {/* ==================================
                                    PROJECT HEADER
                                ================================== */}

                                <div className="
                                  flex
                                  items-start
                                  justify-between
                                  gap-4
                                ">

                                  <div>

                                    <h3 className="
                                      text-lg
                                      font-bold
                                      text-purple-800
                                    ">
                                      {project.name ||
                                        "Unnamed Project"}
                                    </h3>

                                    <p className="
                                      text-sm
                                      text-gray-500
                                      mt-1
                                    ">
                                      Survey ID:{" "}
                                      {project.surveyId ||
                                        "-"}
                                    </p>

                                  </div>

                                  {/* STATUS */}

                                  <span className="
                                    px-3
                                    py-1
                                    rounded-full
                                    border
                                    text-xs
                                    font-medium
                                  ">
                                    {project.status ||
                                      "DRAFT"}
                                  </span>

                                </div>

                                {/* ==================================
                                    PROJECT STATS
                                ================================== */}

                                <div className="
                                  grid
                                  grid-cols-2
                                  md:grid-cols-4
                                  gap-4
                                  mt-5
                                ">

                                  <Stat
                                    label="Completes"
                                    value={
                                      `${completes} / ${target}`
                                    }
                                  />

                                  <Stat
                                    label="Disqualified"
                                    value={
                                      project.disqualified ||
                                      0
                                    }
                                  />

                                  <Stat
                                    label="Quota Full"
                                    value={
                                      project.quotaFull ||
                                      0
                                    }
                                  />

                                  <Stat
                                    label="Responses"
                                    value={
                                      project.totalResponses ||
                                      0
                                    }
                                  />

                                </div>

                                {/* ==================================
                                    PROGRESS
                                ================================== */}

                                <div className="mt-5">

                                  <div className="
                                    flex
                                    justify-between
                                    text-xs
                                    text-gray-500
                                    mb-2
                                  ">
                                    <span>
                                      Project Progress
                                    </span>

                                    <span>
                                      {Math.round(
                                        progress
                                      )}%
                                    </span>
                                  </div>

                                  <div className="
                                    h-2
                                    bg-purple-100
                                    rounded-full
                                    overflow-hidden
                                  ">
                                    <div
                                      className="
                                        h-full
                                        bg-purple-700
                                        rounded-full
                                      "
                                      style={{
                                        width:
                                          `${progress}%`,
                                      }}
                                    />
                                  </div>

                                </div>

                                {/* ==================================
                                    TARGET GROUP COUNT
                                ================================== */}

                                <div className="
                                  mt-4
                                  pt-4
                                  border-t
                                  flex
                                  justify-between
                                  text-sm
                                ">

                                  <span className="text-gray-500">
                                    Target Groups
                                  </span>

                                  <span className="
                                    font-semibold
                                    text-slate-900
                                  ">
                                    {
                                      project
                                        .targetGroups
                                        ?.length || 0
                                    }
                                  </span>

                                </div>

                              </div>
                            );
                          }
                        )}

                      </div>

                    </div>
                  )}

                </div>
              );
            }
          )}

        </div>
      )}

    </div>
  );
}


// =====================================================
// STAT COMPONENT
// =====================================================

function Stat({
  label,
  value,
}) {
  return (
    <div className="
      border
      rounded-lg
      p-3
      bg-slate-50
    ">
      <p className="
        text-xs
        uppercase
        text-gray-500
      ">
        {label}
      </p>

      <p className="
        text-lg
        font-bold
        mt-1
      ">
        {value}
      </p>
    </div>
  );
}