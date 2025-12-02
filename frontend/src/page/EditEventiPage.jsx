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
    tipoEventoId: "", // Campo per l'ID del tipo di evento
    avatarUrl: "",
    latitudine: 0,
    longitudine: 0,
  });

  const [categorie, setCategorie] = useState([]);
  const [tipiEvento, setTipiEvento] = useState([]);
  const [loadingTipiEvento, setLoadingTipiEvento] = useState(false);


  useEffect(() => {
    const fetchEventoData = async () => {
      setLoading(true);
      try {
        const data = await eventiService.getEventoById(id);
        const categoriesData = await eventiService.getAllCategorie(); // Fetch all categories
        setCategorie(categoriesData);

        console.log("Dati evento ricevuti:", data); // DEBUG
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
          tipoEventoId: data.tipoEvento?.id || "", // Set tipoEventoId
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

  useEffect(() => {
    if (formData.categoriaId) {
      setLoadingTipiEvento(true);
      eventiService
        .getTipiEventoByCategoria(formData.categoriaId)
        .then((data) => {
          setTipiEvento(data);
          // If the current tipoEventoId is not in the new list, clear it
          if (
            !data.some((tipo) => tipo.id === formData.tipoEventoId) &&
            formData.tipoEventoId !== ""
          ) {
            setFormData((prev) => ({
              ...prev,
              tipoEventoId: "",
              tipoEventoNome: "",
            }));
          }
        })
        .catch((error) => {
          console.error("Errore nel recupero dei tipi di evento:", error);
          setTipiEvento([]);
        })
        .finally(() => {
          setLoadingTipiEvento(false);
        });
    } else {
      setTipiEvento([]);
      setFormData((prev) => ({
        ...prev,
        tipoEventoId: "",
        tipoEventoNome: "",
      }));
    }
  }, [formData.categoriaId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      let updatedFormData = { ...prev, [name]: value };

      if (name === "categoriaId") {
        updatedFormData.tipoEventoId = ""; // Reset tipoEvento when category changes
        updatedFormData.tipoEventoNome = "";
      } else if (name === "tipoEventoId") {
        const selectedTipo = tipiEvento.find((tipo) => tipo.id === value);
        updatedFormData.tipoEventoNome = selectedTipo ? selectedTipo.nome : "";
      }
      return updatedFormData;
    });
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

    console.log("Dati evento inviati:", eventoData); // DEBUG

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
                  <Form.Select
                    name="tipoEventoId"
                    value={formData.tipoEventoId}
                    onChange={handleChange}
                    required
                    disabled={!formData.categoriaId || loadingTipiEvento}
                  >
                    <option value="">
                      {loadingTipiEvento
                        ? "Caricamento tipi evento..."
                        : "Seleziona un tipo di evento"}
                    </option>
                    {tipiEvento.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.nome}
                      </option>
                    ))}
                  </Form.Select>
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
                value={formData.regione || ""}
                readOnly
                disabled
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              disabled={loading}
              className="mt-3 rounded-pill"
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
