const divGallery = document.querySelector(".gallery");
const sectionPortfolio = document.querySelector("#portfolio");
const modalDivGallery = document.querySelector(".modal-gallery");

//affichage galerie
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((gallery) => {
    displayGallery(gallery);
    //affichage des catégories
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
        const buttonFilter = document.querySelectorAll(".button-filter");
        const buttonFilterTous = document.querySelector(".filter-Tous");
        buttonFilterTous.classList.add("button-filter-selected");
        function changeButtonBackground(button) {
          buttonFilter.forEach((i) =>
            i.classList.remove("button-filter-selected")
          );
          button.classList.add("button-filter-selected");
        }

        buttonFilterTous.addEventListener("click", function () {
          const galleryTous = gallery.filter(function (gallery) {
            return gallery;
          });
          changeButtonBackground(buttonFilterTous);
          divGallery.innerHTML = "";
          displayGallery(gallery);
        });
        const buttonFilterObjets = document.querySelector(".filter-Objets");
        buttonFilterObjets.addEventListener("click", function () {
          const galleryObjets = gallery.filter(function (gallery) {
            return gallery.categoryId == 1;
          });
          changeButtonBackground(buttonFilterObjets);
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
          changeButtonBackground(buttonFilterAppartements);
          divGallery.innerHTML = "";
          displayGallery(galleryAppartements);
        });
        const buttonFilterHotelsEtRestaurants =
          document.querySelector(".filter-Hotels");
        buttonFilterHotelsEtRestaurants.addEventListener("click", function () {
          const galleryHotelsEtRestaurants = gallery.filter(function (gallery) {
            return gallery.categoryId == 3;
          });
          changeButtonBackground(buttonFilterHotelsEtRestaurants);
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
  const modifyLinkElement = document.querySelector(".modal-link");
  const modalElement = document.querySelector(".modal");
  const arrowLeftElement = document.querySelector(".arrow-left");
  const modalNavElement = document.querySelector(".modal-nav");
  const modalWindowElement = document.querySelector(".modal-window");

  const openModalWindow = function () {
    modalElement.style.display = "flex";
    arrowLeftElement.style.display = "none";
    modalNavElement.style.justifyContent = "flex-end";
  };
  modifyLinkElement.addEventListener("click", openModalWindow);

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

  // ouverture 2ème page modale
  const addPictureButtonElement = document.querySelector(".add-picture-button");
  const modalSecondPageElement = document.querySelector(".modal-second-page");
  const openSecondPageModal = function () {
    modalSecondPageElement.style.display = "flex";
    modalWindowElement.style.display = "none";
  };
  addPictureButtonElement.addEventListener("click", openSecondPageModal);

  // retour vers la première page
  const returnToModalWindow = function () {
    modalSecondPageElement.style.display = "none";
    modalWindowElement.style.display = "flex";
  };
  const arrowLeftFormElement = document.querySelector(".arrow-left-form");
  arrowLeftFormElement.addEventListener("click", returnToModalWindow);

  // fermeture 2ème page modale
  modalSecondPageElement.addEventListener("click", stopPropagation);
  const xmarkFormElement = document.querySelector(".xmark-form");
  const closeSecondPageModal = function () {
    modalSecondPageElement.style.display = "none";
    modalElement.style.display = "none";
    modalWindowElement.style.display = "flex";
  };
  xmarkFormElement.addEventListener("click", closeSecondPageModal);
}

//affichage des catégories dans le formulaire
function displayCategoriesInForm() {
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      const categorieSelectElement =
        document.querySelector(".categorie-select");
      for (let i in categories) {
        const optionElement = document.createElement("option");
        optionElement.innerText = categories[i].name;
        optionElement.setAttribute("value", categories[i].id);
        categorieSelectElement.appendChild(optionElement);
      }
    });
}
displayCategoriesInForm();

// affichage image sélectionnée
const modalFormAddPhotoElement = document.querySelector(
  ".modal-form-add-photo"
);
const modalFormAPhotoPreviewElement = document.querySelector(
  ".modal-form-photo-preview"
);
const fileInput = document.querySelector(".file-input");
fileInput.addEventListener("change", function (event) {
  modalFormAddPhotoElement.style.display = "none";
  modalFormAPhotoPreviewElement.style.display = "flex";
  const previewImageElement = document.createElement("img");
  previewImageElement.className = "preview-image";
  modalFormAPhotoPreviewElement.appendChild(previewImageElement);
  const imageFile = fileInput.files[0];
  const selectedFile = event.target.files[0];
  previewImageElement.src = "./assets/images/" + selectedFile.name;
});

//vérification du remplissage de tous les champs et changement de couleur du bouton valider
const titleInput = document.querySelector(".title-input");
const categoryId = document.querySelector(".categorie-select");

function checkFields() {
  const addPictureButtonElement = document.querySelector(
    ".valid-add-picture-button"
  );
  const titleInputValue = titleInput.value;
  const categoryIdValue = categoryId.value;
  const imageFile = fileInput.files[0];
  if (
    imageFile !== undefined &&
    titleInputValue !== "" &&
    categoryIdValue !== ""
  ) {
    addPictureButtonElement.style.backgroundColor = "#1D6154";
  }
}

titleInput.addEventListener("input", checkFields);
categoryId.addEventListener("change", checkFields);
fileInput.addEventListener("change", checkFields);

// récupération des éléments du formulaire
const modalForm = document.querySelector("#modal-form");
modalForm.addEventListener("submit", addWork);
function addWork(e) {
  e.preventDefault();
  const titleInputValue = document.querySelector(".title-input").value;
  const categoryIdValue = document.querySelector(".categorie-select").value;
  const formData = new FormData();
  const imageFile = fileInput.files[0];
  formData.append("image", imageFile);
  formData.append("title", titleInputValue);
  formData.append("category", categoryIdValue);

  // envoi des éléments sur le serveur
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${tokenStorage}`,
    },
  }).then((response) => {
    if (response.ok) {
      // mise à jour des galleries
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
      // réinitialisation des champs du formulaire
      modalFormAPhotoPreviewElement.innerHTML = "";
      modalFormAPhotoPreviewElement.style.display = "none";
      modalFormAddPhotoElement.style.display = "flex";
      const categorySelectedElement =
        document.querySelector(".categorie-select");
      categorySelectedElement.value = "";
      const titleInputElement = document.querySelector(".title-input");
      titleInputElement.value = "";
    }
  });
}
