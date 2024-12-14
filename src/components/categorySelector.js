// funcion para crear selector de categoría
export function createCategorySelector(handleCategoryChange) {
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
  //   select.addEventListener("change", async (e) => {
  //     const selectedCategory = e.target.value;
  //     console.log(selectedCategory);
  //     clearMovies();
  //     await fetchMovies(selectedCategory, 1);
  //   });
  select.addEventListener("change", handleCategoryChange);
}
