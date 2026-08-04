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

          <pre>
            {JSON.stringify(response.answers, null, 2)}
          </pre>
        </div>
      ))}

    </div>
  );
}