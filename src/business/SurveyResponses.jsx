// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";

// export default function SurveyResponses() {
//   const { id } = useParams();

//   const [responses, setResponses] = useState([]);

//   useEffect(() => {
//     loadResponses();
//   }, []);

//   const loadResponses = async () => {
//     const { data } = await api.get(
//       `/survey-builder/responses/${id}`
//     );

//     setResponses(data);
//   };

//   return (
//     <div className="p-8">

//       <h1 className="text-3xl font-bold mb-6">
//         Survey Responses
//       </h1>

//       {responses.map((response) => (
//         <div
//           key={response._id}
//           className="border rounded-lg p-4 mb-4"
//         >
//           <p>
//             <b>Status:</b> {response.status}
//           </p>

//           <div className="mt-4 space-y-2">
//   {response.survey.questions.map((q) => {
//     const key = q._id || q.id;

//     return (
//       <div key={key} className="border-b pb-2">
//         <p className="font-semibold">{q.title}</p>

//         <p className="text-gray-700">
//           {Array.isArray(response.answers[key])
//             ? response.answers[key].join(", ")
//             : response.answers[key] || "-"}
//         </p>
//       </div>
//     );
//   })}
// </div>
//         </div>
//       ))}

//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import api from "../services/api";

// export default function SurveyResponses() {
//   const { id } = useParams();

//   const [survey, setSurvey] = useState(null);
//   const [responses, setResponses] = useState([]);

//   const [page, setPage] = useState(1);

//   const PER_PAGE = 100;

//   useEffect(() => {
//     loadResponses();
//   }, []);

//   const loadResponses = async () => {
//     const { data } = await api.get(
//       `/survey-builder/responses/${id}`
//     );

//     setSurvey(data.survey);
//     setResponses(data.responses);
//   };


//   const downloadExcel = () => {
//   const rows = responses.map((response, index) => {
//     const row = {
//       "Sr No": index + 1,
//       Status: response.status,
//       Date: response.completedAt
//     ? new Date(response.completedAt).toLocaleDateString()
//     : "",
//   Time: response.completedAt
//     ? new Date(response.completedAt).toLocaleTimeString()
//     : "",
//     };

//     survey.questions.forEach((q) => {
//       const key = q.id;
//       const value = response.answers[key];

//       if (Array.isArray(value)) {
//         row[q.title] = value.join(", ");
//       } else if (value && typeof value === "object") {
//         row[q.title] = Object.entries(value)
//           .map(([r, a]) => `${r}: ${a}`)
//           .join(" | ");
//       } else {
//         row[q.title] = value || "";
//       }
//     });

//     return row;
//   });

//   const worksheet = XLSX.utils.json_to_sheet(rows);

//   const workbook = XLSX.utils.book_new();

//   XLSX.utils.book_append_sheet(
//     workbook,
//     worksheet,
//     "Responses"
//   );

//   const excelBuffer = XLSX.write(workbook, {
//     bookType: "xlsx",
//     type: "array",
//   });

//   const file = new Blob([excelBuffer], {
//     type:
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//   });

//   saveAs(file, `${survey.name}-Responses.xlsx`);
// };

//   if (!survey) return <div>Loading...</div>;

//   const totalPages = Math.ceil(responses.length / PER_PAGE);

//   const current = responses.slice(
//     (page - 1) * PER_PAGE,
//     page * PER_PAGE
//   );

//   return (
//     <div className="p-8">

//      <div className="flex justify-between items-center mb-6">

//   <h1 className="text-3xl font-bold">
//     Survey Responses
//   </h1>

//   <button
//     onClick={downloadExcel}
//     className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
//   >
//     Download Excel
//   </button>

// </div>
//      <div className="relative w-full">
//   <div
//     className="overflow-x-scroll overflow-y-auto border rounded-xl shadow-sm"
//     style={{ maxHeight: "75vh" }}
//   >
        

//        <table
//   className="border-collapse whitespace-nowrap"
//   style={{
//     width: "max-content",
//     minWidth: `${survey.questions.length * 250 + 500}px`,
//   }}
// >

//           <thead className="bg-gray-100">

//             <tr>

//               <th className="sticky left-0 z-30 bg-gray-100 border p-3 min-w-[70px]">
//   #
// </th>

// <th className="sticky left-[70px] z-30 bg-gray-100 border p-3 min-w-[140px]">
//   Status
// </th>

// <th className="sticky left-[210px] z-30 bg-gray-100 border p-3 min-w-[130px]">
//   Date
// </th>

// <th className="sticky left-[340px] z-30 bg-gray-100 border p-3 min-w-[140px]">
//   Time
// </th>

//               {survey.questions.map((q) => (

//                <th
//   key={q.id}
//   className="border p-3"
//   style={{ minWidth: 250 }}
// >
//                   {q.title}
//                 </th>

//               ))}

//             </tr>

//           </thead>

//           <tbody>

//             {current.map((response, index) => (

//               <tr key={response._id}>

//                 <td className="sticky left-0 bg-white border p-3">
//                   {(page - 1) * PER_PAGE + index + 1}
//                 </td>

//                 <td className="sticky left-[70px] bg-white border p-3">
//                   {response.status}
//                 </td>
                
//                 <td className="sticky left-[210px] bg-white border p-3">
//   {response.completedAt
//     ? new Date(response.completedAt).toLocaleDateString()
//     : "-"}
// </td>

// <td className="sticky left-[340px] bg-white border p-3">
//   {response.completedAt
//     ? new Date(response.completedAt).toLocaleTimeString()
//     : "-"}
// </td>
//                 {survey.questions.map((q) => {

//                  const key = q.id;

// const value = response.answers[key];

// return (
//  <td
//   key={key}
//   className="border p-3 align-top"
//   style={{ minWidth: 250 }}
// >
//     {Array.isArray(value) ? (
//       value.join(", ")
//     ) : value && typeof value === "object" ? (
//       <div className="space-y-1">
//         {Object.entries(value).map(([row, answer]) => (
//           <div key={row}>
//             <span className="font-semibold">{row}:</span>{" "}
//             {answer}
//           </div>
//         ))}
//       </div>
//     ) : (
//       value || "-"
//     )}
//   </td>
// );
//                 })}

//               </tr>

//             ))}

//           </tbody>

//         </table>
//       </div>
//       </div>

//       <div className="flex justify-center gap-2 mt-6">

//         <button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//           className="px-4 py-2 border rounded"
//         >
//           Previous
//         </button>

//         {Array.from(
//           { length: totalPages },
//           (_, i) => i + 1
//         ).map((p) => (

//           <button
//             key={p}
//             onClick={() => setPage(p)}
//             className={`px-4 py-2 rounded ${
//               p === page
//                 ? "bg-orange-500 text-white"
//                 : "border"
//             }`}
//           >
//             {p}
//           </button>

//         ))}

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//           className="px-4 py-2 border rounded"
//         >
//           Next
//         </button>

//       </div>

//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import api from "../services/api";
import { Download, Inbox, ChevronLeft, ChevronRight } from "lucide-react";

// ---- Presentation helpers (visual only — no logic changes) ----

const STATUS_META = {
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  complete: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  disqualified: "bg-red-50 text-red-700 ring-red-200",
  partial: "bg-amber-50 text-amber-700 ring-amber-200",
  incomplete: "bg-amber-50 text-amber-700 ring-amber-200",
  "quota full": "bg-blue-50 text-blue-700 ring-blue-200",
};

const statusClasses = (status) =>
  STATUS_META[(status || "").toLowerCase()] || "bg-slate-100 text-slate-600 ring-slate-200";

// sticky column offsets (kept in one place so header + body always match)
const COL = {
  sr: { left: 0, width: 70 },
  status: { left: 70, width: 150 },
  date: { left: 220, width: 130 },
  time: { left: 350, width: 130 },
};
const STICKY_WIDTH = 480;

export default function SurveyResponses() {
  const { id } = useParams();

  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState([]);

  const [page, setPage] = useState(1);

  const PER_PAGE = 100;

  useEffect(() => {
    loadResponses();
  }, []);

  const loadResponses = async () => {
    const { data } = await api.get(`/survey-builder/responses/${id}`);

    setSurvey(data.survey);
    setResponses(data.responses);
  };

  const downloadExcel = () => {
    const rows = responses.map((response, index) => {
      const row = {
        "Sr No": index + 1,
        Status: response.status,
        Date: response.completedAt
          ? new Date(response.completedAt).toLocaleDateString()
          : "",
        Time: response.completedAt
          ? new Date(response.completedAt).toLocaleTimeString()
          : "",
      };

      survey.questions.forEach((q) => {
        const key = q.id;
        const value = response.answers[key];

        if (Array.isArray(value)) {
          row[q.title] = value.join(", ");
        } else if (value && typeof value === "object") {
          row[q.title] = Object.entries(value)
            .map(([r, a]) => `${r}: ${a}`)
            .join(" | ");
        } else {
          row[q.title] = value || "";
        }
      });

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, `${survey.name}-Responses.xlsx`);
  };

  if (!survey) {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="w-5 h-5 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading responses...</span>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(responses.length / PER_PAGE);

  const current = responses.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="h-screen flex flex-col bg-[#F6F7FB] font-[Inter,ui-sans-serif,system-ui,sans-serif]">
      {/* Header */}
      <div className="shrink-0 border-b border-slate-200/70 bg-[#F6F7FB]/90 backdrop-blur">
        <div className="px-8 py-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              {survey.name || "Survey Responses"}
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {responses.length} {responses.length === 1 ? "response" : "responses"} collected
            </p>
          </div>

          <button
            onClick={downloadExcel}
            disabled={responses.length === 0}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm shadow-emerald-600/20 transition"
          >
            <Download size={16} />
            Download Excel
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 px-8 py-6 flex flex-col">
        {responses.length === 0 ? (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/60">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <Inbox size={20} />
              </div>
              <h3 className="text-base font-semibold text-slate-800">No responses yet</h3>
              <p className="text-slate-500 text-sm mt-1">
                Responses will appear here once people start submitting.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Table — bounded on all sides so wide/tall data always stays on screen */}
            <div className="flex-1 min-h-0 rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="flex-1 min-h-0 overflow-auto">
                <table
                  className="border-collapse whitespace-nowrap text-sm"
                  style={{
                    width: "max-content",
                    minWidth: `${survey.questions.length * 250 + STICKY_WIDTH}px`,
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        className="sticky top-0 left-0 z-30 bg-slate-50 border-b border-r border-slate-200 p-3 text-left font-semibold text-slate-600 text-xs uppercase tracking-wide"
                        style={{ minWidth: COL.sr.width, left: COL.sr.left }}
                      >
                        #
                      </th>

                      <th
                        className="sticky top-0 z-30 bg-slate-50 border-b border-r border-slate-200 p-3 text-left font-semibold text-slate-600 text-xs uppercase tracking-wide"
                        style={{ minWidth: COL.status.width, left: COL.status.left }}
                      >
                        Status
                      </th>

                      <th
                        className="sticky top-0 z-30 bg-slate-50 border-b border-r border-slate-200 p-3 text-left font-semibold text-slate-600 text-xs uppercase tracking-wide"
                        style={{ minWidth: COL.date.width, left: COL.date.left }}
                      >
                        Date
                      </th>

                      <th
                        className="sticky top-0 z-30 bg-slate-50 border-b-2 border-r-2 border-slate-300 p-3 text-left font-semibold text-slate-600 text-xs uppercase tracking-wide"
                        style={{ minWidth: COL.time.width, left: COL.time.left }}
                      >
                        Time
                      </th>

                      {survey.questions.map((q) => (
                        <th
                          key={q.id}
                          className="sticky top-0 z-20 bg-slate-50 border-b border-r border-slate-200 p-3 text-left font-semibold text-slate-600"
                          style={{ minWidth: 250 }}
                        >
                          {q.title}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {current.map((response, index) => (
                      <tr
                        key={response._id}
                        className="odd:bg-white even:bg-slate-50/50 hover:bg-indigo-50/40 transition-colors group"
                      >
                        <td
                          className="sticky left-0 z-10 bg-inherit border-b border-r border-slate-200 p-3 text-slate-500 font-medium group-hover:bg-indigo-50/40"
                          style={{ left: COL.sr.left }}
                        >
                          {(page - 1) * PER_PAGE + index + 1}
                        </td>

                        <td
                          className="sticky z-10 bg-inherit border-b border-r border-slate-200 p-3 group-hover:bg-indigo-50/40"
                          style={{ left: COL.status.left }}
                        >
                          <span
                            className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${statusClasses(
                              response.status
                            )}`}
                          >
                            {response.status || "—"}
                          </span>
                        </td>

                        <td
                          className="sticky z-10 bg-inherit border-b border-r border-slate-200 p-3 text-slate-700 group-hover:bg-indigo-50/40"
                          style={{ left: COL.date.left }}
                        >
                          {response.completedAt
                            ? new Date(response.completedAt).toLocaleDateString()
                            : "-"}
                        </td>

                        <td
                          className="sticky z-10 bg-inherit border-b border-r-2 border-slate-300 p-3 text-slate-700 group-hover:bg-indigo-50/40"
                          style={{ left: COL.time.left }}
                        >
                          {response.completedAt
                            ? new Date(response.completedAt).toLocaleTimeString()
                            : "-"}
                        </td>

                        {survey.questions.map((q) => {
                          const key = q.id;
                          const value = response.answers[key];

                          return (
                            <td
                              key={key}
                              className="border-b border-r border-slate-200 p-3 align-top text-slate-700"
                              style={{ minWidth: 250 }}
                            >
                              {Array.isArray(value) ? (
                                value.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {value.map((v, i) => (
                                      <span
                                        key={i}
                                        className="text-xs px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700"
                                      >
                                        {v}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-slate-300">—</span>
                                )
                              ) : value && typeof value === "object" ? (
                                <div className="space-y-1">
                                  {Object.entries(value).map(([row, answer]) => (
                                    <div key={row} className="text-xs">
                                      <span className="font-semibold text-slate-600">{row}:</span>{" "}
                                      <span className="text-slate-700">{answer}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : value ? (
                                value
                              ) : (
                                <span className="text-slate-300">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="shrink-0 flex items-center justify-center gap-1.5 mt-5 flex-wrap">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={15} />
                  Previous
                </button>

                <div className="flex items-center gap-1 mx-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 text-sm font-medium rounded-lg transition ${
                        p === page
                          ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}