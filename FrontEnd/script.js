const figureOne = document.querySelector("#gallery__figure-one");

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((response2) => {
    const img = document.createElement("img");
    img.src = response2[0].imageUrl;
    figureOne.appendChild(img);
  });

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((response2) => {
    const figcaption = document.createElement("figcaption");
    figcaption.innerText = response2[0].title;
    figureOne.appendChild(figcaption);
  });
