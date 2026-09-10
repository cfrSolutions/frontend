import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../services/api";

export default function AdminTargetGroupDetail() {

  const {
    id,
    targetGroupId,
  } = useParams();

  const navigate =
    useNavigate();

  const [project, setProject] =
    useState(null);

  const [group, setGroup] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("vendor");


  // =====================================================
  // FETCH PROJECT
  // =====================================================

  useEffect(() => {

    const loadProject = async () => {

      try {

        setLoading(true);

        const res =
          await api.get(
            `/admin/project/${id}`,
            {
              withCredentials: true,
            }
          );

        const projectData =
          res.data;

        setProject(
          projectData
        );


        const foundGroup =
          projectData.targetGroups?.find(
            (item) =>
              String(item._id) ===
              String(targetGroupId)
          );


        setGroup(
          foundGroup || null
        );

      } catch (error) {

        // console.error(
        //   "FAILED TO LOAD TARGET GROUP:",
        //   error
        // );

      } finally {

        setLoading(false);

      }

    };

    loadProject();

  }, [
    id,
    targetGroupId,
  ]);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="p-8">
        Loading target group...
      </div>
    );

  }


  if (!project || !group) {

    return (
      <div className="p-8">

        <h2 className="
          text-xl
          font-bold
        ">
          Target group not found
        </h2>

        <button
          onClick={() =>
            navigate(
              `/superadmin/dashboard/project/${id}`
            )
          }
          className="
            mt-4
            px-5
            py-2
            bg-purple-700
            text-white
            rounded-lg
          "
        >
          Back to Project
        </button>

      </div>
    );

  }


  // =====================================================
  // TARGET DATA
  // =====================================================

  const target =
    Number(
      group.targetCompletes
    ) || 0;

  const completes =
    Number(
      group.completes
    ) || 0;

  const remaining =
    Math.max(
      target -
      completes,
      0
    );


  // =====================================================
  // REDIRECT URLS
  // =====================================================

  const redirects =
    group.redirects || {};

    const base = (
  import.meta.env.VITE_API_URL || ""
).replace(/\/$/, "");

const businessRedirects = {
  start: redirects.start?.token
    ? `${base}/redirect/start?tk=${redirects.start.token}`
    : "",

  complete: redirects.complete?.token
    ? `${base}/redirect/c?tk=${redirects.complete.token}&RID={RID}`
    : "",

  disqualified: redirects.disqualified?.token
    ? `${base}/redirect/dq?tk=${redirects.disqualified.token}&RID={RID}`
    : "",

  quotaFull: redirects.quotaFull?.token
    ? `${base}/redirect/qf?tk=${redirects.quotaFull.token}&RID={RID}`
    : "",
};

  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="
      p-6
      max-w-7xl
      mx-auto
    ">


      {/* =================================================
          BACK
      ================================================= */}

      <button
        onClick={() =>
          navigate(
            `/superadmin/dashboard/project/${project._id}`
          )
        }
        className="
          mb-5
          text-sm
          text-purple-700
          hover:underline
        "
      >
        ← Back to Project
      </button>


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8">

        <h1 className="
          text-3xl
          font-bold
        ">
          {group.name ||
            "Target Group"}
        </h1>

        <p className="
          text-gray-500
          mt-1
        ">
          Project:{" "}
          {project.name}
        </p>

      </div>


      {/* =================================================
          TARGET GROUP INFORMATION
      ================================================= */}

      <div className="
        bg-white
        border
        rounded-xl
        p-6
      ">

        <h2 className="
          text-lg
          font-bold
          mb-6
        ">
          Target Group Information
        </h2>


        <div className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-6
        ">

          <Info
            label="Status"
            value={
              group.status ||
              "DRAFT"
            }
          />

          <Info
            label="Target Group ID"
            value={
              group._id
            }
          />

          <Info
            label="Target Completes"
            value={target}
          />

          <Info
            label="Completes"
            value={completes}
          />

        </div>

      </div>


      {/* =================================================
          TABS
      ================================================= */}

      <div className="
        mt-6
        bg-white
        border
        rounded-xl
        overflow-hidden
      ">

        <div className="
          flex
          border-b
        ">

          <button
            onClick={() =>
              setActiveTab(
                "vendor"
              )
            }
            className={`
              px-6
              py-4
              font-medium
              ${
                activeTab === "vendor"
                  ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                  : "text-gray-600"
              }
            `}
          >
            Vendor Links
          </button>


          <button
            onClick={() =>
              setActiveTab(
                "business"
              )
            }
            className={`
              px-6
              py-4
              font-medium
              ${
                activeTab === "business"
                  ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                  : "text-gray-600"
              }
            `}
          >
            Business Redirects
          </button>

        </div>


        {/* =================================================
            VENDOR LINKS
        ================================================= */}

        {activeTab === "vendor" && (

          <div className="p-6">

            <h2 className="
              text-lg
              font-bold
              mb-2
            ">
              Vendor Redirect Configuration
            </h2>

            <p className="
              text-sm
              text-gray-500
              mb-6
            ">
              Vendor links for this target group.
            </p>


            <div className="
              space-y-4
            ">

              <ReadOnlyField
                label="Vendor Name"
                value={
                  group.vendorName ||
                  project.vendorLinks?.[0]?.vendorName ||
                  ""
                }
              />

              <ReadOnlyField
                label="Capture URL"
                value={
                  group.captureUrl ||
                  project.vendorLinks?.[0]?.capture ||
                  ""
                }
              />

              <ReadOnlyField
                label="Complete URL"
                value={
                  group.completeUrl ||
                  project.vendorLinks?.[0]?.complete ||
                  ""
                }
              />

              <ReadOnlyField
                label="Disqualified URL"
                value={
                  group.disqualifiedUrl ||
                  project.vendorLinks?.[0]?.disqualified ||
                  ""
                }
              />

              <ReadOnlyField
                label="Quota Full URL"
                value={
                  group.quotaFullUrl ||
                  project.vendorLinks?.[0]?.quotaFull ||
                  ""
                }
              />

            </div>

          </div>

        )}


        {/* =================================================
            BUSINESS REDIRECTS
        ================================================= */}

        {activeTab === "business" && (

          <div className="p-6">

            <h2 className="
              text-lg
              font-bold
              mb-2
            ">
              Business Generated Redirects
            </h2>

            <p className="
              text-sm
              text-gray-500
              mb-6
            ">
              These URLs are generated by the Business panel and are read-only.
            </p>


            {/* SURVEY LINKS */}

            <h3 className="
              font-semibold
              mb-3
            ">
              Survey Links
            </h3>

            <div className="
              space-y-3
            ">

              <ReadOnlyField
                label="Test Survey"
                value={
                  group.surveyLinks?.test ||
                  ""
                }
              />

              <ReadOnlyField
                label="Live Survey"
                value={
                  group.surveyLinks?.live ||
                  ""
                }
              />

            </div>


            {/* REDIRECTS */}

            <h3 className="
              font-semibold
              mt-7
              mb-3
            ">
              Redirect URLs
            </h3>

            <div className="
              space-y-3
            ">

              {/* <ReadOnlyField
                label="Start URL"
                value={
                  redirects.start?.url ||
                  ""
                }
              />

              <ReadOnlyField
                label="Complete"
                value={
                  redirects.complete?.url ||
                  ""
                }
              />

              <ReadOnlyField
                label="Disqualified"
                value={
                  redirects.disqualified?.url ||
                  ""
                }
              />

              <ReadOnlyField
                label="Quota Full"
                value={
                  redirects.quotaFull?.url ||
                  ""
                }
              /> */}
              <ReadOnlyField
  label="Start URL"
  value={businessRedirects.start}
/>

<ReadOnlyField
  label="Complete"
  value={businessRedirects.complete}
/>

<ReadOnlyField
  label="Disqualified"
  value={businessRedirects.disqualified}
/>

<ReadOnlyField
  label="Quota Full"
  value={businessRedirects.quotaFull}
/>
            </div>

          </div>

        )}

      </div>


      {/* =================================================
          TARGET GROUP STATISTICS
      ================================================= */}

      <div className="mt-8">

        <h2 className="
          text-lg
          font-bold
          mb-4
        ">
          Target Group Statistics
        </h2>


        <div className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-6
          gap-4
        ">

          <Stat
            label="Target Completes"
            value={target}
          />

          <Stat
            label="Completes"
            value={completes}
          />

          <Stat
            label="Remaining"
            value={remaining}
          />

          <Stat
            label="DQ"
            value={
              group.disqualified ||
              0
            }
          />

          <Stat
            label="QF"
            value={
              group.quotaFull ||
              0
            }
          />

          <Stat
            label="Total Responses"
            value={
              group.totalResponses ||
              0
            }
          />

        </div>

      </div>

    </div>

  );
}


// =====================================================
// INFO
// =====================================================

function Info({
  label,
  value,
}) {
  return (
    <div>

      <p className="
        text-sm
        text-gray-500
      ">
        {label}
      </p>

      <p className="
        font-semibold
        mt-1
        break-all
      ">
        {value}
      </p>

    </div>
  );
}


// =====================================================
// READ ONLY FIELD
// =====================================================

function ReadOnlyField({
  label,
  value,
}) {
  return (
    <div>

      <label className="
        block
        text-sm
        font-medium
        mb-2
      ">
        {label}
      </label>

      <input
        value={value || ""}
        readOnly
        className="
          w-full
          border
          rounded-lg
          px-4
          py-3
          bg-gray-50
          text-sm
        "
      />

    </div>
  );
}


// =====================================================
// STAT
// =====================================================

function Stat({
  label,
  value,
}) {
  return (
    <div className="
      bg-white
      border
      rounded-lg
      p-4
    ">

      <p className="
        text-xs
        uppercase
        text-gray-500
      ">
        {label}
      </p>

      <p className="
        text-2xl
        font-bold
        mt-1
      ">
        {value}
      </p>

    </div>
  );
}