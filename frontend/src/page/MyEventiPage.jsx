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
      setError("Impossibile caricare i tuoi eventi .Riprova più tardi.");
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
          "impossibile canellare l'evento selsezionato.Riprova più tardi"
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
          <span className=" visually-hidden">Caricamento eventi...</span>
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
      <Container className=" mt-5 text-center navbar-glass">
        <h2>Non hai ancora creato nessun evento.</h2>
        <Button variant="success" onClick={() => navigate("/eventi/add")}>
          Crea Evento
        </Button>
      </Container>
    );
  }
  return (
    <Container className="mt-5 navbar-glass ">
      <h2 className="mb-4 text-center btn-glass ">I miei eventi</h2>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>ID Evento</th>
            <th>Tipo di Evento</th>
            <th>Data Creazione</th>
            <th>
              <Button
                variant="warning"
                size="md"
                className="me-2 btn-glass"
                onClick={() => handleEdit(eventi.id)}
              >
                Modifica
              </Button>
            </th>
            <th>
              <Button
                className="me-2 btn-glass"
                variant="danger"
                size="md"
                onClick={() => handleDelete(eventi.id)}
              >
                Elimina
              </Button>
            </th>
          </tr>
        </thead>
      </Table>
    </Container>
  );
};
export default MyEventiPage;
