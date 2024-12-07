import React, { useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from "axios";
import "./Diversion.css";

const Diversion = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    vendorName: "",
    startDate: "",
    endDate: "",
    type: "",
    diversionPoints: [], // Array to store lat-long points
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
      const response = await axios.post("http://localhost:3001/api/diversion/", formData);
      alert(response.data.message || "Diversion created successfully!");
    } catch (error) {
      alert("Error creating diversion: " + (error.response?.data?.message || error.message));
    }
  };

  // Update diversion points when drawing is completed
  const handleDrawCreated = (e) => {
    const layer = e.layer;
  
    // Collect lat-long points from the drawn polyline
    if (layer) {
      const latLngs = layer.getLatLngs().map((latlng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      }));
  
      console.log("Collected LatLngs:", latLngs); // Debugging log
  
      setFormData((prevData) => ({
        ...prevData,
        diversionPoints: latLngs, // Update the array of points
      }));
    }
  };
  

  return (
    <div className="container">
      {/* Map Section */}
      <div className="map-container">
        <MapContainer center={[18.5204, 73.8567]} zoom={13} className="map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <FeatureGroup>
            {/* Drawing controls */}
            <EditControl
              position="topright"
              onCreated={handleDrawCreated}
              draw={{
                rectangle: false, // Disable rectangle
                circle: false,    // Disable circle
                marker: false,    // Disable marker
                polygon: false,   // Disable polygon
                polyline: true,   // Enable polyline
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>

      {/* Form Section */}
      <div className="form-container">
        <h1>Create Diversion</h1>
        <form onSubmit={handleSubmit} className="form">
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
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Diversion Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select diversion type
              </option>
              <option value="Metro-construction">Metro-construction</option>
              <option value="Road-construction">Road-construction</option>
              <option value="Flyover-construction">Flyover-construction</option>
            </select>
          </div>
          <div className="form-group">
            <label>Diversion Points:</label>
            <textarea
              name="diversionPoints"
              value={JSON.stringify(formData.diversionPoints, null, 2)}
              readOnly
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Create Diversion
          </button>
        </form>
      </div>
    </div>
  );
};

export default Diversion;







































/*import React, { useState } from 'react';
import axios from 'axios';
import './Diversion.css'; // Importing the CSS file

const Diversion = () => {
    const [formData, setFormData] = useState({
        projectName: '',
        vendorName: '',
        startTime: '',
        endTime: '',
        longitude: '',
        latitude: '',
        type: '' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://road-traffic-backend.onrender.com/api/diversion/', formData);
            alert(response.data.message || 'Diversion created successfully!');
        } catch (error) {
            alert('Error creating diversion: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="form-container">
            <h1>Create Diversion</h1>
            <form onSubmit={handleSubmit} className="form">
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
                    <label>Start Time:</label>
                    <input
                        type="date"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>End Time:</label>
                    <input
                        type="date"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Latitude:</label>
                    <input
                        type="text"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        required
                        placeholder="Enter latitude"
                    />
                </div>
                <div className="form-group">
                    <label>Longitude:</label>
                    <input
                        type="text"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        required
                        placeholder="Enter longitude"
                    />
                </div>
                <div className="form-group">
                    <label>Diversion Type:</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select diversion type</option>
                        <option value="Metro-construction">Metro-construction</option>
                        <option value="Road-construction">Road-construction</option>
                        <option value="Flyover-construction">Flyover-construction</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Create Diversion</button>
            </form>
        </div>
    );
};

export default Diversion; */