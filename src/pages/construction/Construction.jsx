import React, { useState } from "react";
import "./Construction.css";
import axios from "axios";

const Construction = () => {
  const [projectName, setProjectName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expectedEndDate, setExpectedEndDate] = useState("");
  const [status, setStatus] = useState("active");
  const [polyline, setPolyline] = useState([{ lat: "", lng: "" }]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePolylineChange = (index, field, value) => {
    const updatedPolyline = [...polyline];
    updatedPolyline[index][field] = value;
    setPolyline(updatedPolyline);
  };

  const addPolylinePoint = () => {
    setPolyline([...polyline, { lat: "", lng: "" }]);
  };

  const removePolylinePoint = (index) => {
    const updatedPolyline = polyline.filter((_, i) => i !== index);
    setPolyline(updatedPolyline);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
        const payload = {
            projectName,
            vendorName,
            coordinates: polyline.map((point) => [Number(point.lng), Number(point.lat)]), // Nested arrays for coordinates
            startDate,
            expectedEndDate,
            status,
          };
          
  
      // Validate coordinates
      if (payload.coordinates.length < 2) {
        throw new Error("Polyline must have at least two valid points.");
      }
  
      const response = await axios.post("https://road-traffic-backend.onrender.com/api/construction/", payload);
  
      setMessage("Construction project registered successfully!");
    } catch (err) {
      setError("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="construction-container">
      <h2 className="construction-title">Register a Construction Project</h2>
      <form className="construction-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            className="construction-input"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="vendorName">Vendor Name</label>
          <input
            type="text"
            id="vendorName"
            className="construction-input"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="construction-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expectedEndDate">Expected End Date</label>
          <input
            type="date"
            id="expectedEndDate"
            className="construction-input"
            value={expectedEndDate}
            onChange={(e) => setExpectedEndDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            id="status"
            className="construction-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>
        </div>

        <div className="form-group">
          <label>Polyline Data (Enter multiple points)</label>
          {polyline.map((point, index) => (
            <div key={index} className="polyline-point">
              <input
                type="text"
                className="construction-input"
                placeholder={`Point ${index + 1} Latitude`}
                value={point.lat}
                onChange={(e) => handlePolylineChange(index, "lat", e.target.value)}
                required
              />
              <input
                type="text"
                className="construction-input"
                placeholder={`Point ${index + 1} Longitude`}
                value={point.lng}
                onChange={(e) => handlePolylineChange(index, "lng", e.target.value)}
                required
              />
              {index > 0 && (
                <button type="button" onClick={() => removePolylinePoint(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addPolylinePoint}>Add Point</button>
        </div>

        <button type="submit" className="construction-submit" disabled={isLoading}>
          Submit Construction Project
        </button>
        {error && <span className="error-message">{error}</span>}
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};

export default Construction;