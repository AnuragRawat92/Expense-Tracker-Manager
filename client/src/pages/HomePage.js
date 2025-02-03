import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Modal, Form, Input, Select, message, Table, DatePicker, Button } from "antd";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import Spinner from "../components/Spinner";
import Analytics from "../components/Analytics";
import "../styles/HomePage.css";
import { Footer } from "antd/es/layout/layout";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, [frequency, selectedDate, type]);

  const fetchTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/api/v1/transactions/get-transaction", {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      });
      setAllTransaction(res.data);
    } catch (error) {
      message.error("Error fetching transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transactions/delete-transaction", { transactionID: record._id });
      message.success("Transaction deleted");
      fetchTransactions();
    } catch (error) {
      message.error("Unable to delete transaction");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/api/v1/transactions/edit-transaction", {
          payload: { ...values, userId: user._id },
          transactionID: editable._id,
        });
        message.success("Transaction updated successfully");
      } else {
        await axios.post("/api/v1/transactions/add-transaction", { ...values, userid: user._id });
        message.success("Transaction added successfully");
      }
      setShowModal(false);
      setEditable(null);
      fetchTransactions();
    } catch (error) {
      message.error("Failed to save transaction");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount) => <span className="amount-text">₹{amount}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => <span className={`type-badge ${type}`}>{type.toUpperCase()}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="action-icons">
          <EditOutlined className="edit-icon" onClick={() => { setEditable(record); setShowModal(true); }} />
          <DeleteOutlined className="delete-icon mx-2" onClick={() => handleDelete(record)} />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {loading && <Spinner />}

      {/* Filters Section */}
      <div className="filters">
        <div className="filter-group">
          <label className="filter-label">Time Range</label>
          <Select className="select-dropdown" value={frequency} onChange={setFrequency}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && <RangePicker className="range-picker" value={selectedDate} onChange={setSelectedDate} />}
        </div>

        <div className="filter-group">
          <label className="filter-label">Transaction Type</label>
          <Select className="select-dropdown" value={type} onChange={setType}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>

        <div className="view-toggle">
          <UnorderedListOutlined className={`icon ${viewData === "table" ? "active" : ""}`} onClick={() => setViewData("table")} />
          <AreaChartOutlined className={`icon ${viewData === "analytics" ? "active" : ""}`} onClick={() => setViewData("analytics")} />
        </div>

        <Button type="primary" icon={<PlusOutlined />} className="add-btn" onClick={() => setShowModal(true)}>New Transaction</Button>
      </div>

      {/* Main Content Section */}
      <div className="content">
        {viewData === "table" ? <Table columns={columns} dataSource={allTransaction} pagination={{ pageSize: 6 }} /> : <Analytics allTransaction={allTransaction} />}
      </div>

      {/* Add/Edit Modal */}
      <Modal title={editable ? "Edit Transaction" : "Add Transaction"} open={showModal} onCancel={() => setShowModal(false)} footer={false} className="custom-modal">
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable} className="custom-form">
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="Buisness Profit">Buisness Profit</Select.Option>
              <Select.Option value="Investments">Investments</Select.Option>
              <Select.Option value="Rentals">Rentals</Select.Option>
              <Select.Option value="Government Profits">Government Profits</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
              <Select.Option value="Movie">Movie</Select.Option>
              <Select.Option value="Medical Expenses">Medical Expenses</Select.Option>
              <Select.Option value="Daily Essential">Daily Essential</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>

          <div className="modal-footer">
            <Button type="primary" htmlType="submit">Save</Button>
          </div>
        </Form>
      </Modal>
     
    </Layout>
    
  );
};

export default HomePage;

