import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService, { register } from "../api/authService";
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
import FormRange from "react-bootstrap/esm/FormRange";

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

  const [avatarFile, setAvatarFile] = useState(null);
  const handleFileChange = (event) => {
    setAvatarFile(event.target.file[0]);
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
      };
      const registrationUser = await authService.register(registrationData);
      alert("Registrazione avvenuta con seuccesso!");

      if (avatarFile && registrationUser.id) {
        try {
          await utenteService.uploadAvatar(registeredUser.id, avatarFile);
          alert("Immagine del prifilo caricata con successo!");
        } catch (uploadError) {
          setError(
            "Registrazone completata, ma l'immagine non è stata caricata,potrai caricarla dal tuo profilo"
          );
        } finally {
          setLoading(flase);
        }
      }
      navigate("/login");
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      ServerRouter(
        error.response?.data?.message ||
          "Si è verificato un errore durante la refgistrazone."
      );
    }
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
                    <Form.Group className="mb-3">
                      <Form.Label>Immagine Profilo</Form.Label>
                      <Form.Control type="file" onChange={handleFileChange} />
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
};
export default ResgistrazionePage;
