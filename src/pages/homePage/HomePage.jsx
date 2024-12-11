

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css';

const HomePage = () => {
  const [selectedForm, setSelectedForm] = useState("");
  const navigate = useNavigate();

  const handleFormSelection = (e) => {
    const value = e.target.value;
    setSelectedForm(value);

    if (value === "BanquetHall") {
      navigate("/banquethall");
    }
    if(value === "Garden"){
      navigate("/garden");
    }
    if(value === "Hospital"){
      navigate("/hospital");
    }
    if(value === "Hotel"){
      navigate("/hotel");
    }
    if(value === "Mall"){
      navigate("/mall");
    }
    if(value === "School"){
      navigate("/school");
    }
    if(value === "TrafficHotspot"){
      navigate("/traffichotspot");
    }
    if(value === "Diversion"){
      navigate("/diversion");
    }
    if(value === "Complaint"){
      navigate("/complaint");
    }
    if(value === "Event"){
      navigate("/event");
    }
    if(value === "Construction"){
      navigate("/construction");
    }
    if(value === "ParkingBuilding"){
      navigate("/parkingbuilding");
    }
  };

  return (
    <div className="home-page">
      <h2>Select a Form</h2>
      <select onChange={handleFormSelection} value={selectedForm}>
        <option value="">Choose Form Type</option>
        <option value="BanquetHall">Banquet Hall</option>
        <option value="Event">Event</option>
        <option value="Construction">Construction</option>
        <option value="Complaint">Complaint</option>
        <option value="Diversion">Diversion</option>
        <option value="Garden">Garden</option>
        <option value="Hospital">Hospital</option>
        <option value="Hotel">Hotel</option>
        <option value="Mall">Mall</option>
        <option value="ParkingBuilding">Parking Building</option>
        <option value="School">School</option>
        <option value="TrafficHotspot">Traffic Hotspot</option>
      </select>
    </div>
  );
};

export default HomePage;

