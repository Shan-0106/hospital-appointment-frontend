import { useState } from "react";
import { doctorAPI } from "../services/api";

function AddDoctor({ onDoctorAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await doctorAPI.create(formData);
      setMessage({ type: "success", text: "Doctor added successfully!" });
      setFormData({
        name: "",
        specialization: "",
        email: "",
        phoneNumber: "",
      });
      if (onDoctorAdded) onDoctorAdded(response.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to add doctor",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-card">
      <h2>Add New Doctor</h2>
      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Doctor Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter doctor's full name"
          />
        </div>
        <div className="form-group">
          <label>Specialization *</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
            placeholder="e.g., Cardiologist"
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="doctor@hospital.com"
          />
        </div>
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="10-digit phone number"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Doctor"}
        </button>
      </form>
    </div>
  );
}

export default AddDoctor;
