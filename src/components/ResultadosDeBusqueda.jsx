import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import recipesData from '../../db.json';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q').toLowerCase();
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Filtrar las recetas que coinciden con la búsqueda
    const results = recipesData.filter(recipe =>
      recipe.name.toLowerCase().includes(query)
    );
    setFilteredRecipes(results);
  }, [query]);

  return (
    <div>
      <h2>Resultados para: "{query}"</h2>
      <ul>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <li key={recipe.id}>{recipe.name}: {recipe.description}</li>
          ))
        ) : (
          <li>No se encontraron resultados</li>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
