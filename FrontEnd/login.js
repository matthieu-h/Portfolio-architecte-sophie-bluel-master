// email: sophie.bluel@test.tld
// password: S0phie

// Récupération mail et mot de passe du formulaire Log in
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", function logIn(event) {
  event.preventDefault();
  const loginValues = {
    email: event.target.querySelector("[name = email]").value,
    password: event.target.querySelector("[name = password]").value,
  };
  const loginObject = JSON.stringify(loginValues);

  //Envoi mail et mot de passe à l'API

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: loginObject,
  }).then(function (response) {
    response.json().then((token) => {
      if (response.ok) {
        const tokenStorage = JSON.stringify(token);
        window.sessionStorage.setItem("token", tokenStorage);
        document.location.assign("./index.html");
      } else {
        const pMessageElement = document.createElement("p");
        pMessageElement.classList = "message";
        pMessageElement.innerText = "Email et/ou mot de passe incorrects";
        const loginSection = document.querySelector("#login");
        loginSection.appendChild(pMessageElement);
      }
    });
  });
});
