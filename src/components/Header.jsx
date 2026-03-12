import React, { useState, useEffect } from "react";
import logoWhite from "../assets/images/logo-white.svg";
import logo from "../assets/images/logo.svg";
import hamamatLogo from "../assets/images/sheabutterlogo.png"

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
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    color: "#ffffff",
                    marginTop: "0.9rem",

                    animation: "pulse 1.2s ease infinite",
                  }}
                >
                  <img style={{ width: 250 }} src={hamamatLogo} />
                </div>
              </div>

              {/* Right Buttons */}
              <div className="nav-menu-right-side">
                <ul className="list-nav-menu">
                  <li className="link-nav-item">
                    <a href="#home" className="link light">
                      <div>Home</div>
                    </a>
                  </li>
                  <li className="link-nav-item">
                    <a href="#services" className="link light">
                      <div>Services</div>
                    </a>
                  </li>
                </ul>
                <button
                  className="hamburger-menu"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <div className="hamburger-menu-line top"></div>
                  <div className="hamburger-menu-line middle"></div>
                  <div className="hamburger-menu-line bottom"></div>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Nav */}
      <div
        className={`mobile-nav ${mobileOpen ? "open" : ""}`}
        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
      >
        <div className="mobile-nav-header">
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
            ["#services", "Services"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#1a1a1a",
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
