import { Route, Routes } from "react-router-dom";
import Administrador from "../pages/Administrador";
import FormularioReceta from "../pages/recetas/FormularioReceta";


const RutasAdmin = () => {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<Administrador></Administrador>}
        ></Route>
        <Route
          exact
          path="/crear"
          element={
            <FormularioReceta
              editar={false}
              titulo="Nuevo Receta"
            ></FormularioReceta>
          }
        ></Route>
        <Route
          exact
          path="/editar/:id"
          element={
            <FormularioReceta
              editar={true}
              titulo="Editar Receta"
            ></FormularioReceta>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default RutasAdmin;