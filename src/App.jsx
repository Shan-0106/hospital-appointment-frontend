import { useState } from "react";
import AddDoctor from "./components/AddDoctor";
import DoctorList from "./components/DoctorList";
import RegisterPatient from "./components/RegisterPatient";
import PatientList from "./components/PatientList";
import BookAppointment from "./components/BookAppointment";
import AppointmentList from "./components/AppointmentList";
import "./styles/App.css";

function App() {
  const [activeTab, setActiveTab] = useState("doctors");

  return (
    <div className="app-container">
      <header className="header">
        <h1>🏥 Hospital Appointment System</h1>
        <p>Complete Patient & Doctor Management</p>
      </header>

      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === "doctors" ? "active" : ""}`}
          onClick={() => setActiveTab("doctors")}
        >
          👨‍⚕️ Doctors
        </button>
        <button
          className={`nav-tab ${activeTab === "patients" ? "active" : ""}`}
          onClick={() => setActiveTab("patients")}
        >
          👤 Patients
        </button>
        <button
          className={`nav-tab ${activeTab === "appointments" ? "active" : ""}`}
          onClick={() => setActiveTab("appointments")}
        >
          📅 Appointments
        </button>
      </nav>

      <main>
        {activeTab === "doctors" && (
          <>
            <AddDoctor />
            <DoctorList />
          </>
        )}

        {activeTab === "patients" && (
          <>
            <RegisterPatient />
            <PatientList />
          </>
        )}

        {activeTab === "appointments" && (
          <>
            <BookAppointment />
            <AppointmentList />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
