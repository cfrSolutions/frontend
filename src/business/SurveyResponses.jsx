import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function SurveyResponses() {
  const { id } = useParams();

  const [responses, setResponses] = useState([]);

  useEffect(() => {
    loadResponses();
  }, []);

  const loadResponses = async () => {
    const { data } = await api.get(
      `/survey-builder/responses/${id}`
    );

    setResponses(data);
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Survey Responses
      </h1>

      {responses.map((response) => (
        <div
          key={response._id}
          className="border rounded-lg p-4 mb-4"
        >
          <p>
            <b>Status:</b> {response.status}
          </p>

          <div className="mt-4 space-y-2">
  {response.survey.questions.map((q) => {
    const key = q._id || q.id;

    return (
      <div key={key} className="border-b pb-2">
        <p className="font-semibold">{q.title}</p>

        <p className="text-gray-700">
          {Array.isArray(response.answers[key])
            ? response.answers[key].join(", ")
            : response.answers[key] || "-"}
        </p>
      </div>
    );
  })}
</div>
        </div>
      ))}

    </div>
  );
}