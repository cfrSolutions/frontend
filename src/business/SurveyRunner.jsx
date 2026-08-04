import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSurvey } from "../services/surveyBuilderApi";

export default function SurveyRunner() {

 const { token } = useParams();

  const [survey, setSurvey] = useState(null);

  const [answers, setAnswers] = useState({});

  useEffect(() => {

    loadSurvey();

  }, []);

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

  if (!survey)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

const submitSurvey = () => {


    for (const question of survey.questions) {

    if (!question.required) continue;

    const answer = answers[question.id];

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

    const answer = answers[question.id];

    if (!question.conditions) continue;

    for (const condition of question.conditions) {

      let matched = false;

      switch (condition.operator) {

        case "equals":
          matched = answer == condition.value;
          break;

        case "not_equals":
          matched = answer != condition.value;
          break;

        case "greater_than":
          matched =
            Number(answer) > Number(condition.value);
          break;

        case "greater_equal":
          matched =
            Number(answer) >= Number(condition.value);
          break;

        case "less_than":
          matched =
            Number(answer) < Number(condition.value);
          break;

        case "less_equal":
          matched =
            Number(answer) <= Number(condition.value);
          break;

        case "contains":
          matched =
            String(answer)
              .toLowerCase()
              .includes(
                String(condition.value).toLowerCase()
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

     {survey.questions.map((question) => (

  <div
    key={question.id || question._id}
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
            name={question.id}
            value={option}
            checked={answers[question.id] === option}
            onChange={(e) =>
              setAnswers({
                ...answers,
                [question.id]: e.target.value,
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
              answers[question.id]?.includes(option) || false
            }
            onChange={(e) => {

              const current =
                answers[question.id] || [];

              if (e.target.checked) {

                setAnswers({
                  ...answers,
                  [question.id]: [...current, option],
                });

              } else {

                setAnswers({
                  ...answers,
                  [question.id]:
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
        value={answers[question.id] || ""}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [question.id]: e.target.value,
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
        value={answers[question.id] || ""}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [question.id]: e.target.value,
          })
        }
      />

    )}

    {/* TEXTAREA */}

    {question.type === "textarea" && (

      <textarea
        rows={4}
        className="w-full border rounded-lg p-3"
        value={answers[question.id] || ""}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [question.id]: e.target.value,
          })
        }
      />

    )}

    {/* NUMBER */}

    {question.type === "number" && (

      <input
        type="number"
        className="w-full border rounded-lg p-3"
        value={answers[question.id] || ""}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [question.id]: e.target.value,
          })
        }
      />

    )}

    {/* EMAIL */}

    {question.type === "email" && (

      <input
        type="email"
        className="w-full border rounded-lg p-3"
        value={answers[question.id] || ""}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [question.id]: e.target.value,
          })
        }
      />

    )}

    {/* DATE */}

    {question.type === "date" && (

      <input
        type="date"
        className="w-full border rounded-lg p-3"
        value={answers[question.id] || ""}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [question.id]: e.target.value,
          })
        }
      />

    )}

  </div>

))}
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