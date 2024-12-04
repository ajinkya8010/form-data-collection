export const fetchFormFields = (formType) => {
    const forms = {
      "BanquetHall": {
        fields: [
          { name: "hallName", type: "text", label: "Hall Name", required: true },
          { name: "latitude", type: "text", label: "Latitude", required: true },
          { name: "longitude", type: "text", label: "Longitude", required: true },
          { name: "eventName", type: "text", label: "Event Name", required: true },
          { name: "eventStartTime", type: "datetime-local", label: "Event Start Time", required: true },
          { name: "eventEndTime", type: "datetime-local", label: "Event End Time", required: true },
          { name: "parkingLimit", type: "number", label: "Parking Limit", required: true },
          { name: "numberOfVehiclesExpected", type: "number", label: "Number of Vehicles Expected", required: true },
          { name: "hallCapacity", type: "number", label: "Hall Capacity", required: true },
        ],
      },
      "Complaint": {
        fields: [
          { name: "longitude", type: "text", label: "Longitude", required: true },
          { name: "latitude", type: "text", label: "Latitude", required: true },
          { name: "src", type: "text", label: "Source", required: true },
          {
            name: "type",
            type: "dropdown",
            label: "Category",
            options: ["Pothole", "Poor traffic light timing or synchronization", "Road construction/maintenance work", "Illegal parking reducing road capacity", "Pandal", "Landslide/Accident", "Wrong side driving/riding", "Congestion at Bus Stops", "Debris/Garbage", "Waste Chronic Spot"],
            required: true,
          },
          { name: "description", type: "textarea", label: "Description", required: true },
          { name: "isresolved", type: "checkbox", label: "Is Resolved", required: false },
        ],
      },
      "Diversion": {
        fields: [
          { name: "projectName", type: "text", label: "Project Name", required: true },
          { name: "vendorName", type: "text", label: "Vendor Name", required: true },
          { name: "latitude", type: "text", label: "Latitude", required: true },
          { name: "longitude", type: "text", label: "Longitude", required: true },
          { name: "startTime", type: "date", label: "Start Time", required: true },
          { name: "endTime", type: "date", label: "End Time", required: true },
          {
            name: "type",
            type: "dropdown",
            label: "Type",
            options: ["Metro-construction", "Road-construction", "Flyover-construction"],
            required: true,
          },
      ],
    },

    "Garden": {
      fields: [
        { name: "latitude", type: "text", label: "Latitude", required: true },
        { name: "longitude", type: "text", label: "Longitude", required: true },
        { name: "name", type: "text", label: "Name", required: true },
        { name: "capacity", type: "number", label: "Capacity", required: true },
      ],
    },

    "Hospital": {
      fields: [
        { name: "latitude", type: "text", label: "Latitude", required: true },
        { name: "longitude", type: "text", label: "Longitude", required: true },
        { name: "name", type: "text", label: "Name", required: true },
        { name: "capacity", type: "number", label: "Capacity", required: true },
      ],
    },

    "Hotel": {
  fields: [
    { name: "latitude", type: "text", label: "Latitude", required: true },
    { name: "longitude", type: "text", label: "Longitude", required: true },
    { name: "name", type: "text", label: "Name", required: true },
    { name: "parkingCapacity", type: "number", label: "Parking Capacity", required: true },
    { name: "crowdCapacity", type: "number", label: "Crowd Capacity", required: true },
  ],
},

"Mall": {
  fields: [
    { name: "latitude", type: "text", label: "Latitude", required: true },
    { name: "longitude", type: "text", label: "Longitude", required: true },
    { name: "name", type: "text", label: "Name", required: true },
    { name: "parkingCapacity", type: "number", label: "Parking Capacity", required: true },
  ],
},

"ParkingBuilding": {
  fields: [
    { name: "latitude", type: "text", label: "Latitude", required: true },
    { name: "longitude", type: "text", label: "Longitude", required: true },
    { name: "name", type: "text", label: "Name", required: true },
    { name: "parkingCapacity", type: "number", label: "Parking Capacity", required: true },
  ],
},


"School": {
  fields: [
    { name: "latitude", type: "text", label: "Latitude", required: true },
    { name: "longitude", type: "text", label: "Longitude", required: true },
    { name: "schoolName", type: "text", label: "School Name", required: true },
    { name: "startTime", type: "datetime-local", label: "Start Time", required: true },
    { name: "endTime", type: "datetime-local", label: "End Time", required: true },
    { name: "numberOfSchoolBuses", type: "number", label: "Number of School Buses", required: true },
    { name: "numberOfStudents", type: "number", label: "Number of Students", required: true },
  ],
},

"TrafficHotspot": {
  fields: [
    { name: "latitude", type: "text", label: "Latitude", required: true },
    { name: "longitude", type: "text", label: "Longitude", required: true },
    { name: "landmark", type: "text", label: "Landmark", required: true },
  ],
},

"Event": {
  fields: [
    {
      name: "category",
      type: "dropdown",
      label: "category",
      options: ["Rally", "Procession", "Function"],
      required: true,
    },
    { name: "startTime", type: "datetime-local", label: "Start Time", required: true },
    { name: "endTime", type: "datetime-local", label: "End Time", required: true },
    { name: "crowd", type: "number", label: "Crowd", required: true },
    { name: "vehicleCount", type: "number", label: "Vehicle Count", required: true },
    {
      name: "dataType",
      type: "dropdown",
      label: "Data Type",
      options: ["Point", "LineString"],
      required: true,
    },
  ],
},
"Construction": {
  fields: [
    { name: "projectName", type: "text", label: "Project Name", required: true },
    { name: "vendorName", type: "text", label: "Vendor Name", required: true },
    { name: "startDate", type: "date", label: "Start Date", required: true },
    { name: "expectedEndDate", type: "date", label: "Expected End Date", required: true },
    {
      name: "status",
      type: "dropdown",
      label: "Status",
      options: ["active", "completed", "paused"],
      required: true,
    },
  ],
},
    };
    return Promise.resolve(forms[formType] || { fields: [] });
  };
  