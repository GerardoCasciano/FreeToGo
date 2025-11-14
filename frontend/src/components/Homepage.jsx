import Card from "react-bootstrap/Card";

const Homepage = () => {
  return (
    <Card className="text-center">
      <Card.Img
        src="/bg-cartoon.jpg"
        alt=""
        style={{ height: "20rem", objectFit: "cover", opacity: "60%" }}
      />
      <Card.ImgOverlay
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        className="d-flex flex-column justify-content-center align-items-center  "
      >
        <Card.Title
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            color: " rgb(238, 199, 91)",
            fontFamily: "Luckiest Guy, cursive",
          }}
          className=" display-1 font-color my-5 fw-bold "
        >
          FreeToGO!
        </Card.Title>
        <Card.Text
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            color: "white",
          }}
          className="lead fs-3 fw-bold text-white"
        >
          La tua APP per scoprire e partecipare a eventi in tutta Italia!!
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};
export default Homepage;
