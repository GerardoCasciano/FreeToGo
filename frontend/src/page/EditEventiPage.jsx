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
    descrizione: "",
    dataOra: "",
    citta: "",
    via: "",
    regione: "",
    prezzo: 0,
    categoriaId: "",
    tipoEventoNome: "",
    avatarUrl: "",
    latitudine: 0,
    longitudine: 0,
  });

  useEffect(() => {
    const fetchEventoData = async () => {
      setLoading(true);
      try {
        const data = await eventiService.getEventoById(id);
        console.log("Dati evento ricevuti:", data);
        const dataFormattata = moment(data.dataOra).format("YYYY-MM-DDTHH:mm");
        setFormData({
          titolo: data.titolo || "",
          descrizione: data.descrizione || "",
          dataOra: dataFormattata,
          citta: data.citta || "",
          via: data.via || "",
          regione: data.regione || "",
          prezzo: data.prezzo || 0,
          categoriaId: data.categoria?.id || "",
          tipoEventoNome: data.tipoEvento?.nome || "",
          avatarUrl: data.avatarUrl || "",
          latitudine: data.latitudine || 0,
          longitudine: data.longitudine || 0,
        });
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

    // Prepara i dati per l'invio
    const eventoData = {
      ...formData,
      dataOra: moment(formData.dataOra).toISOString(),
      prezzo: parseFloat(formData.prezzo) || 0,
      latitudine: parseFloat(formData.latitudine),
      longitudine: parseFloat(formData.longitudine),
    };

    console.log("Dati evento inviati:", eventoData);

    try {
      await eventiService.updateEvento(id, eventoData);
      alert("Evento aggiornato con successo!");
      navigate("/my-eventi");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Errore durante l'aggiornamento dell'evento";
      console.error("Aggiornamento fallito.", error);
      setError(errorMsg);
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
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descrizione"
                value={formData.descrizione}
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
              <Form.Label>Prezzo</Form.Label>
              <Form.Control
                type="number"
                name="prezzo"
                value={formData.prezzo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo di Evento</Form.Label>
              <Form.Control
                type="text"
                name="tipoEventoNome"
                value={formData.tipoEventoNome}
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
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Via</Form.Label>
              <Form.Control
                type="text"
                name="via"
                value={formData.via}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              disabled={loading}
              className="mb-3 rounded-pill"
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
