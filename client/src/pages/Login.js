import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Login.css"; // Import external CSS

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("Login successful!");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong, please try again.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-page">
      {loading && <Spinner />}
      <div className="login-container">
        <div className="login-left">
          <img
            src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Expense Tracker"
            className="login-bg-image"
          />
          <div className="login-overlay">
            <h1 className="login-title">Expense Tracker</h1>
            <p className="login-subtitle">
              Track & Manage Your Finances Easily
            </p>
          </div>
        </div>
        <div className="login-right">
          <Form layout="vertical" onFinish={submitHandler} className="login-form">
            <h2 className="form-title">Welcome Back!</h2>
            <Form.Item label="Email" name="email">
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Enter your password" />
            </Form.Item>
            <div className="login-actions">
              <button className="login-btn">Login</button>
              <Link to="/register" className="register-link">
                New here? Sign up
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
