// funcion renderizadora de películas
export function renderMovies(movies) {
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

  //   const totalMoviesContainer = document.createElement("p");
  //   totalMoviesContainer.textContent = `Movie total per page: ${movies.length}`;
  //   movieContainer.appendChild(totalMoviesContainer);
}
