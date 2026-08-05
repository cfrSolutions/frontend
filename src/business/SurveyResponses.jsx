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
//       <div className="overflow-auto border rounded-lg">
        

//         <table className="min-w-full">

//           <thead className="bg-gray-100">

//             <tr>

//               <th className="border p-3">#</th>

//               <th className="border p-3">Status</th>
//               <th className="border p-3">Date</th>
//               <th className="border p-3">Time</th>

//               {survey.questions.map((q) => (

//                 <th
//                   key={q._id}
//                   className="border p-3"
//                 >
//                   {q.title}
//                 </th>

//               ))}

//             </tr>

//           </thead>

//           <tbody>

//             {current.map((response, index) => (

//               <tr key={response._id}>

//                 <td className="border p-3">
//                   {(page - 1) * PER_PAGE + index + 1}
//                 </td>

//                 <td className="border p-3">
//                   {response.status}
//                 </td>
                
//                 <td className="border p-3">
//   {response.completedAt
//     ? new Date(response.completedAt).toLocaleDateString()
//     : "-"}
// </td>

// <td className="border p-3">
//   {response.completedAt
//     ? new Date(response.completedAt).toLocaleTimeString()
//     : "-"}
// </td>
//                 {survey.questions.map((q) => {

//                  const key = q.id;

// const value = response.answers[key];

// return (
//   <td
//     key={key}
//     className="border p-3 align-top"
//   >
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
import { Download } from "lucide-react";
import api from "../services/api";

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
    try {
      const { data } = await api.get(
        `/survey-builder/responses/${id}`
      );

      setSurvey(data.survey);
      setResponses(data.responses);
    } catch (err) {
      console.error(err);
    }
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
        const value = response.answers?.[key];

        if (Array.isArray(value)) {
          row[q.title] = value.join(", ");
        } else if (
          value &&
          typeof value === "object"
        ) {
          row[q.title] = Object.entries(value)
            .map(([r, a]) => `${r}: ${a}`)
            .join(" | ");
        } else {
          row[q.title] = value || "";
        }
      });

      return row;
    });

    const worksheet =
      XLSX.utils.json_to_sheet(rows);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Responses"
    );

    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array",
      }
    );

    saveAs(
      new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      `${survey.name}-Responses.xlsx`
    );
  };

  if (!survey) {
    return (
      <div className="flex items-center justify-center h-96 text-lg font-medium">
        Loading...
      </div>
    );
  }

  const totalPages = Math.ceil(
    responses.length / PER_PAGE
  );

  const current = responses.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const statusColor = (status) => {
    switch (status) {
      case "COMPLETE":
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "DISQUALIFIED":
        return "bg-red-100 text-red-700";

      case "QUOTA":
      case "QUOTA_FULL":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Survey Responses
          </h1>

          <p className="text-gray-500 mt-1">
            {responses.length} Total Responses
          </p>

        </div>

        <button
          onClick={downloadExcel}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          <Download size={18} />
          Download Excel
        </button>

      </div>

      {/* TABLE CARD */}

      <div className="rounded-xl border bg-white shadow w-full overflow-hidden">

  <div
    className="w-full overflow-x-scroll overflow-y-auto"
    style={{
      maxHeight: "72vh",
      maxWidth: "100%",
    }}
  >
<table
  className="border-collapse"
  style={{
    width: "max-content",
    minWidth: `${700 + survey.questions.length * 250}px`,
  }}
>
  <thead className="sticky top-0 bg-gray-100 z-20">
    <tr>
      <th className="border px-4 py-3 min-w-[70px] font-semibold">
        #
      </th>

      <th className="border px-4 py-3 min-w-[140px] font-semibold">
        Status
      </th>

      <th className="border px-4 py-3 min-w-[130px] font-semibold">
        Date
      </th>

      <th className="border px-4 py-3 min-w-[150px] font-semibold">
        Time
      </th>

      {survey.questions.map((q) => (
        <th
          key={q.id}
          className="border px-5 py-3 font-semibold text-gray-700 bg-gray-100"
          style={{
            minWidth: 250,
          }}
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
        className="hover:bg-orange-50 transition-colors"
      >
        <td className="border px-4 py-3">
          {(page - 1) * PER_PAGE + index + 1}
        </td>

        <td className="border px-4 py-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
              response.status
            )}`}
          >
            {response.status}
          </span>
        </td>

        <td className="border px-4 py-3 whitespace-nowrap">
          {response.completedAt
            ? new Date(
                response.completedAt
              ).toLocaleDateString()
            : "-"}
        </td>

        <td className="border px-4 py-3 whitespace-nowrap">
          {response.completedAt
            ? new Date(
                response.completedAt
              ).toLocaleTimeString()
            : "-"}
        </td>

        {survey.questions.map((q) => {
          const value = response.answers?.[q.id];

          return (
            <td
              key={q.id}
              className="border px-4 py-3 align-top"
              style={{
                minWidth: 250,
              }}
            >
              {Array.isArray(value) ? (
                value.join(", ")
              ) : value &&
                typeof value === "object" ? (
                <div className="space-y-1">
                  {Object.entries(value).map(
                    ([row, answer]) => (
                      <div
                        key={row}
                        className="rounded bg-gray-100 px-2 py-1"
                      >
                        <span className="font-semibold">
                          {row}
                        </span>
                        {" : "}
                        {answer}
                      </div>
                    )
                  )}
                </div>
              ) : (
                value || "-"
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

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <p className="text-sm text-gray-500">
          Showing{" "}
          {(page - 1) * PER_PAGE + 1}
          {" - "}
          {Math.min(
            page * PER_PAGE,
            responses.length
          )}{" "}
          of {responses.length} responses
        </p>

        <div className="flex gap-2">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, i) => i + 1
          ).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-10 w-10 rounded-lg ${
                page === p
                  ? "bg-orange-500 text-white"
                  : "border"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}