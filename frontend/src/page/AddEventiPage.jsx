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
import eventiService from "../api/eventiService";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const AddEventiPage = () => {
  const [formData, setFormData] = useState({
    titolo: "",
    descrizione: "",
    avatarUrl: "",
    dataOra: "",
    citta: "",
    via: "",
    regione: "",
    latitudine: 0,
    longitudine: 0,
    prezzo: 0,
    categoriaId: "",
    tipoEventoNome: "",
  });

  const [categorie, setCategorie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [markerPosition, setMarkerPosition] = useState({
    lat: 41.902782,
    lng: 12.496366,
  }); // Default to Rome

  // Componente per gestire gli eventi della mappa
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng);
        setFormData((prev) => ({
          ...prev,
          latitudine: e.latlng.lat,
          longitudine: e.latlng.lng,
        }));

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
        )
          .then((response) => response.json())
          .then((data) => {
            setFormData((prev) => ({
              ...prev,
              citta:
                data.address.city ||
                data.address.town ||
                data.address.village ||
                "",
              via: data.address.road || "", // Get street name
              regione: data.address.state || data.address.country || "",
            }));
          })
          .catch((error) =>
            console.error("Error during reverse geocoding:", error)
          );
      },
    });

    return markerPosition ? <Marker position={markerPosition}></Marker> : null;
  }

  // Funzione per caricare le categorie al montaggio del componente
  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const data = await eventiService.getAllCategorie();
        setCategorie(data);
      } catch (error) {
        console.error("Errore fetch categorie:", error);
        setError("Errore.Impossibile caricare le categorie.");
      }
    };
    fetchCategorie();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "latitudine" || name === "longitudine" || name === "prezzo") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      setError("Utente non trovato. Effettua di nuovo il login");
      setLoading(false);
      return;
    }

    const eventoData = {
      ...formData,
      dataOra: `${formData.dataOra}:00`,
      organizzatoreId: user.id,
    };

    try {
      await eventiService.createEvento(eventoData);
      alert("Evento creato con successo!");
      navigate("/");
    } catch (error) {
      console.error("Errore creazione evento:", error);
      setError(
        "Errore durante la creazione dell'evento. Prego verificare i dati inseriti nel FORM"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 navbar-glass ">
      <Row className="justify-content-center ">
        <Col md={8}>
          <h2 className="btn-glass text-center">Crea un Nuovo Evento</h2>
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
                    type="text"
                    name="tipoEventoNome"
                    value={formData.tipoEventoNome}
                    onChange={handleChange}
                    placeholder="Inserisci il tipo di evento"
                    required
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
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Città</Form.Label>
                  <Form.Control
                    type="text"
                    name="citta"
                    value={formData.citta}
                    onChange={handleChange}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Via</Form.Label>
                  <Form.Control
                    type="text"
                    name="via"
                    value={formData.via}
                    onChange={handleChange}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Regione</Form.Label>
                  <Form.Control
                    type="text"
                    name="regione"
                    value={formData.regione}
                    onChange={handleChange}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Latitudine</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    name="latitudine"
                    value={formData.latitudine}
                    onChange={handleChange}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Longitudine</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    name="longitudine"
                    value={formData.longitudine}
                    onChange={handleChange}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

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

            <Form.Group className="mb-3">
              <Form.Label>URL Immagine</Form.Label>
              <Form.Control
                type="url"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className=" btn-glass fs-5">
                Seleziona Posizione sulla Mappa
              </Form.Label>
              <MapContainer
                center={markerPosition}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
              </MapContainer>
            </Form.Group>

            <Button
              type="submit"
              variant="success btn-glass "
              disabled={loading}
              className="mb-4"
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
