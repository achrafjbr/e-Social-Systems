let myarray = [];
const Employeur = document.querySelector("#employeur");
const Sociale = document.querySelector("#Sociale");
const Secteur = document.querySelector("#Secteur");

const form = document.querySelector(".left form");
const p = document.querySelector("#message");

const tablebody = document.querySelector("#tableauBody");
//---function ajouter start---//
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
  Afficher();
  form.reset();
});
//---function ajouter ends---//

//---function afficher start---//
function Afficher() {
  tablebody.innerHTML = "";
  if (myarray.length == 0) {
    tablebody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; font-weight: 600">
          Aucun Rendez-Vous Ajouté Pour L'instant
        </td>
      </tr>
    `;
  } else {
    myarray.forEach((elm, index) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${elm.employeur}</td>
      <td>${elm.sociale}</td>
      <td>${elm.secteur}</td>
      <td>${elm.secteur}</td>
      <td><span class="material-symbols-outlined deleteBtn"
      onclick = "deleteItem(${index})">
    delete
    </span></td>
      `;
      tablebody.appendChild(tr);
    });
  }
}
//---function afficher ends---//

//---Function delete start---//
function deleteItem(index) {
  myarray.splice(index, 1);
  Afficher();
}
//---Function delete ends---//
Afficher();