import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import eventiService from "../api/eventiService";
import moment from "moment";

const EditEventiPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    titolo: "",
    dataOra: "",
    citta: "",
    via: "",
    regione: "",
  });

  useEffect(() => {
    const fetchEventoData = async () => {
      setLoading(true);
      try {
        const data = await eventiService.getEventoById(id);
        // Formatta la data per l'input datetime-local
        const dataFormattata = moment(data.dataOra).format("YYYY-MM-DDTHH:mm");
        setFormData({ ...data, dataOra: dataFormattata });
      } catch (error) {
        console.error("Fetch fallita per evento data:", error);
        setError("Impossibile caricare i dati dell'evento.");
      } finally {
        setLoading(false);
      }
    };
    fetchEventoData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Assicurati che la data sia nel formato ISO 8601 corretto per il backend
    const eventoData = {
      ...formData,
      dataOra: moment(formData.dataOra).toISOString(),
    };

    try {
      await eventiService.updateEvento(id, eventoData);
      alert("Evento aggiornato con successo!");
      navigate("/my-eventi");
    } catch (error) {
      console.error("Aggiornamento fallito.", error);
      setError("Errore durante l'aggiornamento dell'evento");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.titolo) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </Spinner>
      </Container>
    );
  }

  if (error && !formData.titolo) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="btn-glass mb-4">Modifica Evento</h2>
          <Form onSubmit={handleSubmit} className="navbar-glass p-4 rounded">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                name="titolo"
                value={formData.titolo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data e Ora</Form.Label>
              <Form.Control
                type="datetime-local"
                name="dataOra"
                value={formData.dataOra}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Città</Form.Label>
              <Form.Control
                type="text"
                name="citta"
                value={formData.citta}
                readOnly
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Via</Form.Label>
              <Form.Control
                type="text"
                name="via"
                value={formData.via}
                readOnly
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Regione</Form.Label>
              <Form.Control
                type="text"
                name="regione"
                value={formData.regione}
                readOnly
                disabled
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              disabled={loading}
              className="mt-3"
            >
              {loading ? "Salvataggio..." : "Salva Modifiche"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditEventiPage;
