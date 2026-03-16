import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function SurveyPreview() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    api.get(`/surveys/${id}`).then((res) => setSurvey(res.data));
  }, [id]);

  if (!survey) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl">
      <h1 className="text-2xl font-semibold">{survey.title}</h1>
      <p className="text-gray-600 mt-2">{survey.description}</p>

      <div className="mt-4 text-sm text-gray-500">
        Difficulty: {survey.difficulty}
      </div>
    </div>
  );
}
