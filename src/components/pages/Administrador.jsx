import { Table } from "react-bootstrap";
import ItemReceta from "./recetas/ItemReceta";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { leerRecetasAPI } from "../../helpers/queries";
const Administrador = () => {
    const [recetas, setRecetas] = useState([]);

useEffect(()=>{
  traerRecetas();
},[])

const traerRecetas = async()=>{
  try {
     const listaRecetasAPI = await leerRecetasAPI();
     setRecetas(listaRecetasAPI);
  } catch (error) {
    console.log(error)
  }
}
  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 colorFont {
">Recetas Cargadas</h1>
        <Link className="btn btn-primary" to="/administrador/crear">
          <i className="bi bi-file-earmark-plus"></i>
        </Link>
      </div>
      <hr />
      <Table responsive striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Cod</th>
            <th>Nombre</th>
            <th>URL de Imagen</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
        {
            recetas.map((receta)=><ItemReceta key={receta.id} receta={receta}></ItemReceta>)
          }
        </tbody>
      </Table>
    </section>
  );
};

export default Administrador;