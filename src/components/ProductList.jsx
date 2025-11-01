import { Row, Col, Container } from "react-bootstrap";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <Container className="my-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {products.map(p => (
          <Col key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
