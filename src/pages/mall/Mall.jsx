import React, { useState } from 'react';
import axios from 'axios';
import './Mall.css'; // Importing the CSS file

const Mall = () => {
    const [formData, setFormData] = useState({
        longitude: '',
        latitude: '',
        name: '',
        parkingCapacity: ''
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
            const response = await axios.post('https://road-traffic-backend.onrender.com/api/mall/', formData);
            alert(response.data.message);
        } catch (error) {
            alert('Error creating mall: ' + error.response.data.message);
        }
    };

    return (
        <div className="form-container">
            <h1>Create Mall</h1>
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
                    <label>Mall Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter mall name"
                    />
                </div>
                <div className="form-group">
                    <label>Parking Capacity:</label>
                    <input
                        type="number"
                        name="parkingCapacity"
                        value={formData.parkingCapacity}
                        onChange={handleChange}
                        required
                        min="0"
                        placeholder="Enter parking capacity"
                    />
                </div>
                <button type="submit" className="submit-btn">Create</button>
            </form>
        </div>
    );
};

export default Mall;