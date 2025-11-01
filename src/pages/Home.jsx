import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductList from "../components/ProductList";

function Home() {
  return (
    <Container className="mt-4">
      <div className="text-center mb-4">
        <h2>Welcome to ShopNow</h2>
        <p>Your one-stop shop for electronics</p>
        <Button as={Link} to="/products">Shop Now</Button>
      </div>
      <ProductList products={products.slice(0, 3)} />
    </Container>
  );
}

export default Home;
