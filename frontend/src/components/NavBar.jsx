import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import RBImage from "react-bootstrap/Image";
import "../assets/NavBar.css";

import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
            {isAuthenticated && (
              <>
                <Nav.Link className="btn-glass2 m-1" href="/eventi/add">
                  Aggiungi Evento
                </Nav.Link>
                <Nav.Link className="btn-glass2 m-1" href="/my-eventi">
                  i miei eventi
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="align-items-center">
            {isAuthenticated ? (
              <>
                <RBImage
                  src={
                    user && user.avatarUrl
                      ? user.avatarUrl
                      : "/path/to/default-avatar.png"
                  }
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
                  className="me-3 rounded-pill btn-glass"
                  href="/login"
                  variant="success"
                >
                  Login
                </Button>

                <Button
                  className="rounded-pill btn-glass"
                  href="/register"
                  variant="success"
                >
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
