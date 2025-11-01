import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Table, Button } from "react-bootstrap";
import { fetchCart,  removeFromCart, clearCart,incrementQuantity,decrementQuantity} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (id) => dispatch(incrementQuantity(id));
  const handleDecrease = (id) => dispatch(decrementQuantity(id));
  const handleRemove = (id) => dispatch(removeFromCart(id));
  const handleClear = () => dispatch(clearCart());

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0)
    return (
      <Container className="mt-5">
        <h3>Shopping Cart</h3>
        <p>Your cart is empty.</p>
      </Container>
    );

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Shopping Cart</h3>
        <Button variant="outline-danger" onClick={handleClear}>Clear Cart</Button>
      </div>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>
                <div className="d-flex align-items-center">
                  <img src={item.image} alt={item.title} width="50" className="me-2" />
                  {item.title}
                </div>
              </td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price * item.quantity}</td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-2"
                  onClick={() => handleIncrease(item.pid)}>+</Button>
                <Button size="sm" variant="outline-danger"
                  onClick={() => handleDecrease(item.pid)}>-</Button>
                  <Button size="sm" variant="outline-danger"
                  onClick={() => handleRemove(item.id)}>remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4 className="text-end mt-3">Total: ₹{total}</h4>
      <div className="text-end">
        <Button variant="success" onClick={() => navigate("/checkout")}>proceed to checkout</Button>
       

      </div>
    </Container>
  );
}

export default CartPage;
