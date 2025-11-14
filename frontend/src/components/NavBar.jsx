import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import RBImage from "react-bootstrap/Image";
import "../assets/NavBar.css";
import categoriaService from "../api/categoriaService/";
import { useEffect, useState } from "react";
const NavBar = () => {
  const [categorie, setCategorie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const data = await categoriaService.getAllCategorie();
        setCategorie(data);
      } catch (err) {
        setError("impossibilie caricare le categorie!");
        console.error("Fetch categorie FALLITO!", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorie();
  }, []);
  return (
    <Navbar
      expand="lg"
      className=" navbar-cartoon-font navbar-glass"
      variant="dark"
      style={{ zIndex: 1050 }}
    >
      <Container fluid>
        <Navbar.Brand className="p-0" href="/">
          <RBImage
            src="/1000117943.png"
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
            <Nav.Link className="btn-glass2 m-1 " href="/eventi">
              Eventi
            </Nav.Link>
            <NavDropdown
              className="btn-glass2 m-1"
              title="Tutte le categorie"
              id="navbarScrollingDropdown"
            >
              {loading && (
                <NavDropdown.Item key="loading" disabled>
                  Caricamento...
                </NavDropdown.Item>
              )}
              {error && (
                <NavDropdown.Item key="erro" disabled>
                  {error}
                </NavDropdown.Item>
              )}
              {!loading && !error && categorie.length === 0 && (
                <NavDropdown.Item key="no-categorie" disabled>
                  Nessuna categoria trovata
                </NavDropdown.Item>
              )}
              {categorie.map((categoria) => (
                <NavDropdown.Item
                  key={categoria.id}
                  href={"/categorie/${categoria.nome}"}
                  className="btn-glass"
                >
                  {categoria.nome}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>

          <Nav className="align-items-center">
            <RBImage
              src="bg-cartoon.jpg"
              height="40"
              width="40"
              roundedCircle
              className="me-3"
            />
            <Button className="me-3 rounded-pill btn-glass" href="/login">
              Login
            </Button>
            <Button className="rounded-pill btn-glass" href="/register">
              Registrati
            </Button>
          </Nav>

          <Form className="d-flex ms-3">
            <Form.Control
              type="search"
              placeholder="Cerca eventi..."
              className="me-2 rounded-pill"
              aria-label="Cerca eventi"
            />
            <Button className="rounded-pill btn-glass">Cerca</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
