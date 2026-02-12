const SocialeEl = document.querySelector("#Sociale");
const SecteurEl = document.querySelector("#Secteur");
const allInputs = document.querySelectorAll(".inputEl");
const p = document.querySelector("#message");
console.log(allInputs);

const btn = document.querySelector(".btn");

const formCon = document.querySelector(".form-contianer");

const checkInputs = function (e) {
  e.preventDefault();
  const Sociale = SocialeEl.value.trim();
  const Secteur = SecteurEl.value.trim();

  let employeur = JSON.parse(localStorage.getItem("employeur")) || [];

  // ------------- pushing data into localStorage----------------
  if (!Sociale || !Secteur) {
    p.textContent = "Remplir les champs";
    return;
  }else{
    employeur.push({
      id: employeur.length + 1,
      Sociale,
      Secteur,
    });
    p.textContent = "Employeur ajouté avec succès";

  }


  localStorage.setItem("employeur", JSON.stringify(employeur));

  renderAppointment();
  formCon.reset();
};

formCon.addEventListener("submit", checkInputs);

function renderAppointment() {
  const tbody = document.querySelector("#tableauBody");
  let employeur = JSON.parse(localStorage.getItem("employeur")) || [];

  tbody.innerHTML = "";

  if (employeur.length === 0) {
    tbody.innerHTML = `
        <tr>
            <td colspan="6"> Aucun Rendez-Vous Ajouté Pour L'instant </td>
        </tr>
        `;
  } else {
    employeur.forEach((element, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <tr>
              <td>${element.id}</td>
              <td>${element.Sociale}</td>
              <td>${element.Sociale}</td>
            `;
      tbody.appendChild(tr);
    });
  }
}
function deleteItem(index) {
  let employeur = JSON.parse(localStorage.getItem("employeur")) || [];
  employeur.splice(index, 1);

  localStorage.setItem("employeur", JSON.stringify(employeur));
  renderAppointment();
}
renderAppointment();
