import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../store/cartSlice";

const USERS_API = "http://localhost:3000/users";

export default function CheckoutPage() {
  const { items, totalQuantity } = useSelector((state) => state.cart);
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    house: "",
    city: "",
    pincode: "",
  });

  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🟩 Get logged-in user (from localStorage)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    if (!address.name || !address.city || !address.pincode)
      return alert("Please fill all required fields");
    setStep(2);
  };

  // 🟨 Confirm & Save Order in user's document
  const handlePayment = async () => {
    if (!user) return alert("Please log in before placing order.");

    setLoading(true);
    try {
      const orderData = {
        id: Date.now(),
        items,
        totalQuantity,
        totalPrice,
        paymentMethod: payment,
        shippingAddress: address,
        status: "confirmed",
        date: new Date().toLocaleString(),
      };

      // Fetch the user from server
      const res = await axios.get(`${USERS_API}/${user.id}`);
      const userData = res.data;

      // Append the new order
      const updatedUser = {
        ...userData,
        orders: [...(userData.orders || []), orderData],
      };

      // Update in JSON Server
      await axios.put(`${USERS_API}/${user.id}`, updatedUser);

      // Clear cart and show confirmation
      dispatch(clearCart());
      setOrderId(orderData.id);
      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Error placing order.");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Step 1 — Cart + Address
  if (step === 1)
    return (
      <div className="container mt-5">
        <h2>Checkout – Step 1: Address & Summary</h2>

        <h4>Your Cart</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h5>Total Quantity: {totalQuantity}</h5>
        <h5>Total Price: ₹{totalPrice}</h5>

        <h4 className="mt-4">Shipping Address</h4>
        <form onSubmit={handleSubmitAddress}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control mb-2"
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="form-control mb-2"
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="house"
            placeholder="House / Street"
            className="form-control mb-2"
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="form-control mb-2"
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            className="form-control mb-2"
            onChange={handleAddressChange}
            required
          />
          <button className="btn btn-primary">Continue to Payment</button>
        </form>
      </div>
    );

  // 🟢 Step 2 — Payment
  if (step === 2)
    return (
      <div className="container mt-5">
        <h2>Checkout – Step 2: Payment</h2>
        <div className="mb-3">
          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={payment === "cod"}
              onChange={(e) => setPayment(e.target.value)}
            />
            &nbsp;Cash on Delivery
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={payment === "card"}
              onChange={(e) => setPayment(e.target.value)}
            />
            &nbsp;Credit/Debit Card (Mock)
          </label>
        </div>
        <button
          className="btn btn-success"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing…" : "Pay & Confirm Order"}
        </button>
      </div>
    );

  // 🟢 Step 3 — Confirmation
  if (step === 3)
    return (
      <div className="container mt-5 text-center">
        <h2>✅ Order Confirmed!</h2>
        <p>Your order has been placed successfully.</p>
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>Total:</strong> ₹{totalPrice}
        </p>
        <p>Thank you for shopping with us!</p>
      </div>
    );
}
