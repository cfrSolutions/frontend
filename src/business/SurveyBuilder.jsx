// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import {
//   createSurvey,
//   updateSurvey,
//   getSurvey,
// } from "../services/surveyBuilderApi";
// import {
//   FileText,
//   Link,
//   Plus,
//   Save,
// } from "lucide-react";

// export default function SurveyBuilder() {
//   const navigate = useNavigate();

// const { id } = useParams();
//   const [survey, setSurvey] = useState({
//     name: "",
//     description: "",
//     completeUrl: "",
//     disqualifyUrl: "",
//     quotaFullUrl: "",
//   });

//   const [questions, setQuestions] = useState([]);

//   const handleChange = (e) => {
//     setSurvey((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

// //   const addQuestion = () => {
// //   setQuestions((prev) => [
// //     ...prev,
// //     {
// //       id: Date.now(),
// //       title: "",
// //       type: "radio",
// //       required: false,
// //       options: ["Option 1", "Option 2"],
// //       rows: [
// //   "Statement 1",
// //   "Statement 2",
// // ],
// // columns: [
// //   "1",
// //   "2",
// //   "3",
// //   "4",
// //   "5",
// // ],
// //       conditions: [],
// //     },
// //   ]);
// // };

// const addQuestion = (position = questions.length) => {

//   const newQuestion = {
//     id: Date.now(),
//     title: "",
//     type: "radio",
//     required: false,
//     options: ["Option 1", "Option 2"],
//     rows: [
//       "Statement 1",
//       "Statement 2",
//     ],
//     columns: [
//       "1",
//       "2",
//       "3",
//       "4",
//       "5",
//     ],
//     conditions: [],
//   };

//   const updated = [...questions];

//   updated.splice(position, 0, newQuestion);

//   setQuestions(updated);

// };

// const addCondition = (questionId) => {
//   setQuestions((prev) =>
//     prev.map((q) =>
//       q.id === questionId
//         ? {
//             ...q,
//             conditions: [
//               ...q.conditions,
//               {
//     id: Date.now(),
//     operator: "equals",
//     value: "",
//     skipTo: "",
//     action: "continue",
// }
//             ],
//           }
//         : q
//     )
//   );
// };

// const updateCondition = (
//   questionId,
//   conditionId,
//   field,
//   value
// ) => {
//   setQuestions((prev) =>
//     prev.map((q) => {
//       if (q.id !== questionId) return q;

//       return {
//         ...q,
//         conditions: q.conditions.map((c) =>
//           c.id === conditionId
//             ? {
//                 ...c,
//                 [field]: value,
//               }
//             : c
//         ),
//       };
//     })
//   );
// };

// const deleteCondition = (
//   questionId,
//   conditionId
// ) => {
//   setQuestions((prev) =>
//     prev.map((q) => {
//       if (q.id !== questionId) return q;

//       return {
//         ...q,
//         conditions: q.conditions.filter(
//           (c) => c.id !== conditionId
//         ),
//       };
//     })
//   );
// };

// const updateQuestion = (id, field, value) => {
//   setQuestions((prev) =>
//     prev.map((q) =>
//       q.id === id ? { ...q, [field]: value } : q
//     )
//   );
// };

// const deleteQuestion = (id) => {
//   setQuestions((prev) =>
//     prev.filter((q) => q.id !== id)
//   );
// };

// const addOption = (id) => {
//   setQuestions((prev) =>
//     prev.map((q) =>
//       q.id === id
//         ? {
//             ...q,
//             options: [...q.options, `Option ${q.options.length + 1}`],
//           }
//         : q
//     )
//   );
// };

// const updateOption = (questionId, index, value) => {
//   setQuestions((prev) =>
//     prev.map((q) => {
//       if (q.id !== questionId) return q;

//       const options = [...q.options];
//       options[index] = value;

//       return {
//         ...q,
//         options,
//       };
//     })
//   );
// };

// const removeOption = (questionId, index) => {
//   setQuestions((prev) =>
//     prev.map((q) => {
//       if (q.id !== questionId) return q;

//       return {
//         ...q,
//         options: q.options.filter((_, i) => i !== index),
//       };
//     })
//   );
// };

// const updateRow = (questionId, index, value) => {
//   setQuestions((prev) =>
//     prev.map((q) => {
//       if (q.id !== questionId) return q;

//       const rows = [...q.rows];
//       rows[index] = value;

//       return {
//         ...q,
//         rows,
//       };
//     })
//   );
// };

// const addRow = (questionId) => {
//   setQuestions((prev) =>
//     prev.map((q) =>
//       q.id === questionId
//         ? {
//             ...q,
//             rows: [...q.rows, `Statement ${q.rows.length + 1}`],
//           }
//         : q
//     )
//   );
// };

// const removeRow = (questionId, index) => {
//   setQuestions((prev) =>
//     prev.map((q) => {
//       if (q.id !== questionId) return q;

//       return {
//         ...q,
//         rows: q.rows.filter((_, i) => i !== index),
//       };
//     })
//   );
// };

// const updateColumn = (questionId, index, value) => {
//   setQuestions((prev) =>
//     prev.map((q) => {
//       if (q.id !== questionId) return q;

//       const columns = [...q.columns];
//       columns[index] = value;

//       return {
//         ...q,
//         columns,
//       };
//     })
//   );
// };

// const addColumn = (questionId) => {
//   setQuestions((prev) =>
//     prev.map((q) =>
//       q.id === questionId
//         ? {
//             ...q,
//             columns: [...q.columns, `${q.columns.length + 1}`],
//           }
//         : q
//     )
//   );
// };

// const removeColumn = (questionId, index) => {
//   setQuestions((prev) =>
//     prev.map((q) => {
//       if (q.id !== questionId) return q;

//       return {
//         ...q,
//         columns: q.columns.filter((_, i) => i !== index),
//       };
//     })
//   );
// };

//  const handleSave = async () => {
//   try {

//     const payload = {
//       ...survey,
//       questions,
//     };

//     if (id) {

//       await updateSurvey(id, payload);

//       alert("Survey updated.");

//     } else {

//       await createSurvey(payload);

//       alert("Survey created.");

//     }

//     navigate("/business/dashboard/survey-forms");

//   } catch (err) {

//     // console.log(err);

//     alert("Unable to save survey.");

//   }
// };

// useEffect(() => {

//   if (!id) return;

//   loadSurvey();

// }, [id]);

// const loadSurvey = async () => {

//   try {

//     const { data } = await getSurvey(id);

//     setSurvey({
//       name: data.name,
//       description: data.description,
//       completeUrl: data.completeUrl,
//       disqualifyUrl: data.disqualifyUrl,
//       quotaFullUrl: data.quotaFullUrl,
//     });

//     setQuestions(
//   data.questions.map((question, qIndex) => ({
//     ...question,
//     id: question.id || `q-${qIndex}-${Date.now()}`,
//     conditions: (question.conditions || []).map((condition, cIndex) => ({
//       ...condition,
//       id: condition.id || `c-${qIndex}-${cIndex}-${Date.now()}`
//     }))
//   }))
// );

//   } catch (err) {

//     console.log(err);

//   }

// };

//   return (
//     <div className="container mx-auto px-6 py-8">

//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold">Survey Builder</h1>
//           <p className="text-gray-500 mt-1">
//             Create your own survey with custom logic.
//           </p>
//         </div>

//         <button
//           onClick={handleSave}
//           className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg"
//         >
//           <Save size={18} />
//           Save & Continue
//         </button>
//       </div>

//       {/* Survey Information */}

//       <div className="bg-white rounded-xl shadow border mb-8">

//         <div className="border-b px-6 py-4">
//           <h2 className="flex items-center gap-2 font-semibold text-lg">
//             <FileText size={18} />
//             Survey Information
//           </h2>
//         </div>

//         <div className="p-6">

//           <div className="mb-5">
//             <label className="block mb-2 font-medium">
//               Survey Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={survey.name}
//               onChange={handleChange}
//               placeholder="Customer Banking Survey"
//               className="w-full border rounded-lg px-4 py-3"
//             />
//           </div>

//           <div className="mb-5">
//             <label className="block mb-2 font-medium">
//               Description
//             </label>

//             <textarea
//               rows={4}
//               name="description"
//               value={survey.description}
//               onChange={handleChange}
//               placeholder="Survey description..."
//               className="w-full border rounded-lg px-4 py-3"
//             />
//           </div>

//           <div className="grid md:grid-cols-3 gap-5">

//             <div>
//               <label className="block mb-2 font-medium">
//                 Complete URL
//               </label>

//               <div className="flex items-center border rounded-lg overflow-hidden">

//                 <div className="px-3 bg-gray-100">
//                   <Link size={16} />
//                 </div>

//                 <input
//                   type="text"
//                   name="completeUrl"
//                   value={survey.completeUrl}
//                   onChange={handleChange}
//                   placeholder="https://..."
//                   className="w-full px-3 py-3 outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-2 font-medium">
//                 Disqualify URL
//               </label>

//               <div className="flex items-center border rounded-lg overflow-hidden">

//                 <div className="px-3 bg-gray-100">
//                   <Link size={16} />
//                 </div>

//                 <input
//                   type="text"
//                   name="disqualifyUrl"
//                   value={survey.disqualifyUrl}
//                   onChange={handleChange}
//                   placeholder="https://..."
//                   className="w-full px-3 py-3 outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-2 font-medium">
//                 Quota Full URL
//               </label>

//               <div className="flex items-center border rounded-lg overflow-hidden">

//                 <div className="px-3 bg-gray-100">
//                   <Link size={16} />
//                 </div>

//                 <input
//                   type="text"
//                   name="quotaFullUrl"
//                   value={survey.quotaFullUrl}
//                   onChange={handleChange}
//                   placeholder="https://..."
//                   className="w-full px-3 py-3 outline-none"
//                 />
//               </div>
//             </div>

//           </div>

//         </div>
//       </div>

//       {/* Questions */}

//       <div className="bg-white rounded-xl shadow border">

//         <div className="flex justify-between items-center border-b px-6 py-4">

//           <h2 className="font-semibold text-lg">
//             Questions
//           </h2>

//           <button
//     onClick={addQuestion}
//     className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
// >
//             <Plus size={18} />
//             Add Question
//           </button>

//         </div>

//         <div className="p-6">

//   {questions.length === 0 && (
//     <div className="text-center py-12">
//       <h3 className="text-xl font-semibold">
//         No Questions Added
//       </h3>

//       <p className="text-gray-500 mt-2">
//         Click Add Question.
//       </p>
//     </div>
//   )}

//   {questions.map((question, qIndex) => (
//     <div
//       key={question.id || question._id}
//       className="border rounded-xl p-5 mb-5 bg-slate-50"
//     >
//       <div className="flex justify-between items-center mb-4">

//         <h4 className="text-lg font-semibold">
//           Question {qIndex + 1}
//         </h4>

//         {/* <button
//           onClick={() => deleteQuestion(question.id)}
//           className="text-red-600"
//         >
//           Delete
//         </button> */}

//       </div>

//       <input
//         className="w-full border rounded-lg px-3 py-2 mb-4"
//         placeholder="Question title"
//         value={question.title}
//         onChange={(e) =>
//           updateQuestion(
//             question.id,
//             "title",
//             e.target.value
//           )
//         }
//       />

//       <select
//         className="w-full border rounded-lg px-3 py-2 mb-4"
//         value={question.type}
//         onChange={(e) =>
//           updateQuestion(
//             question.id,
//             "type",
//             e.target.value
//           )
//         }
//       >
//         <option value="radio">Single Choice</option>
//         <option value="checkbox">Multiple Choice</option>
//         <option value="dropdown">Dropdown</option>
//         <option value="text">Text</option>
//         <option value="textarea">Textarea</option>
//         <option value="number">Number</option>
//         <option value="email">Email</option>
//         <option value="date">Date</option>
//         <option value="matrix">Matrix</option>
//       </select>

//       <label className="flex items-center gap-2 mb-4">

//         <input
//           type="checkbox"
//           checked={question.required}
//           onChange={(e) =>
//             updateQuestion(
//               question.id,
//               "required",
//               e.target.checked
//             )
//           }
//         />

//         Required

//       </label>

//       {(question.type === "radio" ||
//         question.type === "checkbox" ||
//         question.type === "dropdown") && (
//         <>
        
//           {question.options.map((option, index) => (
//             <div
//               key={index}
//               className="flex gap-2 mb-2"
//             >
//               <input
//                 className="flex-1 border rounded-lg px-3 py-2"
//                 value={option}
//                 onChange={(e) =>
//                   updateOption(
//                     question.id,
//                     index,
//                     e.target.value
//                   )
//                 }
//               />

//               <button
//                 onClick={() =>
//                   removeOption(question.id, index)
//                 }
//                 className="text-red-600"
//               >
//                 ✕
//               </button>
              
//             </div>
//           ))}

          

//           <button
//             onClick={() =>
//               addOption(question.id)
//             }
//             className="mt-2 text-orange-600 font-medium"
//           >
//             + Add Option
//           </button>

//           <div className="mt-6 border-t pt-5">

//   <div className="flex justify-between items-center">

//     <h4 className="font-semibold text-gray-700">
//       Conditions
//     </h4>

//     <button
//       onClick={() => addCondition(question.id)}
//       className="text-orange-600 font-medium"
//     >
//       + Condition
//     </button>

//   </div>

//   {question.conditions.map((condition) => (

//     <div
//        key={condition.id || condition._id}
//       className="border rounded-lg p-4 mt-4 bg-white"
//     >

//       <div className="grid md:grid-cols-3 gap-4">

//         <div>

//          <label className="block text-sm font-semibold mb-3">
//   IF
// </label>

// <div className="grid md:grid-cols-3 gap-3">

//   {/* Operator */}
//   <select
//     className="border rounded-lg p-2"
//     value={condition.operator}
//     onChange={(e) =>
//       updateCondition(
//         question.id,
//         condition.id,
//         "operator",
//         e.target.value
//       )
//     }
//   >
//     <option value="equals">Equals</option>
//     <option value="not_equals">Not Equals</option>
//     <option value="greater_than">Greater Than</option>
//     <option value="greater_equal">Greater Than or Equal</option>
//     <option value="less_than">Less Than</option>
//     <option value="less_equal">Less Than or Equal</option>
//     <option value="contains">Contains</option>
//   </select>

//   {/* Value */}
//   {(question.type === "radio" ||
//     question.type === "checkbox" ||
//     question.type === "dropdown") ? (

//     <select
//       className="border rounded-lg p-2"
//       value={condition.value}
//       onChange={(e) =>
//         updateCondition(
//           question.id,
//           condition.id,
//           "value",
//           e.target.value
//         )
//       }
//     >
//       <option value="">Select Value</option>

//       {question.options.map((option) => (
//         <option
//           key={option}
//           value={option}
//         >
//           {option}
//         </option>
//       ))}
//     </select>

//   ) : (

//     <input
//       className="border rounded-lg p-2"
//       placeholder="Enter value"
//       value={condition.value}
//       onChange={(e) =>
//         updateCondition(
//           question.id,
//           condition.id,
//           "value",
//           e.target.value
//         )
//       }
//     />

//   )}

//   {/* Then */}
//  <select
//     className="border rounded-lg p-2"
//     value={condition.action}
//     onChange={(e)=>
//         updateCondition(
//             question.id,
//             condition.id,
//             "action",
//             e.target.value
//         )
//     }
// >
//     <option value="continue">
//         Continue
//     </option>

//     <option value="skip">
//         Skip To Question
//     </option>

//     <option value="complete">
//         Complete Survey
//     </option>

//     <option value="disqualify">
//         Disqualify
//     </option>

//     <option value="quota">
//         Quota Full
//     </option>
// </select>

// {condition.action === "skip" && (

// <div className="mt-3">

// <label className="block mb-2 text-sm font-medium">
// Skip To
// </label>

// <select
//     className="w-full border rounded-lg p-2"
//     value={condition.skipTo}
//     onChange={(e)=>
//         updateCondition(
//             question.id,
//             condition.id,
//             "skipTo",
//             e.target.value
//         )
//     }
// >

// <option value="">
// Select Question
// </option>

// {questions
// .filter(q=>q.id!==question.id)
// .map((q,index)=>(

// <option
// key={q.id}
// value={q.id}
// >

// Question {index+1}
// {" - "}
// {q.title || "Untitled"}

// </option>

// ))}

// </select>

// </div>

// )}

// </div>

//         </div>

      

//         <div className="flex items-end">

//           <button
//             onClick={() =>
//               deleteCondition(
//                 question.id,
//                 condition.id
//               )
//             }
//             className="text-red-600"
//           >
//             Delete
//           </button>

//         </div>

//       </div>

//     </div>

//   ))}

// </div>
//         </>
//       )}

//       {question.type === "matrix" && (

// <div className="mt-5">

// <h3 className="font-semibold text-lg mb-4">
// Matrix Builder
// </h3>

// {/* ROWS */}

// <div className="mb-6">

// <div className="flex justify-between items-center mb-3">

// <h4 className="font-medium">
// Rows
// </h4>

// <button
// type="button"
// onClick={() => addRow(question.id)}
// className="text-orange-600"
// >
// + Add Row
// </button>

// </div>

// {question.rows.map((row, index) => (

// <div
// key={index}
// className="flex gap-2 mb-2"
// >

// <input
// className="flex-1 border rounded-lg px-3 py-2"
// value={row}
// onChange={(e)=>
// updateRow(
// question.id,
// index,
// e.target.value
// )
// }
// />

// <button
// type="button"
// onClick={() =>
// removeRow(
// question.id,
// index
// )
// }
// className="text-red-600"
// >
// ✕
// </button>

// </div>

// ))}

// </div>

// {/* COLUMNS */}

// <div className="mb-6">

// <div className="flex justify-between items-center mb-3">

// <h4 className="font-medium">
// Columns
// </h4>

// <button
// type="button"
// onClick={() => addColumn(question.id)}
// className="text-orange-600"
// >
// + Add Column
// </button>

// </div>

// {question.columns.map((column,index)=>(

// <div
// key={index}
// className="flex gap-2 mb-2"
// >

// <input
// className="flex-1 border rounded-lg px-3 py-2"
// value={column}
// onChange={(e)=>
// updateColumn(
// question.id,
// index,
// e.target.value
// )
// }
// />

// <button
// type="button"
// onClick={()=>
// removeColumn(
// question.id,
// index
// )
// }
// className="text-red-600"
// >
// ✕
// </button>

// </div>

// ))}

// </div>

// {/* PREVIEW */}

// <div className="border rounded-xl overflow-hidden">

// <table className="w-full">

// <thead>

// <tr className="bg-gray-100">

// <th className="border p-3 text-left">
// Statements
// </th>

// {question.columns.map((column,index)=>(

// <th
// key={index}
// className="border p-3 text-center"
// >
// {column}
// </th>

// ))}

// </tr>

// </thead>

// <tbody>

// {question.rows.map((row,rowIndex)=>(

// <tr key={rowIndex}>

// <td className="border p-3">
// {row}
// </td>

// {question.columns.map((column,columnIndex)=>(

// <td
// key={columnIndex}
// className="border p-3 text-center"
// >

// <input
// type="radio"
// disabled
// />

// </td>

// ))}

// </tr>

// ))}

// </tbody>

// </table>

// </div>

// </div>

// )}
// <div className="flex justify-between items-center mt-6 border-t pt-4">

//   <button
//     type="button"
//     onClick={() => addQuestion(qIndex + 1)}
//     className="
//       flex
//       items-center
//       gap-2
//       bg-orange-500
//       hover:bg-orange-600
//       text-white
//       px-4
//       py-2
//       rounded-lg
//       font-medium
//     "
//   >
//     <Plus size={18} />
//     Add Question
//   </button>

//   <button
//     type="button"
//     onClick={() => deleteQuestion(question.id)}
//     className="
//       bg-red-500
//       hover:bg-red-600
//       text-white
//       px-4
//       py-2
//       rounded-lg
//       font-medium
//     "
//   >
//     Delete
//   </button>

// </div>
//     </div>
//   ))}

// </div>

//       </div>

//     </div>
//   );
// }






import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createSurvey,
  updateSurvey,
  getSurvey,
} from "../services/surveyBuilderApi";
import {
  FileText,
  Link2,
  Plus,
  Save,
  GitBranch,
  Trash2,
  X,
  CircleDot,
  CheckSquare,
  ListFilter,
  Type,
  AlignLeft,
  Hash,
  Mail,
  Calendar,
  Grid3x3,
  ClipboardList,
  ArrowDown,
} from "lucide-react";

// ---- Presentation helpers (visual only — no logic changes) ----

const QUESTION_TYPE_META = {
  radio: { label: "Single Choice", icon: CircleDot, accent: "text-indigo-600 bg-indigo-50 ring-indigo-100" },
  checkbox: { label: "Multiple Choice", icon: CheckSquare, accent: "text-indigo-600 bg-indigo-50 ring-indigo-100" },
  dropdown: { label: "Dropdown", icon: ListFilter, accent: "text-indigo-600 bg-indigo-50 ring-indigo-100" },
  text: { label: "Text", icon: Type, accent: "text-slate-600 bg-slate-100 ring-slate-200" },
  textarea: { label: "Textarea", icon: AlignLeft, accent: "text-slate-600 bg-slate-100 ring-slate-200" },
  number: { label: "Number", icon: Hash, accent: "text-slate-600 bg-slate-100 ring-slate-200" },
  email: { label: "Email", icon: Mail, accent: "text-slate-600 bg-slate-100 ring-slate-200" },
  date: { label: "Date", icon: Calendar, accent: "text-slate-600 bg-slate-100 ring-slate-200" },
  matrix: { label: "Matrix", icon: Grid3x3, accent: "text-violet-600 bg-violet-50 ring-violet-100" },
};

const ACTION_META = {
  continue: { label: "Continue", classes: "bg-slate-100 text-slate-600 ring-slate-200" },
  skip: { label: "Skip to question", classes: "bg-amber-50 text-amber-700 ring-amber-200" },
  complete: { label: "Complete survey", classes: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  disqualify: { label: "Disqualify", classes: "bg-red-50 text-red-700 ring-red-200" },
  quota: { label: "Quota full", classes: "bg-blue-50 text-blue-700 ring-blue-200" },
};

const inputClass =
  "w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition";
const selectClass = inputClass + " appearance-none";
const labelClass = "block mb-2 text-sm font-medium text-slate-700";

export default function SurveyBuilder() {
   const navigate = useNavigate();

const { id } = useParams();
  const [survey, setSurvey] = useState({
    name: "",
    description: "",
    completeUrl: "",
    disqualifyUrl: "",
    quotaFullUrl: "",
  });

  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => {
    setSurvey((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

//   const addQuestion = () => {
//   setQuestions((prev) => [
//     ...prev,
//     {
//       id: Date.now(),
//       title: "",
//       type: "radio",
//       required: false,
//       options: ["Option 1", "Option 2"],
//       rows: [
//   "Statement 1",
//   "Statement 2",
// ],
// columns: [
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
// ],
//       conditions: [],
//     },
//   ]);
// };

const addQuestion = (position = questions.length) => {

  const newQuestion = {
    id: crypto.randomUUID(),
    title: "",
    type: "radio",
    required: false,
    options: ["Option 1", "Option 2"],
    rows: [
      "Statement 1",
      "Statement 2",
    ],
    columns: [
      "1",
      "2",
      "3",
      "4",
      "5",
    ],
    conditions: [],
  };

  const updated = [...questions];

  updated.splice(position, 0, newQuestion);

  setQuestions(updated);

};

const addCondition = (questionId) => {
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === questionId
        ? {
            ...q,
            conditions: [
              ...q.conditions,
              {
    id: crypto.randomUUID(),
    operator: "equals",
    value: "",
    skipTo: "",
    action: "continue",
}
            ],
          }
        : q
    )
  );
};

const updateCondition = (
  questionId,
  conditionId,
  field,
  value
) => {
  setQuestions((prev) =>
    prev.map((q) => {
      if (q.id !== questionId) return q;

      return {
        ...q,
        conditions: q.conditions.map((c) =>
          c.id === conditionId
            ? {
                ...c,
                [field]: value,
              }
            : c
        ),
      };
    })
  );
};

const deleteCondition = (
  questionId,
  conditionId
) => {
  setQuestions((prev) =>
    prev.map((q) => {
      if (q.id !== questionId) return q;

      return {
        ...q,
        conditions: q.conditions.filter(
          (c) => c.id !== conditionId
        ),
      };
    })
  );
};

const updateQuestion = (id, field, value) => {
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === id ? { ...q, [field]: value } : q
    )
  );
};

const deleteQuestion = (id) => {
  setQuestions((prev) =>
    prev.filter((q) => q.id !== id)
  );
};

const addOption = (id) => {
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === id
        ? {
            ...q,
            options: [...q.options, `Option ${q.options.length + 1}`],
          }
        : q
    )
  );
};

const updateOption = (questionId, index, value) => {
  setQuestions((prev) =>
    prev.map((q) => {
      if (q.id !== questionId) return q;

      const options = [...q.options];
      options[index] = value;

      return {
        ...q,
        options,
      };
    })
  );
};

const removeOption = (questionId, index) => {
  setQuestions((prev) =>
    prev.map((q) => {
      if (q.id !== questionId) return q;

      return {
        ...q,
        options: q.options.filter((_, i) => i !== index),
      };
    })
  );
};

const updateRow = (questionId, index, value) => {
  setQuestions((prev) =>
    prev.map((q) => {
      if (q.id !== questionId) return q;

      const rows = [...q.rows];
      rows[index] = value;

      return {
        ...q,
        rows,
      };
    })
  );
};

const addRow = (questionId) => {
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === questionId
        ? {
            ...q,
            rows: [...q.rows, `Statement ${q.rows.length + 1}`],
          }
        : q
    )
  );
};

const removeRow = (questionId, index) => {
  setQuestions((prev) =>
    prev.map((q) => {
      if (q.id !== questionId) return q;

      return {
        ...q,
        rows: q.rows.filter((_, i) => i !== index),
      };
    })
  );
};

const updateColumn = (questionId, index, value) => {
  setQuestions((prev) =>
    prev.map((q) => {
      if (q.id !== questionId) return q;

      const columns = [...q.columns];
      columns[index] = value;

      return {
        ...q,
        columns,
      };
    })
  );
};

const addColumn = (questionId) => {
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === questionId
        ? {
            ...q,
            columns: [...q.columns, `${q.columns.length + 1}`],
          }
        : q
    )
  );
};

const removeColumn = (questionId, index) => {
  setQuestions((prev) =>
    prev.map((q) => {
      if (q.id !== questionId) return q;

      return {
        ...q,
        columns: q.columns.filter((_, i) => i !== index),
      };
    })
  );
};

 const handleSave = async () => {
  try {

    const payload = {
      ...survey,
      questions,
    };

    if (id) {

      await updateSurvey(id, payload);

      alert("Survey updated.");

    } else {

      await createSurvey(payload);

      alert("Survey created.");

    }

    navigate("/business/dashboard/survey-forms");

  } catch (err) {

    // console.log(err);

    alert("Unable to save survey.");

  }
};

useEffect(() => {

  if (!id) return;

  loadSurvey();

}, [id]);

const loadSurvey = async () => {

  try {

    const { data } = await getSurvey(id);

    setSurvey({
      name: data.name,
      description: data.description,
      completeUrl: data.completeUrl,
      disqualifyUrl: data.disqualifyUrl,
      quotaFullUrl: data.quotaFullUrl,
    });

    setQuestions(
  data.questions.map((question, qIndex) => ({
    ...question,
    id: question.id,
    conditions: (question.conditions || []).map((condition, cIndex) => ({
      ...condition,
      id: condition.id,
    }))
  }))
);

  } catch (err) {

    console.log(err);

  }

};

  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      {/* Optional type pairing — safe to remove if your app already loads fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .sb-display { font-family: 'Lexend', ui-sans-serif, system-ui, sans-serif; }
        .sb-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      <div className="font-[Inter,ui-sans-serif,system-ui,sans-serif]">
        {/* Sticky header */}
        <div className="sticky top-0 z-20 bg-[#F6F7FB]/90 backdrop-blur border-b border-slate-200/70">
          <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
            <div>
              <h1 className="sb-display text-2xl font-semibold text-slate-900 tracking-tight">
                Survey Builder
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Design questions and branching logic for your survey.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm shadow-indigo-600/20 transition"
            >
              <Save size={16} />
              Save &amp; Continue
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Survey Information */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm mb-8">
            <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center ring-1 ring-indigo-100">
                <FileText size={17} />
              </div>
              <div>
                <h2 className="sb-display font-semibold text-slate-900">
                  Survey information
                </h2>
                <p className="text-xs text-slate-500">Basic details and redirect destinations</p>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-5">
                <label className={labelClass}>Survey Name</label>

                <input
                  type="text"
                  name="name"
                  value={survey.name}
                  onChange={handleChange}
                  placeholder="Customer Banking Survey"
                  className={inputClass}
                />
              </div>

              <div className="mb-6">
                <label className={labelClass}>Description</label>

                <textarea
                  rows={4}
                  name="description"
                  value={survey.description}
                  onChange={handleChange}
                  placeholder="Survey description..."
                  className={inputClass + " resize-none"}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>Complete URL</label>

                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition">
                    <div className="px-3 text-emerald-500">
                      <Link2 size={15} />
                    </div>

                    <input
                      type="text"
                      name="completeUrl"
                      value={survey.completeUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full py-2.5 pr-3 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Disqualify URL</label>

                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition">
                    <div className="px-3 text-red-400">
                      <Link2 size={15} />
                    </div>

                    <input
                      type="text"
                      name="disqualifyUrl"
                      value={survey.disqualifyUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full py-2.5 pr-3 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Quota Full URL</label>

                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition">
                    <div className="px-3 text-blue-400">
                      <Link2 size={15} />
                    </div>

                    <input
                      type="text"
                      name="quotaFullUrl"
                      value={survey.quotaFullUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full py-2.5 pr-3 text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center ring-1 ring-indigo-100">
                  <ClipboardList size={17} />
                </div>
                <div>
                  <h2 className="sb-display font-semibold text-slate-900">Questions</h2>
                  <p className="text-xs text-slate-500">
                    {questions.length} {questions.length === 1 ? "question" : "questions"} in this survey
                  </p>
                </div>
              </div>

              <button
                onClick={addQuestion}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm shadow-indigo-600/20 transition"
              >
                <Plus size={16} />
                Add Question
              </button>
            </div>

            <div className="p-6">
              {questions.length === 0 && (
                <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                    <ClipboardList size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">
                    No questions added yet
                  </h3>

                  <p className="text-slate-500 text-sm mt-1">
                    Click "Add Question" to start building your survey.
                  </p>
                </div>
              )}

              {questions.map((question, qIndex) => {
                const typeMeta = QUESTION_TYPE_META[question.type] || QUESTION_TYPE_META.text;
                const TypeIcon = typeMeta.icon;
                const isLast = qIndex === questions.length - 1;

                return (
                  <div key={question.id || question._id} className="flex gap-4">
                    {/* Numbered spine — order matters here because of skip logic */}
                    <div className="flex flex-col items-center pt-1">
                      <div className="sb-mono w-9 h-9 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center shrink-0 shadow-sm shadow-indigo-600/30">
                        {String(qIndex + 1).padStart(2, "0")}
                      </div>
                      {!isLast && (
                        <div className="w-px flex-1 bg-slate-200 my-2 min-h-[2rem]"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="border border-slate-200 rounded-xl p-5 mb-6 bg-white hover:border-slate-300 transition-colors">
                        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                          <div className="flex items-center gap-2.5">
                            <h4 className="sb-display font-semibold text-slate-900">
                              Question {qIndex + 1}
                            </h4>

                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${typeMeta.accent}`}
                            >
                              <TypeIcon size={12} />
                              {typeMeta.label}
                            </span>

                            {question.required && (
                              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                                Required
                              </span>
                            )}
                          </div>
                        </div>

                        <input
                          className={inputClass + " mb-4"}
                          placeholder="Question title"
                          value={question.title}
                          onChange={(e) =>
                            updateQuestion(question.id, "title", e.target.value)
                          }
                        />

                        <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-center mb-1">
                          <select
                            className={selectClass}
                            value={question.type}
                            onChange={(e) =>
                              updateQuestion(question.id, "type", e.target.value)
                            }
                          >
                            <option value="radio">Single Choice</option>
                            <option value="checkbox">Multiple Choice</option>
                            <option value="dropdown">Dropdown</option>
                            <option value="text">Text</option>
                            <option value="textarea">Textarea</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                            <option value="date">Date</option>
                            <option value="matrix">Matrix</option>
                          </select>

                          <label className="flex items-center gap-2 text-sm text-slate-700 whitespace-nowrap px-1 py-2.5 select-none">
                            <input
                              type="checkbox"
                              checked={question.required}
                              onChange={(e) =>
                                updateQuestion(question.id, "required", e.target.checked)
                              }
                              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/40"
                            />
                            Required
                          </label>
                        </div>

                        {(question.type === "radio" ||
                          question.type === "checkbox" ||
                          question.type === "dropdown") && (
                          <>
                            <div className="mt-5 border-t border-slate-100 pt-5">
                              <h5 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                                Answer options
                              </h5>

                              {question.options.map((option, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                  <span className="sb-mono text-[11px] text-slate-400 w-5 text-center shrink-0">
                                    {String.fromCharCode(65 + index)}
                                  </span>

                                  <input
                                    className={inputClass}
                                    value={option}
                                    onChange={(e) =>
                                      updateOption(question.id, index, e.target.value)
                                    }
                                  />

                                  <button
                                    onClick={() => removeOption(question.id, index)}
                                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                                    aria-label="Remove option"
                                  >
                                    <X size={15} />
                                  </button>
                                </div>
                              ))}

                              {/* <button
                                onClick={() => addOption(question.id)}
                                className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5"
                              >
                                <Plus size={14} />
                                Add option
                              </button> */}
                              <div className="flex gap-3 mt-3">
  <button
    onClick={() => addOption(question.id)}
    className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5"
  >
    <Plus size={14} />
    Add option
  </button>

  <button
    onClick={() => {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === question.id
            ? {
                ...q,
                options: [...q.options, "Other (please specify)"],
              }
            : q
        )
      );
    }}
    className="text-sm font-medium text-purple-600 hover:text-purple-700"
  >
    + Add Other
  </button>
</div>
                            </div>

                            <div className="mt-6 border-t border-slate-100 pt-5">
                              <div className="flex justify-between items-center mb-1">
                                <h5 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                  <GitBranch size={13} />
                                  Conditional logic
                                </h5>

                                <button
                                  onClick={() => addCondition(question.id)}
                                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5"
                                >
                                  <Plus size={14} />
                                  Add condition
                                </button>
                              </div>

                              {question.conditions.map((condition) => (
                                <div
                                  key={condition.id || condition._id}
                                  className="border border-slate-200 rounded-lg p-4 mt-4 bg-slate-50/60"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="sb-mono text-[11px] font-semibold px-2 py-1 rounded bg-indigo-600 text-white">
                                          IF
                                        </span>

                                        <select
                                          className={selectClass + " w-auto min-w-[9rem]"}
                                          value={condition.operator}
                                          onChange={(e) =>
                                            updateCondition(
                                              question.id,
                                              condition.id,
                                              "operator",
                                              e.target.value
                                            )
                                          }
                                        >
                                          <option value="equals">Equals</option>
                                          <option value="not_equals">Not Equals</option>
                                          <option value="greater_than">Greater Than</option>
                                          <option value="greater_equal">Greater Than or Equal</option>
                                          <option value="less_than">Less Than</option>
                                          <option value="less_equal">Less Than or Equal</option>
                                          <option value="contains">Contains</option>
                                        </select>

                                        {(question.type === "radio" ||
                                          question.type === "checkbox" ||
                                          question.type === "dropdown") ? (
                                          <select
                                            className={selectClass + " w-auto min-w-[9rem]"}
                                            value={condition.value}
                                            onChange={(e) =>
                                              updateCondition(
                                                question.id,
                                                condition.id,
                                                "value",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">Select value</option>

                                            {question.options.map((option) => (
                                              <option key={option} value={option}>
                                                {option}
                                              </option>
                                            ))}
                                          </select>
                                        ) : (
                                          <input
                                            className={inputClass + " w-auto min-w-[9rem]"}
                                            placeholder="Enter value"
                                            value={condition.value}
                                            onChange={(e) =>
                                              updateCondition(
                                                question.id,
                                                condition.id,
                                                "value",
                                                e.target.value
                                              )
                                            }
                                          />
                                        )}
                                      </div>

                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="sb-mono text-[11px] font-semibold px-2 py-1 rounded bg-slate-700 text-white">
                                          THEN
                                        </span>

                                        <select
                                          className={selectClass + " w-auto min-w-[10rem]"}
                                          value={condition.action}
                                          onChange={(e) =>
                                            updateCondition(
                                              question.id,
                                              condition.id,
                                              "action",
                                              e.target.value
                                            )
                                          }
                                        >
                                          <option value="continue">Continue</option>
                                          <option value="skip">Skip To Question</option>
                                          <option value="complete">Complete Survey</option>
                                          <option value="disqualify">Disqualify</option>
                                          <option value="quota">Quota Full</option>
                                        </select>

                                        <span
                                          className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${ACTION_META[condition.action]?.classes || ACTION_META.continue.classes}`}
                                        >
                                          {ACTION_META[condition.action]?.label || "Continue"}
                                        </span>
                                      </div>

                                      {condition.action === "skip" && (
                                        <div className="mt-3 flex items-center gap-2">
                                          <ArrowDown size={13} className="text-amber-500 shrink-0" />
                                          <select
                                            className={selectClass}
                                            value={condition.skipTo}
                                            onChange={(e) =>
                                              updateCondition(
                                                question.id,
                                                condition.id,
                                                "skipTo",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">Select question</option>

                                            {questions
                                              .filter((q) => q.id !== question.id)
                                              .map((q, index) => (
                                                <option key={q.id} value={q.id}>
                                                  Question {index + 1} — {q.title || "Untitled"}
                                                </option>
                                              ))}
                                          </select>
                                        </div>
                                      )}
                                    </div>

                                    <button
                                      onClick={() => deleteCondition(question.id, condition.id)}
                                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                                      aria-label="Delete condition"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {question.type === "matrix" && (
                          <div className="mt-5 border-t border-slate-100 pt-5">
                            <h5 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 mb-4">
                              <Grid3x3 size={13} />
                              Matrix builder
                            </h5>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                              {/* ROWS */}
                              <div>
                                <div className="flex justify-between items-center mb-3">
                                  <h6 className="text-sm font-medium text-slate-700">Rows</h6>

                                  <button
                                    type="button"
                                    onClick={() => addRow(question.id)}
                                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                                  >
                                    <Plus size={13} />
                                    Add row
                                  </button>
                                </div>

                                {question.rows.map((row, index) => (
                                  <div key={index} className="flex items-center gap-2 mb-2">
                                    <input
                                      className={inputClass}
                                      value={row}
                                      onChange={(e) =>
                                        updateRow(question.id, index, e.target.value)
                                      }
                                    />

                                    <button
                                      type="button"
                                      onClick={() => removeRow(question.id, index)}
                                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                                      aria-label="Remove row"
                                    >
                                      <X size={15} />
                                    </button>
                                  </div>
                                ))}
                              </div>

                              {/* COLUMNS */}
                              <div>
                                <div className="flex justify-between items-center mb-3">
                                  <h6 className="text-sm font-medium text-slate-700">Columns</h6>

                                  <button
                                    type="button"
                                    onClick={() => addColumn(question.id)}
                                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                                  >
                                    <Plus size={13} />
                                    Add column
                                  </button>
                                </div>

                                {question.columns.map((column, index) => (
                                  <div key={index} className="flex items-center gap-2 mb-2">
                                    <input
                                      className={inputClass}
                                      value={column}
                                      onChange={(e) =>
                                        updateColumn(question.id, index, e.target.value)
                                      }
                                    />

                                    <button
                                      type="button"
                                      onClick={() => removeColumn(question.id, index)}
                                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                                      aria-label="Remove column"
                                    >
                                      <X size={15} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* PREVIEW */}
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-slate-50">
                                    <th className="border-b border-slate-200 p-3 text-left font-medium text-slate-600">
                                      Statements
                                    </th>

                                    {question.columns.map((column, index) => (
                                      <th
                                        key={index}
                                        className="border-b border-l border-slate-200 p-3 text-center font-medium text-slate-600"
                                      >
                                        {column}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>

                                <tbody>
                                  {question.rows.map((row, rowIndex) => (
                                    <tr
                                      key={rowIndex}
                                      className={rowIndex % 2 === 1 ? "bg-slate-50/50" : ""}
                                    >
                                      <td className="p-3 text-slate-700">{row}</td>

                                      {question.columns.map((column, columnIndex) => (
                                        <td
                                          key={columnIndex}
                                          className="border-l border-slate-200 p-3 text-center"
                                        >
                                          <input
                                            type="radio"
                                            disabled
                                            className="accent-indigo-600"
                                          />
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center mt-6 border-t border-slate-100 pt-4">
                          <button
                            type="button"
                            onClick={() => addQuestion(qIndex + 1)}
                            className="flex items-center gap-2 text-sm font-medium text-indigo-600 border border-indigo-200 hover:bg-indigo-50 px-4 py-2 rounded-lg transition"
                          >
                            <Plus size={15} />
                            Insert question below
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteQuestion(question.id)}
                            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}