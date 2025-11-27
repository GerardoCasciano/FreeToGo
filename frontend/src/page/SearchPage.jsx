import React, { useState, useEffect } from "react";
import {
  Container,
  Spinner,
  Alert,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useSearchParams, Link } from "react-router-dom";
import { searchEventi } from "../api/googleSearchService";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [inputQuery, setInputQuery] = useState(query);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (query) {
      const performSearch = async () => {
        setLoading(true);
        setError("");
        setResults(null);
        try {
          const data = await searchEventi(query);
          setResults(data);
        } catch (err) {
          console.error("Search error:", err);
          setError("Errore durante la ricerca.Riprova.");
        } finally {
          setLoading(false);
        }
      };
      performSearch();
    }
  }, [query]);
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (inputQuery.trim()) {
      setQuery(inputQuery);
      setSearchParams({ q: inputQuery });
    }
  };
  return (
    <Container className=" mt-5  navbar-glass  ">
      <h1 className="btn-glass text-center">Pagina di Ricerca</h1>
      <p>I risultati della ricerca appariranno qui.</p>
      <Form onSubmit={handleSearchSubmit} className="d-flex mt-4 mb-4">
        <Form.Control
          type="search"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Cerca altri eventi..."
          className="me-2"
        />
        <Button className="btn-glass" type="submit" variant="success">
          Cerca
        </Button>
      </Form>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" /> <p>Caricamento...</p>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      {results && (
        <>
          {results.generatedResponse && (
            <Alert variant="info">
              <strong>Riepilogo:</strong> {results.generatedResponse}
            </Alert>
          )}
          <ListGroup>
            {results.sources && results.sources.length > 0 ? (
              results.sources.map((source, index) => (
                <ListGroup.Item
                  key={index}
                  as="a"
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>{source.title}</strong>
                  <br />
                  <small className="text-muted">{source.url}</small>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>Nessun risultato trovato.</ListGroup.Item>
            )}
          </ListGroup>
        </>
      )}
    </Container>
  );
};
export default SearchPage;