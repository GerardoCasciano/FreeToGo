import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Spinner,
  Alert,
  ListGroup,
  Row,
  Col,
  Form as BootstrapForm,
} from "react-bootstrap";

import categoriaService from "../api/categoriaService";

// Lista delle categorie permesse
const CATEGORIE_PERMESSE = [
  "CONCERTO",
  "MUSEO",
  "TEATRO",
  "SAGRA",
  "SPORT",
  "MOSTRA",
  "MUSICA",
  "EVENTO CULTURALE",
];

const CategoriaAdminPage = () => {
  // STATI
  const [categorie, setCategorie] = useState([]);
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState(null);

  const [nuovoNome, setNuovoNome] = useState("");
  const [nuovaDescrizione, setNuovaDescrizione] = useState("");
  const [erroreAggiunta, setErroreAggiunta] = useState(null);

  //  GESTIONE

  // 1. Funzione per il recupero categorie
  const fetchCategorie = async () => {
    try {
      setCaricamento(true);
      const data = await categoriaService.getAllCategorie();
      setCategorie(data);
      setErrore(null);
    } catch (err) {
      setErrore("Impossibile caricare le categorie.");
      console.error("Fetch categorie FALLITO!", err);
    } finally {
      setCaricamento(false);
    }
  };

  //  Gestione dell'eliminazione
  const gestisciEliminazione = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa categoria?")) {
      try {
        await categoriaService.deleteCategoria(id);
        fetchCategorie(); // Ricarica
      } catch (err) {
        setErrore(
          "Errore durante l'eliminazione. Assicurati che la categoria non sia usata da nessun evento."
        );
        console.error("Eliminazione della categoria FALLITA!", err);
      }
    }
  };

  //  Gestione della creazione
  const gestisciSubmit = async (e) => {
    e.preventDefault();
    setErroreAggiunta(null);

    if (!nuovoNome) {
      setErroreAggiunta("Seleziona un nome per la categoria.");
      return;
    }
    try {
      const datiNuovaCategoria = {
        nome: nuovoNome,
        descrizione: nuovaDescrizione || null,
      };

      await categoriaService.createCategoria(datiNuovaCategoria);

      setNuovoNome("");
      setNuovaDescrizione("");
      fetchCategorie();
    } catch (err) {
      setErroreAggiunta(
        err.response?.data?.message ||
          "Errore sconosciuto durante la creazione della categoria."
      );
      console.error("Creazione categoria FALLITA!", err);
    }
  };
  // HOOKS
  useEffect(() => {
    fetchCategorie();
  }, []);

  // RENDER
  return (
    <Container className="mt-4">
      <h2>Gestione Categorie</h2>
      <hr />
      <div className="p-4 border rounded-3 mb-4 bg-light btn-glass">
        <h4>Aggiungi Nuova Categoria</h4>
        {erroreAggiunta && <Alert variant="warning">{erroreAggiunta}</Alert>}
        <BootstrapForm onSubmit={gestisciSubmit}>
          <Row className="align-items-end">
            <Col md={4}>
              <BootstrapForm.Group
                controlId="formCategoriaNome"
                className="mb-3"
              >
                <BootstrapForm.Label>Nome Categoria</BootstrapForm.Label>
                <BootstrapForm.Select
                  value={nuovoNome}
                  onChange={(e) => setNuovoNome(e.target.value)}
                  required
                >
                  <option value="">Seleziona una categoria</option>
                  {CATEGORIE_PERMESSE.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </BootstrapForm.Select>
              </BootstrapForm.Group>
            </Col>
            <Col md={6}>
              <BootstrapForm.Group
                controlId="formDescrizioneCategoria"
                className="mb-3"
              >
                <BootstrapForm.Label>Descrizione</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="text"
                  placeholder="Descrivi la categoria"
                  value={nuovaDescrizione}
                  onChange={(e) => setNuovaDescrizione(e.target.value)}
                />
              </BootstrapForm.Group>
            </Col>
            <Col md={2} className="mb-3">
              <Button type="submit" className="w-100 btn-glass ">
                Aggiungi
              </Button>
            </Col>
          </Row>
        </BootstrapForm>
      </div>

      <h4>Categorie Esistenti</h4>
      {caricamento && (
        <div className="text-center ">
          <Spinner animation="border" />
        </div>
      )}
      {errore && <Alert variant="danger">{errore}</Alert>}

      {!caricamento && !errore && (
        <ListGroup>
          {categorie.length > 0 ? (
            categorie.map((categoria) => (
              <ListGroup.Item
                key={categoria.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{categoria.nome}</strong>
                  {categoria.descrizione && (
                    <>
                      <br />
                      <small className="text-muted">
                        {categoria.descrizione}
                      </small>
                    </>
                  )}
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => gestisciEliminazione(categoria.id)}
                  className="btn-glass fs-5"
                >
                  Elimina
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>Nessuna categoria trovata.</ListGroup.Item>
          )}
        </ListGroup>
      )}
    </Container>
  );
};

export default CategoriaAdminPage;
