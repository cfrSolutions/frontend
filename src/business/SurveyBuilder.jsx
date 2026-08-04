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

  const handleChange = (e) => {
    setSurvey((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} />
            Add Question
          </button>

        </div>

        <div className="text-center py-20">

          <h3 className="text-xl font-semibold">
            No Questions Added
          </h3>

          <p className="text-gray-500 mt-2">
            Click "Add Question" to begin building your survey.
          </p>

        </div>

      </div>

    </div>
  );
}