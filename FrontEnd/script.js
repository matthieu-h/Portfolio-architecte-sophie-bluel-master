const divGallery = document.querySelector(".gallery");
const sectionPortfolio = document.querySelector("#portfolio");
const modalDivGallery = document.querySelector(".modal-gallery");

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
          divFilter.style.display = "none";
          displaymodalGallery(gallery);
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

function displaymodalGallery(gallery) {
  for (let i in gallery) {
    const figureModalElement = document.createElement("figure");
    const imgModalElement = document.createElement("img");
    imgModalElement.src = gallery[i].imageUrl;
    const divTrashCanElement = document.createElement("div");
    divTrashCanElement.classList = "trash-can";
    const imgTrashCanElement = document.createElement("img");
    imgTrashCanElement.src = "./assets/icons/trash-can-solid.svg";
    imgTrashCanElement.id = gallery[i].id;
    const pEditElement = document.createElement("p");
    pEditElement.innerText = "éditer";
    modalDivGallery.appendChild(figureModalElement);
    figureModalElement.appendChild(imgModalElement);
    figureModalElement.appendChild(pEditElement);
    figureModalElement.appendChild(divTrashCanElement);
    divTrashCanElement.appendChild(imgTrashCanElement);
    // Suppression de travaux et mise à jour des galleries modale et principale
    const deleteWork = function (id) {
      const idNumber = this.id;
      console.log(idNumber);
      fetch(`http://localhost:5678/api/works/${idNumber}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenStorage}`,
        },
      }).then((response) => {
        if (response.ok) {
          divGallery.innerHTML = "";
          modalDivGallery.innerHTML = "";
          fetch("http://localhost:5678/api/works")
            .then((response) => response.json())
            .then((gallery) => {
              displayGallery(gallery);
              fetch("http://localhost:5678/api/categories")
                .then((response) => response.json())
                .then((categories) => {
                  displaymodalGallery(gallery);
                });
            });
        }
      });
    };
    imgTrashCanElement.addEventListener("click", deleteWork);
  }
}
//
function displayHomepageEdit() {
  //affichage barre d'édition en haut de page
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

  //affichage 1er élément modifier
  const divModifierElement = document.createElement("div");
  divModifierElement.classList = "modify";
  const introfigureElement = document.querySelector("figure");
  introfigureElement.appendChild(divModifierElement);

  const icon2Element = document.createElement("img");
  icon2Element.src = "./assets/icons/pen-to-square-solid.svg";
  icon2Element.classList = "modify-icon";
  divModifierElement.appendChild(icon2Element);

  const modifierElement = document.createElement("a");
  modifierElement.href = "#modal";
  modifierElement.innerHTML = "modifier";
  modifierElement.classList = "modal-link";
  divModifierElement.appendChild(modifierElement);

  //affichage 2ème élément modifier
  const icon3Element = document.createElement("img");
  icon3Element.src = "./assets/icons/pen-to-square-solid.svg";
  const divMesProjets = document.querySelector(".mes-projets");
  divMesProjets.appendChild(icon3Element);

  const modifier2Element = document.createElement("a");
  modifier2Element.href = "#modal";
  modifier2Element.innerHTML = "modifier";
  modifier2Element.classList = "modal-link";
  divMesProjets.appendChild(modifier2Element);

  divMesProjets.classList = "mes-projets mes-projets-edit";

  //affichage fenêtre modale
  const modifyLinkElement = document.querySelectorAll(".modal-link");
  const modalElement = document.querySelector(".modal");
  const arrowLeftElement = document.querySelector(".arrow-left");
  const modalNavElement = document.querySelector(".modal-nav");
  const modalWindowElement = document.querySelector(".modal-window");

  const openModalWindow = function () {
    modalElement.style.display = "flex";
    arrowLeftElement.style.display = "none";
    modalNavElement.style.justifyContent = "flex-end";
  };
  modifyLinkElement.forEach((a) => {
    a.addEventListener("click", openModalWindow);
    return;
  });

  //fermeture fenêtre modale
  const closeModalWindow = function () {
    modalElement.style.display = "none";
  };
  const xmarkElement = document.querySelector(".xmark");
  xmarkElement.addEventListener("click", closeModalWindow);
  modalElement.addEventListener("click", closeModalWindow);
  const stopPropagation = function (e) {
    e.stopPropagation();
  };
  modalWindowElement.addEventListener("click", stopPropagation);
}
