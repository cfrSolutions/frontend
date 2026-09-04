// import { useState, useMemo } from "react";
// import { useEffect } from "react";
// import api from "../services/api";
// import { useParams } from "react-router-dom";

// const URL_VARIABLES = [
//   {
//     label: "Response ID",
//     param: "RID",
//     required: true,
//     pattern: "RID-{date}-{number}",
//   },
//   {
//     label: "Bid Incidence",
//     param: "BidIncidence",
//     required: false,
//     pattern: "BI-{number}",
//   },
//   {
//     label: "Panelist ID",
//     param: "PID",
//     required: false,
//     pattern: "PID-{random}",
//   },
//   {
//     label: "Supplier ID",
//     param: "SupplierID",
//     required: false,
//     pattern: "SUP-{number}",
//   },
//   {
//     label: "Supplier Name",
//     param: "SupplierName",
//     required: false,
//     pattern: "Supplier-{number}",
//   },
//   {
//     label: "MID",
//     param: "MID",
//     required: false,
//     pattern: "MID-{random}",
//   },
//   {
//     label: "RSID",
//     param: "RSID",
//     required: false,
//     pattern: "RS-{date}-{random}",
//   },
// ];

// const INDUSTRIES = [
//   "Other",
//   "Automotive",
//   "Beauty/Cosmetics",
//   "Beverages - Alcoholic",
//   "Beverages - Non Alcoholic",
//   "Education",
//   "Electronics/Computer/Software",
//   "Entertainment",
//   "Explicit Content",
//   "Fashion/Clothing",
//   "Financial Services/Insurance",
//   "Food",
//   "Healthcare",
//   "Home Improvement",
//   "Hotels",
//   "Legal",
//   "Manufacturing",
//   "Media",
//   "Pharmaceutical",
//   "Politics",
//   "Restaurants",
//   "Sensitive Content",
//   "Sports",
//   "Telecommunications",
//   "Tobacco",
//   "Toys",
//   "Transportation/Shipping",
//   "Travel",
//   "Video Games",
//   "Websites/Internet/E-Commerce",
// ];

// const LOCKOUT_OPTIONS = [
//   "No Lock Out",
//   "Past 7 Days / 1 Week",
//   "Past 30 Days / 1 Month",
//   "Past 60 Days / 2 Months",
//   "Past 90 Days / 3 Months",
// ];

// export default function BuildSurvey({
//   targetGroupName, user, onApply,
// }) {


//     const [form, setForm] = useState({
//   targetGroupName: "",
//   projectManager: user?.name || "",
//   industry: "Other",
//   industryLockout: "No Lock Out",
//   securityClient: "",

//   liveUrl: "",
//   testUrl: "",
// });
//   const [open, setOpen] =
//     useState(false);

//   const [baseUrl, setBaseUrl] =
//     useState("");

//   const [variables, setVariables] =
//     useState([
//       {
//         label: "Response ID",
//         param: "RID",
//         required: true,
//         pattern: "RID-{date}-{number}",
//       },
//     ]);

//     const [surveyUrl, setSurveyUrl] = useState("");
// const [project, setProject] = useState(null);
// const { projectId } = useParams();
// const base = import.meta.env.VITE_API_URL;

// const getVariableDefinition = (param, pattern) => {
//   const definition = URL_VARIABLES.find(
//     (item) => item.param === param
//   );

//   return {
//     label: definition?.label || param,
//     param,
//     required: definition?.required || false,
//     pattern: pattern || definition?.pattern || "",
//   };
// };

// // useEffect(() => {
// //   const fetchProject = async () => {
// //     const res = await api.get(`/projects/${projectId}`);
// //     setProject(res.data);
// //   };

// //   fetchProject();
// // }, [projectId]);

// useEffect(() => {
//   const fetchProject = async () => {
//     try {
//       const res = await api.get(
//         `/projects/${projectId}`
//       );

//       setProject(res.data);

//       setForm((prev) => ({
//         ...prev,
//         liveUrl:
//           res.data.surveyLinks?.live || "",
//         testUrl:
//           res.data.surveyLinks?.test || "",
//       }));

//       // Load saved URL variables
//       if (
//         Array.isArray(res.data.urlVariables) &&
//         res.data.urlVariables.length > 0
//       ) {
//         setVariables(
//           res.data.urlVariables.map((item) =>
//             getVariableDefinition(
//               item.param,
//               item.pattern
//             )
//           )
//         );
//       }

//     } catch (err) {
//       console.error(
//         "FETCH PROJECT ERROR:",
//         err
//       );
//     }
//   };

//   fetchProject();
// }, [projectId]);


// // useEffect(() => {
// //   const fetchProject = async () => {
// //     const res = await api.get(
// //       `/projects/${projectId}`
// //     );

// //     setProject(res.data);

// //     setForm((prev) => ({
// //       ...prev,
// //       liveUrl: res.data.surveyLinks?.live || "",
// //       testUrl: res.data.surveyLinks?.test || "",
// //     }));
// //   };

// //   fetchProject();
// // }, [projectId]);

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

//   useEffect(() => {
//   if (user?.name) {
//     setForm((prev) => ({
//       ...prev,
//       projectManager: user.name,
//     }));
//   }
// }, [user]);

// // const startVariableParams = variables
// //   .map((v) => `${v.param}={${v.param}}`)
// //   .join("&");

// // const startUrl =
// //   project?.redirects?.start?.token
// //     ? `${base}/redirect/start?tk=${project.redirects.start.token}&${startVariableParams}`
// //     : "";
// const startUrl =
//   project?.redirects?.start?.token
//     ? `${base}/redirect/start?tk=${project.redirects.start.token}`
//     : "";

//   return (
//     <>

//     <div className="space-y-6">

//   <div>
//     <label className="block text-sm font-medium mb-2">
//       Target Group Name
//     </label>

//    <input
//   value={targetGroupName || ""}
//   readOnly
//   className="w-full border-b pb-2"
// />
//   </div>

//   <div className="grid md:grid-cols-2 gap-6">

//     <div>
//       <label className="block text-sm font-medium mb-2">
//         Project Manager
//       </label>

//       <input
//         value={form.projectManager}
//         readOnly
//         className="w-full border-b pb-2 bg-transparent"
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-medium mb-2">
//         Security Client
//       </label>

//       <input
//         value={form.securityClient}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             securityClient: e.target.value,
//           })
//         }
//         className="w-full border-b pb-2 outline-none"
//       />
//     </div>

//   </div>

//   <div className="grid md:grid-cols-2 gap-6">

//     <div>
//       <label className="block text-sm font-medium mb-2">
//         Industry
//       </label>

//       <select
//         value={form.industry}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             industry: e.target.value,
//           })
//         }
//         className="w-full border-b pb-2 bg-transparent"
//       >
//         {INDUSTRIES.map((industry) => (
//           <option
//             key={industry}
//             value={industry}
//           >
//             {industry}
//           </option>
//         ))}
//       </select>
//     </div>

//     <div>
//       <label className="block text-sm font-medium mb-2">
//         Industry Lock Out
//       </label>

//       <select
//         value={form.industryLockout}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             industryLockout:
//               e.target.value,
//           })
//         }
//         className="w-full border-b pb-2 bg-transparent"
//       >
//         {LOCKOUT_OPTIONS.map((option) => (
//           <option
//             key={option}
//             value={option}
//           >
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>

//   </div>

//   <div>
//     <label className="block text-sm font-medium mb-2">
//       Live URL
//     </label>

//     <textarea
//       value={form.liveUrl}
//       onChange={(e) =>
//         setForm({
//           ...form,
//           liveUrl: e.target.value,
//         })
//       }
//       rows={4}
//       className="w-full border rounded p-3"
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-medium mb-2">
//       Test URL
//     </label>

//     <textarea
//       value={form.testUrl}
//       onChange={(e) =>
//         setForm({
//           ...form,
//           testUrl: e.target.value,
//         })
//       }
//       rows={4}
//       className="w-full border rounded p-3"
//     />
//   </div>

// </div>
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

//             {/* <div className="border-t mt-10 pt-8">
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
//             </div> */}

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
// //                onClick={async () => {
// //   try {
// //     await api.put(
// //       `/projects/${projectId}/survey-links`,
// //       {
// //         live: finalUrl,
// //         test: form.testUrl,
// //       }
// //     );

// //     setForm((prev) => ({
// //       ...prev,
// //       liveUrl: finalUrl,
// //     }));

// //     onApply?.(finalUrl);

// //     setOpen(false);
// //   } catch (err) {
// //     console.error(err);
// //   }
// // }}
// onClick={async () => {
//   try {

//     // -----------------------------------------
//     // 1. SAVE SELECTED URL VARIABLES
//     // -----------------------------------------

//     await api.put(
//       `/projects/${projectId}/url-variables`,
//       {
//         variables: variables.map((item) => ({
//           param: item.param,
//           pattern: item.pattern,
//         })),
//       }
//     );


//     // -----------------------------------------
//     // 2. SAVE GENERATED SURVEY URL
//     // -----------------------------------------

//     await api.put(
//       `/projects/${projectId}/survey-links`,
//       {
//         live: finalUrl,
//         test: form.testUrl,
//       }
//     );


//     // -----------------------------------------
//     // 3. UPDATE UI
//     // -----------------------------------------

//     setForm((prev) => ({
//       ...prev,
//       liveUrl: finalUrl,
//     }));

//     onApply?.(finalUrl);

//     setOpen(false);

//   } catch (err) {

//     console.error(
//       "SAVE BUILD URL ERROR:",
//       err
//     );

//   }
// }}
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
//       {project?.redirects && (
//   <>
//   {/* <LinkBox
//   label="Start URL"
//   url={`${base}/redirect/start?tk=${project.redirects.start?.token}&RID={RID}`}
// /> */}
// <LinkBox
//   label="Start URL"
//   url={startUrl}
// />

// <LinkBox
//   label="Complete"
//   url={`${base}/redirect/c?tk=${project.redirects.complete?.token}&RID={RID}`}
// />

// <LinkBox
//   label="Disqualified"
//   url={`${base}/redirect/dq?tk=${project.redirects.disqualified?.token}&RID={RID}`}
// />

// <LinkBox
//   label="Quota Full"
//   url={`${base}/redirect/qf?tk=${project.redirects.quotaFull?.token}&RID={RID}`}
// />

//     {/* <LinkBox
//   label="Complete"
//   url={`${base}/redirect/c?tk=${project.redirects.complete?.token}`}
// />

// <LinkBox
//   label="Disqualified"
//   url={`${base}/redirect/dq?tk=${project.redirects.disqualified?.token}`}
// />

// <LinkBox
//   label="Quota Full"
//   url={`${base}/redirect/qf?tk=${project.redirects.quotaFull?.token}`}
// /> */}
//   </>
// )}

// {project && (
//   <div className="mt-8">
//     <h3 className="text-lg font-semibold mb-4">
//       Project Statistics
//     </h3>

//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

//       <div className="bg-white border rounded-lg p-4">
//         <p className="text-xs text-gray-500 uppercase">
//           Target Completes
//         </p>
//         <p className="text-2xl font-bold">
//           {project.targetCompletes || 0}
//         </p>
//       </div>

//       <div className="bg-white border rounded-lg p-4">
//         <p className="text-xs text-gray-500 uppercase">
//           Completes
//         </p>
//         <p className="text-2xl font-bold text-green-600">
//           {project.completes || 0}
//         </p>
//       </div>

//       <div className="bg-white border rounded-lg p-4">
//         <p className="text-xs text-gray-500 uppercase">
//           Remaining
//         </p>
//         <p className="text-2xl font-bold text-orange-500">
//           {Math.max(
//             (project.targetCompletes || 0) -
//             (project.completes || 0),
//             0
//           )}
//         </p>
//       </div>

//       <div className="bg-white border rounded-lg p-4">
//         <p className="text-xs text-gray-500 uppercase">
//           DQ
//         </p>
//         <p className="text-2xl font-bold text-red-500">
//           {project.disqualified || 0}
//         </p>
//       </div>

//       <div className="bg-white border rounded-lg p-4">
//         <p className="text-xs text-gray-500 uppercase">
//           QF
//         </p>
//         <p className="text-2xl font-bold text-yellow-600">
//           {project.quotaFull || 0}
//         </p>
//       </div>

//       <div className="bg-white border rounded-lg p-4">
//         <p className="text-xs text-gray-500 uppercase">
//           Total Responses
//         </p>
//         <p className="text-2xl font-bold">
//           {project.totalResponses || 0}
//         </p>
//       </div>

//     </div>
//   </div>
// )}
//     </>

    
//   );
// }

// function LinkBox({ label, url }) {
//   const copy = () => {
//     navigator.clipboard.writeText(url);
//     alert("Copied!");
//   };

//   return (
//     <div className="flex justify-between items-center border p-2 rounded">
//       <span className="text-sm">{label}</span>

//       <div className="flex gap-2">
//         <input
//           value={url}
//           readOnly
//           className="text-xs w-[260px] border px-2"
//         />

//         <button
//           onClick={copy}
//           className="bg-black text-white px-3 py-1 text-xs"
//         >
//           Copy
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState, useMemo, useEffect } from "react";
import api from "../services/api";

const URL_VARIABLES = [
  {
    label: "Response ID",
    param: "RID",
    required: true,
    pattern: "RID-{date}-{number}",
  },
  {
    label: "Bid Incidence",
    param: "BidIncidence",
    required: false,
    pattern: "BI-{number}",
  },
  {
    label: "Panelist ID",
    param: "PID",
    required: false,
    pattern: "PID-{random}",
  },
  {
    label: "Supplier ID",
    param: "SupplierID",
    required: false,
    pattern: "SUP-{number}",
  },
  {
    label: "Supplier Name",
    param: "SupplierName",
    required: false,
    pattern: "Supplier-{number}",
  },
  {
    label: "MID",
    param: "MID",
    required: false,
    pattern: "MID-{random}",
  },
  {
    label: "RSID",
    param: "RSID",
    required: false,
    pattern: "RS-{date}-{random}",
  },
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
  projectId,
  targetGroupId,
  targetGroupName,
  user,
  onApply,
}) {
  // =========================================================
  // NEW / EXISTING
  // =========================================================

  const isNew =
    !targetGroupId ||
    targetGroupId === "new";

  // =========================================================
  // FORM
  // =========================================================

  const [form, setForm] = useState({
    targetGroupName: targetGroupName || "",
    projectManager: user?.name || "",
    industry: "Other",
    industryLockout: "No Lock Out",
    securityClient: "",

    liveUrl: "",
    testUrl: "",
  });

  // =========================================================
  // STATE
  // =========================================================

  const [open, setOpen] = useState(false);

  const [baseUrl, setBaseUrl] = useState("");

  const [variables, setVariables] = useState([
    {
      label: "Response ID",
      param: "RID",
      required: true,
      pattern: "RID-{date}-{number}",
    },
  ]);

  const [project, setProject] = useState(null);

  const [targetGroup, setTargetGroup] =
    useState(null);

  const base =
    import.meta.env.VITE_API_URL;

  // =========================================================
  // VARIABLE DEFINITION
  // =========================================================

  const getVariableDefinition = (
    param,
    pattern
  ) => {
    const definition =
      URL_VARIABLES.find(
        (item) =>
          item.param === param
      );

    return {
      label:
        definition?.label ||
        param,

      param,

      required:
        definition?.required ||
        false,

      pattern:
        pattern ||
        definition?.pattern ||
        "",
    };
  };

  // =========================================================
  // LOAD PROJECT + TARGET GROUP
  // =========================================================

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;

      try {
        const res = await api.get(
          `/projects/${projectId}`
        );

        const projectData = res.data;

        setProject(projectData);

        // =====================================================
        // NEW TARGET GROUP
        // =====================================================

        if (isNew) {
          setTargetGroup(null);

          setForm((prev) => ({
            ...prev,

            targetGroupName:
              targetGroupName ||
              "New Target Group",

            liveUrl: "",
            testUrl: "",
          }));

          setVariables([
            {
              label: "Response ID",
              param: "RID",
              required: true,
              pattern:
                "RID-{date}-{number}",
            },
          ]);

          setBaseUrl("");

          return;
        }

        // =====================================================
        // EXISTING TARGET GROUP
        // =====================================================

        const group =
          (
            projectData.targetGroups ||
            []
          ).find(
            (item) =>
              String(item._id) ===
              String(targetGroupId)
          );

        if (!group) {
          console.error(
            "Target group not found:",
            targetGroupId
          );

          setTargetGroup(null);
          return;
        }

        setTargetGroup(group);

        // =====================================================
        // LOAD TARGET GROUP SURVEY LINKS
        // =====================================================

        setForm((prev) => ({
          ...prev,

          targetGroupName:
            group.name ||
            targetGroupName ||
            "",

          liveUrl:
            group.surveyLinks?.live ||
            "",

          testUrl:
            group.surveyLinks?.test ||
            "",
        }));

        // =====================================================
        // LOAD TARGET GROUP URL VARIABLES
        // =====================================================

        if (
          Array.isArray(
            group.urlVariables
          ) &&
          group.urlVariables.length >
            0
        ) {
          setVariables(
            group.urlVariables.map(
              (item) =>
                getVariableDefinition(
                  item.param,
                  item.pattern
                )
            )
          );
        } else {
          setVariables([
            {
              label: "Response ID",
              param: "RID",
              required: true,
              pattern:
                "RID-{date}-{number}",
            },
          ]);
        }

        // =====================================================
        // LOAD BASE URL FROM LIVE URL
        // =====================================================

        if (group.surveyLinks?.live) {
          const savedLive =
            group.surveyLinks.live;

          // Remove configured URL parameters
          // so Build URL can show the base URL.
          const cleanUrl =
            savedLive.split("?")[0];

          setBaseUrl(cleanUrl);
        } else {
          setBaseUrl("");
        }

      } catch (err) {
        console.error(
          "FETCH PROJECT / TARGET GROUP ERROR:",
          err
        );
      }
    };

    fetchProject();
  }, [
    projectId,
    targetGroupId,
    isNew,
    targetGroupName,
  ]);

  // =========================================================
  // UPDATE PROJECT MANAGER
  // =========================================================

  useEffect(() => {
    if (user?.name) {
      setForm((prev) => ({
        ...prev,
        projectManager:
          user.name,
      }));
    }
  }, [user]);

  // =========================================================
  // UPDATE TARGET GROUP NAME
  // =========================================================

  useEffect(() => {
    if (targetGroupName) {
      setForm((prev) => ({
        ...prev,
        targetGroupName,
      }));
    }
  }, [targetGroupName]);

  // =========================================================
  // ADD VARIABLE
  // =========================================================

  const addVariable = (item) => {
    const exists =
      variables.find(
        (v) =>
          v.param === item.param
      );

    if (exists) return;

    setVariables((prev) => [
      ...prev,
      item,
    ]);
  };

  // =========================================================
  // REMOVE VARIABLE
  // =========================================================

  const removeVariable = (
    param
  ) => {
    // RID cannot be removed
    if (param === "RID") return;

    setVariables((prev) =>
      prev.filter(
        (v) =>
          v.param !== param
      )
    );
  };

  // =========================================================
  // FINAL SURVEY URL
  // =========================================================

  const finalUrl = useMemo(() => {
    if (!baseUrl) return "";

    const separator =
      baseUrl.includes("?")
        ? "&"
        : "?";

    const params =
      variables
        .map(
          (v) =>
            `${v.param}=[%${v.param}%]`
        )
        .join("&");

    if (!params) {
      return baseUrl;
    }

    return `${baseUrl}${separator}${params}`;
  }, [
    baseUrl,
    variables,
  ]);

  // =========================================================
  // TARGET GROUP REDIRECT URLS
  // =========================================================

  const startUrl =
    targetGroup?.redirects?.start
      ?.token
      ? `${base}/redirect/start?tk=${targetGroup.redirects.start.token}`
      : "";

  const completeUrl =
    targetGroup?.redirects?.complete
      ?.token
      ? `${base}/redirect/c?tk=${targetGroup.redirects.complete.token}&RID={RID}`
      : "";

  const disqualifiedUrl =
    targetGroup?.redirects?.disqualified
      ?.token
      ? `${base}/redirect/dq?tk=${targetGroup.redirects.disqualified.token}&RID={RID}`
      : "";

  const quotaFullUrl =
    targetGroup?.redirects?.quotaFull
      ?.token
      ? `${base}/redirect/qf?tk=${targetGroup.redirects.quotaFull.token}&RID={RID}`
      : "";

  // =========================================================
  // APPLY URL
  // =========================================================

  const handleApplyUrl =
    async () => {
      try {
        // =====================================================
        // NEW TARGET GROUP
        // =====================================================
        //
        // The target group does not have an ID yet.
        // Therefore we only update the local form.
        // The parent TargetGroupForm will save it.
        // =====================================================

        if (isNew) {
          setForm((prev) => ({
            ...prev,
            liveUrl: finalUrl,
          }));

          onApply?.(finalUrl);

          setOpen(false);

          return;
        }

        // =====================================================
        // EXISTING TARGET GROUP
        // =====================================================

        // Save URL variables to TARGET GROUP
        await api.put(
          `/projects/${projectId}/target-group/${targetGroupId}/url-variables`,
          {
            variables:
              variables.map(
                (item) => ({
                  param:
                    item.param,
                  pattern:
                    item.pattern,
                })
              ),
          }
        );

        // Save survey links to TARGET GROUP
        await api.put(
          `/projects/${projectId}/target-group/${targetGroupId}/survey-links`,
          {
            live: finalUrl,
            test: form.testUrl,
          }
        );

        // Update local UI
        setForm((prev) => ({
          ...prev,
          liveUrl: finalUrl,
        }));

        onApply?.(finalUrl);

        setOpen(false);

      } catch (err) {
        console.error(
          "SAVE TARGET GROUP BUILD URL ERROR:",
          err
        );
      }
    };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <div className="space-y-6">

        {/* TARGET GROUP NAME */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Target Group Name
          </label>

          <input
            value={
              targetGroupName ||
              form.targetGroupName ||
              ""
            }
            readOnly
            className="w-full border-b pb-2"
          />
        </div>

        {/* PROJECT MANAGER / SECURITY CLIENT */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Project Manager
            </label>

            <input
              value={
                form.projectManager
              }
              readOnly
              className="w-full border-b pb-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Security Client
            </label>

            <input
              value={
                form.securityClient
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  securityClient:
                    e.target.value,
                })
              }
              className="w-full border-b pb-2 outline-none"
            />
          </div>

        </div>

        {/* INDUSTRY */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Industry
            </label>

            <select
              value={
                form.industry
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  industry:
                    e.target.value,
                })
              }
              className="w-full border-b pb-2 bg-transparent"
            >
              {INDUSTRIES.map(
                (industry) => (
                  <option
                    key={industry}
                    value={industry}
                  >
                    {industry}
                  </option>
                )
              )}
            </select>
          </div>

          {/* INDUSTRY LOCKOUT */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Industry Lock Out
            </label>

            <select
              value={
                form.industryLockout
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  industryLockout:
                    e.target.value,
                })
              }
              className="w-full border-b pb-2 bg-transparent"
            >
              {LOCKOUT_OPTIONS.map(
                (option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                )
              )}
            </select>
          </div>

        </div>

        {/* LIVE URL */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Live URL
          </label>

          <textarea
            value={
              form.liveUrl
            }
            onChange={(e) =>
              setForm({
                ...form,
                liveUrl:
                  e.target.value,
              })
            }
            rows={4}
            className="w-full border rounded p-3"
          />
        </div>

        {/* TEST URL */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Test URL
          </label>

          <textarea
            value={
              form.testUrl
            }
            onChange={(e) =>
              setForm({
                ...form,
                testUrl:
                  e.target.value,
              })
            }
            rows={4}
            className="w-full border rounded p-3"
          />
        </div>

      </div>

      {/* BUILD URL BUTTON */}
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

      {/* =====================================================
          BUILD URL MODAL
      ====================================================== */}

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

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">

              <h2 className="text-4xl font-semibold">
                Build URL
              </h2>

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                className="text-3xl"
              >
                ×
              </button>

            </div>

            {/* BASE URL */}
            <div>
              <label className="block text-lg mb-3">
                What is your URL?
              </label>

              <input
                value={
                  baseUrl
                }
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

            {/* VARIABLES */}
            <div className="mt-10">

              <h3 className="text-2xl mb-2">
                Variables
              </h3>

              <p className="text-gray-600 mb-5">
                These URL parameters
                will be appended to
                your survey link.
              </p>

              {/* ADD VARIABLE */}
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
                        key={
                          item.param
                        }
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

              {/* SELECTED VARIABLES */}
              <div className="space-y-3">

                {variables.map(
                  (item) => (
                    <div
                      key={
                        item.param
                      }
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
                          type="button"
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

            {/* APPLY */}
            <div className="flex justify-end gap-4 mt-8">

              <button
                type="button"
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
                type="button"
                onClick={
                  handleApplyUrl
                }
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

      {/* =====================================================
          TARGET GROUP REDIRECT URLS
      ====================================================== */}

      {targetGroup?.redirects ? (
        <div className="space-y-2 mt-4">

          <LinkBox
            label="Start URL"
            url={startUrl}
          />

          <LinkBox
            label="Complete"
            url={completeUrl}
          />

          <LinkBox
            label="Disqualified"
            url={disqualifiedUrl}
          />

          <LinkBox
            label="Quota Full"
            url={quotaFullUrl}
          />

        </div>
      ) : (
        <div className="mt-4 border rounded-lg p-4 text-sm text-gray-500">
          {isNew
            ? "Save this target group first to generate its unique Start, Complete, Disqualified, and Quota Full URLs."
            : "This target group does not have redirect URLs yet."}
        </div>
      )}

      {/* =====================================================
          TARGET GROUP STATISTICS
      ====================================================== */}

      {targetGroup && (
        <div className="mt-8">

          <h3 className="text-lg font-semibold mb-4">
            Target Group Statistics
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

            {/* TARGET COMPLETES */}
            <div className="bg-white border rounded-lg p-4">

              <p className="text-xs text-gray-500 uppercase">
                Target Completes
              </p>

              <p className="text-2xl font-bold">
                {targetGroup.targetCompletes || 0}
              </p>

            </div>

            {/* COMPLETES */}
            <div className="bg-white border rounded-lg p-4">

              <p className="text-xs text-gray-500 uppercase">
                Completes
              </p>

              <p className="text-2xl font-bold text-green-600">
                {targetGroup.completes || 0}
              </p>

            </div>

            {/* REMAINING */}
            <div className="bg-white border rounded-lg p-4">

              <p className="text-xs text-gray-500 uppercase">
                Remaining
              </p>

              <p className="text-2xl font-bold text-orange-500">
                {Math.max(
                  (targetGroup.targetCompletes || 0) -
                    (targetGroup.completes || 0),
                  0
                )}
              </p>

            </div>

            {/* DQ */}
            <div className="bg-white border rounded-lg p-4">

              <p className="text-xs text-gray-500 uppercase">
                DQ
              </p>

              <p className="text-2xl font-bold text-red-500">
                {targetGroup.disqualified || 0}
              </p>

            </div>

            {/* QF */}
            <div className="bg-white border rounded-lg p-4">

              <p className="text-xs text-gray-500 uppercase">
                QF
              </p>

              <p className="text-2xl font-bold text-yellow-600">
                {targetGroup.quotaFull || 0}
              </p>

            </div>

            {/* TOTAL RESPONSES */}
            <div className="bg-white border rounded-lg p-4">

              <p className="text-xs text-gray-500 uppercase">
                Total Responses
              </p>

              <p className="text-2xl font-bold">
                {targetGroup.totalResponses || 0}
              </p>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

// =========================================================
// LINK BOX
// =========================================================

function LinkBox({
  label,
  url,
}) {
  const copy = async () => {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(
        url
      );

      alert("Copied!");
    } catch (err) {
      console.error(
        "COPY ERROR:",
        err
      );
    }
  };

  return (
    <div className="flex justify-between items-center border p-2 rounded">

      <span className="text-sm">
        {label}
      </span>

      <div className="flex gap-2">

        <input
          value={url || ""}
          readOnly
          className="text-xs w-[260px] border px-2"
        />

        <button
          type="button"
          onClick={copy}
          disabled={!url}
          className="
            bg-black
            text-white
            px-3
            py-1
            text-xs
            disabled:opacity-40
          "
        >
          Copy
        </button>

      </div>
    </div>
  );
}