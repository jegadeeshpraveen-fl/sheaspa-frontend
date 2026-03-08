import React, { useState } from 'react';
import logo from '../assets/images/logo.svg';
import instaGallery1 from '../assets/images/instagram-1.jpg';
import instaGallery2 from '../assets/images/instagram-2.jpg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const pages = [
    ['#home', 'Home'], ['#about', 'About'], ['#services', 'Services'],
    ['#shop', 'Shop'], ['#blog', 'Blog'], ['#contact', 'Contact'],
    ['#book', 'Book Silver'], ['#book', 'Book Gold'], ['#book', 'Book Diamond'],
    ['#team', 'Team'],
  ];

  const utilityPages = [
    ['#start', 'Start here'], ['#style-guide', 'Style guide'],
    ['#404', '404 not found'], ['#subscribe', 'Subscribe'],
    ['#coming-soon', 'Coming soon'],
  ];

  const socials = [
    { name: 'Facebook', href: 'https://www.facebook.com/', icon: 'f' },
    { name: 'Instagram', href: 'https://www.instagram.com/', icon: '◻' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'in' },
    { name: 'YouTube', href: 'https://www.youtube.com/', icon: '▷' },
  ];

  return (
    <footer className="footer-wrapper">
      {/* Footer Top - CTA */}
      {/* <div className="footer-top-v1"> */}
              <div className="">

        <div className="container-default">
          <div className="footer-top-content" style={{display:"none"}}>
            {/* Instagram Gallery */}
            <div className="inner-container _478px _100-tablet" >
              <div className="_2-col-mbl">
                {[instaGallery1, instaGallery2].map((img, i) => (
                  <a key={i} href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <figure className="image-wrapper" style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={img}
                        alt={`Instagram gallery ${i + 1}`}
                        sizes="(max-width: 991px) 50vw, 239px"
                        className="image"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseEnter={(e) => { e.target.style.transform = 'scale(1.08)'; }}
                        onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                        onError={(e) => {
                          e.target.parentElement.style.background = `linear-gradient(135deg, #d4c4b0, #8b6f47)`;
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="image-overlay"></div>
                      <div
                        className="overlay-wrapper"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          background: 'rgba(0,0,0,0.5)',
                          transition: 'opacity 0.3s',
                          fontSize: '2rem',
                          color: 'white',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
                      >
                        ◻
                      </div>
                    </figure>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Text */}
            <div className="inner-container _700px _100-tablet">
              <div className="overflow-hidden mg-bottom-medium">
                <h2 className="display-9">Serenity achieved through expert massage therapy</h2>
              </div>
              <div className="buttons-row left">
                <a href="#contact" className="primary-button">Reserve</a>
                <a href="#services" className="secondary-button">All services</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="divider"></div> */}

      {/* Footer Main */}
      <div className="container-default" >
        <div className="grid-2-columns footer-grid-v1" style={{display:"none"}}>

          {/* Left Side - Newsletter */}
          <div className="footer-middle-wrapper" style={{display:"none"}}>
            <div className="footer-middle-v1">
              <div className="overflow-hidden mg-bottom-12px">
                <div className="display-7 text-titles">Subscribe to our newsletter!</div>
              </div>
              <div className="inner-container _476px _100-tablet">
                <p className="mg-bottom-small">
                  Stay updated with our latest treatments, wellness tips, and exclusive offers delivered directly to your inbox.
                </p>
              </div>

              <div className="inner-container _376px">
                {subscribed ? (
                  <div className="card message inside-input medium" style={{ padding: '1rem', background: '#f5f0eb', marginBottom: '1rem' }}>
                    <div className="text-titles">
                      <div className="display-1 mid">✓ Thanks for joining our newsletter.</div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="width-100 mg-bottom-default">
                    <div className="input-wrapper">
                      <input
                        className="input light-mode-v1"
                        maxLength="256"
                        name="Email"
                        placeholder="Enter your email address"
                        type="email"
                        id="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button type="submit" className="primary-button small inside-input">Subscribe</button>
                    </div>
                  </form>
                )}
              </div>

              {/* Social Links */}
              <div>
                <div className="social-media-flex left">
                  {socials.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="social-media-link" aria-label={s.name}>
                      <span style={{ fontFamily: 'sans-serif', fontSize: '0.875rem', fontWeight: 900 }}>{s.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="footer-bottom-v1" style={{ paddingTop: '2rem' }}>
              <div style={{ zIndex: 1 }}>
                <a href="#home" className="logo-link footer">
                  <img
                    src={logo}
                    alt="Sheabutter Museum Wellness SpaSpa Logo"
                    style={{ height: '2rem' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span style="font-family:Lora,serif;font-size:1.5rem;font-weight:700;letter-spacing:0.15em;color:#1a1a1a">ZEN</span>';
                    }}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Links */}
          <div className="footer-aside" style={{ paddingTop: '3rem' ,display:"none"}}>
            <div className="grid-2-columns footer-grid-v2">
              {/* Pages */}
              <div>
                <div className="overflow-hidden mg-bottom-medium">
                  <div className="display-3 text-titles">Pages</div>
                </div>
                <div className="grid-3-columns footer-grid-v1" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  {[pages.slice(0,4), pages.slice(4,8), pages.slice(8)].map((col, ci) => (
                    <ul key={ci} className="list-wrapper">
                      {col.map(([href, label]) => (
                        <li key={label} className="list-item secondary-font">
                          <a href={href} className="link neutral">{label}</a>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>

              {/* Utility Pages */}
              <div>
                <div className="overflow-hidden mg-bottom-medium">
                  <div className="display-3 text-titles">Utility pages</div>
                </div>
                <ul className="list-wrapper">
                  {utilityPages.map(([href, label]) => (
                    <li key={label} className="list-item secondary-font">
                      <a href={href} className="link neutral">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
         {/* Copyright */}
            <div className="footer-bottom-v2">
       {/* <div className="footer-bottom-v2"> */}

              <p>
                Copyright © Sheabutter Museum Wellness SpaSpa {new Date().getFullYear()} — Crafted with care for your well-being
              </p>
            </div>
      </div>
    </footer>
  );
};

export default Footer;
