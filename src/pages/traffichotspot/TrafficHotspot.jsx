import React, { useState } from 'react';
import axios from 'axios';
import './TrafficHotspot.css'; 

const TrafficHotspot = () => {
    const [formData, setFormData] = useState({
        latitude: '',
        longitude: '',
        landmark: ''
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
            const response = await axios.post('https://road-traffic-backend.onrender.com/api/traffichotspot/', formData);
            alert(response.data.message || 'Traffic hotspot created successfully!');
        } catch (error) {
            alert('Error creating traffic hotspot: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="form-container">
            <h1>Register Traffic Hotspot</h1>
            <form onSubmit={handleSubmit} className="form">
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
                    <label>Landmark:</label>
                    <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        required
                        placeholder="Enter nearby landmark"
                    />
                </div>
                <button type="submit" className="submit-btn">Create</button>
            </form>
        </div>
    );
};

export default TrafficHotspot;