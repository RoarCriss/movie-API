const API_KEY = import.meta.env.VITE_API_KEY;

// funcion para crear la url dinámica en función a la categoría de peliculas
function createMovieUrl(category, page) {
  const URL_BASE = "https://api.themoviedb.org/3/";

  const URL = `${URL_BASE}movie/${category}?api_key=${API_KEY}&page=${page}`;

  return URL;
}

// función para hacer peticion get a las peliculas según categoría seleccionada
async function fetchMovies(category, page = 1) {
  const URL = createMovieUrl(category, page);

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    renderMovies(data.results);
    updatePagination(data.total_pages, category);
    return data;
  } catch (error) {
    console.log(`Hubo un problema con la solicitud: ${error}`);
  }
}

// funcion renderizadora de películas
function renderMovies(movies) {
  console.log("Renderizando películas...");

  let movieContainer = document.querySelector(".movie-container");

  if (!movieContainer) {
    movieContainer = document.createElement("section");
    movieContainer.className = "movie-container";
    const ROOT = document.getElementById("app");
    ROOT.appendChild(movieContainer);
  } else {
    movieContainer.innerHTML = "";
  }

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.className = "movie-card";

    //creación path poster
    const posterPath = movie.poster_path;

    if (posterPath) {
      const poster = document.createElement("img");
      poster.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
      poster.alt = `movie poster from ${movie.title}`;
      movieElement.appendChild(poster);
    } else {
      console.log("No poster found for this movie");
    }

    const title = document.createElement("h2");
    title.textContent = movie.title;
    movieElement.appendChild(title);

    const overview = document.createElement("p");
    overview.textContent = movie.overview;
    movieElement.appendChild(overview);

    const releaseDate = document.createElement("p");
    releaseDate.textContent = `Release date: ${movie.release_date}`;
    movieElement.appendChild(releaseDate);

    const rating = document.createElement("p");
    rating.textContent = `Rating: ${movie.vote_average.toFixed(2)}`;
    movieElement.appendChild(rating);

    movieContainer.appendChild(movieElement);
  });

  const totalMoviesContainer = document.createElement("p");
  //   totalMoviesContainer.textContent = `Movie total per page: ${movies.length}`;
  movieContainer.appendChild(totalMoviesContainer);
}

// funcion para crear selector de categoría

function createCategorySelector() {
  const selectContainer = document.createElement("div");
  selectContainer.className = "select-container";

  const ROOT = document.getElementById("app");
  if (!ROOT) {
    console.log("ROOT element not found");
    return;
  }
  ROOT.appendChild(selectContainer);

  const label = document.createElement("label");
  label.for = "category-selector";
  label.textContent = "Category:";
  selectContainer.appendChild(label);

  const select = document.createElement("select");
  select.name = "category";
  select.id = "category";
  selectContainer.appendChild(select);

  const categories = ["now_playing", "popular", "top_rated", "upcoming"];

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });

  // evento manejador de cambio de categoría
  select.addEventListener("change", async (e) => {
    const selectedCategory = e.target.value;
    console.log(selectedCategory);
    clearMovies();
    await fetchMovies(selectedCategory, 1);
  });
}

// funcion para limpiar las peliculas cuando la categoría cambia
function clearMovies() {
  const ROOT = document.getElementById("app");
  const existingContainer = document.querySelector(".movie-container");

  if (existingContainer) {
    ROOT.removeChild(existingContainer);
  } else {
    console.log("No movie container to clear");
  }
}

// función para actualizar paginacion
let page = 1;

function updatePagination(totalPages, category) {
  const existingPagination = document.querySelector(".pagination-container");

  if (existingPagination) {
    existingPagination.remove();
  }

  const paginationContainer = document.createElement("div");
  paginationContainer.className = "pagination-container";

  //botón pag. anterior
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = page === 1;
  prevButton.addEventListener("click", () => {
    if (page > 1) {
      page--;
      fetchMovies(category, page);
    }
  });
  paginationContainer.appendChild(prevButton);

  // número página actual
  const currentPage = document.createElement("span");
  currentPage.textContent = `Page ${page} of ${totalPages}`;
  paginationContainer.appendChild(currentPage);

  // botón pag. siguiente
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = page === totalPages;
  nextButton.addEventListener("click", () => {
    if (page < totalPages) {
      page++;
      fetchMovies(category, page);
    }
  });
  paginationContainer.appendChild(nextButton);

  const ROOT = document.getElementById("app");
  ROOT.appendChild(paginationContainer);
}

createCategorySelector();
const DEFAULT_CATEGORY = "now_playing";
fetchMovies(DEFAULT_CATEGORY);
