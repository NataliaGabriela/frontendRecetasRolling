import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardReceta = ({receta}) => {
  return (
    <Col md={3} className="mb-3">
     <Card>
      <Card.Img variant="top" src={receta.imagen} className="card-img-top-nueva" />
      <Card.Body className="text-center bodyCardReceta">
        <Card.Title>{receta.nombreReceta}</Card.Title>
        <Link className=" btn btnCardRecetas w-100 fw-semibold" to={'/detalleReceta/'+ receta.id} >Ver Receta</Link>
      </Card.Body>
    </Card>
    </Col>
  );
};

export default CardReceta;
