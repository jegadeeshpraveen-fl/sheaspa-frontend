import React, { useEffect, useRef, useState } from "react";
import aboutImg from "../assets/images/about.jpeg";

const About = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section id="about" className="overflow-hidden" ref={sectionRef}>
      <div className="container-default">
        <div className="inner-section about-massage-inner-section-v1">
          <div className="grid-2-columns">
            {/* Text */}
            <div className="about-massage-description">
              <div className="overflow-hidden mg-bottom-default">
                <h2
                  className={`display-8 reveal-up ${visible ? "visible" : ""}`}
                >
                  ABOUT US
                </h2>
              </div>
              <p
                className={`mg-bottom-small reveal-fade ${visible ? "visible" : ""}`}
                style={{ transitionDelay: "0.2s" }}
              >
                Our philosophy is rooted in the ancient tradition of healing
                touch. Each massage is thoughtfully designed to address your
                unique needs — whether you seek relief from chronic tension,
                recovery from injury, or simply a moment of profound rest.
              </p>
              <p
                className={`mg-bottom-small reveal-fade ${visible ? "visible" : ""}`}
                style={{ transitionDelay: "0.2s" }}
              >
                Our therapists combine time-honored techniques with modern
                understanding of the body's systems, creating treatments that
                work in harmony with your natural rhythms. Every session is a
                personalized journey toward greater well-being.
              </p>
            </div>

            {/* Image */}
            <div
              className={`image-wrapper reveal-fade ${visible ? "visible" : ""}`}
              style={{ transitionDelay: "0.3s", minHeight: "300px" }}
            >
              <img
                src={aboutImg}
                alt="About Massage - Sheabutter Museum Wellness Spa"
                sizes="(max-width: 991px) 100vw, 55vw"
                className="image fit-cover _w-h-100"
                style={{ height: "100%", minHeight: "300px" }}
                onError={(e) => {
                  e.target.parentElement.style.background =
                    "linear-gradient(135deg, #d4c4b0 0%, #c4a882 100%)";
                  e.target.style.display = "none";
                }}
              />
              <div className="image-overlay bg-secondary-color-200"></div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="about-massage-bg"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
