import React, { useEffect, useRef, useState } from "react";
import heroImage from "../assets/images/women banner.jpg";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    whatsapp: "",
    email: "",
  });
  const [selectedSlot, setSelectedSlot] = useState(null);

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

  // const serviceOptions = [
  //   {
  //     label: "MASSAGE & SCRUBS",
  //     options: [
  //       {
  //         label: "Shea Butter Museum Experience",
  //         value: "Shea Butter Museum Experience",
  //       },
  //       {
  //         label: "Make Your Own Shea Butter",
  //         value: "Make Your Own Shea Butter",
  //       },
  //       {
  //         label: "Kuriya Kuriya Spa Experience",
  //         value: "Kuriya Kuriya Spa Experience",
  //       },
  //       {
  //         label: "Authentic Dining Experience",
  //         value: "Authentic Dining Experience",
  //       },
  //       {
  //         label: "Private Group Experience",
  //         value: "Private Group Experience",
  //       },
  //       { label: "Facial Treatment", value: "Facial Treatment" },
  //       { label: "Herbal Steam Therapy", value: "Herbal Steam Therapy" },
  //       {
  //         label: "Foot Ritual with Shea Butter",
  //         value: "Foot Ritual with Shea Butter",
  //       },
  //     ],
  //   },
  //   {
  //     label: "WELLNESS CLASSES",
  //     options: [
  //       {
  //         label: "Morning Yoga by the Pool",
  //         value: "Morning Yoga by the Pool",
  //       },
  //       {
  //         label: "Sunset Yoga on the Terrace",
  //         value: "Sunset Yoga on the Terrace",
  //       },
  //     ],
  //   },
  //   {
  //     label: "WELLNESS PACKAGES",
  //     options: [
  //       {
  //         label: "Girls Private Experience",
  //         value: "Girls Private Experience",
  //       },
  //       { label: "Chef Shea", value: "Chef Shea" },
  //       { label: "Shea Combo", value: "Shea Combo" },
  //     ],
  //   },
  // ];

  const serviceOptions = [
    {
      label: "TOURS & EDUCATION",
      options: [
        {
          label: "Shea Butter Museum Experience",
          value: "Shea Butter Museum Experience",
        },
        {
          label: "Make Your Own Shea Butter",
          value: "Make Your Own Shea Butter",
        },
      ],
    },
    {
      label: "SPA EXPERIENCES",
      options: [
        {
          label: "Korea Korea Spa Experience",
          value: "Korea Korea Spa Experience",
        },
        {
          label: "Private Group Experience",
          value: "Private Group Experience",
        },
        {
          label: "Facial Treatment",
          value: "Facial Treatment",
        },
        {
          label: "Herbal Steam Therapy",
          value: "Herbal Steam Therapy",
        },
        {
          label: "Foot Ritual with Shea Butter",
          value: "Foot Ritual with Shea Butter",
        },
      ],
    },
    {
      label: "DINING EXPERIENCES",
      options: [
        {
          label: "Authentic Dining Experience",
          value: "Authentic Dining Experience",
        },
      ],
    },
    {
      label: "WELLNESS CLASSES",
      options: [
        {
          label: "Morning Yoga by the Pool",
          value: "Morning Yoga by the Pool",
        },
        {
          label: "Sunset Yoga on the Terrace",
          value: "Sunset Yoga on the Terrace",
        },
      ],
    },
    {
      label: "WELLNESS PACKAGES",
      options: [
        {
          label: "Girls Private Experience",
          value: "Girls Private Experience",
        },
        {
          label: "Chef Shea",
          value: "Chef Shea",
        },
        {
          label: "Shea Combo",
          value: "Shea Combo",
        },
      ],
    },
  ];

  // SEARCH AVAILABLE SLOTS
  const handleSearch = async () => {
    if (!selectedDate) return;
    if (!selectedService?.value) return;

    const formattedDate = new Date(selectedDate).toLocaleDateString("en-CA");

    setLoading(true);

    const res = await fetch(
      "https://sheaspa-backend.onrender.com/get-available-slots",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          date: formattedDate,
          service: selectedService?.value,
        }),
      },
    );

    const data = await res.json();

    setAvailableSlots(data.availableSlots || []);
    setLoading(false);
  };

  const handleSearchInitiate = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }
    if (!selectedService?.value) {
      toast.error("Please select a service");
      return;
    }

    handleSearch();
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (!customerDetails.name || !customerDetails.whatsapp) {
      toast.error("Name and WhatsApp number are required");
      return;
    }
    setIsCustomerModalOpen(false);
    handleSlotClick(selectedSlot);
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
  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setIsCustomerModalOpen(true);
  };

  const confirmBooking = async (slot) => {
    const startTime = convertTo24Hour(slot);

    const endHour = parseInt(startTime.split(":")[0]) + 1;
    const endTime = `${endHour.toString().padStart(2, "0")}:00`;

    const formattedDate = new Date(selectedDate).toLocaleDateString("en-CA");

    const response = await fetch(
      "https://sheaspa-backend.onrender.com/create-booking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: customerDetails.name,
          service: selectedService?.value || "Massage",
          whatsapp: customerDetails.whatsapp,
          email: customerDetails.email || "",
          date: formattedDate,
          startTime,
          endTime,
        }),
      },
    );

    const result = await response.json();
    if (result.success) {
      toast.success("Booking Confirmed!");
    } else {
      toast.error("Booking Failed");
    }
  };
  return (
    <section id="home" className="section hero bg-image-full">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
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
                <p
                  className="text-neutra-200 display-2"
                  style={{ marginBottom: "1.5rem" }}
                >
                  The Sheabutter Museum Wellness Spa is where luxury meets
                  extreme comfort. With an attentive staff ready provide the
                  best service in all of Africa, visitors will embark on a
                  journey filled with tradition, authenticity. ano most
                  importanly - relaxation. Join us and tap into the real African
                  soft life.
                </p>
              </div>

              {/* BOOK TITLE */}
              <div
                className="overflow-hidden"
                style={{ marginBottom: "-0.5rem" }}
              >
                <h2
                  className="display-8 text-light"
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "6px",
                    fontWeight: "500",
                    margin: 0,
                  }}
                >
                  BOOK
                </h2>
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
                  minDate={new Date()}
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
                <button className="search-btn" onClick={handleSearchInitiate}>
                  Search
                </button>
              </div>

              {/* LOADING */}
              {loading && (
                <p style={{ color: "white" }}>Checking availability...</p>
              )}
              <ToastContainer
                containerId="slotConfirm"
                position="top-center"
                autoClose={false}
                newestOnTop
                style={{ top: "40%" }}
              />
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
            transform:
              "translate3d(0%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
          }}
        ></div>{" "}
      </div>

      {/* CUSTOMER DETAILS MODAL */}
      <div
        className={`modal-overlay ${isCustomerModalOpen ? "open" : ""}`}
        onClick={() => setIsCustomerModalOpen(false)}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            className="modal-close-btn"
            onClick={() => setIsCustomerModalOpen(false)}
          >
            ✕
          </button>
          <h2 className="modal-title">Enter Your Details</h2>
          <form
            className="modal-form"
            onSubmit={(e) => {
              e.preventDefault();
              confirmBooking(selectedSlot);
              setIsCustomerModalOpen(false);
              setAvailableSlots([]);
              setCustomerDetails({
                name: "",
                whatsapp: "",
                email: "",
              });
            }}
          >
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: John Doe"
                required
                value={customerDetails.name}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>WhatsApp Number *</label>
              <input
                type="tel"
                className="form-input"
                placeholder="Ex: +1234567890"
                required
                value={customerDetails.whatsapp}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    whatsapp: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Email Address (Optional)</label>
              <input
                type="email"
                className="form-input"
                placeholder="Ex: john@example.com"
                value={customerDetails.email}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit" className="modal-submit-btn">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
