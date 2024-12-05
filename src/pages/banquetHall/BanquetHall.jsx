import React, { useState } from 'react';
import axios from 'axios';
import './BanquetHall.css';

const BanquetHall = () => {
    const [formData, setFormData] = useState({
        hallName: '',
        latitude: '',
        longitude: '',
        eventName: '',
        eventStartTime: '',
        eventEndTime: '',
        parkingLimit: '',
        numberOfVehiclesExpected: '',
        hallCapacity: ''
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
        console.log(formData);
        
        try {
            const response = await axios.post('https://road-traffic-backend.onrender.com/api/banquethall/', formData);
            alert(response.data.message);
        } catch (error) {
            alert('Error creating banquet hall: ' + error.response.data.message);
        }
    };

    return (
        <div className="form-container">
            <h1>Register Banquet Hall</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Hall Name:</label>
                    <input
                        type="text"
                        name="hallName"
                        value={formData.hallName}
                        onChange={handleChange}
                        required
                        placeholder="Enter hall name"
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
                    <label>Event Name:</label>
                    <input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        required
                        placeholder="Enter event name"
                    />
                </div>
                <div className="form-group">
                    <label>Event Start Time:</label>
                    <input
                        type="datetime-local"
                        name="eventStartTime"
                        value={formData.eventStartTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Event End Time:</label>
                    <input
                        type="datetime-local"
                        name="eventEndTime"
                        value={formData.eventEndTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Parking Limit:</label>
                    <input
                        type="number"
                        name="parkingLimit"
                        value={formData.parkingLimit}
                        onChange={handleChange}
                        min="0"
                        required
                        placeholder="Enter parking limit"
                    />
                </div>
                <div className="form-group">
                    <label>Number of Vehicles Expected:</label>
                    <input
                        type="number"
                        name="numberOfVehiclesExpected"
                        value={formData.numberOfVehiclesExpected}
                        onChange={handleChange}
                        min="0"
                        required
                        placeholder="Enter number of vehicles expected"
                    />
                </div>
                <div className="form-group">
                    <label>Hall Capacity:</label>
                    <input
                        type="number"
                        name="hallCapacity"
                        value={formData.hallCapacity}
                        onChange={handleChange}
                        min="0"
                        required
                        placeholder="Enter hall capacity"
                    />
                </div>
                <button type="submit" className="submit-btn">Create</button>
            </form>
        </div>
    );
};

export default BanquetHall;