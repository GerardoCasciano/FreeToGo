import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import eventiService from "../api/eventiService";
import moment from "moment";
import { Prev } from "react-bootstrap/esm/PageItem";
import { Button, Col, Container, Row } from "react-bootstrap";

const EditEventiPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState("");
    const [formData, setFormData] = useState(null);

    useEffect(() => {
      const fetchEventoData = async () => {
        try {
          const data = await eventiService.getEventoById(id);
          data.dataOra = moment(data.dataOra).format("YYYY-MM_DDTHH:MM");
          setFormData(data);
        } catch (error) {
          console.error("Fetchfallita per evento data:", error);
          setError("Impossibile caricare i dati dell'evento.");
        }
      };
      fetchEventoData();
    }, [id]);
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (event) => {
      event.preventDedault();
      setLoading(true);
      setError("");

      const eventoData = {
        ...formData,
        dataOra: `${formData.dataOra}:00`,
      };
      try {
        await eventiService.apdateEvento(id, eventoData);
        alert("Evento aggiornato con successo!");
        navigate("/my-eventi");
      } catch (error) {
        console.error("Aggironamento fallito.", error);
        setError("Errore durante l'aggiornamento dell'evento");
      } finally {
        setLoading(false);
      }
    };
    if (!formData) {
      return (
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <h2 className="btn-glass">Modifica Evento</h2>
              <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mb-3">
                  <Form.label>Titolo</Form.label>
                  <Form.Control
                    type="text"
                    name="titolo"
                    value={formData.titolo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.label>Data e Ora</Form.label>
                  <Form.Control
                    type="datetime-local"
                    name="dataOra"
                    value={formData.titolo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      name="citta"
                      value={formData.citta}
                      readOnly
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="via"
                      value={formData.via}
                      readOnly
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="regione"
                      value={formData.regione}
                      readOnly
                    />
                  </Col>
                </Row>
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
    }
  });
};
export default EditEventiPage;
