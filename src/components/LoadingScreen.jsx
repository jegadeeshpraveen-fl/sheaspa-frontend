import React, { useEffect, useState } from "react";
import hamamatLogo from "../assets/images/hamamatlog.png"

const LoadingScreen = ({ onDone }) => {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHiding(true);
      setTimeout(() => {
        onDone && onDone();
      }, 500);
    }, 1200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className={`loading-page-wrapper bar-animation ${hiding ? "done" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        background: "#f5f0eb",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "opacity 0.5s ease",
        opacity: hiding ? 0 : 1,
        pointerEvents: hiding ? "none" : "all",
      }}
    >
      {/* Logo / brand during loading */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <img style={{ width: 250 }} src={hamamatLogo} />

        {/* <div className="logo-text">SHEABUTTER</div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#8b6f47",
            marginTop: "0.5rem",
          }}
        >
          SPA & WELLNESS
        </div> */}
      </div>

      {/* Loading bar */}
      <div
        style={{
          width: "200px",
          height: "1px",
          background: "#ddd4c6",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#8b6f47",
            animation: "loadBar 1.2s ease forwards",
            transformOrigin: "left",
          }}
        ></div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes loadBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
