import { declarations, employees, employeurs } from "../data.js";

class Declaration {
  constructor(id, anneeAndmois, dateDeclaration, enRetard, penalité) {
    this.id = id;
    this.anneeAndmois = anneeAndmois;
    this.dateDeclaration = dateDeclaration;
    this.enRetard = enRetard;
    this.penalité = penalité;
  }

  declare(employeur, declaration) {
    employeur.declarationList.push(declaration);
  }
}

const socialSelection = document.getElementById("employeur-selection");

const anneeMois = document.getElementById("annee-mois");

const declarationDate = document.getElementById("declaration-date");

const saveEmployeurBtn = document.querySelector(".save_employeur");

const declarationTable = document.querySelector(".employeur_table_data");

let selectedSocialRaison = "";

socialSelection.addEventListener("change", (event) => {
  selectedSocialRaison = event.target.value;
});

// On the program start
onload = () => buildTable();
const buildTable = () => {
  console.log("Start Build");

  const employeurList = employeurs.map((employeur) => {
    // Get Employeurs and handle their raison social in 'option', and buil the selection element
    let selectBar = `<option value=${employeur.sociale}>${employeur.sociale}</option>`;
    socialSelection.innerHTML += selectBar;
    return employeur;
  });

  for (const employeur of employeurList) {
    // Get employee salary of this employeur.
    let totalPay = getTotalPay(employeur.id);

    // Get declaration of this employeur, calculate penality of this employee and rebuild declaration table.
    getDeclaration(employeur.id, employeur.sector, totalPay);
  }
};

const joinEmployeurWithDeclarationForRerenderingTable = () => {
  employeurs.forEach((employeur) => {
    declarations.forEach((declaration) => {
      //let declarationEmployeur = declaration.employeurId == employeur.id;
      if (declaration.employeurId == employeur.id) {
        declarationEmployeur = declaration.employeurId;
        reRenderDeclarationTable(declarationEmployeur, employeur);
      }
    });
  });
};
const reRenderDeclarationTable = (declarationEmployeur, employeur) => {
  let table = `<tr>
                <td>${employeur.sociale}</td>
                <td>${declarationEmployeur.anneeMois}</td>
                <td>${declarationEmployeur.dateDeclaration}</td>
                <td class="isAjour">À jour</td>
                <td>1260 DH</td>
              </tr>`;

  document.querySelector(".employeur_table_data").innerHTML += table;
};

const addDeclaration = () => {
  // Get employeur which has this ' employeurSelection '
  const employeurId = findEmployeurBySociale(selectedSocialRaison).id;

  // Calculate the penalité of this employeur.
  const penalityRate = calculateThePenalityOfLating(
    anneeMois.value,
    declarationDate.value,
  );

  console.log("anneeMois", anneeMois.value);
  console.log("declarationDate=", declarationDate.value);

  // Check if this employeur has added a declaration in this month.

  const declareDate = new Date(declarationDate.value);
  const declarationmonth = declareDate.getMonth();
  let isAlreadyDeclared = alreadyDeclared(employeurId, declarationmonth);
  // If already added a declaration show him an Alert message.
  // Elese show him a success message
  
  // declaration Object
  let declaration = {
    id: Date.now(),
    anneeMois: anneeMois.value,
    dateDeclaration: declarationDate.value,
    penalité: penalityRate,
    employeurId: employeurId,
  };

  // Then add declaration of this employeur
  declarations.push(declaration);

  // Get total pay from employees salary whose working with this employeur.
  let totalPay = getTotalPay(employeurId);
  const penality = calculateThePenalityOfLating(
    declaration.anneeMois,
    declaration.dateDeclaration,
  );
  // reRender table screen.
  let table = `<tr>
                <td>${selectedSocialRaison}</td>
                <td>${declaration.anneeMois}</td>
                <td>${declaration.dateDeclaration}</td>
                <td>${penality}</td>
                <td>${totalPay} DH</td>
              </tr>`;

  declarationTable.innerHTML += table;
};

saveEmployeurBtn.addEventListener("click", addDeclaration);

const findEmployeurBySociale = (sociale) => {
  for (const employeur of employeurs) {
    if (employeur.sociale == sociale) {
      return employeur;
    }
  }
};

const calculateThePenalityOfLating = (date, decDate) => {
  // Convert input date to js date.
  const payDate = new Date(date);
  const declareDate = new Date(decDate);
  const payDay = payDate.getDate();
  const decDay = declareDate.getDate();
  return (decDay - payDay) * 0.1;
};

const getTotalPay = (employeurId) => {
  let totalPay = 0;
  for (let employee of employees) {
    if (employee.employeurId == employeurId) {
      totalPay += employee.salaire;
    }
  }
  return totalPay;
};

const getDeclaration = (...data) => {
  for (const declaration of declarations) {
    if (declaration == data[0]) {
      const penality = calculateThePenalityOfLating(
        declaration.anneeMois,
        declaration.dateDeclaration,
      );
      let table = `<tr>
                <td>${data[1]}</td>
                <td>${declaration.anneeMois}</td>
                <td>${declaration.dateDeclaration}</td>
                <td>${penality}</td>
                <td>${data[2]} DH</td>
              </tr>`;

      declarationTable.innerHTML += table;
    }
  }
};

const alreadyDeclared = (employeurId, declarationDate) => {
  for (const employeur of employeurs) {
  }
};
