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
    <div className="login-container">
      {loading && <Spinner />}
      <div className="login-card">
        <img src="https://media.licdn.com/dms/image/v2/D5612AQFQkcIrBJ2O1g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1712583799874?e=2147483647&v=beta&t=hRIew2WoXl89GN6QDa092_OmAToPnphFxAoM4SFjCb8" alt="Expense Tracker" className="login-image"/>
        <h1 className="login-title">Expense Tracker</h1>
        <p className="login-subtitle">Track & Manage Your Finances Easily</p>
        <Form layout="vertical" onFinish={submitHandler} className="login-form">
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>
          <div className="login-actions">
            <Link to="/register" className="register-link">
              New here? Sign up
            </Link>
            <button className="login-btn">Login</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
