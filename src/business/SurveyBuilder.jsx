import { useState } from "react";
import {
  FileText,
  Link,
  Plus,
  Save,
} from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import "../../styles/module.css";

export default function SurveyBuilder() {
  const [survey, setSurvey] = useState({
    name: "",
    description: "",
    completeUrl: "",
    disqualifyUrl: "",
    quotaFullUrl: "",
  });

  const handleChange = (e) => {
    setSurvey({
      ...survey,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log(survey);
    alert("Survey information saved.");
  };

  return (
    <MainLayout>
      <div className="container-fluid py-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Survey Builder</h2>
            <p className="text-muted mb-0">
              Create your own survey with custom logic.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleSave}
          >
            <Save size={16} className="me-2" />
            Save & Continue
          </button>
        </div>

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">
              <FileText size={18} className="me-2" />
              Survey Information
            </h5>
          </div>

          <div className="card-body">

            <div className="mb-3">
              <label className="form-label">
                Survey Name
              </label>

              <input
                className="form-control"
                name="name"
                value={survey.name}
                onChange={handleChange}
                placeholder="Customer Banking Survey"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Description
              </label>

              <textarea
                rows="3"
                className="form-control"
                name="description"
                value={survey.description}
                onChange={handleChange}
                placeholder="Survey description..."
              />
            </div>

            <div className="row">

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Complete URL
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <Link size={16} />
                  </span>

                  <input
                    className="form-control"
                    name="completeUrl"
                    value={survey.completeUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Disqualify URL
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <Link size={16} />
                  </span>

                  <input
                    className="form-control"
                    name="disqualifyUrl"
                    value={survey.disqualifyUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Quota Full URL
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <Link size={16} />
                  </span>

                  <input
                    className="form-control"
                    name="quotaFullUrl"
                    value={survey.quotaFullUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
              </div>

            </div>

          </div>
        </div>

        <div className="card shadow-sm border-0">

          <div className="card-header bg-white d-flex justify-content-between align-items-center">

            <h5 className="mb-0">
              Questions
            </h5>

            <button className="btn btn-primary">
              <Plus size={16} className="me-2" />
              Add Question
            </button>

          </div>

          <div className="card-body text-center py-5">

            <h5>No Questions Added</h5>

            <p className="text-muted">
              Click "Add Question" to begin building your survey.
            </p>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}