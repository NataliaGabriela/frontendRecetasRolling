import { Container, Row, Image } from "react-bootstrap";
import CardReceta from "./recetas/CardReceta";
import { useEffect, useState } from "react";
import { leerRecetasAPI } from "../../helpers/queries";
import "../../App.css";
import banner from "../../assets/banner.png";
const Inicio = () => {
  const [recetas, setRecetas] = useState([]);
  useEffect(() => {
    traerRecetas();
  }, []);
  const traerRecetas = async () => {
    try {
      const listaRecetasAPI = await leerRecetasAPI();
      setRecetas(listaRecetasAPI);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="mainSection">
      <div className="portadaRecetas mb-5 text-center">
        <Image src={banner} className="banner" />
        <div className="tiuloPrincipal">
          <h1 className="display-1 colorFont ">Recetas Rolling</h1>
        </div>
      </div>

      <Container>
        <Row>
          {recetas && recetas.length > 0 ? (
            recetas.map((receta) => (
              <CardReceta key={receta.id} receta={receta} />
            ))
          ) : (
            <p>No hay recetas disponibles</p>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;
