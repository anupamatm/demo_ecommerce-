import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
 

  

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-muted flex-grow-1">
          {product.description.slice(0, 50)}...
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <strong>₹{product.price}</strong>
          <div>
            <Button as={Link} to={`/product/${product.id}`} variant="outline-primary" size="sm" className="me-2">
              View
            </Button>
           
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
