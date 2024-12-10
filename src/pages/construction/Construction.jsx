import React, { useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from "axios";
import "./Construction.css";

const Construction = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    vendorName: "",
    startDate: "",
    expectedEndDate: "",
    type: "",
    status:"",
    constructionPoints: [], 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://road-traffic-backend.onrender.com/api/construction/", formData);
      alert(response.data.message || "Construction project created successfully!");
    } catch (error) {
      alert("Error creating construction project: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDrawCreated = (e) => {
    const layer = e.layer;

    if (layer) {
      const latLngs = layer.getLatLngs().map((latlng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      }));

      setFormData((prevData) => ({
        ...prevData,
        constructionPoints: latLngs,
      }));
    }
  };

  return (
    <div className="construction-container">
      {/* Map Section */}
      <div className="construction-map-container">
        <MapContainer center={[18.5204, 73.8567]} zoom={13} className="construction-map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={handleDrawCreated}
              draw={{
                rectangle: false,
                circle: false,
                marker: false,
                polygon: false,
                polyline: true,
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>

      {/* Form Section */}
      <div className="construction-form-container">
        <h1>Create Construction Project</h1>
        <form onSubmit={handleSubmit} className="construction-form">
          <div className="form-group">
            <label>Project Name:</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
              placeholder="Enter project name"
            />
          </div>
          <div className="form-group">
            <label>Vendor Name:</label>
            <input
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              required
              placeholder="Enter vendor name"
            />
          </div>
          <div className="form-group">
            <label>Construction Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select construction type
              </option>
              <option value="Metro-construction">Metro-construction</option>
              <option value="Road-construction">Road-construction</option>
              <option value="Flyover-construction">Flyover-construction</option>
            </select>
          </div>
          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Expected End Date:</label>
            <input
              type="date"
              name="expectedEndDate"
              value={formData.expectedEndDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select construction status
              </option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
          </div>
    
          <div className="form-group">
            <label>Construction Points:</label>
            <textarea
              name="constructionPoints"
              value={JSON.stringify(formData.constructionPoints, null, 2)}
              readOnly
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Create Construction Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default Construction;
