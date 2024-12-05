import React, { useState } from 'react';
import axios from 'axios';
import './School.css'; // Importing the CSS file

const School = () => {
    const [formData, setFormData] = useState({
        latitude: '',
        longitude: '',
        schoolName: '',
        startTime: '',
        endTime: '',
        numberOfSchoolBuses: '',
        numberOfStudents: ''
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
            const response = await axios.post('https://road-traffic-backend.onrender.com/api/school/', formData);
            alert(response.data.message);
        } catch (error) {
            alert('Error creating school: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="form-container">
            <h1>Register School</h1>
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
                    <label>School Name:</label>
                    <input
                        type="text"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        required
                        placeholder="Enter school name"
                    />
                </div>
                <div className="form-group">
                    <label>Start Time:</label>
                    <input
                        type="datetime-local"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>End Time:</label>
                    <input
                        type="datetime-local"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Number of School Buses:</label>
                    <input
                        type="number"
                        name="numberOfSchoolBuses"
                        value={formData.numberOfSchoolBuses}
                        onChange={handleChange}
                        required
                        min="0"
                        placeholder="Enter number of school buses"
                    />
                </div>
                <div className="form-group">
                    <label>Number of Students:</label>
                    <input
                        type="number"
                        name="numberOfStudents"
                        value={formData.numberOfStudents}
                        onChange={handleChange}
                        required
                        min="0"
                        placeholder="Enter number of students"
                    />
                </div>
                <button type="submit" className="submit-btn">Create</button>
            </form>
        </div>
    );
};

export default School;