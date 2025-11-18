import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authService";
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
  const [formData, setFormData] = useState({
    name: "",
    cognome: "",
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(formData);
      console.log(
        "Registrazione avvenuta con successo!Sarai reindirizzato al login"
      );

      navigate("/login");
    } catch (err) {
      console.error(
        "Errore durante la registrazione .L'utente potrebbe essere già resgistrato"
      );
      const errorMessage =
        err.response?.data?.message ||
        "Registrazone fallita, controlla  i dati e riprova";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className=" d-flex flex-column justify-content-center flex-grow-1 mt-5  ">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-cemter mb-4 btn-glass">
            Registra un nuovo account
          </h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 " controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                placeholder="Inserisci il tuo nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <Form.Group className="mb-3" controlId="formBasicSurname">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  type="text"
                  name="cognome"
                  placeholder="Inserisci il tuo nome"
                  value={formData.cognome}
                  onChange={handleChange}
                  required
                />
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>UsereName</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Inserisci il tuo username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Indirizzo Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Inserisci la tua email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />{" "}
                  </Form.Group>
                </Form.Group>
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </Form.Group>
            <div className="d-grid">
              {error && <div className="alert alert.danger">{error}</div>}
              <Button
                className="btn-glass mt-2 w-25 rounded-pill mb-3"
                variant="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
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
