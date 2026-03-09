import React, { useState, useRef, useEffect } from "react";
import facialsImg from "../assets/images/facial.jpg";
import sheaButterMuseum from "../assets/images/shea-butter-museum.jpg";
import footSpa from "../assets/images/foot spa.jpg";
import girlsPrivateExp from "../assets/images/girls private experience.jpg";
import chefShea from "../assets/images/chef shea.jpg";
import hamamat from "../assets/images/Hamamat.jpg";
import kuriya from "../assets/images/kuriya.jpg";
import hamamatyellow from "../assets/images/hamamatyellow.jpg";
import sheacombo from "../assets/images/shea combo.jpg";
import poolsideYoga from "../assets/images/poolside yoga.jpg";
import sunsetYoga from "../assets/images/west terrace sunset yoga.jpg";
import steamImg from "../assets/images/steam.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const services = [
  {
    id: 1,
    name: "KOREA KOREA SPA EXPERIENCE",
    description: [
      "Our signature African wellness ritual.",
      "This experience begins with a full-body African scrub using natural ingredients, followed by the Kuriya Kuriya Massage.",
      "A relaxing massage using warm shea butter prepared by our village women.",
    ],
    listLabel: "Includes:",
    features: [
      "African Body Scrub",
      "Warm Shea Butter Massage",
      "Herbal Relaxation Ritual",
    ],
    image: kuriya,
    categoryLabel: "A/3 spa experience",
  },
  {
    id: 2,
    name: "MAKE YOUR OWN SHEA BUTTER",
    description: [
      "Guests are invited to create their own personalized shea butter blend using fresh village shea butter and natural African ingredients.",
      "Each guest leaves with their own custom shea butter creation.",
      "Perfect for groups and families.",
    ],
    listLabel: "Ideal for:",
    desc: "Groups and families",
    features: [],
    image: chefShea,
    categoryLabel: "A/2 shea experience",
  },
  {
    id: 3,
    name: "SHEA BUTTER MUSEUM EXPERIENCE",
    description: [
      "A guided tour through the Hamamat Shea Butter Museum where guests discover the history of African beauty traditions and the cultural importance of shea butter.",
      "Guests will also explore our famous Shea Butter Wall featuring butter from across Africa.",
    ],
    features: [],
    image: sheaButterMuseum,
    categoryLabel: "A/1 shea experience",
    location: "102 Kofi Annan St, Airport Residential, Accra",
  },
  {
    id: 4,
    name: "AUTHENTIC DINING EXPERIENCE",
    description: [
      "Guests enjoy authentic African cuisine prepared by our private chef using fresh traditional ingredients.",
      "A refined village dining experience celebrating African flavors and hospitality.",
    ],
    features: ["Lunch", "Drinks", "Desserts & fresh tropical fruits"],
    image: chefShea,
    categoryLabel: "A/4 dining",
  },
  {
    id: 5,
    name: "PRIVATE GROUP EXPERIENCE",
    description: [
      "Perfect for large groups visiting Ghana as the experience package is customizable.",
    ],
    features: [
      "Museum Tour",
      "Shea Butter Making Workshop",
      "Wellness Treatments",
      "Traditional African Dinner/Lunch",
    ],
    image: girlsPrivateExp,
    categoryLabel: "A/5 spa experience",
  },
  {
    id: 6,
    name: "FACIAL TREATMENT",
    description: [
      "This experience begins with a gentle cleanse and exfoliation using natural African ingredients.",
      "Followed by a restorative facial massage with warm shea butter prepared by our village women.",
    ],
    features: [
      "Natural Facial Cleanse",
      "African Facial Exfoliation",
      "Shea Butter Facial Massage",
    ],
    image: facialsImg,
    categoryLabel: "A/6 spa experience",
  },
  {
    id: 7,
    name: "HERBAL STEAM THERAPY",
    description: [
      "A calming herbal steam bath infused with natural African botanical herbs.",
      "The warm steam opens pores, relaxes the body, and promotes purification.",
    ],
    features: [
      "Traditional Herbal Steam Bath",
      "Natural African Botanicals",
      "Relaxation Ritual",
    ],
    image: steamImg,
    categoryLabel: "A/7 spa experience",
  },
  {
    id: 8,
    name: "FOOT RITUAL WITH SHEA BUTTER",
    description: [
      "A warm herbal foot soak followed by a gentle exfoliation using natural African ingredients.",
      "Finished with a soothing shea butter foot massage.",
    ],
    listLabel: "Includes:",
    features: [
      "Herbal Foot Soak",
      "African Foot Exfoliation",
      "Warm Shea Butter Foot Massage",
    ],
    image: footSpa,
    categoryLabel: "A/8 spa experience",
  },
  {
    id: 9,
    name: "MORNING YOGA BY THE POOL",
    description: [
      "Begin the day with a gentle yoga session beside the pool.",
      "Guided breathing and flowing movements help relax the body and mind.",
    ],
    listLabel: "Features:",
    features: [
      "Guided Morning Yoga Session",
      "Breathwork & Gentle Stretching",
      "Poolside Relaxation",
    ],
    image: poolsideYoga,
    categoryLabel: "A/9 wellness",
  },
  {
    id: 10,
    name: "SUNSET YOGA ON THE TERRACE",
    description: [
      "End the day with a peaceful yoga session on the terrace at sunset.",
      "Golden light fills the sky while gentle stretching and breathing release tension.",
    ],
    features: [
      "Guided Sunset Yoga Session",
      "Gentle Stretching & Breathwork",
      "Terrace Poolside Relaxation",
    ],
    image: sunsetYoga,
    categoryLabel: "A/10 wellness",
  },
];

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCustomerDetailsStep, setIsCustomerDetailsStep] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    whatsapp: "",
    email: "",
  });
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slideWidth = 330 + 32; // width + gap

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () =>
    setCurrentIndex((i) => Math.min(services.length - 3, i + 1));

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTranslateX(e.clientX - startX);
  };

  const handleMouseUp = () => {
    if (translateX < -50) next();
    if (translateX > 50) prev();
    setIsDragging(false);
    setTranslateX(0);
  };

  const handleBookNow = (service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
    setIsCustomerDetailsStep(false);
    setAvailableSlots([]);
  };

  const handleSearchSlots = async () => {
    if (!selectedDate || !selectedService) return;

    const formattedDate = new Date(selectedDate).toLocaleDateString("en-CA");
    setLoading(true);

    try {
      const res = await fetch(
        "https://sheaspa-backend.onrender.com/get-available-slots",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: formattedDate,
            service: selectedService.name,
          }),
        },
      );
      const data = await res.json();
      setAvailableSlots(data.availableSlots || []);
    } catch (error) {
      toast.error("Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setIsCustomerDetailsStep(true);
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (!customerDetails.name || !customerDetails.whatsapp) {
      toast.error("Name and WhatsApp are required");
      return;
    }
    const slot = selectedSlot;
    setIsCustomerDetailsStep(false);
    toast(
      ({ closeToast }) => (
        <div>
          <p className="mg-bottom-small">
            Are you sure you want to book <b>{slot}</b>?
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="primary-button"
              style={{
                padding: "6px 12px",
                background: "#28a745",
                fontSize: "0.875rem",
              }}
              onClick={() => {
                closeToast();
                confirmBooking(slot);
              }}
            >
              Yes
            </button>
            <button
              className="secondary-button"
              style={{
                padding: "6px 12px",
                background: "#ccc",
                fontSize: "0.875rem",
                color: "#333",
              }}
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false },
    );
  };

  const confirmBooking = async (slot) => {
    if (!customerDetails.name || !customerDetails.whatsapp) {
      toast.error("Name and WhatsApp are required");
      return;
    }
    const convertTo24Hour = (time) => {
      const [timePart, modifier] = time.split(" ");
      let [hours, minutes] = timePart.split(":");
      if (modifier === "PM" && hours !== "12") hours = parseInt(hours) + 12;
      if (modifier === "AM" && hours === "12") hours = "00";
      return `${hours}:${minutes}`;
    };

    const startTime = convertTo24Hour(slot);
    const endHour = parseInt(startTime.split(":")[0]) + 1;
    const endTime = `${endHour.toString().padStart(2, "0")}:00`;
    const formattedDate = new Date(selectedDate).toLocaleDateString("en-CA");

    try {
      const response = await fetch(
        "https://sheaspa-backend.onrender.com/create-booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: customerDetails.name,
            service: selectedService.name,
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
        setIsBookingModalOpen(false);
      } else {
        toast.error("Booking Failed");
      }
    } catch (error) {
      toast.error("Error creating booking");
    }
  };

  const offset = -currentIndex * slideWidth + translateX;

  return (
    <section
      id="services"
      className="section top-bottom-90px overflow-hidden"
      ref={sectionRef}
    >
      {/* <div className="container-default"> */}
      <div className="mg-left-medium mg-right-medium">
        {/* Header */}
        <div className="mg-bottom-80px">
          <div className="flex-horizontal space-between gap-default-wrap">
            <div className="overflow-hidden">
              <h2
                ref={titleRef}
                className={`display-8 reveal-up ${visible ? "visible" : ""}`}
              >
                Our Top Services
              </h2>
            </div>
            {/* <div className={`buttons-row reveal-fade ${visible ? 'visible' : ''}`}>
              <a href="#all-services" className="secondary-button">
                <div>All services</div>
              </a>
            </div> */}
          </div>
        </div>

        {/* Slider */}
        <div
          className={`slider-wrapper reveal-fade ${visible ? "visible" : ""}`}
          style={{ position: "relative" }}
        >
          <div
            className="slider-mask"
            style={{
              overflow: "hidden",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              ref={trackRef}
              className="slider-track"
              style={{
                transform: `translateX(${offset}px)`,
                transition: isDragging ? "none" : "transform 0.5s ease",
              }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="slide-item mg-right-extra-large"
                  style={{ width: 240 }}
                >
                  <div className="grid-1-column gap-row-medium">
                    <div className="picture-mask _11">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="image fit-cover _w-h-100"
                        draggable="false"
                      />
                    </div>

                    <div className="service-content service-card">
                      <div className="flex-horizontal space-between align-center">
                        <h3 className="heading display-4 service-title">
                          {service.name}
                        </h3>
                        <div className="service-price mg-top-small mg-bottom-small">
                          $325.99
                        </div>
                      </div>

                      <div className="service-text">
                        {service.description.map((desc, index) => (
                          <p className="mg-top-extra-small" key={index}>
                            {desc}
                          </p>
                        ))}
                        <p className="mg-top-extra-small">{service.location}</p>

                        {service.features.length > 0 && (
                          <>
                            <p className="mg-top-extra-small">Includes:</p>

                            <ul className="service-features mg-top-small mg-bottom-small">
                              {service.features.map((feature, index) => (
                                <li className="mg-top-extra-small" key={index}>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>

                      <div className="buttons-row">
                        <button
                          className="primary-button"
                          onClick={() => handleBookNow(service)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <div className="">
            <button
              className="slider-button left-v7"
              onClick={prev}
              disabled={currentIndex === 0}
              style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
              aria-label="Previous"
            >
              ←
            </button>
            <button
              className="slider-button right-v7"
              onClick={next}
              disabled={currentIndex >= services.length - 3}
              style={{ opacity: currentIndex >= services.length - 3 ? 0.3 : 1 }}
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {isBookingModalOpen && (
        <div
          className={`modal-overlay open`}
          onClick={() => setIsBookingModalOpen(false)}
        >
          <div
            className="modal-contents"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "600px" }}
          >
            <button
              className="modal-close-btn"
              onClick={() => setIsBookingModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="modal-title">Book {selectedService?.name}</h2>

            {!isCustomerDetailsStep ? (
              <div className="modal-form">
                <div className="form-group">
                  <label>Select Date</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd MMM yyyy"
                    minDate={new Date()}
                    className="form-input"
                    style={{ width: "100%" }}
                  />
                </div>
                <button
                  className="modal-submit-btn"
                  onClick={handleSearchSlots}
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search Available Slots"}
                </button>

                {availableSlots.length > 0 && (
                  <div className="mg-top-medium">
                    <label
                      className="display-4 mid"
                      style={{ display: "block", marginBottom: "1rem" }}
                    >
                      Available Slots:
                    </label>
                    <div
                      className="slots-container"
                      style={{ justifyContent: "center" }}
                    >
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
                  </div>
                )}
              </div>
            ) : (
              <form
                className="modal-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  confirmBooking(selectedSlot);
                  setIsBookingModalOpen(false);
                  setIsCustomerDetailsStep(false);
                  setSelectedSlot(null);
                  setSelectedDate(new Date());
                  setAvailableSlots([]);
                  setCustomerDetails({ name: "", whatsapp: "", email: "" });
                }}
              >
                <p className="text-center mg-bottom-small">
                  Confirming booking for <b>{selectedSlot}</b>
                </p>
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
                <button
                  type="button"
                  className="secondary-button"
                  style={{ marginTop: "0.5rem", width: "100%" }}
                  onClick={() => setIsCustomerDetailsStep(false)}
                >
                  Back to Slots
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </section>
  );
};

export default ServicesSlider;
