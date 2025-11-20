import { useState, useEffect } from "react";
import { patientAPI } from "../services/api";
import { format } from "date-fns";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await patientAPI.getAll();
      setPatients(response.data);
    } catch (error) {
      setError("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading patients...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="content-card">
      <h2>All Patients ({patients.length})</h2>
      {patients.length === 0 ? (
        <div className="empty-state">
          <h3>No patients found</h3>
          <p>Register patients using the form above</p>
        </div>
      ) : (
        <div className="grid">
          {patients.map((patient) => (
            <div key={patient.patientId} className="card">
              <h3>{patient.name}</h3>
              <p>
                <strong>Email:</strong> {patient.email}
              </p>
              <p>
                <strong>Phone:</strong> {patient.phoneNumber}
              </p>
              <p>
                <strong>DOB:</strong>{" "}
                {format(new Date(patient.dateOfBirth), "dd MMM yyyy")}
              </p>
              <p>
                <strong>Address:</strong> {patient.address}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientList;
