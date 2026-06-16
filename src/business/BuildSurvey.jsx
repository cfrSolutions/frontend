// import { useState, useMemo } from "react";

// const URL_VARIABLES = [
//   { label: "Response ID", param: "RID" },
//   { label: "Bid Incidence", param: "BidIncidence" },
//   { label: "Panelist ID", param: "PID" },
//   { label: "Supplier ID", param: "SupplierID" },
//   { label: "Supplier Name", param: "SupplierName" },
//   { label: "MID", param: "MID" },
//   { label: "RSID", param: "RSID" },
// ];

// export default function BuildSurvey({
//   onApply,
// }) {
//   const [open, setOpen] =
//     useState(false);

//   const [baseUrl, setBaseUrl] =
//     useState("");

//   const [variables, setVariables] =
//     useState([
//       {
//         label: "Response ID",
//         param: "RID",
//       },
//     ]);

//     const [surveyUrl, setSurveyUrl] = useState("");

//   const addVariable = (item) => {
//     const exists = variables.find(
//       (v) => v.param === item.param
//     );

//     if (exists) return;

//     setVariables((prev) => [
//       ...prev,
//       item,
//     ]);
//   };

//   const removeVariable = (param) => {
//     if (param === "RID") return;

//     setVariables((prev) =>
//       prev.filter(
//         (v) => v.param !== param
//       )
//     );
//   };

//   const finalUrl = useMemo(() => {
//     if (!baseUrl) return "";

//     const separator =
//       baseUrl.includes("?")
//         ? "&"
//         : "?";

//     const params = variables
//       .map(
//         (v) =>
//           `${v.param}=[%${v.param}%]`
//       )
//       .join("&");

//     return `${baseUrl}${separator}${params}`;
//   }, [baseUrl, variables]);

//   return (
//     <>
//       <button
//         type="button"
//         onClick={() =>
//           setOpen(true)
//         }
//         className="
//           border
//           px-4
//           py-2
//           rounded-lg
//           bg-white
//           hover:bg-gray-50
//         "
//       >
//         Build URL
//       </button>

//       {open && (
//         <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">

//           <div
//             className="
//               w-full
//               max-w-2xl
//               bg-white
//               h-screen
//               overflow-auto
//               p-8
//             "
//           >
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-4xl font-semibold">
//                 Build URL
//               </h2>

//               <button
//                 onClick={() =>
//                   setOpen(false)
//                 }
//                 className="text-3xl"
//               >
//                 ×
//               </button>
//             </div>

//             <div>
//               <label className="block text-lg mb-3">
//                 What is your URL?
//               </label>

//               <input
//                 value={baseUrl}
//                 onChange={(e) =>
//                   setBaseUrl(
//                     e.target.value
//                   )
//                 }
//                 className="
//                   w-full
//                   border-b
//                   border-gray-400
//                   pb-2
//                   outline-none
//                   text-xl
//                 "
//                 placeholder="https://tally.so/r/xxxxx"
//               />
//             </div>

//             <div className="mt-10">
//               <h3 className="text-2xl mb-2">
//                 Variables
//               </h3>

//               <p className="text-gray-600 mb-5">
//                 These URL parameters
//                 will be appended to
//                 your survey link.
//               </p>

//               <details className="mb-6">
//                 <summary
//                   className="
//                     cursor-pointer
//                     border
//                     px-4
//                     py-3
//                     inline-flex
//                     items-center
//                     gap-2
//                     rounded-lg
//                   "
//                 >
//                   Add Variable
//                 </summary>

//                 <div
//                   className="
//                     mt-3
//                     border
//                     rounded-lg
//                     p-2
//                     max-h-80
//                     overflow-auto
//                   "
//                 >
//                   {URL_VARIABLES.map(
//                     (item) => (
//                       <button
//                         key={item.param}
//                         type="button"
//                         onClick={() =>
//                           addVariable(
//                             item
//                           )
//                         }
//                         className="
//                           w-full
//                           text-left
//                           px-3
//                           py-3
//                           hover:bg-gray-100
//                           rounded
//                         "
//                       >
//                         <div className="font-medium">
//                           {item.label}
//                         </div>

//                         <div className="text-sm text-gray-500">
//                           {item.param}
//                         </div>
//                       </button>
//                     )
//                   )}
//                 </div>
//               </details>

//               <div className="space-y-3">
//                 {variables.map(
//                   (item) => (
//                     <div
//                       key={item.param}
//                       className="
//                         grid
//                         grid-cols-[1fr_1fr_auto]
//                         gap-4
//                         bg-gray-100
//                         p-4
//                         rounded
//                       "
//                     >
//                       <div>
//                         {item.label}
//                       </div>

//                       <input
//                         value={
//                           item.param
//                         }
//                         readOnly
//                         className="
//                           bg-transparent
//                           outline-none
//                         "
//                       />

//                       {item.param !==
//                         "RID" && (
//                         <button
//                           onClick={() =>
//                             removeVariable(
//                               item.param
//                             )
//                           }
//                           className="text-red-500"
//                         >
//                           🗑
//                         </button>
//                       )}
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>

//             <div className="border-t mt-10 pt-8">
//               <h3 className="text-2xl mb-4">
//                 Final URL
//               </h3>

//               <textarea
//                 value={finalUrl}
//                 readOnly
//                 rows={5}
//                 className="
//                   w-full
//                   border
//                   p-4
//                   rounded-lg
//                 "
//               />
//             </div>

//             <div className="flex justify-end gap-4 mt-8">
//               <button
//                 onClick={() =>
//                   setOpen(false)
//                 }
//                 className="
//                   border
//                   px-6
//                   py-3
//                 "
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={() => {
//                   onApply?.(
//                     finalUrl
//                   );

//                   setOpen(false);
//                 }}
//                 className="
//                   bg-purple-700
//                   text-white
//                   px-6
//                   py-3
//                 "
//               >
//                 Apply URL
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }




import { useState, useMemo } from "react";
import { useEffect } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

const URL_VARIABLES = [
  { label: "Response ID", param: "RID" },
  { label: "Bid Incidence", param: "BidIncidence" },
  { label: "Panelist ID", param: "PID" },
  { label: "Supplier ID", param: "SupplierID" },
  { label: "Supplier Name", param: "SupplierName" },
  { label: "MID", param: "MID" },
  { label: "RSID", param: "RSID" },
];

const INDUSTRIES = [
  "Other",
  "Automotive",
  "Beauty/Cosmetics",
  "Beverages - Alcoholic",
  "Beverages - Non Alcoholic",
  "Education",
  "Electronics/Computer/Software",
  "Entertainment",
  "Explicit Content",
  "Fashion/Clothing",
  "Financial Services/Insurance",
  "Food",
  "Healthcare",
  "Home Improvement",
  "Hotels",
  "Legal",
  "Manufacturing",
  "Media",
  "Pharmaceutical",
  "Politics",
  "Restaurants",
  "Sensitive Content",
  "Sports",
  "Telecommunications",
  "Tobacco",
  "Toys",
  "Transportation/Shipping",
  "Travel",
  "Video Games",
  "Websites/Internet/E-Commerce",
];

const LOCKOUT_OPTIONS = [
  "No Lock Out",
  "Past 7 Days / 1 Week",
  "Past 30 Days / 1 Month",
  "Past 60 Days / 2 Months",
  "Past 90 Days / 3 Months",
];

export default function BuildSurvey({
  targetGroupName, user, onApply,
}) {


    const [form, setForm] = useState({
  targetGroupName: "",
  projectManager: user?.name || "",
  industry: "Other",
  industryLockout: "No Lock Out",
  securityClient: "",

  liveUrl: "",
  testUrl: "",
});
  const [open, setOpen] =
    useState(false);

  const [baseUrl, setBaseUrl] =
    useState("");

  const [variables, setVariables] =
    useState([
      {
        label: "Response ID",
        param: "RID",
      },
    ]);

    const [surveyUrl, setSurveyUrl] = useState("");
const [project, setProject] = useState(null);
const { projectId } = useParams();
const base = import.meta.env.VITE_API_URL;

useEffect(() => {
  const fetchProject = async () => {
    const res = await api.get(`/projects/${projectId}`);
    setProject(res.data);
  };

  fetchProject();
}, [projectId]);




useEffect(() => {
  const fetchProject = async () => {
    const res = await api.get(
      `/projects/${projectId}`
    );

    setProject(res.data);

    setForm((prev) => ({
      ...prev,
      liveUrl: res.data.surveyLinks?.live || "",
      testUrl: res.data.surveyLinks?.test || "",
    }));
  };

  fetchProject();
}, [projectId]);

  const addVariable = (item) => {
    const exists = variables.find(
      (v) => v.param === item.param
    );

    if (exists) return;

    setVariables((prev) => [
      ...prev,
      item,
    ]);
  };

  const removeVariable = (param) => {
    if (param === "RID") return;

    setVariables((prev) =>
      prev.filter(
        (v) => v.param !== param
      )
    );
  };

  const finalUrl = useMemo(() => {
    if (!baseUrl) return "";

    const separator =
      baseUrl.includes("?")
        ? "&"
        : "?";


        
    const params = variables
      .map(
        (v) =>
          `${v.param}=[%${v.param}%]`
      )
      .join("&");

    return `${baseUrl}${separator}${params}`;
  }, [baseUrl, variables]);

  useEffect(() => {
  if (user?.name) {
    setForm((prev) => ({
      ...prev,
      projectManager: user.name,
    }));
  }
}, [user]);

  return (
    <>

    <div className="space-y-6">

  <div>
    <label className="block text-sm font-medium mb-2">
      Target Group Name
    </label>

   <input
  value={targetGroupName || ""}
  readOnly
  className="w-full border-b pb-2"
/>
  </div>

  <div className="grid md:grid-cols-2 gap-6">

    <div>
      <label className="block text-sm font-medium mb-2">
        Project Manager
      </label>

      <input
        value={form.projectManager}
        readOnly
        className="w-full border-b pb-2 bg-transparent"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Security Client
      </label>

      <input
        value={form.securityClient}
        onChange={(e) =>
          setForm({
            ...form,
            securityClient: e.target.value,
          })
        }
        className="w-full border-b pb-2 outline-none"
      />
    </div>

  </div>

  <div className="grid md:grid-cols-2 gap-6">

    <div>
      <label className="block text-sm font-medium mb-2">
        Industry
      </label>

      <select
        value={form.industry}
        onChange={(e) =>
          setForm({
            ...form,
            industry: e.target.value,
          })
        }
        className="w-full border-b pb-2 bg-transparent"
      >
        {INDUSTRIES.map((industry) => (
          <option
            key={industry}
            value={industry}
          >
            {industry}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Industry Lock Out
      </label>

      <select
        value={form.industryLockout}
        onChange={(e) =>
          setForm({
            ...form,
            industryLockout:
              e.target.value,
          })
        }
        className="w-full border-b pb-2 bg-transparent"
      >
        {LOCKOUT_OPTIONS.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>

  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      Live URL
    </label>

    <textarea
      value={form.liveUrl}
      onChange={(e) =>
        setForm({
          ...form,
          liveUrl: e.target.value,
        })
      }
      rows={4}
      className="w-full border rounded p-3"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      Test URL
    </label>

    <textarea
      value={form.testUrl}
      onChange={(e) =>
        setForm({
          ...form,
          testUrl: e.target.value,
        })
      }
      rows={4}
      className="w-full border rounded p-3"
    />
  </div>

</div>
      <button
        type="button"
        onClick={() =>
          setOpen(true)
        }
        className="
          border
          px-4
          py-2
          rounded-lg
          bg-white
          hover:bg-gray-50
        "
      >
        Build URL
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">

          <div
            className="
              w-full
              max-w-2xl
              bg-white
              h-screen
              overflow-auto
              p-8
            "
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-semibold">
                Build URL
              </h2>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="text-3xl"
              >
                ×
              </button>
            </div>

            <div>
              <label className="block text-lg mb-3">
                What is your URL?
              </label>

              <input
                value={baseUrl}
                onChange={(e) =>
                  setBaseUrl(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border-b
                  border-gray-400
                  pb-2
                  outline-none
                  text-xl
                "
                placeholder="https://tally.so/r/xxxxx"
              />
            </div>

            <div className="mt-10">
              <h3 className="text-2xl mb-2">
                Variables
              </h3>

              <p className="text-gray-600 mb-5">
                These URL parameters
                will be appended to
                your survey link.
              </p>

              <details className="mb-6">
                <summary
                  className="
                    cursor-pointer
                    border
                    px-4
                    py-3
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                  "
                >
                  Add Variable
                </summary>

                <div
                  className="
                    mt-3
                    border
                    rounded-lg
                    p-2
                    max-h-80
                    overflow-auto
                  "
                >
                  {URL_VARIABLES.map(
                    (item) => (
                      <button
                        key={item.param}
                        type="button"
                        onClick={() =>
                          addVariable(
                            item
                          )
                        }
                        className="
                          w-full
                          text-left
                          px-3
                          py-3
                          hover:bg-gray-100
                          rounded
                        "
                      >
                        <div className="font-medium">
                          {item.label}
                        </div>

                        <div className="text-sm text-gray-500">
                          {item.param}
                        </div>
                      </button>
                    )
                  )}
                </div>
              </details>

              <div className="space-y-3">
                {variables.map(
                  (item) => (
                    <div
                      key={item.param}
                      className="
                        grid
                        grid-cols-[1fr_1fr_auto]
                        gap-4
                        bg-gray-100
                        p-4
                        rounded
                      "
                    >
                      <div>
                        {item.label}
                      </div>

                      <input
                        value={
                          item.param
                        }
                        readOnly
                        className="
                          bg-transparent
                          outline-none
                        "
                      />

                      {item.param !==
                        "RID" && (
                        <button
                          onClick={() =>
                            removeVariable(
                              item.param
                            )
                          }
                          className="text-red-500"
                        >
                          🗑
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* <div className="border-t mt-10 pt-8">
              <h3 className="text-2xl mb-4">
                Final URL
              </h3>

              <textarea
                value={finalUrl}
                readOnly
                rows={5}
                className="
                  w-full
                  border
                  p-4
                  rounded-lg
                "
              />
            </div> */}

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() =>
                  setOpen(false)
                }
                className="
                  border
                  px-6
                  py-3
                "
              >
                Cancel
              </button>

              <button
               onClick={async () => {
  try {
    await api.put(
      `/projects/${projectId}/survey-links`,
      {
        live: finalUrl,
        test: form.testUrl,
      }
    );

    setForm((prev) => ({
      ...prev,
      liveUrl: finalUrl,
    }));

    onApply?.(finalUrl);

    setOpen(false);
  } catch (err) {
    console.error(err);
  }
}}
                className="
                  bg-purple-700
                  text-white
                  px-6
                  py-3
                "
              >
                Apply URL
              </button>
            </div>
          </div>
        </div>
        
      )}
      {project?.redirects && (
  <>
  <LinkBox
  label="Start URL"
  url={`${base}/redirect/start?tk=${project.redirects.start?.token}&RID={RID}`}
/>
    <LinkBox
  label="Complete"
  url={`${base}/redirect/c?tk=${project.redirects.complete?.token}`}
/>

<LinkBox
  label="Disqualified"
  url={`${base}/redirect/dq?tk=${project.redirects.disqualified?.token}`}
/>

<LinkBox
  label="Quota Full"
  url={`${base}/redirect/qf?tk=${project.redirects.quotaFull?.token}`}
/>

    {/* <LinkBox
  label="Complete"
  url={`${base}/redirect/c?tk=${project.redirects.complete?.token}`}
/>

<LinkBox
  label="Disqualified"
  url={`${base}/redirect/dq?tk=${project.redirects.disqualified?.token}`}
/>

<LinkBox
  label="Quota Full"
  url={`${base}/redirect/qf?tk=${project.redirects.quotaFull?.token}`}
/> */}
  </>
)}

{project && (
  <div className="mt-8">
    <h3 className="text-lg font-semibold mb-4">
      Project Statistics
    </h3>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

      <div className="bg-white border rounded-lg p-4">
        <p className="text-xs text-gray-500 uppercase">
          Target Completes
        </p>
        <p className="text-2xl font-bold">
          {project.targetCompletes || 0}
        </p>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <p className="text-xs text-gray-500 uppercase">
          Completes
        </p>
        <p className="text-2xl font-bold text-green-600">
          {project.completes || 0}
        </p>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <p className="text-xs text-gray-500 uppercase">
          Remaining
        </p>
        <p className="text-2xl font-bold text-orange-500">
          {Math.max(
            (project.targetCompletes || 0) -
            (project.completes || 0),
            0
          )}
        </p>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <p className="text-xs text-gray-500 uppercase">
          DQ
        </p>
        <p className="text-2xl font-bold text-red-500">
          {project.disqualified || 0}
        </p>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <p className="text-xs text-gray-500 uppercase">
          QF
        </p>
        <p className="text-2xl font-bold text-yellow-600">
          {project.quotaFull || 0}
        </p>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <p className="text-xs text-gray-500 uppercase">
          Total Responses
        </p>
        <p className="text-2xl font-bold">
          {project.totalResponses || 0}
        </p>
      </div>

    </div>
  </div>
)}
    </>

    
  );
}

function LinkBox({ label, url }) {
  const copy = () => {
    navigator.clipboard.writeText(url);
    alert("Copied!");
  };

  return (
    <div className="flex justify-between items-center border p-2 rounded">
      <span className="text-sm">{label}</span>

      <div className="flex gap-2">
        <input
          value={url}
          readOnly
          className="text-xs w-[260px] border px-2"
        />

        <button
          onClick={copy}
          className="bg-black text-white px-3 py-1 text-xs"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
