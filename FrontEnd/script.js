const divGallery = document.querySelector(".gallery");
const sectionPortfolio = document.querySelector("#portfolio");

// import de la gallery
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((gallery) => {
    for (let i in gallery) {
      const figureElement = document.createElement("figure");
      const imgElement = document.createElement("img");
      imgElement.src = gallery[i].imageUrl;
      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.innerText = gallery[i].title;

      divGallery.appendChild(figureElement);
      figureElement.appendChild(imgElement);
      figureElement.appendChild(figcaptionElement);
    }
  });

// création des boutons filtres en fonction du nombre de catégories
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    const divFilterElement = document.createElement("div");
    divFilterElement.classList = "filters";
    sectionPortfolio.appendChild(divFilterElement);
    const divFilter = document.querySelector(".filters");

    const buttonAllElement = document.createElement("button");
    buttonAllElement.innerText = "Tous";
    buttonAllElement.classList = "button-filter filter-Tous";
    divFilter.appendChild(buttonAllElement);

    for (let i in categories) {
      const buttonElement = document.createElement("button");
      buttonElement.innerText = categories[i].name;
      buttonElement.classList = "button-filter filter-" + categories[i].name;
      divFilter.appendChild(buttonElement);
    }
  });
