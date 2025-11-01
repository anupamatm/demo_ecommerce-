import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { useSelector } from 'react-redux';
import { AuthContext } from "../context/AuthContext";

function NavbarComponent() {
  const { user, logout } = useContext(AuthContext);
  const { totalQuantity } = useSelector((state) => state.cart); 

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      className="shadow-lg sticky-top"
      style={{ 
        background: 'linear-gradient(to right, #1a1a1a, #2d2d2d)'
      }}
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="fw-bold"
          style={{ 
            fontSize: '1.5rem',
            color: '#fff',
            letterSpacing: '1px'
          }}
        >
          Shop<span style={{ color: '#17a2b8' }}>Now</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className="mx-2 nav-link-custom"
              style={{
                color: '#fff',
                transition: 'color 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={e => e.target.style.color = '#17a2b8'}
              onMouseLeave={e => e.target.style.color = '#fff'}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/products"
              className="mx-2 nav-link-custom"
              style={{
                color: '#fff',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={e => e.target.style.color = '#17a2b8'}
              onMouseLeave={e => e.target.style.color = '#fff'}
            >
              Products
            </Nav.Link>
            
          </Nav>
          <Nav className="align-items-center">
             <Nav.Link 
              as={Link} 
              to="/orders"
              className="mx-2 nav-link-custom"
              style={{
                color: '#fff',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={e => e.target.style.color = '#17a2b8'}
              onMouseLeave={e => e.target.style.color = '#fff'}
            >
              My Orders
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/cart" 
              className="position-relative me-3"
              style={{
                color: '#fff',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={e => e.target.style.color = '#17a2b8'}
              onMouseLeave={e => e.target.style.color = '#fff'}
            >
              <FaShoppingCart size={20} />
              {totalQuantity > 0 && (
                <Badge 
                  bg="info" 
                  pill 
                  className="position-absolute"
                  style={{ 
                    top: '-8px', 
                    right: '-12px', 
                    fontSize: '0.7em',
                    animation: 'bounce 0.5s ease'
                  }}
                >
                  {totalQuantity}
                </Badge>
              )}
              <span className="ms-2">Cart</span>
            </Nav.Link>
            {!user ? (
              <Button 
                as={Link} 
                to="/login" 
                variant="outline-info" 
                size="sm" 
                className="ms-2 px-3 py-2"
                style={{
                  borderRadius: '20px',
                  transition: 'all 0.3s ease'
                }}
              >
                <FaUser className="me-2" /> Login
              </Button>
            ) : (
              <div className="d-flex align-items-center">
                <span className="me-3" style={{ color: '#fff' }}>
                  👋 <span style={{ color: '#17a2b8' }}>{user.name}</span>
                </span>
                <Button 
                  onClick={logout} 
                  variant="outline-danger" 
                  size="sm"
                  className="px-3 py-2"
                  style={{
                    borderRadius: '20px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavbarComponent;
