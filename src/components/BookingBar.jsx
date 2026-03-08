import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const services = [
  "Full Body Massage",
  "Deep Tissue Massage",
  "Aromatherapy",
  "Facial Treatment"
];

const doctors = [
  "Dr Jasmine Smith",
  "Dr Emma Brown",
  "Dr Olivia Wilson"
];

const timeSlots = {
  afternoon: ["4:00 PM", "4:30 PM"],
  evening: ["5:00 PM", "5:30 PM"]
};

const BookingBar = () => {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}>

      {/* Search Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr auto",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #ddd"
        }}
      >
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          style={{ padding: "12px", border: "none" }}
        >
          {services.map((s, i) => (
            <option key={i}>{s}</option>
          ))}
        </select>

        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          style={{ padding: "12px", border: "none" }}
        >
          {doctors.map((d, i) => (
            <option key={i}>{d}</option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ padding: "12px", border: "none" }}
        />

        <button
          style={{
            background: "#0b4b3a",
            color: "white",
            padding: "12px 20px",
            border: "none"
          }}
        >
          Search
        </button>
      </div>

      {/* Add Service Button */}
      <div style={{ marginTop: "20px" }}>
        <button
          style={{
            background: "#0b4b3a",
            color: "white",
            padding: "10px 18px",
            borderRadius: "30px",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <FaPlus /> Add Service
        </button>
      </div>

      {/* Doctor Info */}
      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="doctor"
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
        />

        <div>
          <h3>{selectedDoctor}</h3>
          <p>$150.00</p>
          <p>{selectedService}</p>
        </div>
      </div>

      {/* Time Slots */}
      <div style={{ marginTop: "30px" }}>
        <h3>Afternoon</h3>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {timeSlots.afternoon.map((time, i) => (
            <button
              key={i}
              style={{
                background: "#0b4b3a",
                color: "white",
                padding: "10px 18px",
                border: "none",
                borderRadius: "6px"
              }}
            >
              {time}
            </button>
          ))}
        </div>

        <h3 style={{ marginTop: "20px" }}>Evening</h3>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {timeSlots.evening.map((time, i) => (
            <button
              key={i}
              style={{
                background: "#0b4b3a",
                color: "white",
                padding: "10px 18px",
                border: "none",
                borderRadius: "6px"
              }}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BookingBar;