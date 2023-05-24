fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((gallery) => {
    for (let i in gallery) {
      const figureElement = document.createElement("figure");
      const imgElement = document.createElement("img");
      imgElement.src = gallery[i].imageUrl;
      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.innerText = gallery[i].title;

      const divGallery = document.querySelector(".gallery");
      divGallery.appendChild(figureElement);
      figureElement.appendChild(imgElement);
      figureElement.appendChild(figcaptionElement);
    }
  });
