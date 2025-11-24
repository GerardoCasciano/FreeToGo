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
        <Button
          className="rounded-pill mb-2"
          size="5px"
          variant="success"
          onClick={() => navigate("/eventi/add")}
        >
          Crea Evento
        </Button>
      </Container>
    );
  }
  return (
    <Container className="mt-5 navbar-glass m-0 p-0  ">
      <h2 className="mb-4 text-center btn-glass ">I miei eventi</h2>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>ID Evento</th>
            <th>Tipo di Evento</th>
            <th>Data Creazione</th>
            <th>Modifica</th>
            <th>Elimina</th>
          </tr>
        </thead>
        <tbody>
          {eventi.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.id}</td>
              <td>{evento.tipoEvento?.nome || "Non specificato"}</td>
              <td>{moment(evento.dataCreazione).format("DD/MM/YYYY")}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2 tbn-glass"
                  onClick={() => handleEdit(evento.id)}
                >
                  Modifica
                </Button>
              </td>
              <td>
                <Button
                  className="me-2 btn-glass"
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
    </Container>
  );
};
export default MyEventiPage;
