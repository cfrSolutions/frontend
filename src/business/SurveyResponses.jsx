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


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
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
    const { data } = await api.get(
      `/survey-builder/responses/${id}`
    );

    setSurvey(data.survey);
    setResponses(data.responses);
  };


  const downloadExcel = () => {
  const rows = responses.map((response, index) => {
    const row = {
      "Sr No": index + 1,
      Status: response.status,
    };

    survey.questions.forEach((q) => {
      const key = q._id;
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

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Responses"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, `${survey.name}-Responses.xlsx`);
};

  if (!survey) return <div>Loading...</div>;

  const totalPages = Math.ceil(responses.length / PER_PAGE);

  const current = responses.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return (
    <div className="p-8">

     <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold">
    Survey Responses
  </h1>

  <button
    onClick={downloadExcel}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
  >
    Download Excel
  </button>

</div>
      <div className="overflow-auto border rounded-lg">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">#</th>

              <th className="border p-3">Status</th>

              {survey.questions.map((q) => (

                <th
                  key={q._id}
                  className="border p-3"
                >
                  {q.title}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {current.map((response, index) => (

              <tr key={response._id}>

                <td className="border p-3">
                  {(page - 1) * PER_PAGE + index + 1}
                </td>

                <td className="border p-3">
                  {response.status}
                </td>

                {survey.questions.map((q) => {

                 const key = q._id;

const value = response.answers[key];

return (
  <td
    key={key}
    className="border p-3 align-top"
  >
    {Array.isArray(value) ? (
      value.join(", ")
    ) : value && typeof value === "object" ? (
      <div className="space-y-1">
        {Object.entries(value).map(([row, answer]) => (
          <div key={row}>
            <span className="font-semibold">{row}:</span>{" "}
            {answer}
          </div>
        ))}
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

      <div className="flex justify-center gap-2 mt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded"
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
            className={`px-4 py-2 rounded ${
              p === page
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
          className="px-4 py-2 border rounded"
        >
          Next
        </button>

      </div>

    </div>
  );
}