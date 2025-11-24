import { useState } from "react";
import utenteService from "../api/utenteService";
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Form,
} from "react-bootstrap";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { useAuth } from "../components/AuthContext";

const ProfiloPage = () => {
  const { user, updateUser, loading: authLoading } = useAuth();
=======
import { useAuth } from "../hook/useAuth";
const ProfiloPage = () => {
  const { user, updatedUserData } = useAuth();
>>>>>>> Stashed changes
=======
import { useAuth } from "../hook/useAuth";
const ProfiloPage = () => {
  const { user, updatedUserData } = useAuth();
>>>>>>> Stashed changes
=======
import { useAuth } from "../hook/useAuth";
const ProfiloPage = () => {
  const { user, updatedUserData } = useAuth();
>>>>>>> Stashed changes
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!avatarFile) {
      setError("Per favore, seleziona un file immainge.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const resultData = await utenteService.uploadAvatar(user.id, avatarFile);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      updateUser(resultData);
=======
      updatedUser(updatedUserData);
>>>>>>> Stashed changes
=======
      updatedUser(updatedUserData);
>>>>>>> Stashed changes
=======
      updatedUser(updatedUserData);
>>>>>>> Stashed changes

      setSuccess("Immagine del profilo aggiornata!");
      setAvatarFile(null);
    } catch (error) {
      console.error("Errore caricamenot dell'immagine", error);
      setError("Errore duarante il carcamento dell'immagine");
    } finally {
      setLoading(false);
    }
  };
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  if (authLoading || !user) {
    <Container className="mt-5 text-center">
      <Spinner animation="border" roel="status">
        <span className="visually-hidden">Caricamento...</span>
        <p>Caricamento del profilo...</p>
      </Spinner>
    </Container>;
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" roel="status">
          <p>Caricamento del profilo...</p>
        </Spinner>
      </Container>
    );
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  }
  return (
    <Container className="mt-5 navbar-glass p-4 rounded">
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <h2 className="btn-glass mb-4"> Il mio Profilo</h2>
          <img
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            src={user.avatarUrl || "URL_DEL_TUO_AVATAR_DEFAULT"}
=======
            src={user.avatarUrl || "https://i.pravatar.cc/150"}
>>>>>>> Stashed changes
=======
            src={user.avatarUrl || "https://i.pravatar.cc/150"}
>>>>>>> Stashed changes
=======
            src={user.avatarUrl || "https://i.pravatar.cc/150"}
>>>>>>> Stashed changes
            alt="Avatar"
            className="mb-3 rounded-circle"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: "4px solid rgba(255, 255, 255, 0)",
            }}
          />
          <h3>{`${user.nome} ${user.cognome}`}</h3>
          <p className="text-center">{user.email}</p>
          <Form onSubmit={handleSubmit} className="mt-4">
            <h4 className="mb-3">Cambia Immagine del Profilo</h4>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              className="rounded-pill mb-2"
              variant="success"
=======
              className="rounded-pill btn-glass"
              varian="success"
>>>>>>> Stashed changes
=======
              className="rounded-pill btn-glass"
              varian="success"
>>>>>>> Stashed changes
=======
              className="rounded-pill btn-glass"
              varian="success"
>>>>>>> Stashed changes
              type="submit"
              disabled={loading || !avatarFile}
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
                  Caricamento...
                </>
              ) : (
                "Carica Immagine"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default ProfiloPage;
