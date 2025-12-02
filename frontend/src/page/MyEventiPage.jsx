import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import eventiService from "../api/eventiService";
import moment from "moment";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix per l'icona del marker di Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MyEventiPage = () => {
  const [eventi, setEventi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchEventi = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await eventiService.getMyEventi();
      setEventi(data);
    } catch (error) {
      console.error("Errore fetch eventi", error);
      setError("Impossibile caricare i tuoi eventi. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventi();
  }, []);

  const handleDelete = async (eventoId) => {
    if (window.confirm("Sei sicuro di voler eliminare questo evento?")) {
      try {
        await eventiService.deleteEvento(eventoId);
        alert("Evento eliminato con successo!");
        fetchEventi();
      } catch (error) {
        console.error("Errore cancellazione evento", error);
        setError(
          "Impossibile cancellare l'evento selezionato. Riprova più tardi."
        );
      }
    }
  };

  const handleEdit = (eventoId) => {
    navigate(`/eventi/edit/${eventoId}`);
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Caricamento eventi...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (eventi.length === 0) {
    return (
      <Container className="mt-5 text-center navbar-glass">
        <h2>Non hai ancora creato nessun evento.</h2>
        <Button
          className="rounded-pill mb-2"
          size="lg"
          variant="success"
          onClick={() => navigate("/eventi/add")}
        >
          Crea Evento
        </Button>
      </Container>
    );
  }

  const defaultCenter =
    eventi.length > 0
      ? [eventi[0].latitudine, eventi[0].longitudine]
      : [41.9027835, 12.4963655];

  return (
    <Container fluid className="mt-5 p-0">
      <Row>
        <Col md={8}>
          <div className="navbar-glass p-3">
            <h2 className="mb-4 text-center">I Miei Eventi</h2>
            <Table striped bordered responsive hover>
              <thead>
                <tr>
                  <th>Titolo</th>
                  <th>Tipo di Evento</th>
                  <th>Data Evento</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {eventi.map((evento) => (
                  <tr key={evento.id}>
                    <td>{evento.titolo}</td>
                    <td>{evento.tipoEventoNome || ""}</td>
                    <td>{moment(evento.dataOra).format("DD/MM/YYYY HH:mm")}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(evento.id)}
                      >
                        Modifica
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(evento.id)}
                      >
                        Elimina
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col md={4}>
          <div className="sticky-top" style={{ top: "2rem" }}>
            <h4 className="text-center mb-3">Mappa Eventi</h4>
            <MapContainer
              center={defaultCenter}
              zoom={6}
              style={{ height: "400px", width: "100%", borderRadius: "15px" }}
              className="navbar-glass"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {eventi.map(
                (evento) =>
                  evento.latitudine &&
                  evento.longitudine && (
                    <Marker
                      key={evento.id}
                      position={[evento.latitudine, evento.longitudine]}
                    >
                      <Popup>
                        <b>{evento.titolo}</b>
                        <br />
                        {evento.citta}, {evento.via}
                        <br />
                        {moment(evento.dataOra).format("DD/MM/YYYY HH:mm")}
                      </Popup>
                    </Marker>
                  )
              )}
            </MapContainer>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyEventiPage;
