// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";
// import { getSurvey } from "../services/surveyBuilderApi";

// export default function SurveyRunner() {

//  const { token } = useParams();

//   const [survey, setSurvey] = useState(null);

//   const [answers, setAnswers] = useState({});
//   const [started, setStarted] = useState(false);
// const [currentQuestion, setCurrentQuestion] = useState(0);

//  useEffect(() => {
//   loadSurvey();
// }, [token]);

//   const loadSurvey = async () => {

//     try {

//       const { data } = await api.get(
//   `/survey-builder/public/${token}`
// );

// setSurvey(data);
// console.log("SURVEY:", data);
// console.log("QUESTIONS:", data.questions);

//     } catch (err) {

//       console.log(err);

//     }

//   };

//   if (!survey)
//     return (
//       <div className="p-10">
//         Loading...
//       </div>
//     );
// if (!started) {
//   return (
//     <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">

//       <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-12 text-center">

//         <img
//           src="/inputify.png"
//           alt="Logo"
//           className="h-20 mx-auto mb-8"
//         />

//         <h1 className="text-5xl font-bold mb-4">
//           {survey.name}
//         </h1>

//         <p className="text-lg text-gray-500 mb-10">
//           {survey.description}
//         </p>

//         <div className="bg-orange-50 rounded-2xl p-6 text-left mb-10">

//           <p className="mb-2">
//             ✅ This survey takes about 5 minutes.
//           </p>

//           <p className="mb-2">
//             ✅ Your responses are anonymous.
//           </p>

//           <p>
//             ✅ Please answer every question honestly.
//           </p>

//         </div>

//         <button
//           onClick={() => setStarted(true)}
//           className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-semibold text-lg"
//         >
//           Start Survey
//         </button>

//       </div>

//     </div>
//   );
// }
// const submitSurvey = () => {


//     for (const question of survey.questions) {

//     if (!question.required) continue;

//    const questionKey = question._id || question.id;
// const answer = answers[questionKey];

//     if (question.type === "matrix") {

//     if (
//         !answer ||
//         Object.keys(answer).length !== question.rows.length
//     ) {

//         alert(`${question.title} is required`);

//         return;
//     }

// }
// else if (

//     answer === undefined ||

//     answer === "" ||

//     (Array.isArray(answer) && answer.length === 0)

// ) {

//     alert(`${question.title} is required`);

//     return;

// } {

//       alert(`${question.title} is required`);

//       return;

//     }

//   }

//   const action = evaluateConditions();

//   console.log("Survey Action:", action);

//   if (
//     action === "disqualify" &&
//     survey.disqualifyUrl
//   ) {
//     window.location.href = survey.disqualifyUrl;
//     return;
//   }

//   if (
//     action === "quota" &&
//     survey.quotaFullUrl
//   ) {
//     window.location.href = survey.quotaFullUrl;
//     return;
//   }

//   if (
//     action === "complete" &&
//     survey.completeUrl
//   ) {
//     window.location.href = survey.completeUrl;
//     return;
//   }

//   // Default
//   window.location.href = survey.completeUrl;

// };

// const evaluateConditions = () => {

//   for (const question of survey.questions) {

//     const questionKey = question._id || question.id;
// const answer = answers[questionKey];

//     if (!question.conditions) continue;

//     for (const condition of question.conditions) {

//       let matched = false;
// console.log("Answer:", answer);
// console.log("Condition:", condition);
//      switch (condition.operator) {

//   case "equals":
//     matched = Array.isArray(answer)
//       ? answer.includes(condition.value)
//       : String(answer) === String(condition.value);
//     break;

//   case "not_equals":
//     matched = Array.isArray(answer)
//       ? !answer.includes(condition.value)
//       : String(answer) !== String(condition.value);
//     break;

//   case "greater_than":
//     matched =
//       Number(answer) >
//       Number(condition.value);
//     break;

//   case "greater_equal":
//     matched =
//       Number(answer) >=
//       Number(condition.value);
//     break;

//   case "less_than":
//     matched =
//       Number(answer) <
//       Number(condition.value);
//     break;

//   case "less_equal":
//     matched =
//       Number(answer) <=
//       Number(condition.value);
//     break;

//   case "contains":
//     matched = String(answer || "")
//       .toLowerCase()
//       .includes(
//         String(condition.value)
//           .toLowerCase()
//       );
//     break;

//   default:
//     matched = false;
// }

//       if (matched) {

//         return condition.action;

//       }

//     }

//   }

//   return "complete";

// };
// const question = survey.questions[currentQuestion];
// const questionKey = question?._id || question?.id;

// const progress =
//   ((currentQuestion + 1) / survey.questions.length) * 100;

//  return (

//     <div className="max-w-3xl mx-auto p-8">

//       <h1 className="text-3xl font-bold mb-2">

//         {survey.name}

//       </h1>

//       <p className="text-gray-500 mb-8">

//         {survey.description}

//       </p>

//      {survey.questions.map((question) => {

// const questionKey =
//   question._id || question.id;
// const question = survey.questions[currentQuestion];

// const questionKey =
//   question._id || question.id;

// const progress =
//   ((currentQuestion + 1) /
//     survey.questions.length) *
//   100;
// return (

//   <div
//     key={questionKey}
//     className="mb-8 border rounded-xl p-6 bg-white"
//   >

//     <h2 className="text-lg font-semibold mb-4">
//       {question.title}

//       {question.required && (
//         <span className="text-red-500 ml-1">*</span>
//       )}
//     </h2>

//     {/* RADIO */}

//     {question.type === "radio" &&
//       question.options.map((option) => (

//         <label
//           key={option}
//           className="flex items-center gap-3 mb-3"
//         >
//           <input
//             type="radio"
//             name={questionKey}
//             value={option}
//             checked={answers[questionKey] === option}
//             onChange={(e) =>
//               setAnswers({
//                 ...answers,
//                 [questionKey]: e.target.value,
//               })
//             }
//           />

//           {option}

//         </label>

//       ))}

//     {/* CHECKBOX */}

//     {question.type === "checkbox" &&
//       question.options.map((option) => (

//         <label
//           key={option}
//           className="flex items-center gap-3 mb-3"
//         >
//           <input
//             type="checkbox"
//             checked={
//              answers[questionKey]?.includes(option) || false
//             }
//             onChange={(e) => {

//               const current =
//                 answers[questionKey] || [];

//               if (e.target.checked) {

//                 setAnswers({
//                   ...answers,
//                   [questionKey]: [...current, option],
//                 });

//               } else {

//                 setAnswers({
//                   ...answers,
//                   [questionKey]:
//                     current.filter(
//                       (item) => item !== option
//                     ),
//                 });

//               }

//             }}
//           />

//           {option}

//         </label>

//       ))}

//     {/* DROPDOWN */}

//     {question.type === "dropdown" && (

//       <select
//         className="w-full border rounded-lg p-3"
//         value={answers[questionKey] || ""}
//         onChange={(e) =>
//           setAnswers({
//             ...answers,
//             [questionKey]: e.target.value,
//           })
//         }
//       >
//         <option value="">
//           Select
//         </option>

//         {question.options.map((option) => (

//           <option
//             key={option}
//             value={option}
//           >
//             {option}
//           </option>

//         ))}

//       </select>

//     )}

//     {/* TEXT */}

//     {question.type === "text" && (

//       <input
//         type="text"
//         className="w-full border rounded-lg p-3"
//         value={answers[questionKey] || ""}
//         onChange={(e) =>
//           setAnswers({
//             ...answers,
//             [questionKey]: e.target.value,
//           })
//         }
//       />

//     )}

//     {/* TEXTAREA */}

//     {question.type === "textarea" && (

//       <textarea
//         rows={4}
//         className="w-full border rounded-lg p-3"
//         value={answers[questionKey] || ""}
//         onChange={(e) =>
//           setAnswers({
//             ...answers,
//             [questionKey]: e.target.value,
//           })
//         }
//       />

//     )}

//     {/* NUMBER */}

//     {question.type === "number" && (

//       <input
//         type="number"
//         className="w-full border rounded-lg p-3"
//         value={answers[questionKey] || ""}
//         onChange={(e) =>
//           setAnswers({
//             ...answers,
//             [questionKey]: e.target.value,
//           })
//         }
//       />

//     )}

//     {/* EMAIL */}

//     {question.type === "email" && (

//       <input
//         type="email"
//         className="w-full border rounded-lg p-3"
//         value={answers[questionKey] || ""}
//         onChange={(e) =>
//           setAnswers({
//             ...answers,
//             [questionKey]: e.target.value,
//           })
//         }
//       />

//     )}

//     {/* DATE */}

//     {question.type === "date" && (

//       <input
//         type="date"
//         className="w-full border rounded-lg p-3"
//         value={answers[questionKey] || ""}
//         onChange={(e) =>
//           setAnswers({
//             ...answers,
//             [questionKey]: e.target.value,
//           })
//         }
//       />

//     )}

// {/* MATRIX */}

// {question.type === "matrix" && (

// <div className="overflow-x-auto">

// <table className="w-full border border-gray-300">

// <thead>

// <tr className="bg-gray-100">

// <th className="border p-3 text-left">
// Statement
// </th>

// {question.columns.map((column) => (

// <th
//     key={column}
//     className="border p-3 text-center"
// >
//     {column}
// </th>

// ))}

// </tr>

// </thead>

// <tbody>

// {question.rows.map((row) => (

// <tr key={row}>

// <td className="border p-3">
// {row}
// </td>

// {question.columns.map((column) => (

// <td
//     key={column}
//     className="border text-center"
// >

// <input
//     type="radio"
//     name={`${questionKey}-${row}`}
//     checked={
//         answers[questionKey]?.[row] === column
//     }
//     onChange={() =>

//         setAnswers({

//             ...answers,

//             [questionKey]: {

//                 ...(answers[questionKey] || {}),

//                 [row]: column,

//             },

//         })

//     }
// />

// </td>

// ))}

// </tr>

// ))}

// </tbody>

// </table>

// </div>

// )}
//   </div>
// );

// })}

// <div className="mt-8 flex justify-end">

//   <button
//     onClick={submitSurvey}
//     className="
//       bg-orange-500
//       hover:bg-orange-600
//       text-white
//       px-6
//       py-3
//       rounded-lg
//       font-semibold
//     "
//   >
//     Submit Survey
//   </button>

// </div>
//     </div>

//   );

// }




import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function SurveyRunner() {
  const { token } = useParams();

  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    loadSurvey();
  }, [token]);

  const loadSurvey = async () => {
    try {
      const { data } = await api.get(
        `/survey-builder/public/${token}`
      );

      setSurvey(data);

    } catch (err) {
      console.log(err);
    }
  };

  if (!survey) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Survey...
      </div>
    );
  }

// const evaluateConditions = () => {

//   for (const q of survey.questions) {

//     const key = q._id || q.id;

//     const answer = answers[key];

//     if (!q.conditions) continue;

//     for (const condition of q.conditions) {

//       let matched = false;

//       switch (condition.operator) {

//         case "equals":
//           matched = Array.isArray(answer)
//             ? answer.includes(condition.value)
//             : String(answer) === String(condition.value);
//           break;

//         case "not_equals":
//           matched = Array.isArray(answer)
//             ? !answer.includes(condition.value)
//             : String(answer) !== String(condition.value);
//           break;

//         case "greater_than":
//           matched = Number(answer) > Number(condition.value);
//           break;

//         case "greater_equal":
//           matched = Number(answer) >= Number(condition.value);
//           break;

//         case "less_than":
//           matched = Number(answer) < Number(condition.value);
//           break;

//         case "less_equal":
//           matched = Number(answer) <= Number(condition.value);
//           break;

//         case "contains":
//           matched = String(answer || "")
//             .toLowerCase()
//             .includes(
//               String(condition.value).toLowerCase()
//             );
//           break;

//         default:
//           matched = false;

//       }

//       if (matched) {
//         return condition.action;
//       }

//     }

//   }

//   return "complete";

// };

const evaluateConditions = () => {

  const current = survey.questions[currentQuestion];

  const key = current.id;

  const answer = answers[key];

  for (const condition of current.conditions || []) {

    let matched = false;

    switch (condition.operator) {

      case "equals":
        matched = Array.isArray(answer)
          ? answer.includes(condition.value)
          : String(answer) === String(condition.value);
        break;

      case "not_equals":
        matched = Array.isArray(answer)
          ? !answer.includes(condition.value)
          : String(answer) !== String(condition.value);
        break;

      case "greater_than":
        matched = Number(answer) > Number(condition.value);
        break;

      case "greater_equal":
        matched = Number(answer) >= Number(condition.value);
        break;

      case "less_than":
        matched = Number(answer) < Number(condition.value);
        break;

      case "less_equal":
        matched = Number(answer) <= Number(condition.value);
        break;

      case "contains":
        matched = String(answer || "")
          .toLowerCase()
          .includes(
            String(condition.value).toLowerCase()
          );
        break;

      default:
        matched = false;

    }
   

    if (matched) {
      return condition;
    }

  }

  return null;

};

  const question =
    survey.questions[currentQuestion];

  const questionKey = question.id;

  const progress =
    ((currentQuestion + 1) /
      survey.questions.length) *
    100;

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">

        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-12">

          <img
            src="/inputify.png"
            alt="Inputify"
            className="h-20 mx-auto mb-8"
          />

          <h1 className="text-5xl font-bold text-center mb-4">
            {survey.name}
          </h1>

          <p className="text-center text-gray-500 text-lg mb-10">
            {survey.description}
          </p>

          <div className="bg-orange-50 rounded-2xl p-6 mb-10">

            <h3 className="font-semibold text-lg mb-3">
              Before you begin
            </h3>

            <ul className="space-y-2 text-gray-700">

              <li>
                ✅ Answer all questions honestly.
              </li>

              <li>
                ✅ It only takes a few minutes.
              </li>

              <li>
                ✅ Your responses remain confidential.
              </li>

            </ul>

          </div>

          <button
            onClick={() => setStarted(true)}
            className="
              w-full
              bg-orange-500
              hover:bg-orange-600
              text-white
              py-4
              rounded-xl
              text-lg
              font-semibold
            "
          >
            Start Survey
          </button>

        </div>

      </div>
    );
  }


  const handleNext = async () => {

  const condition = evaluateConditions();

  // No condition matched
  if (!condition) {
    setCurrentQuestion(currentQuestion + 1);
    return;
  }

  switch (condition.action) {

    case "continue":
      setCurrentQuestion(currentQuestion + 1);
      break;

    case "skip": {

      const index = survey.questions.findIndex(
        (q) =>
          (q.id) === condition.skipTo
      );

      if (index !== -1) {
        setCurrentQuestion(index);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }

      break;
    }

    case "complete":

      await submitSurvey("COMPLETE");
      return;

    case "disqualify":

      await submitSurvey("DISQUALIFIED");
      return;

    case "quota":

      await submitSurvey("QUOTA");
      return;

    default:

      setCurrentQuestion(currentQuestion + 1);

  }

};

//     const submitSurvey = async () => {

//     for (const q of survey.questions) {

//       if (!q.required) continue;

//       const key = q._id || q.id;

//       const answer = answers[key];

//       if (q.type === "matrix") {

//         if (
//           !answer ||
//           Object.keys(answer).length !== q.rows.length
//         ) {
//           alert(`${q.title} is required`);
//           return;
//         }

//       } else {

//         if (
//           answer === undefined ||
//           answer === "" ||
//           (Array.isArray(answer) &&
//             answer.length === 0)
//         ) {
//           alert(`${q.title} is required`);
//           return;
//         }

//       }

//     }

//     const action = evaluateConditions();
//     try {
//     await api.post(
//   `/survey-builder/submit/${token}`,
//   {
//     answers,

//     status:
//       action === "disqualify"
//         ? "DISQUALIFIED"
//         : action === "quota"
//         ? "QUOTA"
//         : "COMPLETE",
//   }
// );
//  } catch (err) {
//     // console.error("Failed to save survey response", err);
//     alert("Unable to save survey response.");
//     return;
//   }

//     if (
//       action === "disqualify" &&
//       survey.disqualifyUrl
//     ) {
//       window.location.href =
//         survey.disqualifyUrl;
//       return;
//     }

//     if (
//       action === "quota" &&
//       survey.quotaFullUrl
//     ) {
//       window.location.href =
//         survey.quotaFullUrl;
//       return;
//     }

//     window.location.href =
//       survey.completeUrl;
//   };



//  const submitSurvey = async (status = "COMPLETE") => {

//     for (const q of survey.questions) {

//       if (!q.required) continue;

//       const key = q.id;

//       const answer = answers[key];

//       if (q.type === "matrix") {

//         if (
//           !answer ||
//           Object.keys(answer).length !== q.rows.length
//         ) {
//           alert(`${q.title} is required`);
//           return;
//         }

//       } else {

//         if (
//           answer === undefined ||
//           answer === "" ||
//           (Array.isArray(answer) &&
//             answer.length === 0)
//         ) {
//           alert(`${q.title} is required`);
//           return;
//         }

//       }

//     }

//     const action = evaluateConditions();
//     try {
//     await api.post(
//   `/survey-builder/submit/${token}`,
//   {
//     answers,

//     status:
//       action === "disqualify"
//         ? "DISQUALIFIED"
//         : action === "quota"
//         ? "QUOTA"
//         : "COMPLETE",
//   }
// );
//  } catch (err) {
//     // console.error("Failed to save survey response", err);
//     alert("Unable to save survey response.");
//     return;
//   }



const submitSurvey = async (status = "COMPLETE") => {
   if (status === "COMPLETE") {

    for (const q of survey.questions) {

      if (!q.required) continue;

      const key = q.id;

      const answer = answers[key];

      if (q.type === "matrix") {

        if (
          !answer ||
          Object.keys(answer).length !== q.rows.length
        ) {
          alert(`${q.title} is required`);
          return;
        }

      } else {

        if (
          answer === undefined ||
          answer === "" ||
          (Array.isArray(answer) &&
            answer.length === 0)
        ) {
          alert(`${q.title} is required`);
          return;
        }

      }

    }

  }

try {

  await api.post(
    `/survey-builder/submit/${token}`,
    {
      answers,
      status,
    }
  );

} catch (err) {

  alert("Unable to save survey response");

  return;

}


    // if (
    //   action === "disqualify" &&
    //   survey.disqualifyUrl
    // ) {
    //   window.location.href =
    //     survey.disqualifyUrl;
    //   return;
    // }

    // if (
    //   action === "quota" &&
    //   survey.quotaFullUrl
    // ) {
    //   window.location.href =
    //     survey.quotaFullUrl;
    //   return;
    // }

    // window.location.href =
    //   survey.completeUrl;

if (
  status === "DISQUALIFIED" &&
  survey.disqualifyUrl
) {

  window.location.href =
    survey.disqualifyUrl;

  return;

}

if (
  status === "QUOTA" &&
  survey.quotaFullUrl
) {

  window.location.href =
    survey.quotaFullUrl;

  return;

}

window.location.href =
  survey.completeUrl;

  };


  return(
    <div className="min-h-screen bg-slate-100 py-10">

  <div className="max-w-4xl mx-auto">

    {/* Progress */}

    <div className="mb-8">

      <div className="flex justify-between mb-3">

        <h2 className="text-xl font-semibold">

          Question {currentQuestion + 1}

        </h2>

        <span className="text-gray-500">

          {currentQuestion + 1} / {survey.questions.length}

        </span>

      </div>

      <div className="w-full h-3 rounded-full bg-gray-200">

        <div
          className="h-3 rounded-full bg-orange-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>

    {/* Question Card */}

    <div className="bg-white rounded-3xl shadow-xl p-10">

      <h2 className="text-3xl font-bold mb-10">

        {question.title}

        {question.required && (

          <span className="text-red-500 ml-2">*</span>

        )}

      </h2>

            {question.type === "radio" &&

        question.options.map((option) => (

          <label
            key={option}
            className="
              flex
              items-center
              gap-4
              border
              rounded-xl
              p-5
              mb-4
              cursor-pointer
              hover:border-orange-500
              transition
            "
          >

            <input
              type="radio"
              name={questionKey}
              value={option}
              checked={answers[questionKey] === option}
              onChange={(e)=>

                setAnswers({
                  ...answers,
                  [questionKey]: e.target.value
                })

              }
            />

            <span className="text-lg">

              {option}

            </span>

          </label>

      ))}

            {question.type === "checkbox" &&

        question.options.map((option)=>(

          <label
            key={option}
            className="
              flex
              items-center
              gap-4
              border
              rounded-xl
              p-5
              mb-4
              cursor-pointer
            "
          >

            <input
              type="checkbox"
              checked={
                answers[questionKey]?.includes(option) || false
              }
              onChange={(e)=>{

                const current =
                  answers[questionKey] || [];

                if(e.target.checked){

                  setAnswers({
                    ...answers,
                    [questionKey]:[
                      ...current,
                      option
                    ]
                  });

                }else{

                  setAnswers({
                    ...answers,
                    [questionKey]:
                    current.filter(
                      x=>x!==option
                    )
                  });

                }

              }}
            />

            <span className="text-lg">

              {option}

            </span>

          </label>

      ))}

            {question.type === "text" && (

        <input
          type="text"
          className="
            w-full
            border
            rounded-xl
            p-5
            text-lg
          "
          value={answers[questionKey] || ""}
          onChange={(e)=>

            setAnswers({
              ...answers,
              [questionKey]:e.target.value
            })

          }
        />

      )}

            {question.type === "textarea" && (

        <textarea
          rows={5}
          className="
            w-full
            border
            rounded-xl
            p-5
            text-lg
          "
          value={answers[questionKey] || ""}
          onChange={(e)=>

            setAnswers({
              ...answers,
              [questionKey]:e.target.value
            })

          }
        />

      )}

            {question.type === "number" && (

        <input
          type="number"
          className="
            w-full
            border
            rounded-xl
            p-5
            text-lg
          "
          value={answers[questionKey] || ""}
          onChange={(e)=>

            setAnswers({
              ...answers,
              [questionKey]:e.target.value
            })

          }
        />

      )}

            {question.type === "email" && (

        <input
          type="email"
          className="
            w-full
            border
            rounded-xl
            p-5
            text-lg
          "
          value={answers[questionKey] || ""}
          onChange={(e)=>

            setAnswers({
              ...answers,
              [questionKey]:e.target.value
            })

          }
        />

      )}

            {question.type === "date" && (

        <input
          type="date"
          className="
            w-full
            border
            rounded-xl
            p-5
            text-lg
          "
          value={answers[questionKey] || ""}
          onChange={(e)=>

            setAnswers({
              ...answers,
              [questionKey]:e.target.value
            })

          }
        />

      )}

            {question.type === "dropdown" && (

        <select
          className="
            w-full
            border
            rounded-xl
            p-5
            text-lg
          "
          value={answers[questionKey] || ""}
          onChange={(e)=>

            setAnswers({
              ...answers,
              [questionKey]:e.target.value
            })

          }
        >

          <option value="">
            Select
          </option>

          {question.options.map(option=>(

            <option
              key={option}
              value={option}
            >
              {option}
            </option>

          ))}

        </select>

      )}

            {question.type === "matrix" && (

        <div className="overflow-x-auto">

          <table className="w-full border rounded-xl overflow-hidden">

            <thead>

              <tr className="bg-gray-100">

                <th className="border p-4 text-left">
                  Statement
                </th>

                {question.columns.map((column) => (

                  <th
                    key={column}
                    className="border p-4 text-center"
                  >
                    {column}
                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {question.rows.map((row) => (

                <tr key={row}>

                  <td className="border p-4">

                    {row}

                  </td>

                  {question.columns.map((column) => (

                    <td
                      key={column}
                      className="border text-center"
                    >

                      <input
                        type="radio"
                        name={`${questionKey}-${row}`}
                        checked={
                          answers[questionKey]?.[row] === column
                        }
                        onChange={() =>

                          setAnswers({

                            ...answers,

                            [questionKey]: {

                              ...(answers[questionKey] || {}),

                              [row]: column,

                            },

                          })

                        }
                      />

                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

            <div className="flex justify-between mt-12">

        <button

          disabled={currentQuestion === 0}

          onClick={() =>
            setCurrentQuestion(currentQuestion - 1)
          }

          className="
            px-8
            py-3
            rounded-xl
            border
            disabled:opacity-40
          "
        >

          ← Previous

        </button>

        {currentQuestion < survey.questions.length - 1 ? (

          <button

  onClick={handleNext}

  className="
    bg-orange-500
    hover:bg-orange-600
    text-white
    px-8
    py-3
    rounded-xl
  "
>

  Next →

</button>

        ) : (

          <button

            onClick={() => submitSurvey("COMPLETE")}

            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-8
              py-3
              rounded-xl
            "
          >

            Submit Survey

          </button>

        )}

      </div>
    </div>
      </div>
      </div>
  );
  
}