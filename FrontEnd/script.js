const divGallery = document.querySelector(".gallery");
const sectionPortfolio = document.querySelector("#portfolio");

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

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    const divFilterElement = document.createElement("div");
    divFilterElement.classList = "filters";
    sectionPortfolio.appendChild(divFilterElement);
    for (let i in categories) {
      const buttonElement = document.createElement("button");
      buttonElement.innerText = categories[i].name;
      buttonElement.classList = "button-filter";
      const divFilter = document.querySelector(".filters");
      divFilter.appendChild(buttonElement);
    }
  });
