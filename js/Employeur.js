let myarray = [];
const Employeur = document.querySelector("#employeur");
const Sociale = document.querySelector("#Sociale");
const Secteur = document.querySelector("#Secteur");

const form = document.querySelector(".left form");
const p = document.querySelector("#message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let chek = {
    employeur: Employeur.value,
    sociale: Sociale.value,
    secteur: Secteur.value,
  };

  if (Employeur.value === "" || Sociale.value === "" || Secteur.value === "") {
    p.textContent = "Remplir les champs";
  } else {
    myarray.push(chek);
    p.textContent = "Employeur ajouté avec succès";
  }

  form.reset();
});
