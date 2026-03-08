import React, { useEffect, useRef, useState } from 'react';
import moisturizersImg from '../assets/images/moisturizers.jpg';
import serumsImg from '../assets/images/serums.jpg';
import bathSaltsImg from '../assets/images/bath-salts.jpg';

const products = [
  { id: 1, name: 'Moisturizers', image: moisturizersImg, href: '#moisturizers' },
  { id: 2, name: 'Serums', image: serumsImg, href: '#serums' },
  { id: 3, name: 'Bath salts', image: bathSaltsImg, href: '#bath-salts' },
];

const SpaProducts = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="shop" className="section top-bottom-90px" ref={sectionRef}>
      <div className="container-default">
        <div className="mg-bottom-default mg-bottom-24px-mbp">
          <div className="flex-horizontal space-between gap-default-wrap">
            <div className="overflow-hidden">
              <h2 className={`display-9 reveal-up ${visible ? 'visible' : ''}`}>
                Spa products
              </h2>
            </div>
            <div className={`buttons-row reveal-fade ${visible ? 'visible' : ''}`}>
              <a href="#all-products" className="secondary-button">All products</a>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`reveal-fade ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <a
                href={product.href}
                className="image-wrapper"
                style={{
                  display: 'block',
                  height: '400px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  alt={product.name}
                  src={product.image}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scale(1.15)',
                    transition: 'transform 0.8s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1.15)'; }}
                  onError={(e) => {
                    const colors = ['#c4a882', '#a89070', '#8b7355'];
                    e.target.parentElement.style.background = `linear-gradient(135deg, ${colors[index]}, #4a3728)`;
                    e.target.style.display = 'none';
                  }}
                />
                <div
                  className="image-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5))',
                    transition: 'background 0.4s ease',
                  }}
                ></div>

                {/* Hover overlay */}
                <div
                  className="overlay-wrapper"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '2rem',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    background: 'rgba(0,0,0,0.3)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                    <div className="overflow-hidden">
                      <h3 className="heading-light display-6">{product.name}</h3>
                    </div>
                    <div className="secondary-button-icon white picture-button">
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpaProducts;
