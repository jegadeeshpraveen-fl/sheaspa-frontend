import React, { useEffect, useRef, useState } from 'react';
import socialMainImg from '../assets/images/social-main.jpg';
import socialImg1 from '../assets/images/social-1.jpg';
import socialImg2 from '../assets/images/social-2.jpg';

const SocialFollow = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/' },
    { name: 'Instagram', href: 'https://www.instagram.com/' },
    { name: 'YouTube', href: 'https://www.youtube.com/' },
  ];

  return (
    <section className="section top-bottom-90px" ref={sectionRef}>
      <div className="container-default">
        <div className="grid-2-columns follow-instagram-grid-v2" style={{ gap: 0, alignItems: 'stretch' }}>

          {/* Main Image */}
          <div
            className={`picture-mask _10 reveal-fade ${visible ? 'visible' : ''}`}
            style={{ minHeight: '500px' }}
          >
            <img
              src={socialMainImg}
              alt="Follow Us on Social Media"
              sizes="(max-width: 991px) 100vw, 50vw"
              className="image fit-cover _w-h-100"
              style={{ height: '100%' }}
              onError={(e) => {
                e.target.parentElement.style.background = 'linear-gradient(135deg, #d4c4b0, #8b6f47)';
                e.target.style.display = 'none';
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))',
              }}
            ></div>
          </div>

          {/* Content + Small Images */}
          <div>
            <div className="mg-bottom-100px mg-bottom-large-tablet">
              <div className="pd-large pd-default-tablet">
                <div className="overflow-hidden">
                  <h2 className={`display-9 reveal-up ${visible ? 'visible' : ''}`}>
                    Follow us on
                  </h2>
                </div>
              </div>
              <div className="flex-horizontal space-between gap-default-wrap" style={{ padding: '0 3rem' }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`link reveal-fade ${visible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${index * 0.15}s` }}
                  >
                    <div className="display-5">{social.name}</div>
                    <div className="secondary-button-icon picture-button">
                      <div className="item-icon-right">→</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Two small images */}
            <div className="grid-2-columns gap-medium" style={{ padding: '0 3rem 3rem' }}>
              {[socialImg1, socialImg2].map((img, i) => (
                <div
                  key={i}
                  className={`picture-mask _10 reveal-fade ${visible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${0.3 + i * 0.15}s` }}
                >
                  <img
                    src={img}
                    alt={`Social Gallery ${i + 1}`}
                    className="image fit-cover _w-h-100"
                    onError={(e) => {
                      const colors = ['#c4b8a8', '#b8a898'];
                      e.target.parentElement.style.background = colors[i];
                      e.target.style.display = 'none';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'transparent',
                      transition: 'background 0.4s',
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialFollow;
