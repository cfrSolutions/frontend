import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { getSurvey } from "../services/surveyBuilderApi";

export default function SurveyRunner() {

 const { token } = useParams();

  const [survey, setSurvey] = useState(null);

  const [answers, setAnswers] = useState({});

 useEffect(() => {
  loadSurvey();
}, [token]);

  const loadSurvey = async () => {

    try {

      const { data } = await api.get(
  `/survey-builder/public/${token}`
);

setSurvey(data);
console.log("SURVEY:", data);
console.log("QUESTIONS:", data.questions);

    } catch (err) {

      console.log(err);

    }

  };

  if (!survey)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

const submitSurvey = () => {


    for (const question of survey.questions) {

    if (!question.required) continue;

   const questionKey = question._id || question.id;
const answer = answers[questionKey];

    if (
      answer === undefined ||
      answer === "" ||
      (Array.isArray(answer) && answer.length === 0)
    ) {

      alert(`${question.title} is required`);

      return;

    }

  }

  const action = evaluateConditions();

  console.log("Survey Action:", action);

  if (
    action === "disqualify" &&
    survey.disqualifyUrl
  ) {
    window.location.href = survey.disqualifyUrl;
    return;
  }

  if (
    action === "quota" &&
    survey.quotaFullUrl
  ) {
    window.location.href = survey.quotaFullUrl;
    return;
  }

  if (
    action === "complete" &&
    survey.completeUrl
  ) {
    window.location.href = survey.completeUrl;
    return;
  }

  // Default
  window.location.href = survey.completeUrl;

};

const evaluateConditions = () => {

  for (const question of survey.questions) {

    const questionKey = question._id || question.id;
const answer = answers[questionKey];

    if (!question.conditions) continue;

    for (const condition of question.conditions) {

      let matched = false;
console.log("Answer:", answer);
console.log("Condition:", condition);
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
    matched =
      Number(answer) >
      Number(condition.value);
    break;

  case "greater_equal":
    matched =
      Number(answer) >=
      Number(condition.value);
    break;

  case "less_than":
    matched =
      Number(answer) <
      Number(condition.value);
    break;

  case "less_equal":
    matched =
      Number(answer) <=
      Number(condition.value);
    break;

  case "contains":
    matched = String(answer || "")
      .toLowerCase()
      .includes(
        String(condition.value)
          .toLowerCase()
      );
    break;

  default:
    matched = false;
}

      if (matched) {

        return condition.action;

      }

    }

  }

  return "complete";

};
  return (

    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-2">

        {survey.name}

      </h1>

      <p className="text-gray-500 mb-8">

        {survey.description}

      </p>

     {survey.questions.map((question) => {

const questionKey =
  question._id || question.id;

return (

  <div
    key={questionKey}
    className="mb-8 border rounded-xl p-6 bg-white"
  >

    <h2 className="text-lg font-semibold mb-4">
      {question.title}

      {question.required && (
        <span className="text-red-500 ml-1">*</span>
      )}
    </h2>

    {/* RADIO */}

    {question.type === "radio" &&
      question.options.map((option) => (

        <label
          key={option}
          className="flex items-center gap-3 mb-3"
        >
          <input
            type="radio"
            name={questionKey}
            value={option}
            checked={answers[questionKey] === option}
            onChange={(e) =>
              setAnswers({
                ...answers,
                [questionKey]: e.target.value,
              })
            }
          />

          {option}

        </label>

      ))}

    {/* CHECKBOX */}

    {question.type === "checkbox" &&
      question.options.map((option) => (

        <label
          key={option}
          className="flex items-center gap-3 mb-3"
        >
          <input
            type="checkbox"
            checked={
             answers[questionKey]?.includes(option) || false
            }
            onChange={(e) => {

              const current =
                answers[questionKey] || [];

              if (e.target.checked) {

                setAnswers({
                  ...answers,
                  [questionKey]: [...current, option],
                });

              } else {

                setAnswers({
                  ...answers,
                  [questionKey]:
                    current.filter(
                      (item) => item !== option
                    ),
                });

              }

            }}
          />

          {option}

        </label>

      ))}

    {/* DROPDOWN */}

    {question.type === "dropdown" && (

      <select
        className="w-full border rounded-lg p-3"
        value={answers[questionKey] || ""}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [questionKey]: e.target.value,
          })
        }
      >
        <option value="">
          Select
        </option>

        {question.options.map((option) => (

          <option
            key={option}
            value={option}
          >
            {option}
          </option>

        ))}

      </select>

    )}

    {/* TEXT */}

    {question.type === "text" && (

      <input
        type="text"
        className="w-full border rounded-lg p-3"
        value={answers[questionKey] || ""}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [questionKey]: e.target.value,
          })
        }
      />

    )}

    {/* TEXTAREA */}

    {question.type === "textarea" && (

      <textarea
        rows={4}
        className="w-full border rounded-lg p-3"
        value={answers[questionKey] || ""}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [questionKey]: e.target.value,
          })
        }
      />

    )}

    {/* NUMBER */}

    {question.type === "number" && (

      <input
        type="number"
        className="w-full border rounded-lg p-3"
        value={answers[questionKey] || ""}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [questionKey]: e.target.value,
          })
        }
      />

    )}

    {/* EMAIL */}

    {question.type === "email" && (

      <input
        type="email"
        className="w-full border rounded-lg p-3"
        value={answers[questionKey] || ""}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [questionKey]: e.target.value,
          })
        }
      />

    )}

    {/* DATE */}

    {question.type === "date" && (

      <input
        type="date"
        className="w-full border rounded-lg p-3"
        value={answers[questionKey] || ""}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [questionKey]: e.target.value,
          })
        }
      />

    )}

  </div>
);

})}

<div className="mt-8 flex justify-end">

  <button
    onClick={submitSurvey}
    className="
      bg-orange-500
      hover:bg-orange-600
      text-white
      px-6
      py-3
      rounded-lg
      font-semibold
    "
  >
    Submit Survey
  </button>

</div>
    </div>

  );

}