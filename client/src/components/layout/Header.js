import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "linear-gradient(135deg, #4CAF50, #2E8B57)",
        color: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textDecoration: "none",
          color: "white",
        }}
      >
        Expense Management
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {loginUser && (
          <p style={{ fontSize: "18px", margin: "0", fontWeight: "500" }}>
            {loginUser.name}
          </p>
        )}
        <button
          onClick={logoutHandler}
          style={{
            background: "#ff4d4d",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#cc0000")}
          onMouseOut={(e) => (e.target.style.background = "#ff4d4d")}
        >
          Logout
        </button>
      </div>
    </nav>
    
  );
};

export default Header;
