import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchFormFields } from "../utils/mockApi";
import ProgressBar from "./ProgressBar";

const DynamicForm = ({ formType }) => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [lineData, setLineData] = useState([{ lat: "", lng: "" }]);
  const [dataType, setDataType] = useState("Point");

  // Fetch form fields dynamically based on the selected form type
  useEffect(() => {
    fetchFormFields(formType).then((response) => {
      setFields(response.fields);
      setFormData({});
      setErrors({});
      setLineData([{ lat: "", lng: "" }]); // Reset lineData for LineString
      setDataType("Point"); // Reset dataType for Event
    });
  }, [formType]);

  // Handle form input changes dynamically
  const handleChange = (e) => {
    setMessage("");
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle LineString data changes
  const handleLineDataChange = (index, field, value) => {
    const updatedLineData = [...lineData];
    updatedLineData[index][field] = value;
    setLineData(updatedLineData);
    setMessage("");
  };

  // Add a new point for LineString
  const addLinePoint = () => {
    setLineData([...lineData, { lat: "", lng: "" }]);
  };

  // Remove a point for LineString
  const removeLinePoint = (index) => {
    const updatedLineData = lineData.filter((_, i) => i !== index);
    setLineData(updatedLineData);
  };

  // Validate the form fields
  const validate = () => {
    const newErrors = {};

    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });

    // Validation for Event coordinates
    if (formType === "Event" && dataType === "LineString") {
      if (lineData.length < 2) {
        newErrors["coordinates"] = "LineString must have at least two points.";
      }
      lineData.forEach((point, index) => {
        if (!point.lat || isNaN(point.lat) || !point.lng || isNaN(point.lng)) {
          newErrors[`linePoint${index}`] = `Point ${index + 1} must have valid latitude and longitude.`;
        }
      });
    }

    if (formType === "Construction") {
      if (lineData.length < 2) {
        newErrors["coordinates"] = "LineString must have at least two points.";
      }
      lineData.forEach((point, index) => {
        if (!point.lat || isNaN(point.lat) || !point.lng || isNaN(point.lng)) {
          newErrors[`linePoint${index}`] = `Point ${index + 1} must have valid latitude and longitude.`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const payload = {
          ...formData,
        };

        // Add coordinates for Event or Construction
        if (formType === "Event") {
          payload.location = {
            type: dataType,
            coordinates: dataType === "Point"
              ? [Number(formData.longitude), Number(formData.latitude)]
              : lineData.map((point) => [Number(point.lng), Number(point.lat)]),
          };
        }

        if (formType === "Construction") {
          payload.coordinates = lineData.map((point) => [Number(point.lng), Number(point.lat)]);
        }
        await axios.post(`https://road-traffic-backend.onrender.com/api/${formType.toLowerCase()}/`, payload);
        setMessage("Form Submitted Successfully");
        setFormData({});
        setLineData([{ lat: "", lng: "" }]); // Reset line data
      } catch (error) {
        setMessage("Failed to submit form. Please try again.");
        console.error("Error:", error.response?.data || error.message);
      }
    }
  };

  // Calculate progress
  const requiredFields = fields.filter((field) => field.required).length;
  const completedFields = fields.filter(
    (field) => field.required && formData[field.name]
  ).length;

  return (
    <div className="form-container">
      <ProgressBar completed={completedFields} total={requiredFields} />
      {message && <p className="form-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        {fields.map((field) =>
          field.name === "dataType" && formType === "Event" ? (
            <div key={field.name} className="form-group">
              <label>{field.label}</label>
              <select
                name={field.name}
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : field.name === "status" && formType === "Construction" ? (
            <div key={field.name} className="form-group">
              <label>{field.label}</label>
              <select
                name={field.name}
                onChange={handleChange}
                value={formData[field.name] || ""}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div key={field.name} className="form-group">
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
              {errors[field.name] && <p className="error">{errors[field.name]}</p>}
            </div>
          )
        )}

        {/* Line Data for Event or Construction */}
        {(formType === "Event" && dataType === "LineString") || formType === "Construction" ? (
          <div className="form-group">
            <label>Coordinates (LineString)</label>
            {lineData.map((point, index) => (
              <div key={index} className="line-point">
                <input
                  type="text"
                  placeholder={`Latitude for Point ${index + 1}`}
                  value={point.lat}
                  onChange={(e) => handleLineDataChange(index, "lat", e.target.value)}
                />
                <input
                  type="text"
                  placeholder={`Longitude for Point ${index + 1}`}
                  value={point.lng}
                  onChange={(e) => handleLineDataChange(index, "lng", e.target.value)}
                />
                {errors[`linePoint${index}`] && (
                  <p className="error">{errors[`linePoint${index}`]}</p>
                )}
                {index > 0 && (
                  <button type="button" onClick={() => removeLinePoint(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addLinePoint}>
              Add Point
            </button>
          </div>
        ) : null}

        {formType === "Event" && dataType === "Point" && (
          <>
            <div className="form-group">
              <label>Latitude</label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude || ""}
                onChange={handleChange}
              />
              {errors.latitude && <p className="error">{errors.latitude}</p>}
            </div>
            <div className="form-group">
              <label>Longitude</label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude || ""}
                onChange={handleChange}
              />
              {errors.longitude && <p className="error">{errors.longitude}</p>}
            </div>
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;
