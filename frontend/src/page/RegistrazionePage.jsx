import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../api/authService";
import {
  Alert,
  Button,
  Col,
  Form,
  Row,
  Spinner,
  Container,
} from "react-bootstrap";

const ResgistrazionePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await authService.register(userData);
      setSuccess(
        "Registrazione avvenuta con successo!Sarai reindirizzato al login"
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        "Errore durante la registrazione .L'utente potrebbe essere già reesgistrato"
      );
      console.log("Errore di registrazione: ", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className=" d-flex flex-column justify-content-center flex-grow-1 mt-5  btn-glass">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-cemter mb-4">Registra un nuovo account</h2>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="success">{success}</Alert>}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Inserisci il tuo nome"
                value={userData.name}
                onChange={handleChange}
                required
              />
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Indirizzo Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Inserisci la tua email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />{" "}
                ▄
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                value={userData.password}
                required
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      as="spen"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    {""}
                    Caricamento...
                  </>
                ) : (
                  "Registrati"
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default ResgistrazionePage;
