import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { Container, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";


function ProductPage() {
   const dispatch = useDispatch();
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
   const { user} = useContext(AuthContext);
   const navigate = useNavigate();

  const handleAddToCart = () => {
  
    
     if (!user ) {
    navigate("/login");
      }
      dispatch(addToCart({
        pid: product.id,
        title: product.name,
        price: product.price,
        image: product.image,
       
      }));
    };
  if (!product) return <Container className="mt-4">Product not found</Container>;

  return (
    <Container className="my-5">
      <Row>
        <Col md={5}>
          <Image src={product.image} fluid rounded />
        </Col>
        <Col md={7}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <h4 className="text-success">₹{product.price}</h4>
          <Button onClick={handleAddToCart} variant="primary" size="sm">
              Add to Cart
            </Button>
          <Button variant="outline-secondary" as={Link} to="/products">Back</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;
