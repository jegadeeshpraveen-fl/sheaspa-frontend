import React, { useEffect, useRef, useState } from "react";
import heroImage from "../assets/images/women banner.jpg";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.transform = "translate3d(0,0,0)";
        titleRef.current.style.transition =
          "transform 1s cubic-bezier(0.16,1,0.3,1)";
      }
    }, 400);

    const timer2 = setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = "1";
        subtitleRef.current.style.transition = "opacity 0.8s ease";
      }
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  const serviceOptions = [
    {
      label: "MASSAGE & SCRUBS",
      options: [
        { label: "Facial", value: "Facial" },
        { label: "Foot Spa", value: "Foot Spa" },
        { label: "Hamamat", value: "Hamamat" },
        { label: "Hamamat Yellow", value: "Hamamat Yellow" }
      ]
    },
    {
      label: "WELLNESS CLASSES",
      options: [
        { label: "Poolside Yoga", value: "Poolside Yoga" },
        { label: "Kuriya", value: "Kuriya" }
      ]
    },
    {
      label: "WELLNESS PACKAGES",
      options: [
        { label: "Girls Private Experience", value: "Girls Private Experience" },
        { label: "Chef Shea", value: "Chef Shea" },
        { label: "Shea Combo", value: "Shea Combo" }
      ]
    }
  ];

  // SEARCH AVAILABLE SLOTS
const handleSearch = async () => {
  if (!selectedDate) return;

  const formattedDate = new Date(selectedDate).toLocaleDateString("en-CA");

  setLoading(true);

  const res = await fetch("http://localhost:5000/get-available-slots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
 
    body: JSON.stringify({
  date: formattedDate,
  service: selectedService?.value
})
  });

  const data = await res.json();

  setAvailableSlots(data.availableSlots || []);
  setLoading(false);
};

  // CONVERT AM PM TO 24 HOUR
  const convertTo24Hour = (time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours) + 12;
    }

    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}`;
  };

  // CREATE BOOKING
  const handleSlotClick = async (slot) => {
    const startTime = convertTo24Hour(slot);

    const endHour = parseInt(startTime.split(":")[0]) + 1;
    const endTime = `${endHour.toString().padStart(2, "0")}:00`;

    const formattedDate = selectedDate.toISOString().split("T")[0];

    const response = await fetch("http://localhost:5000/create-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Praveen",
        service: selectedService?.value || "Massage",
        whatsapp: "+98109819282929",
        email: "ajajdndj@gamail.com",
        date: formattedDate,
        startTime,
        endTime
      })
    });

    const result = await response.json();

    if (result.success) {
      alert("Booking Confirmed!");
      handleSearch(); // refresh slots
    }
  };

  return (
    <section id="home" className="section hero bg-image-full">
      <div className="z-index-1">
        <div className="container-default">
          <div className="inner-container _1070px center">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "1.5rem",
                // background:"#c4a8828c"
              }}
            >
              <div className="overflow-hidden">
                <h1
                  ref={titleRef}
                  className="display-10 text-light"
                  style={{ transform: "translate3d(0,100%,0)" }}
                >
                Not Just Any Massage
                </h1>
              </div>

              <div
                ref={subtitleRef}
                className="inner-container _840px center"
                style={{ opacity: 0 }}
              >
                <p className="text-neutra-200 display-2" style={{ marginBottom: "1.5rem" }}>
               The Sheabutter Museum Wellness Spa is where luxury meets extreme comfort. With an attentive staff ready provide the best service in all of Africa, visitors will embark on a journey filled with tradition, authenticity. ano most importanly - relaxation. Join us and tap into the real African soft life.
                </p>
              </div>
               {/* SEARCH BAR */}
              <div className="search-bar">

                {/* DATE PICKER */}
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd MMM yyyy"
                  placeholderText="Select Date"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className="hero-datepicker"
                />

                {/* AUTOCOMPLETE */}
              <Select
  options={serviceOptions}
  placeholder="Search Services..."
  value={selectedService}
  onChange={setSelectedService}
  className="service-select"
  classNamePrefix="react-select"
/>
                {/* SEARCH BUTTON */}
   <button className="search-btn" onClick={handleSearch}>
                  Search
                </button>
              </div>

            
   {/* LOADING */}
              {loading && <p style={{color:"white"}}>Checking availability...</p>}

              {/* AVAILABLE SLOTS */}
              {availableSlots.length > 0 && (
                <div className="slots-container">
                  {availableSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="slot-chip"
                      onClick={() => handleSlotClick(slot)}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              )}
              {/* <div
                ref={buttonsRef}
                className="buttons-row"
                style={{ opacity: 0, justifyContent: "center" }}
              >
                <a href="#services" className="primary-button">
                  All services
                </a>
              </div> */}
            </div>
          </div>
           
        </div>
      </div>

      {/* BACKGROUND IMAGE */}
      <div className="featured-picture-v2">
        <img
          src={heroImage}
          alt="Luxury Spa Treatments"
          className="image fit-cover _w-h-100"
        />
 <div
  className="image-overlay"
  style={{
    display: "block",
    transform: "translate3d(0%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)"
  }}
></div>      </div>
      
    </section>
  );
};

export default Hero;