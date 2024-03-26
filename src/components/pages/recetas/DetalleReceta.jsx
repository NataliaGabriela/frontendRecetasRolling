import { useEffect, useState } from "react";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { obtenerRecetaAPI } from "../../../helpers/queries";
import Swal from "sweetalert2";

const DetalleReceta = () => {
  const { id } = useParams();
  const [receta, setReceta] = useState({});

  useEffect(() => {
    //buscar el producto que quiero maquetar
    cargarDetalle();
  }, []);

  const cargarDetalle = async () => {
    const respuesta = await obtenerRecetaAPI(id);
    if (respuesta.status === 200) {
      const datoReceta = await respuesta.json();
      setReceta(datoReceta);
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: "Intente realizar esta operacion en unos minutos",
        icon: "error",
      });
    }
  };

  return (
    <Container className="mainSection my-3">
      <Row>
        <Col md={6} className="contenedorDetalleReceta text-center ">
          <h1 className="display-4 fw-semibold my-5">{receta.nombreReceta}</h1>
          <p className="my-5 fs-5">
            {receta.tiempo_preparacion} min <i className="bi bi-alarm"></i>
          </p>
          <p className="fs-5"><i className="bi bi-people-fill"></i> {receta.numero_comensales} comensales</p>
        </Col>
        <Col md={6} className="p-0">
          <Image src={receta.imagen}></Image>
        </Col>
        <Col md={6}>
          <h5 className="mt-4">Ingredientes:</h5>
          <p>{receta.ingredientes}</p>
        </Col>
        <Col md={6}>
          <h5 className="mt-4">Procedimiento:</h5>
          <p>{receta.procedimiento}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default DetalleReceta;
