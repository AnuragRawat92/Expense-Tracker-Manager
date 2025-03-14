import React from "react";
import { Progress, Card, Row, Col, Typography } from "antd";

const { Title } = Typography;

const Analytics = ({ allTransaction }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "tax",
    "bills",
    "fee",
    "medical",
  ];

  // Total Transactions
  const totalTransaction = allTransaction.length;
  const totalIncomeTransaction = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransaction = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercentage =
    (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpensePercentage =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  // Total Turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalTurnoverIncomePercent = (totalIncomeTurnover / totalTurnover) * 100;
  const totalTurnoverExpensePercent = (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        {/* Total Transactions Card */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Card
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            <Title level={5} style={{ color: "#333", marginBottom: "20px" }}>
              Total Transactions: {totalTransaction}
            </Title>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "20px" }}>
                <span style={{ color: "#52c41a", fontWeight: "500" }}>Income: {totalIncomeTransaction.length}</span>
                <span style={{ color: "#ff4d4f", fontWeight: "500" }}>Expense: {totalExpenseTransaction.length}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                <Progress
                  type="circle"
                  strokeColor="#52c41a"
                  percent={totalIncomePercentage.toFixed(0)}
                  style={{ margin: "0 10px" }}
                />
                <Progress
                  type="circle"
                  strokeColor="#ff4d4f"
                  percent={totalExpensePercentage.toFixed(0)}
                  style={{ margin: "0 10px" }}
                />
              </div>
            </div>
          </Card>
        </Col>

        {/* Total Turnover Card */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Card
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            <Title level={5} style={{ color: "#333", marginBottom: "20px" }}>
              Total Turnover: ₹{totalTurnover}
            </Title>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "20px" }}>
                <span style={{ color: "#52c41a", fontWeight: "500" }}>Income: ₹{totalIncomeTurnover}</span>
                <span style={{ color: "#ff4d4f", fontWeight: "500" }}>Expense: ₹{totalExpenseTurnover}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                <Progress
                  type="circle"
                  strokeColor="#52c41a"
                  percent={totalTurnoverIncomePercent.toFixed(0)}
                  style={{ margin: "0 10px" }}
                />
                <Progress
                  type="circle"
                  strokeColor="#ff4d4f"
                  percent={totalTurnoverExpensePercent.toFixed(0)}
                  style={{ margin: "0 10px" }}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Category-wise Income and Expense */}
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        {/* Category-wise Income */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            <Title level={5} style={{ color: "#333", marginBottom: "20px" }}>
              Category-wise Income
            </Title>
            <div style={{ width: "100%" }}>
              {categories.map((category) => {
                const amount = allTransaction
                  .filter(
                    (transaction) =>
                      transaction.type === "income" &&
                      transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount, 0);
                return (
                  amount > 0 && (
                    <div key={category} style={{ marginBottom: "15px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontWeight: "500", color: "#555" }}>{category}</span>
                        <span style={{ fontWeight: "500", color: "#333" }}>₹{amount}</span>
                      </div>
                      <Progress
                        percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                        strokeColor="#52c41a"
                        style={{ marginTop: "5px" }}
                      />
                    </div>
                  )
                );
              })}
            </div>
          </Card>
        </Col>

        {/* Category-wise Expense */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            <Title level={5} style={{ color: "#333", marginBottom: "20px" }}>
              Category-wise Expense
            </Title>
            <div style={{ width: "100%" }}>
              {categories.map((category) => {
                const amount = allTransaction
                  .filter(
                    (transaction) =>
                      transaction.type === "expense" &&
                      transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount, 0);
                return (
                  amount > 0 && (
                    <div key={category} style={{ marginBottom: "15px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontWeight: "500", color: "#555" }}>{category}</span>
                        <span style={{ fontWeight: "500", color: "#333" }}>₹{amount}</span>
                      </div>
                      <Progress
                        percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                        strokeColor="#ff4d4f"
                        style={{ marginTop: "5px" }}
                      />
                    </div>
                  )
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
