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
import utenteService from "../api/utenteService";

const RegistrazionePage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [avatarFile, setAvatarFile] = useState(null);

  const handleFileChange = (event) => {
    // ✅ CORREZIONE: Usa event.target.files (plurale)
    if (event.target.files && event.target.files.length > 0) {
      setAvatarFile(event.target.files[0]);
    } else {
      setAvatarFile(null);
    }
  };

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
      const registrationData = {
        nome: formData.nome,
        cognome: formData.cognome,
        email: formData.email,
        password: formData.password,
        username: formData.username,
      };

      const registrationUser = await authService.register(registrationData);
      alert("Registrazione avvenuta con successo!");

      if (avatarFile && registrationUser.id) {
        try {
          await utenteService.uploadAvatar(registrationUser.id, avatarFile);
          alert("Immagine del profilo caricata con successo!");
        } catch (uploadError) {
          console.error("Errore upload avatar:", uploadError);
          setError(
            "Registrazione completata, ma l'immagine non è stata caricata. Potrai caricarla dal tuo profilo"
          );
        }
      }

      navigate("/login");
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      setError(
        error.response?.data?.message ||
          "Si è verificato un errore durante la registrazione."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className=" navbar-glass d-flex flex-column justify-content-center flex-grow-1 mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4 btn-glass">
            Registra un nuovo account
          </h2>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                placeholder="Inserisci il tuo nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="cognome"
                placeholder="Inserisci il tuo cognome"
                value={formData.cognome}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Inserisci il tuo username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Indirizzo Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Inserisci la tua email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Immagine Profilo</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button
                className="btn-glass mt-2 rounded-pill mb-3  w-25 "
                variant="success"
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
                    />{" "}
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

export default RegistrazionePage;
