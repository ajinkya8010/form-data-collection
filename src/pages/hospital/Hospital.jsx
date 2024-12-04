import React, { useState } from 'react';
import axios from 'axios';
import './Hospital.css'; // Importing the CSS file

const Hospital = () => {
    const [formData, setFormData] = useState({
        longitude: '',
        latitude: '',
        name: '',
        capacity: ''
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
            const response = await axios.post('https://road-traffic-backend.onrender.com/api/hospital/', formData);
            alert(response.data.message);
        } catch (error) {
            alert('Error creating hospital: ' + error.response.data.message);
        }
    };

    return (
        <div className="form-container">
            <h1>Create Hospital</h1>
            <form onSubmit={handleSubmit} className="form">
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
                    <label>Hospital Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter hospital name"
                    />
                </div>
                <div className="form-group">
                    <label>Capacity:</label>
                    <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                        min="0"
                        placeholder="Enter capacity"
                    />
                </div>
                <button type="submit" className="submit-btn">Create</button>
            </form>
        </div>
    );
};

export default Hospital;