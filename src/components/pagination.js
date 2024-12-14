// función para actualizar paginacion
export function updatePagination(totalPages, category, page, handlePageChange) {
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
  //   prevButton.addEventListener("click", () => {
  //     if (page > 1) {
  //       page--;
  //       fetchMovies(category, page);
  //     }
  //   });
  prevButton.addEventListener("click", () => handlePageChange(page - 1));
  paginationContainer.appendChild(prevButton);

  // número página actual
  const currentPage = document.createElement("span");
  currentPage.textContent = `Page ${page} of ${totalPages}`;
  paginationContainer.appendChild(currentPage);

  // botón pag. siguiente
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = page === totalPages;
  //   nextButton.addEventListener("click", () => {
  //     if (page < totalPages) {
  //       page++;
  //       fetchMovies(category, page);
  //     }
  //   });
  nextButton.addEventListener("click", () => handlePageChange(page + 1));
  paginationContainer.appendChild(nextButton);

  const ROOT = document.getElementById("app");
  ROOT.appendChild(paginationContainer);
}
