import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import "../api/eventiService";

import eventiService from "../api/eventiService";

const AddEventiPage = () => {
  const [formData, setFormData] = useState({
    titolo: "",
    descrizione: "",
    avatarUrl: "",
    dataOra: "",
    citta: "",
    regione: "",
    latitudine: 0,
    longitudine: 0,
    prezzo: 0,
    categoriaId: "",
    tipoEventoNome: "",
  });

  const [categorie, setCategoria] = useState([]);
  const [tipoEvento, setTipoEvento] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  //Funzione per caricare le categorie al montaggio del componente
  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const data = await eventiService.getAllCategorie();
        setCategoria(data);
      } catch (error) {
        console.error("Errore fetch categoria", error);
        setError("Errore.Impossibile  caricare le categorie.");
      }
    };
    fetchCategoria();
  }, []);

  //Funzione per caricare i tipi di evento quando si selezione una categoria

  useEffect(() => {
    if (formData.categoriaId) {
      const fetchTipiEvento = async () => {
        try {
          const data = await eventiService.getTipiEventoByCategoria(
            formData.categoriaId
          );
          setTipoEvento(data);
        } catch (error) {
          console.error("Errore fetch tipi evento", error);
          setError("Errore.Impossipible caricare i titpi di evento.");
        }
      };
      fetchTipiEvento();
    } else {
      setTipoEvento([]);
    }
  }, [formData.categoriaId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Recupera l'utente dal localStorage per ottnere l'id
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      setError("Utente non trovato.Effettua di nuovo il login");
      setLoading(false);
      return;
    }

    const eventoData = {
      ...formData,
      organizzatoreId: user.id,
      latitudine: parseFloat(formData.latitudine),
      longitudine: parseFloat(formData.longitudine),
      prezzo: parseFloat(formData.prezzo),
    };

    try {
      await eventiService.createEvento(eventoData);
      alert("Evento creato con successo!");
      navigate("/");
    } catch (error) {
      console.error("Errore creazione evento:", error);
      setError(
        "Errore durante la creazione dell'evento.Prego verificare i dati inseriti nel FORM"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className="mt-5 ">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="btn-glass">Crea un Nuovo Evento</h2>
          <Form onSubmit={handleSubmit}>
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

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Select
                    name="categoriaId"
                    value={formData.categoriaId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleziona una categoria</option>
                    {categorie.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo di Evento</Form.Label>
                  <Form.Control
                    text="text"
                    name="tipoEvento"
                    value={formData.tipiEvento}
                    onChange={handleChange}
                    placeholder="Inserisci il tipo di evento"
                  />
                </Form.Group>
              </Col>
            </Row>

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

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Città</Form.Label>
                  <Form.Control
                    type="text"
                    name="citta"
                    value={formData.citta}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Regione</Form.Label>
                  <Form.Control
                    type="text"
                    name="regione"
                    value={formData.regione}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Latitudine</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    name="latitudine"
                    value={formData.latitudine}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Longitudine</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    name="longitudine"
                    value={formData.longitudine}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Prezzo</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    name="prezzo"
                    value={formData.prezzo}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>URL Immagine</Form.Label>
              <Form.Control
                type="url"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              className="btn-glass"
              type="submit"
              variant="success"
              disabled={loading}
            >
              {loading ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Crea Evento"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEventiPage;
