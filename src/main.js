import { fetchMovies } from "./services/api";
// import { renderMovies, createCategorySelector, updatePagination } from "./ui";
import { renderMovies } from "./components/renderMovies";
import { createCategorySelector } from "./components/categorySelector";
import { updatePagination } from "./components/pagination";

let page = 1;

function handleCategoryChange(e) {
  const selectedCategory = e.target.value;
  clearMovies();
  fetchMovies(selectedCategory, page).then((data) => {
    if (data && data.results) {
      renderMovies(data.results);
      updatePagination(
        data.total_pages,
        selectedCategory,
        page,
        handlePageChange
      );
    } else {
      console.error("No data or results found");
    }
  });
}

function handlePageChange(newPage) {
  page = newPage;
  const category = document.getElementById("category").value;
  fetchMovies(category, page).then((data) => {
    if (data && data.results) {
      renderMovies(data.results);
      updatePagination(data.total_pages, category, page, handlePageChange);
    } else {
      console.error("No data or results found");
    }
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

createCategorySelector(handleCategoryChange);
const DEFAULT_CATEGORY = "now_playing";
fetchMovies(DEFAULT_CATEGORY, page).then((data) => {
  console.log("Datos recibidos:", data);
  if (data && data.results) {
    renderMovies(data.results);
    updatePagination(
      data.total_pages,
      DEFAULT_CATEGORY,
      page,
      handlePageChange
    );
  } else {
    console.error("No data or results found");
  }
});
