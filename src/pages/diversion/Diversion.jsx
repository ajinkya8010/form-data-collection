import React, { useState } from 'react';
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
        type: '' // Dropdown value
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

export default Diversion;