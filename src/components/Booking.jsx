import React, { useState, useEffect, useRef } from 'react';
import silverImg from '../assets/images/silver.jpg';
import goldImg from '../assets/images/gold.jpg';
import diamondImg from '../assets/images/diamond.jpg';
import checkIcon from '../assets/images/check-icon.svg';

const CheckIcon = () => (
  <svg className="check-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" stroke="#8b6f47" strokeWidth="1.5"/>
    <path d="M6 10l3 3 5-5" stroke="#8b6f47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const packages = [
  {
    id: 'Silver',
    price: '$125.99',
    image: silverImg,
    description: 'The perfect introduction to our spa experience. Enjoy classic treatments designed to melt away daily stress and refresh your senses.',
    features: ['Relaxation and stress relief', 'Improved circulation', 'Detoxification'],
  },
  {
    id: 'Diamond',
    price: '$325.99',
    image: diamondImg,
    description: 'Our most prestigious offering, delivering the pinnacle of luxury. Access exclusive facilities and receive the most advanced treatments.',
    features: ['Comprehensive wellness', 'Luxury and exclusivity', 'Access to exclusive amenities'],
  },
  {
    id: 'Gold',
    price: '$225.99',
    image: goldImg,
    description: 'An elevated experience combining therapeutic expertise with premium ingredients for deeply nourishing results.',
    features: ['Enhanced skin care', 'Muscle pain relief', 'Personalized treatments'],
  },
];

const Booking = () => {
  const [activeTab, setActiveTab] = useState('Diamond');
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activePackage = packages.find(p => p.id === activeTab);

  return (
    <section id="book" className="section top-bottom-90px" ref={sectionRef}>
      <div className="container-default">
        <div className="overflow-hidden text-center mg-bottom-74px">
          <h2 className={`display-9 reveal-up ${visible ? 'visible' : ''}`}>
            Book an appointment
          </h2>
        </div>

        <div className="inner-container _1070px center">
          {/* Tabs Menu */}
          <div
            className={`tabs-menu-v1 reveal-fade ${visible ? 'visible' : ''}`}
          >
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                className={`tab-link v2 ${activeTab === pkg.id ? 'active' : ''}`}
                onClick={() => setActiveTab(pkg.id)}
                style={{ background: 'none', border: 'none' }}
              >
                <div>{pkg.id}</div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            className={`reveal-fade ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="mg-top-long">
              <div className="grid-2-columns featured-grid-v1">
                {/* Image */}
                <div className="picture-mask _12">
                  <img
                    key={activeTab}
                    src={activePackage.image}
                    alt={`${activeTab} Package`}
                    className="image fit-cover _w-h-100"
                    style={{ animation: 'fadeInImg 0.4s ease' }}
                    onError={(e) => {
                      const colors = { Silver: '#c4c4c4', Gold: '#d4a853', Diamond: '#a8c0d6' };
                      e.target.parentElement.style.background = `linear-gradient(135deg, ${colors[activeTab]}, #8b6f47)`;
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Description */}
                <div>
                  <h3 className="display-7">{activePackage.id}</h3>
                  <p className="mg-top-extra-small mg-bottom-small">{activePackage.description}</p>

                  <div className="grid-1-column gap-row-12px mg-bottom-small">
                    {activePackage.features.map((feature, i) => (
                      <div key={i} className="flex-horizontal justify-start gap-extra-small">
                        <CheckIcon />
                        <div className="mid secondary-font">{feature}</div>
                      </div>
                    ))}
                  </div>

                  <div className="display-7 text-titles mg-bottom-default">{activePackage.price}</div>

                  <div className="buttons-row left">
                    <a href="#contact" className="primary-button">Reserve</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInImg {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Booking;
