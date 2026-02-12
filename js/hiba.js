const SocialeEl = document.querySelector("#Sociale");
const SecteurEl = document.querySelector("#Secteur");
const allInputs = document.querySelectorAll(".inputEl");
const p = document.querySelector("#message");
console.log(allInputs);

const btn = document.querySelector(".btn");

const formCon = document.querySelector(".form-contianer");

const checkInputs = function (e) {
  e.preventDefault();
  const sociale = SocialeEl.value.trim();
  const sector = SecteurEl.value.trim();

  let employeur = JSON.parse(localStorage.getItem("employeurs")) || [];

  // ------------- pushing data into localStorage----------------
  if (!Sociale || !Secteur) {
    p.textContent = "Remplir les champs";
    return;
  } else {
    employeur.push({
      id: employeur.length + 1,
      sociale,
      sector,
    });
    p.textContent = "Employeur ajouté avec succès";
  }

  localStorage.setItem("employeurs", JSON.stringify(employeur));

  renderAppointment();
  formCon.reset();
};

formCon.addEventListener("submit", checkInputs);

function renderAppointment() {
  const tbody = document.querySelector("#tableauBody");
  let employeur = JSON.parse(localStorage.getItem("employeurs")) || [];

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
              <td>${element.sociale}</td>
              <td>${element.sector}</td>
            `;
      tbody.appendChild(tr);
    });
  }
}
function deleteItem(index) {
  let employeur = JSON.parse(localStorage.getItem("employeurs")) || [];
  employeur.splice(index, 1);

  localStorage.setItem("employeurs", JSON.stringify(employeur));
  renderAppointment();
}
renderAppointment();
