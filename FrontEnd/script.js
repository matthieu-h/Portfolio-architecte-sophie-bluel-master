const divGallery = document.querySelector(".gallery");
const sectionPortfolio = document.querySelector("#portfolio");

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((gallery) => {
    displayGallery(gallery);
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
          buttonElement.classList =
            "button-filter filter-" + categories[i].name;
          divFilter.appendChild(buttonElement);
        }
        // filtres des catégories lors du clic sur les boutons
        const buttonFilterTous = document.querySelector(".filter-Tous");
        buttonFilterTous.addEventListener("click", function () {
          const galleryTous = gallery.filter(function (gallery) {
            return gallery;
          });
          divGallery.innerHTML = "";
          displayGallery(gallery);
        });
        const buttonFilterObjets = document.querySelector(".filter-Objets");
        buttonFilterObjets.addEventListener("click", function () {
          const galleryObjets = gallery.filter(function (gallery) {
            return gallery.categoryId == 1;
          });
          divGallery.innerHTML = "";
          displayGallery(galleryObjets);
        });
        const buttonFilterAppartements = document.querySelector(
          ".filter-Appartements"
        );
        buttonFilterAppartements.addEventListener("click", function () {
          const galleryAppartements = gallery.filter(function (gallery) {
            return gallery.categoryId == 2;
          });
          divGallery.innerHTML = "";
          displayGallery(galleryAppartements);
        });
        const buttonFilterHotelsEtRestaurants =
          document.querySelector(".filter-Hotels");
        buttonFilterHotelsEtRestaurants.addEventListener("click", function () {
          const galleryHotelsEtRestaurants = gallery.filter(function (gallery) {
            return gallery.categoryId == 3;
          });
          divGallery.innerHTML = "";
          displayGallery(galleryHotelsEtRestaurants);
        });
        if (tokenStorage) {
          displayHomepageEdit();
          divFilter.classList = " filters-homepage-edit";
        }
      });
  });

// Récupération du token dans le stockage de la session
const tokenObject = window.sessionStorage.getItem("token");
const tokenObjectStorage = JSON.parse(tokenObject);
const tokenStorage = tokenObjectStorage.token;

function displayGallery(gallery) {
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
}

function displayHomepageEdit() {
  const editionBarElement = document.createElement("div");
  editionBarElement.classList = "edition-bar";
  const body = document.querySelector("body");
  body.appendChild(editionBarElement);

  const iconElement = document.createElement("img");
  iconElement.src = "./assets/icons/pen-to-square-solid.svg";
  const divEditionBar = document.querySelector(".edition-bar");
  divEditionBar.appendChild(iconElement);

  const pElement = document.createElement("p");
  pElement.innerHTML = "Mode édition";
  divEditionBar.appendChild(pElement);

  const buttonElement = document.createElement("button");
  buttonElement.innerHTML = "publier les changements";
  divEditionBar.appendChild(buttonElement);

  const icon2Element = document.createElement("img");
  icon2Element.src = "./assets/icons/pen-to-square-solid.svg";
  const divMesProjets = document.querySelector(".mes-projets");
  divMesProjets.appendChild(icon2Element);

  const modifierElement = document.createElement("p");
  modifierElement.innerHTML = "modifier";
  divMesProjets.appendChild(modifierElement);

  divMesProjets.classList = "mes-projets mes-projets-edit";
}
