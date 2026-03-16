import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function UserSurveyPlay() {
  const { surveyId } = useParams();
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");

  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    api.get(`/surveys/${surveyId}`)
      .then((res) => setSurvey(res.data))
      .catch(console.error);
  }, [surveyId]);

  if (!survey) return <p>Loading survey...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{survey.title}</h1>
      <p className="text-gray-600 mb-6">{survey.description}</p>

      {/* INTERNAL SURVEY FORM PLACEHOLDER */}
      <div className="border rounded p-4 bg-gray-50">
        <p className="text-sm text-gray-500">
          Survey ID: {surveyId}
        </p>
        <p className="text-sm text-gray-500">
          Response ID (uid): {uid}
        </p>

        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          onClick={() =>
            window.location.href = `${import.meta.env.VITE_API_URL}/return/complete?uid=${uid}`
          }
        >
          Submit (Test Complete)
        </button>
      </div>
    </div>
  );
}
