import React, { useState, useRef, useEffect } from 'react';
import facialsImg from '../assets/images/facial.jpg';
import footSpa from '../assets/images/foot spa.jpg';
import girlsPrivateExp from '../assets/images/girls private experience.jpg';
import chefShea from '../assets/images/chef shea.jpg';
import hamamat from '../assets/images/Hamamat.jpg';
import kuriya from '../assets/images/kuriya.jpg';
import hamamatyellow from '../assets/images/hamamatyellow.jpg';
import sheacombo from '../assets/images/shea combo.jpg';

const services =

  [
    {
      "id": 1,
      "name": "Shea Butter Museum Experience",
      "duration": "45–60 minutes",
      "idealFor": "Cultural explorers and skincare enthusiasts",
      "overview": "Discover the rich cultural heritage behind shea butter. This guided experience takes you through the traditional process of harvesting, preparing, and transforming shea nuts into the luxurious butter used in skincare today.",
      "features": [
        "History of shea butter in African culture",
        "Live demonstration of traditional processing techniques",
        "Interactive learning with local artisans",
        "Opportunity to purchase authentic handmade products"
      ],
      "image": facialsImg,
    },
    {
      "id": 2,
      "name": "Signature Shea Butter Massage",
      "duration": "60–90 minutes",
      "recommendedFor": "Stress relief and full body relaxation",
      "overview": "Indulge in a deeply relaxing massage using warm, organic shea butter. This treatment hydrates the skin while relieving muscle tension and improving circulation.",
      "features": [
        "Deep muscle relaxation",
        "Skin nourishment and hydration",
        "Stress relief",
        "Improved blood circulation"
      ],
      image: footSpa,
    },
    {
      "id": 3,
      "name": "Wellness Pool Experience",
      "duration": "Flexible access",
      "overview": "Relax beside our tranquil spa pool surrounded by lush tropical scenery. Guests can enjoy refreshing dips while experiencing peaceful nature-inspired surroundings.",
      "features": [
        "Calm and serene environment",
        "Perfect for relaxation after treatments",
        "Poolside refreshments available",
        "Private lounge seating"
      ],
      image: girlsPrivateExp,
    },
    {
      "id": 4,
      "name": "African Gourmet Tasting",
      "overview": "Experience the vibrant flavors of African cuisine with a curated tasting platter made from fresh, local ingredients.",
      "features": [
        "Fresh tropical fruits",
        "Traditional African delicacies",
        "Herbal wellness drinks",
        "Light healthy snacks"
      ],
      "idealFor": "A refreshing break between spa experiences",
      image: chefShea,
    },
    {
      "id": 5,
      "name": "Traditional Shea Butter Workshop",
      "duration": "60 minutes",
      "overview": "Learn how authentic shea butter is handcrafted. This interactive workshop allows guests to participate in the traditional grinding and mixing process.",
      "features": [
        "Grind shea nuts using traditional tools",
        "Mix and prepare raw shea butter",
        "Learn skincare benefits of natural ingredients",
        "Take home your handmade product"
      ],
      image: hamamat,
    },
    {
      "id": 6,
      "name": "Natural Facial Treatment",
      "duration": "45–60 minutes",
      "overview": "Rejuvenate your skin with a luxurious facial using organic ingredients derived from shea butter and African botanicals.",
      "features": [
        "Deep cleansing",
        "Natural exfoliation",
        "Hydrating mask",
        "Relaxing facial massage",
        "Brighter skin tone",
        "Deep hydration",
        "Reduced signs of fatigue"
      ],
      image: kuriya,
    },
    {
      "id": 7,
      "name": "Herbal Steam Therapy",
      "duration": "20–30 minutes",
      "overview": "Experience detoxification and relaxation through our herbal steam therapy. Infused with natural herbs, this treatment helps cleanse the skin and open pores.",
      "features": [
        "Detoxifies the body",
        "Improves skin health",
        "Promotes relaxation",
        "Boosts circulation"
      ],
      image: hamamatyellow,

    },
    {
      "id": 8,
      "name": "Full Spa Experience Package",
      "duration": "Half-day experience",
      "overview": "The ultimate wellness journey combining our most popular treatments in one complete spa day.",
      "features": [
        "Shea Butter Massage",
        "Natural Facial Treatment",
        "Pool Relaxation",
        "African Gourmet Tasting"
      ],
      image: sheacombo,
    }
  ]

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const slideWidth = 330 + 32; // width + gap

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const prev = () => setCurrentIndex(i => Math.max(0, i - 1));
  const next = () => setCurrentIndex(i => Math.min(services.length - 3, i + 1));

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

  const offset = -currentIndex * slideWidth + translateX;

  return (
    <section id="services" className="section top-bottom-90px overflow-hidden" ref={sectionRef}>
      {/* <div className="container-default"> */}
      <div className="mg-left-medium mg-right-medium">

        {/* Header */}
        <div className="mg-bottom-80px">
          <div className="flex-horizontal space-between gap-default-wrap">
            <div className="overflow-hidden">
              <h2
                ref={titleRef}
                className={`display-8 reveal-up ${visible ? 'visible' : ''}`}
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
          className={`slider-wrapper reveal-fade ${visible ? 'visible' : ''}`}
          style={{ position: 'relative' }}
        >
          <div
            className="slider-mask"
            style={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab' }}
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
                transition: isDragging ? 'none' : 'transform 0.5s ease'
              }}
            >
              {services.map((service) => (
                <div key={service.id} className="slide-item mg-right-extra-large" style={{ width: 240 }}>

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
                        <div className="service-price mg-top-small mg-bottom-small">$325.99</div>
                      </div>

                      <div className="service-text">

                        <p className="mg-top-extra-small">
                          {service.overview}
                        </p>
                         <p className="mg-top-extra-small">
                        Includes:
                        </p>

                        <ul className="service-features mg-top-small mg-bottom-small">
                          {service.features.map((feature, index) => (
                            <li className="mg-top-extra-small" key={index}>
                              {feature}
                            </li>
                          ))}
                        </ul>

                      </div>

                      <div className="buttons-row">
                        <button className="primary-button">
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
    </section>
  );
};

export default ServicesSlider;
