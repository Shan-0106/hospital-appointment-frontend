import { useState, useEffect } from "react";
import { appointmentAPI } from "../services/api";
import { format } from "date-fns";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getAll();
      setAppointments(response.data);
    } catch (error) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await appointmentAPI.cancel(id);
        fetchAppointments();
      } catch (error) {
        alert("Failed to cancel appointment");
      }
    }
  };

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="content-card">
      <h2>All Appointments ({appointments.length})</h2>
      {appointments.length === 0 ? (
        <div className="empty-state">
          <h3>No appointments found</h3>
          <p>Book appointments using the form above</p>
        </div>
      ) : (
        <div className="grid">
          {appointments.map((appointment) => (
            <div key={appointment.appointmentId} className="card">
              <h3>Appointment #{appointment.appointmentId}</h3>
              <p>
                <strong>Doctor:</strong> {appointment.doctorName}
              </p>
              <p>
                <strong>Patient:</strong> {appointment.patientName}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {format(new Date(appointment.appointmentDate), "dd MMM yyyy")}
              </p>
              <p>
                <strong>Time:</strong> {appointment.timeSlot}
              </p>
              <p>
                <strong>Reason:</strong> {appointment.reason}
              </p>
              <span
                className={`status-badge status-${appointment.status.toLowerCase()}`}
              >
                {appointment.status}
              </span>
              {appointment.status === "Scheduled" && (
                <button
                  onClick={() => handleCancel(appointment.appointmentId)}
                  className="btn btn-danger"
                  style={{ marginTop: "10px", width: "100%" }}
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
