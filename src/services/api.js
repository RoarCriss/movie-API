const API_KEY = import.meta.env.VITE_API_KEY;

// funcion para crear la url dinámica en función a la categoría de peliculas
export function createMovieUrl(category, page) {
  const URL_BASE = "https://api.themoviedb.org/3/";

  const URL = `${URL_BASE}movie/${category}?api_key=${API_KEY}&page=${page}`;

  return URL;
}

// función para hacer peticion get a las peliculas según categoría seleccionada
export async function fetchMovies(category, page = 1) {
  const URL = createMovieUrl(category, page);

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    // renderMovies(data.results);
    // updatePagination(data.total_pages, category);
    return data;
  } catch (error) {
    console.log(`Hubo un problema con la solicitud: ${error}`);
    return null;
  }
}
