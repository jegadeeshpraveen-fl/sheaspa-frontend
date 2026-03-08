import React from "react";

const CheckIcon = () => (
  <svg className="check-icon" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="#8b6f47" strokeWidth="1.5" />
    <path
      d="M6 10l3 3 5-5"
      stroke="#8b6f47"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const timings = [
  "Sunday 10:00 AM – 7:00 PM",
  "Monday 10:00 AM – 7:00 PM",
  "Tuesday 10:00 AM – 7:00 PM",
  "Wednesday 10:00 AM – 7:00 PM",
  "Thursday 10:00 AM – 7:00 PM",
  "Friday 10:00 AM – 7:00 PM",
  "Saturday 10:00 AM – 7:00 PM",
];

const VisitAndContact = () => {
  return (
    <section className="section top-bottom-90px" style={{ paddingBottom: 100 }}>
      <div className="container-default">
        {/* GRID */}
        <div className="grid-2-columns" style={{ alignItems: "start" }}>
          {/* LEFT SIDE - TIMINGS */}
          <div
            className=" h-100"
            style={{
              padding: "25px",
              background: "#ecd8c480",
              border: "none",
              // borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              height: "",
            }}
          >
            <h2 className="display-7 mg-bottom-medium mg-top-tiny">
              Spa Timings
            </h2>

            <div
              className="grid-1-column gap-row-12px picture-description v1"
              style={{}}
            >
              {timings.map((time, i) => (
                <div
                  key={i}
                  className="flex-horizontal gap-extra-small"
                  style={{
                    display: "flex",
                    alignItems: "left",
                    gap: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <CheckIcon />
                  <div className="secondary-font">{time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - CONTACT */}
          <div
            className=""
            style={{
              padding: "25px",
              background: "#ecd8c480",
              border: "none",

              // borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              height: "100%",
            }}
          >
            <h2 className="display-7 mg-bottom-medium mg-top-tiny">
              Contact Us
            </h2>
            <div className="picture-description v1">
              <p style={{ marginBottom: "10px" }}>📞 050 722 5706</p>

              <p style={{ marginBottom: "15px" }}>✉️ Support@hamamat.com</p>
            </div>

            {/* GOOGLE MAP */}
            <div
              style={{
                overflow: "hidden",
                borderRadius: "10px",
              }}
            >
              <iframe
                title="spa-location"
                width="100%"
                height="250"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps?q=UK&output=embed"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitAndContact;
