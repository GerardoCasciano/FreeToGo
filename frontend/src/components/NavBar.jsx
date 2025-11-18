import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import RBImage from "react-bootstrap/Image";
import "../assets/NavBar.css";

import { useEffect } from "react";
import { isAuthenticated, logout } from "../api/authService";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const isAuth = isAuthenticated();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    // This useEffect can be used for fetching categories or other side effects
    // For now, it's empty as the JSX was moved out.
  }, []); // Empty dependency array means it runs once on mount

  return (
    <Navbar
      expand="lg"
      className=" navbar-cartoon-font navbar-glass sticky-top"
      variant="dark"
      style={{ zIndex: 1050 }}
    >
      <Container fluid>
        <Navbar.Brand className="p-0" href="/">
          <RBImage
            src="/1000119769.png"
            alt="freeToGo Logo"
            height="45"
            className="d-inline-block align-top rounded-circle p-0"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 " navbarScroll>
            <Nav.Link className="btn-glass2  m-1" href="/">
              Home
            </Nav.Link>
            {isAuth && (
              <Nav.Link className="btn-glass2 m-1" href="/events/add">
                Aggiungi Evento
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center">
            {isAuth ? (
              <>
                <RBImage
                  src="bg-cartoon.jpg"
                  height="40"
                  width="40"
                  roundedCircle
                  className="me-3"
                />
                <Button
                  className="me-3 rounded-pill btn-glass"
                  onClick={handleLogout}
                  variant="danger"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="success"
                  className="me-3 rounded-pill btn-glass"
                  href="/login"
                >
                  Login
                </Button>

                <Button className="rounded-pill btn-glass" href="/register">
                  Registrati
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
