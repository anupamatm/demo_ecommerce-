import { useState } from "react";
import { products } from "../data/products";
import ProductList from "../components/ProductList";
import { Container, Form } from "react-bootstrap";

function Products() {
  const [query, setQuery] = useState("");
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h3>All Products</h3>
      <Form.Control
        type="text"
        placeholder="Search products..."
        className="my-3"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ProductList products={filtered} />
    </Container>
  );
}

export default Products;
