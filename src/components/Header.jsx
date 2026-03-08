import React, { useState, useEffect } from "react";
import logoWhite from "../assets/images/logo-white.svg";
import logo from "../assets/images/logo.svg";

const Header = ({ cartCount = 0, onCartOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`header-transparent`}>
        <nav
          className={`header-wrapper ${scrolled ? "scrolled" : ""}`}
          role="banner"
        >
          <div className="container-default">
            <div className="header-container-wrapper">
              {/* Left Nav */}

              {/* Logo Center */}
              {/* <div className="logo-wrapper _130px">
                <p style={{color:"#fff",    textTransform: "uppercase",
    color:"#965a32",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "30px"}}>Sheabutter</p>
                {/* <a href="#home" className="logo-link"> */}
              {/* <img
                    src={logoWhite}
                    alt="Sheabutter Museum Wellness Spa Logo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span style="color:white;font-family:Lora,serif;font-size:1.5rem;font-weight:700;letter-spacing:0.15em">ZEN</span>';
                    }}
                  /> */}
              {/* </a> 
              </div> */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "Lora, serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    color: "#ffffff",
                    marginTop: "0.9rem",

                    animation: "pulse 1.2s ease infinite",
                  }}
                >
                  SHEABUTTER
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                    marginTop: "0.9rem",
                  }}
                >
                  SPA & WELLNESS
                </div>
              </div>

              {/* Right Buttons */}
              <div className="nav-menu-right-side hidden md:block">
                {/* <div className="buttons-row nav-menu-hidden-on-mobile">
                  <a href="#book" className="secondary-button dark-mode">
                    <div>Reserve</div>
                  </a>
                  <a href="#contact" className="primary-button">
                    <div>Get in touch</div>
                  </a>
                </div> */}
                <ul className="list-nav-menu">
                  <li className="link-nav-item">
                    <a href="#home" className="link light">
                      <div>Home</div>
                    </a>
                  </li>
                  {/* <li className="link-nav-item">
                    <a href="#about" className="link light"><div>About</div></a>
                  </li> */}
                  <li className="link-nav-item">
                    <a href="#services" className="link light">
                      <div>Services</div>
                    </a>
                  </li>
                  {/* <li className="link-nav-item">
                    <a href="#shop" className="link light"><div>Shop</div></a>
                  </li> */}
                </ul>
                {/* <button
                  className="hamburger-menu"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <div className="hamburger-menu-line top"></div>
                  <div className="hamburger-menu-line middle"></div>
                  <div className="hamburger-menu-line bottom"></div>
                </button> */}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-nav-header">
          <a href="#home" onClick={() => setMobileOpen(false)}>
            <img
              src={logo}
              alt="Sheabutter Museum Wellness Spa"
              height="32"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  '<span style="font-family:Lora,serif;font-size:1.5rem;font-weight:700;letter-spacing:0.15em">ZEN</span>';
              }}
            />
          </a>
          <button
            className="close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="mobile-nav-links">
          {[
            ["#home", "Home"],
            ["#about", "About"],
            ["#services", "Services"],
            ["#book", "Book"],
            ["#shop", "Shop"],
            ["#contact", "Contact"],
          ].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)}>
              {label}
            </a>
          ))}
          {/* <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="#book" className="secondary-button" onClick={() => setMobileOpen(false)}>Reserve</a>
            <a href="#contact" className="primary-button" onClick={() => setMobileOpen(false)}>Get in touch</a>
          </div> */}
        </nav>
      </div>
    </>
  );
};

export default Header;
