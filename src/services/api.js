import axios from "axios";

// CHANGE THIS to your backend URL!
const API_BASE_URL = "https://localhost:7163/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const doctorAPI = {
  getAll: () => api.get("/Doctor"),
  getById: (id) => api.get(`/Doctor/${id}`),
  create: (data) => api.post("/Doctor", data),
  getAppointments: (id) => api.get(`/Doctor/${id}/appointments`),
};

export const patientAPI = {
  getAll: () => api.get("/Patient"),
  getById: (id) => api.get(`/Patient/${id}`),
  create: (data) => api.post("/Patient", data),
};

export const appointmentAPI = {
  getAll: () => api.get("/Appointment"),
  getById: (id) => api.get(`/Appointment/${id}`),
  create: (data) => api.post("/Appointment", data),
  cancel: (id) => api.delete(`/Appointment/${id}`),
};

export default api;
