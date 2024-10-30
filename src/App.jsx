import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Inicio from "./components/pages/Inicio";
import Error from "./components/pages/Error";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetalleReceta from "./components/pages/recetas/DetalleReceta";
import { useState } from "react";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import RutasAdmin from "./components/routes/RutasAdmin";
import Login from "./components/pages/Login";
import SearchResults from "./components/ResultadosDeBusqueda"; // Asegúrate de importar tu componente de búsqueda

function App() {
  const usuario =
    JSON.parse(sessionStorage.getItem("inicioRollingCoffe")) || "";
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario);
  
  return (
    <BrowserRouter>
      <NavBar usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} />
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route exact path="/detalleReceta/:id" element={<DetalleReceta />} />
        <Route exact path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado} />} />
        <Route exact path="/search" element={<SearchResults />} /> 
        <Route exact path="/administrador/*" element={
          <RutasProtegidas>
            <RutasAdmin />
          </RutasProtegidas>
        } />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
