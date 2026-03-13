import React, { useState, useRef, useEffect } from "react";
import facialsImg from "../assets/images/facial.jpg";
import sheaButterMuseum from "../assets/images/shea-butter-museum.jpg";
import footSpa from "../assets/images/foot spa.jpg";
import girlsPrivateExp from "../assets/images/girls private experience.jpg";
import chefShea from "../assets/images/chef shea.jpg";
import kuriya from "../assets/images/kuriya.jpg";
import poolsideYoga from "../assets/images/poolside yoga.jpg";
import sunsetYoga from "../assets/images/west terrace sunset yoga.jpg";
import steamImg from "../assets/images/steam.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------------- SERVICES ---------------- */

const services = [
  {
    id: 1,
    name: "Korea Korea Spa Experience",
    description: [
      "Our signature African wellness ritual.",
      "Full-body African scrub using natural ingredients.",
      "Warm shea butter massage.",
    ],
    features: ["African Body Scrub", "Warm Shea Butter Massage", "Herbal Relaxation Ritual"],
    image: kuriya,
  },
  {
    id: 2,
    name: "Make Your Own Shea Butter",
    description: [
      "Guests create their own shea butter blend.",
      "Using fresh village shea butter.",
      "Take your custom butter home.",
    ],
    features: [],
    image: chefShea,
  },
  {
    id: 3,
    name: "Shea Butter Museum Experience",
    description: [
      "Guided tour through the Hamamat Shea Museum.",
      "Learn African beauty traditions.",
    ],
    features: [],
    image: sheaButterMuseum,
  },
  {
    id: 4,
    name: "Private Group Experience",
    description: ["Perfect for groups visiting Ghana."],
    features: ["Museum Tour", "Shea Butter Workshop", "Wellness Treatments", "African Dinner"],
    image: girlsPrivateExp,
  },
  {
    id: 5,
    name: "Facial Treatment",
    description: ["Gentle cleanse and exfoliation.", "Restorative shea butter facial massage."],
    features: ["Natural Facial Cleanse", "African Facial Exfoliation"],
    image: facialsImg,
  },
  {
    id: 6,
    name: "Herbal Steam Therapy",
    description: ["Calming herbal steam bath.", "Promotes purification and relaxation."],
    features: ["Traditional Herbal Steam", "African Botanicals"],
    image: steamImg,
  },
  {
    id: 7,
    name: "Foot Ritual With Shea Butter",
    description: ["Warm herbal foot soak and massage."],
    features: ["Foot Soak", "Shea Butter Massage"],
    image: footSpa,
  },
  {
    id: 8,
    name: "Morning Yoga By The Pool",
    description: ["Gentle yoga session beside the pool."],
    features: ["Guided Yoga", "Breathwork"],
    image: poolsideYoga,
  },
  {
    id: 9,
    name: "Sunset Yoga On The Terrace",
    description: ["Relaxing sunset yoga session."],
    features: ["Guided Yoga", "Breathwork"],
    image: sunsetYoga,
  },
];

const SLIDE_WIDTH = 240;
const SLIDE_GAP = 20;

/* ---------------- TIME HELPERS ---------------- */

// Converts "9:00 AM", "9:00 AM (GMT)", or "09:00" → "09:00" (24h, zero-padded)
// Correctly handles edge cases: 12:xx AM → 00:xx, 12:xx PM → 12:xx
const convertTo24Hour = (slot) => {
  // Strip any "(GMT)" label
  const cleaned = slot.replace(/\(GMT\)/i, "").trim();

  // Already 24h — no AM/PM present
  if (!cleaned.toLowerCase().includes("am") && !cleaned.toLowerCase().includes("pm")) {
    return cleaned.trim();
  }

  const parts = cleaned.trim().split(" ");
  const timePart = parts[0];
  const modifier = parts[1];
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier?.toUpperCase() === "AM") {
    if (hours === 12) hours = 0;   // 12:xx AM → 00:xx (midnight)
  } else if (modifier?.toUpperCase() === "PM") {
    if (hours !== 12) hours += 12; // 1–11 PM → 13–23; 12 PM stays 12
  }

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

/* ---------------- COMPONENT ---------------- */

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Booking state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Accra" })));
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCustomerDetailsStep, setIsCustomerDetailsStep] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    whatsapp: "",
    email: "",
  });
  const [selectedSlot, setSelectedSlot] = useState(null);

  const trackRef = useRef(null);

  /* Detect mobile */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* Desktop slider controls */
  const maxIndex = services.length - 3;
  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  const offset = -currentIndex * (SLIDE_WIDTH + SLIDE_GAP);

  /* Mobile: first 2 initially, all after View More */
  const [showAllServices, setShowAllServices] = useState(
    () => window.location.hash === '#services'
  );
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === "#services") setShowAllServices(true);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const visibleServices = showAllServices ? services : services.slice(0, 2);

  /* Booking handlers */
  const handleBookNow = (service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
    setIsCustomerDetailsStep(false);
    setAvailableSlots([]);
    setSelectedSlot(null);
    setCustomerDetails({ name: "", whatsapp: "", email: "" });
    setSelectedDate(new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Accra" })));
  };

  const handleSearchSlots = async () => {
    if (!selectedDate || !selectedService) return;
    const formattedDate = new Date(selectedDate).toLocaleDateString("en-CA", { timeZone: "Africa/Accra" });
    setLoading(true);
    try {
      const res = await fetch("https://sheaspa-backend.onrender.com/get-available-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formattedDate,
          service: selectedService.name,
        }),
      });
      const data = await res.json();
      setAvailableSlots(data.availableSlots || []);
    } catch {
      toast.error("Failed to fetch slots. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setIsCustomerDetailsStep(true);
  };

  const confirmBooking = async (slot) => {
    if (!customerDetails.name || !customerDetails.whatsapp) {
      toast.error("Name and WhatsApp are required");
      return;
    }

    const startTime = convertTo24Hour(slot);        // e.g. "09:00"
    const endHour = parseInt(startTime.split(":")[0]) + 1;
    const endTime = `${endHour.toString().padStart(2, "0")}:00`; // e.g. "10:00"
    const formattedDate = new Date(selectedDate).toLocaleDateString("en-CA", { timeZone: "Africa/Accra" });

    console.log(`[confirmBooking] slot="${slot}" → startTime="${startTime}" endTime="${endTime}" date="${formattedDate}"`);

    try {
      const response = await fetch("https://sheaspa-backend.onrender.com/create-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerDetails.name,
          service: selectedService.name,
          whatsapp: customerDetails.whatsapp,
          email: customerDetails.email || "",
          date: formattedDate,
          startTime,  // clean 24h "09:00"
          endTime,    // clean 24h "10:00"
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(
          "Thanks for booking! Please check your email for confirmation.",
          {
            style: {
              fontSize: "16px",
              padding: "14px",
              maxWidth: "90vw"
            }
          }
        );
        setIsBookingModalOpen(false);
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch {
      toast.error("Error creating booking. Please try again.");
    }
  };

  /* Reusable card */
  const ServiceCard = ({ service, isMobile }) => (
    <div className="grid-1-column gap-row-medium">
      <div className={`picture-mask _11 ${isMobile ? "mobile-class" : ""}`}>
        <img
          src={service.image}
          alt={service.name}
          className="image fit-cover _w-h-100"
          draggable="false"
        />
      </div>
      <div className="service-content service-card">
        <div className="flex-horizontal space-between align-center">
          <h3 className="heading display-4 service-title">{service.name}</h3>
          <div className="service-price mg-top-small mg-bottom-small">$325.99</div>
        </div>
        <div className="service-text">
          {service.description.map((d, i) => (
            <p className="mg-top-extra-small" key={i}>{d}</p>
          ))}
          <p className="mg-top-extra-small">📍 102 Kofi Annan St, Airport West Residential</p>
          {service.features.length > 0 && (
            <>
              <p className="mg-top-extra-small">Includes:</p>
              <ul className="service-features mg-top-small mg-bottom-small">
                {service.features.map((f, i) => (
                  <li className="mg-top-extra-small" key={i}>{f}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="buttons-row">
          <button className="primary-button" onClick={() => handleBookNow(service)}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="services" className="section top-bottom-90px overflow-hidden">
      <div className="mg-left-medium mg-right-medium">
        <div className="mg-bottom-80px">
          <div className="flex-horizontal space-between gap-default-wrap">
            <div className="overflow-hidden">
              <h2 className="display-8">OUR TOP SERVICES</h2>
            </div>
          </div>
        </div>

        {/* ── DESKTOP: Arrow Slider ── */}
        {!isMobile && (
          <div className="slider-wrapper" style={{ position: "relative" }}>
            <div className="slider-mask" style={{ overflow: "hidden", cursor: "grab" }}>
              <div
                ref={trackRef}
                className="slider-track"
                style={{
                  display: "flex",
                  gap: `${SLIDE_GAP}px`,
                  transform: `translateX(${offset}px)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="slide-item mg-right-extra-large"
                    style={{ width: 240, display: "flex", alignItems: "baseline" }}
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
                          <h3 className="heading display-4 service-title">{service.name}</h3>
                          <div className="service-price mg-top-small mg-bottom-small">$325.99</div>
                        </div>
                        <div className="service-text">
                          {service.description.map((desc, index) => (
                            <p className="mg-top-extra-small" key={index}>{desc}</p>
                          ))}
                          <p className="mg-top-extra-small">
                            📍 102 Kofi Annan St, Airport West Residential
                          </p>
                          {service.features.length > 0 && (
                            <>
                              <p className="mg-top-extra-small">Includes:</p>
                              <ul className="service-features mg-top-small mg-bottom-small">
                                {service.features.map((feature, index) => (
                                  <li className="mg-top-extra-small" key={index}>{feature}</li>
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
              disabled={currentIndex >= maxIndex}
              style={{ opacity: currentIndex >= maxIndex ? 0.3 : 1 }}
              aria-label="Next"
            >
              →
            </button>
          </div>
        )}

        {/* ── MOBILE: 1 per row, first 2 only, then View More ── */}
        {isMobile && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              {visibleServices.map((service) => (
                <div key={service.id} className="mg-bottom-74px">
                  <ServiceCard service={service} isMobile={isMobile} />
                </div>
              ))}
            </div>
            {!showAllServices && (
              <div className="buttons-row" style={{ justifyContent: "center", marginTop: "0px" }}>
                <button className="secondary-button" onClick={() => setShowAllServices(true)}>
                  View More Services
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── BOOKING MODAL ── */}
      {isBookingModalOpen && (
        <div
          className="modal-overlay open"
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
                    minDate={new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Accra" }))}
                    className="form-input"
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
                    <div className="slots-container" style={{ justifyContent: "center" }}>
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
                  setIsCustomerDetailsStep(false);
                  setSelectedSlot(null);
                  setSelectedDate(new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Accra" })));
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
                      setCustomerDetails({ ...customerDetails, name: e.target.value })
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
                      setCustomerDetails({ ...customerDetails, whatsapp: e.target.value })
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
                      setCustomerDetails({ ...customerDetails, email: e.target.value })
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