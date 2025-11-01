import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert } from "react-bootstrap";

const USERS_API = "http://localhost:3000/users";

export default function OrdersPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      setError("Please login to view your orders.");
      setLoading(false);
      return;
    }
    setUser(storedUser);
    fetchOrders(storedUser.id);
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const res = await axios.get(`${USERS_API}/${userId}`);
      const userData = res.data;
      setOrders(userData.orders || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  if (orders.length === 0)
    return (
      <Container className="mt-5 text-center">
        <h4>No Orders Found</h4>
        <p>You haven’t placed any orders yet.</p>
      </Container>
    );

  return (
    <Container className="mt-5">
      <h2 className="mb-4">🛍️ My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="mb-4 p-3 border rounded shadow-sm">
          <h5>Order ID: {order.id}</h5>
          <p className="mb-1">
            <strong>Date:</strong> {order.date}
          </p>
          <p className="mb-1">
            <strong>Payment:</strong> {order.paymentMethod.toUpperCase()}
          </p>
          <p className="mb-1">
            <strong>Status:</strong>{" "}
            <span className="text-success">{order.status}</span>
          </p>

          <Table bordered hover responsive size="sm" className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end">
            <h5>Total: ₹{order.totalPrice}</h5>
          </div>
        </div>
      ))}
    </Container>
  );
}
