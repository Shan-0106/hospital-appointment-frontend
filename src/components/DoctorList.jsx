import { useState, useEffect } from "react";
import { doctorAPI } from "../services/api";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getAll();
      setDoctors(response.data);
    } catch (error) {
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading doctors...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="content-card">
      <h2>All Doctors ({doctors.length})</h2>
      {doctors.length === 0 ? (
        <div className="empty-state">
          <h3>No doctors found</h3>
          <p>Add doctors using the form above</p>
        </div>
      ) : (
        <div className="grid">
          {doctors.map((doctor) => (
            <div key={doctor.doctorId} className="card">
              <h3>{doctor.name}</h3>
              <p>
                <strong>Specialization:</strong> {doctor.specialization}
              </p>
              <p>
                <strong>Email:</strong> {doctor.email}
              </p>
              <p>
                <strong>Phone:</strong> {doctor.phoneNumber}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorList;
