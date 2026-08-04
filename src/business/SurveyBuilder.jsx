import { useState } from "react";
import {
  FileText,
  Link,
  Plus,
  Save,
} from "lucide-react";

export default function SurveyBuilder() {
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

  const addQuestion = () => {
  setQuestions((prev) => [
    ...prev,
    {
      id: Date.now(),
      title: "",
      type: "radio",
      required: false,
      options: ["Option 1", "Option 2"],
    },
  ]);
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

  const handleSave = () => {
    console.log(survey);
    alert("Survey information saved.");
  };

  return (
    <div className="container mx-auto px-6 py-8">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Survey Builder</h1>
          <p className="text-gray-500 mt-1">
            Create your own survey with custom logic.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg"
        >
          <Save size={18} />
          Save & Continue
        </button>
      </div>

      {/* Survey Information */}

      <div className="bg-white rounded-xl shadow border mb-8">

        <div className="border-b px-6 py-4">
          <h2 className="flex items-center gap-2 font-semibold text-lg">
            <FileText size={18} />
            Survey Information
          </h2>
        </div>

        <div className="p-6">

          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Survey Name
            </label>

            <input
              type="text"
              name="name"
              value={survey.name}
              onChange={handleChange}
              placeholder="Customer Banking Survey"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={survey.description}
              onChange={handleChange}
              placeholder="Survey description..."
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Complete URL
              </label>

              <div className="flex items-center border rounded-lg overflow-hidden">

                <div className="px-3 bg-gray-100">
                  <Link size={16} />
                </div>

                <input
                  type="text"
                  name="completeUrl"
                  value={survey.completeUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Disqualify URL
              </label>

              <div className="flex items-center border rounded-lg overflow-hidden">

                <div className="px-3 bg-gray-100">
                  <Link size={16} />
                </div>

                <input
                  type="text"
                  name="disqualifyUrl"
                  value={survey.disqualifyUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Quota Full URL
              </label>

              <div className="flex items-center border rounded-lg overflow-hidden">

                <div className="px-3 bg-gray-100">
                  <Link size={16} />
                </div>

                <input
                  type="text"
                  name="quotaFullUrl"
                  value={survey.quotaFullUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-3 outline-none"
                />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Questions */}

      <div className="bg-white rounded-xl shadow border">

        <div className="flex justify-between items-center border-b px-6 py-4">

          <h2 className="font-semibold text-lg">
            Questions
          </h2>

          <button
    onClick={addQuestion}
    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
>
            <Plus size={18} />
            Add Question
          </button>

        </div>

        <div className="p-6">

  {questions.length === 0 && (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold">
        No Questions Added
      </h3>

      <p className="text-gray-500 mt-2">
        Click Add Question.
      </p>
    </div>
  )}

  {questions.map((question, qIndex) => (
    <div
      key={question.id}
      className="border rounded-xl p-5 mb-5 bg-slate-50"
    >
      <div className="flex justify-between items-center mb-4">

        <h4 className="font-semibold">
          Question {qIndex + 1}
        </h4>

        <button
          onClick={() => deleteQuestion(question.id)}
          className="text-red-600"
        >
          Delete
        </button>

      </div>

      <input
        className="w-full border rounded-lg px-3 py-2 mb-4"
        placeholder="Question title"
        value={question.title}
        onChange={(e) =>
          updateQuestion(
            question.id,
            "title",
            e.target.value
          )
        }
      />

      <select
        className="w-full border rounded-lg px-3 py-2 mb-4"
        value={question.type}
        onChange={(e) =>
          updateQuestion(
            question.id,
            "type",
            e.target.value
          )
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
      </select>

      <label className="flex items-center gap-2 mb-4">

        <input
          type="checkbox"
          checked={question.required}
          onChange={(e) =>
            updateQuestion(
              question.id,
              "required",
              e.target.checked
            )
          }
        />

        Required

      </label>

      {(question.type === "radio" ||
        question.type === "checkbox" ||
        question.type === "dropdown") && (
        <>
          {question.options.map((option, index) => (
            <div
              key={index}
              className="flex gap-2 mb-2"
            >
              <input
                className="flex-1 border rounded-lg px-3 py-2"
                value={option}
                onChange={(e) =>
                  updateOption(
                    question.id,
                    index,
                    e.target.value
                  )
                }
              />

              <button
                onClick={() =>
                  removeOption(question.id, index)
                }
                className="text-red-600"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={() =>
              addOption(question.id)
            }
            className="mt-2 text-orange-600 font-medium"
          >
            + Add Option
          </button>
        </>
      )}

    </div>
  ))}

</div>

      </div>

    </div>
  );
}