import Container from 'react-bootstrap/Container';
import { Button, Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import '../../App.css';

const NavBar = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    // Aquí puedes redirigir a la página de resultados o manejar la búsqueda
    console.log("Buscando:", searchInput);
    navegacion(`/search?q=${searchInput}`);
  };

  const logout = () => {
    sessionStorage.removeItem('inicioRollingRecetas');
    setUsuarioLogueado("");
    navegacion('/');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img src={logo} alt="logo Rolling Recetas" className='img-fluid' width={200} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink end className='nav-link' to='/'>Inicio</NavLink>
            {usuarioLogueado.length > 0 ? (
              <>
                <NavLink end className="nav-link" to="/administrador">
                  Administrador
                </NavLink>
                <Button className="nav-link" variant="link" onClick={logout}>logout</Button>
              </>
            ) : (
              <NavLink end className="nav-link" to="/login">
                Login
              </NavLink>
            )}
          </Nav>
          
          {/* Formulario de búsqueda */}
          <Form className="d-flex ms-3" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Buscar..."
              className="me-2"
              aria-label="Buscar"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
