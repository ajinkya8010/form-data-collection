import React, { useState } from "react";
import DynamicForm from "../components/DynamicForm";


const HomePage = () => {
  const [selectedForm, setSelectedForm] = useState("");

  const handleFormSelection = (e) => {
    setSelectedForm(e.target.value);
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


      {selectedForm && (
        <div className="form-container">
          <DynamicForm formType={selectedForm}/>
        </div>
      )}

    </div>
  );
};

export default HomePage;
