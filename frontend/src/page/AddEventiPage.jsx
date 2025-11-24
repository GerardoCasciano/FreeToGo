import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";

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

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function MapRecenter({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center.lat !== 0 || center.lng !== 0) {
      map.flyTo(center, map.getZoom() || 13, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [center, map]);

  return null;
}

const AddEventiPage = () => {
  const DEFAULT_POSITION = { lat: 41.9027835, lng: 12.4963655 };

  const [formData, setFormData] = useState({
    titolo: "",
    descrizione: "",
    avatarUrl: "",
    dataOra: "",
    citta: "",
    via: "",
    regione: "",

    latitudine: DEFAULT_POSITION.lat,
    longitudine: DEFAULT_POSITION.lng,
    prezzo: 0,
    categoriaId: "",
    tipoEventoNome: "",
  });

  const [categorie, setCategorie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [addressInputTimer, setAddressInputTimer] = useState(null);

  const geocodeAddress = async (citta, via, regione) => {
    if (!citta || !via) return;

    const address = `${via}, ${citta}, ${regione}, Italy`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&limit=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        setFormData((prev) => ({
          ...prev,
          latitudine: lat,
          longitudine: lng,
        }));
      } else {
        console.warn("Geocoding non riuscito per l'indirizzo:", address);
      }
    } catch (error) {
      console.error("Errore durante la geocodifica:", error);
    }
  };

  function LocationMarker() {
    const markerPosition = [formData.latitudine, formData.longitudine];

    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        setFormData((prev) => ({
          ...prev,
          latitudine: lat,
          longitudine: lng,
        }));

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
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
              via: data.address.road || "",
              regione: data.address.state || data.address.country || "",
            }));
          })
          .catch((error) =>
            console.error("Errore nel geocoding inverso:", error)
          );
      },
    });

    return (
      (formData.latitudine !== 0 || formData.longitudine !== 0) && (
        <Marker position={markerPosition} />
      )
    );
  }

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const data = await eventiService.getAllCategorie();
        setCategorie(data);
      } catch (error) {
        console.error("Errore fetch categoria:", error);
        setError("Errore. Impossibile caricare la categoria.");
      }
    };
    fetchCategoria();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;

    if (addressInputTimer) {
      clearTimeout(addressInputTimer);
    }

    if (name === "latitudine" || name === "longitudine" || name === "prezzo") {
      newValue = parseFloat(value) || 0;
    }

    setFormData((prev) => {
      const newFormData = { ...prev, [name]: newValue };

      if (name === "citta" || name === "via" || name === "regione") {
        const newTimer = setTimeout(() => {
          geocodeAddress(
            newFormData.citta,
            newFormData.via,
            newFormData.regione
          );
        }, 1000);

        setAddressInputTimer(newTimer);
      }
      return newFormData;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Recupero Utente
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      setError("Utente non trovato. Effettua di nuovo il login");
      setLoading(false);
      return;
    }

    // Preparazione Dati per l'API
    const eventoData = {
      ...formData,

      latitudine: parseFloat(formData.latitudine),
      longitudine: parseFloat(formData.longitudine),
      prezzo: parseFloat(formData.prezzo),
      organizzatoreId: user.id,

      dataOra: `${formData.dataOra}:00`,
    };

    // Chiamata API
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
    <Container className="mt-5 ">
      <Row className="justify-content-center">
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
                    placeholder="Es. Concerto, Mostra, Lezione"
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

            {/* SEZIONE INDIRIZZO (Attiva Geocodifica e Mappa) */}
            <Row>
              <Col md={4}>
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
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Via</Form.Label>
                  <Form.Control
                    type="text"
                    name="via"
                    value={formData.via}
                    onChange={handleChange}
                    required
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
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Label>
                  📍 Posizione Evento (clicca sulla mappa per selezionare)
                </Form.Label>
                <MapContainer
                  center={[formData.latitudine, formData.longitudine]}
                  zoom={13}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  <MapRecenter
                    center={{
                      lat: formData.latitudine,
                      lng: formData.longitudine,
                    }}
                  />
                  <LocationMarker />
                </MapContainer>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Latitudine</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    name="latitudine"
                    value={formData.latitudine}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Longitudine</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    name="longitudine"
                    value={formData.longitudine}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Prezzo (€)</Form.Label>
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

            <Form.Group className="mb-3 mt-3">
              <Form.Label>URL Immagine</Form.Label>
              <Form.Control
                type="url"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              className="btn-glass mb-4"
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
