import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Modal, Form, Input, Select, message, Table, DatePicker, Button } from "antd";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import Spinner from "../components/Spinner";
import Analytics from "../components/Analytics";
import "../styles/HomePage.css";

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
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("/api/v1/transactions/get-transaction", {
        userid: user._id,
        frequency,
        selectedDate: selectedDate.length
          ? selectedDate.map((date) => moment(date).format("YYYY-MM-DD"))
          : [],
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

      // Directly update the state instead of re-fetching
      setAllTransaction((prev) => prev.filter((transaction) => transaction._id !== record._id));
    } catch (error) {
      message.error("Unable to delete transaction");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      let updatedTransactions;

      if (editable) {
        const response = await axios.post("/api/v1/transactions/edit-transaction", {
          payload: { ...values, userid: user._id, date: moment(values.date).format("YYYY-MM-DD") },
          transactionID: editable._id,
        });
        message.success("Transaction updated successfully");

        updatedTransactions = allTransaction.map((transaction) =>
          transaction._id === editable._id ? { ...transaction, ...response.data } : transaction
        );
      } else {
        const response = await axios.post("/api/v1/transactions/add-transaction", {
          ...values,
          userid: user._id,
          date: moment(values.date).format("YYYY-MM-DD"),
        });
        message.success("Transaction added successfully");

        updatedTransactions = [...allTransaction, response.data];
      }

      setAllTransaction(updatedTransactions);
      setShowModal(false);
      setEditable(null);
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
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Date" name="date">
            <DatePicker className="full-width" />
          </Form.Item>

          <Form.Item label="Reference" name="reference">
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


