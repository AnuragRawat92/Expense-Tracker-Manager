import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Register.css";

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-container">
      {loading && <Spinner />}
      <Card className="register-card">
       
        <Title level={2} className="register-title">Create an Account</Title>
        <p className="register-subtitle">Manage your expenses efficiently!</p>
        <Form layout="vertical" onFinish={submitHandler} className="register-form">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
            <Input size="large" placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter a valid email" }]}>
            <Input size="large" type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block className="register-btn">
              Register
            </Button>
          </Form.Item>
        </Form>
        <Text className="login-link">
          Already registered? <Link to="/login">Click here to login</Link>
        </Text>
      </Card>
    </div>
  );
};

export default Register;
