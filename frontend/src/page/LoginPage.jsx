import { useState } from "react";
import {
  Button,
  Container,
  Form,
  Spinner,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import authService from "../api/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authService.login(credentials);

      const userData = { ...response };
      delete userData.token;
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("Login eseguito con successo", response);

      navigate("/"); // Reindirizza alla home
    } catch (err) {
      setError("Credenziali non valide. Riprova.");
      console.error("Errore durante il login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 btn-glassd-flex flex-column justify-content-center flex-grow-1">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Accesso Utente</h2>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Indirizzo Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Inserisci la tua email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Caricamento...
                  </>
                ) : (
                  "Accedi"
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
