import { Container, Row, Col, Card } from "react-bootstrap";
import React from "react";
import "../assets/CustomCards.css";
import { useNavigate } from "react-router-dom";
const InfoCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (genre) => {
    navigate(`/search?q=${genre}`);
  };
  return (
    <Container className="my-5">
      <Row className="g-5">
        <Col md={4}>
          <Card
            className="h-100 shadow-sm custom-info-cards "
            onClick={() => handleCardClick("Musica")}
            style={{ cursor: "pointer" }}
          >
            <Card.Img variant="top" src="/musica.png" />
            <Card.Body className="d-flex flex-column flex-grow-1 ">
              <Card.Title className="text-center mb-3">
                <h3>Musica</h3>
              </Card.Title>
              <Card.Text className="text-center mt-auto">
                Esplora una vasta gamma di eventi legati al mondo musicale ,da
                concerti e serate di vario tipo nella tua zona !
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className=" shadow-sm custom-info-cards2  h-100 "
            onClick={() => handleCardClick("Arte,Eventi Culturali")}
            style={{ cursor: "pointer" }}
          >
            <Card.Img variant="top" src="/arte.jpg" />
            <Card.Body className="d-flex flex-column flex-grow-1">
              <Card.Title className="text-center  mb-3">
                <h3>Arte-Eventi Culturali</h3>
              </Card.Title>
              <Card.Text className="text-center mt-auto ">
                Esplora una vasta gamma di eventi legati al mondo dell'arte ,tra
                Musei,Teatro e vari tipi di eventi nella tua zona !
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className=" shadow-sm custom-info-cards3 h-100"
            onClick={() => handleCardClick("Sport")}
            style={{ cursor: "pointer" }}
          >
            <Card.Img variant="top" src="/sport.jpg" />
            <Card.Body className="d-flex flex-column flex-grow-1">
              <Card.Title className="text-center  mt-auto">
                <h3>Sport</h3>
              </Card.Title>
              <Card.Text className="text-center mt-auto ">
                Eventi Sportivi di ogni genere nella tua zona !
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default InfoCards;
