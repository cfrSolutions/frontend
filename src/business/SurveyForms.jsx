import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getSurveys,
  deleteSurvey,
} from "../services/surveyBuilderApi";

export default function SurveyForms() {

  const navigate = useNavigate();

  const [surveys, setSurveys] = useState([]);

  useEffect(() => {

    load();

  }, []);

  const load = async () => {

    const { data } = await getSurveys();

    setSurveys(data);

  };

  const remove = async (id) => {

    if (!window.confirm("Delete survey?")) return;

    await deleteSurvey(id);

    load();

  };

  return (
    <div className="container mx-auto py-8">

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Survey Forms
        </h1>

        <button
          onClick={() =>
            navigate("/business/dashboard/survey-builder")
          }
          className="bg-orange-500 text-white px-5 py-2 rounded-lg"
        >
          + Create Survey
        </button>

      </div>

      <div className="space-y-5">

        {surveys.map((survey) => (

          <div
            key={survey._id}
            className="border rounded-xl p-5 bg-white shadow"
          >

            <h2 className="text-xl font-semibold">
              {survey.name}
            </h2>

            <p className="text-gray-500">

              {survey.description}

            </p>

            <p className="mt-2">

              {survey.questions} Questions

            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  navigate(
                    `/business/dashboard/survey-builder/${survey._id}`
                  )
                }
                className="text-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  remove(survey._id)
                }
                className="text-red-600"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );

}