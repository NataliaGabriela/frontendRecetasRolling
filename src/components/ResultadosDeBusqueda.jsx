import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import recipesData from '../../db.json';
import { Container, Row } from 'react-bootstrap'; // Mantén solo los componentes necesarios
import CardReceta from "../components/pages/recetas/CardReceta"; // Asegúrate de que la ruta sea correcta

const ResultadosDeBusqueda = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q')?.toLowerCase() || '';
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        console.log("Datos cargados:", recipesData.recetas); // Verifica los datos aquí
        const results = recipesData.recetas.filter(recipe =>
            recipe.nombreReceta.toLowerCase().includes(query) ||
            recipe.ingredientes.some(ingrediente => ingrediente.toLowerCase().includes(query)) // También filtra por ingredientes
        );
        setFilteredRecipes(results);
    }, [query]);

    return (
        <Container>
            <h2>Resultados para: "{query}"</h2>
            <Row>
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                        <CardReceta key={recipe.id} receta={recipe} />
                    ))
                ) : (
                    <div>
                        <p>No se encontraron resultados</p>
                    </div>
                )}
            </Row>
        </Container>
    );
};

export default ResultadosDeBusqueda;