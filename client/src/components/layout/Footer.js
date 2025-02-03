import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        background: "#2E2E2E",
        color: "white",
        padding: "20px 0",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
        fontSize: "16px",
        position: "fixed",
        bottom: "0",
        width: "100%",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p style={{ margin: "0", fontWeight: "500" }}>
        All rights reserved &copy; 2024 AR_92
      </p>
    </footer>
  );
};


export default Footer;
