import api from "./api";

export const createSurvey = (data) =>
  api.post("/survey-builder/create", data);

export const getSurveys = () =>
  api.get("/survey-builder");

export const getSurvey = (id) =>
  api.get(`/survey-builder/${id}`);

export const updateSurvey = (id, data) =>
  api.put(`/survey-builder/${id}`, data);

export const deleteSurvey = (id) =>
  api.delete(`/survey-builder/${id}`);