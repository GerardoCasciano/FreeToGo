import React, { useState } from "react";
import authService from "../api/authService";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  Row,
  Container,
  Alert,
  Spinner,
} from "react-bootstrap";

const AdminRegistrazionePage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setLoading(true);
    setError(null);
    setValidated(true);

    try {
      await authService.registerAdmin(formData);
      setRegistrationSuccess(true);
      setFormData({
        nome: "",
        cognome: "",
        email: "",
        password: "",
      });
    } catch (error) {
      const erroMessage =
        error.response?.data?.message ||
        error.message ||
        "Errore di registrazione";
      setError(erroMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className="mt-5 btn-glass">
      {registrationSuccess && (
        <Alert variant="success">Registrazione avvenuta con successo!</Alert>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>Registrazione Amministratore</h2>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              name="nome"
              type="text"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Per favore iniserisci il nome
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustomCognome">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              required
              name="cognome"
              type="text"
              placeholder="Cognome"
              value={formData.cognome}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Per favore inserisci il cognome.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Inserire indirizzo email valido.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Inserisci un password valida
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit" disabled={loading} className="btn-glass">
          {loading ? <Spinner animation="border" size="sm" /> : "Regista"}
        </Button>
      </Form>
    </Container>
  );
};

export default AdminRegistrazionePage;
