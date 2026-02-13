//import { declarations, employees, employeurs } from "../data.js";
import { getDataStorage, setDataStorage } from "../seed.js";
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

const popUP = document.querySelector(".pop_up");
const message = document.querySelector(".message");

let selectedSocialRaison = "";

socialSelection.addEventListener("change", (event) => {
  selectedSocialRaison = event.target.value;
});
let employeurs;
let employees;
let declarations;
// On the program start
onload = () => buildTable();

const buildTable = () => {
  // Get employeur from local storage.
  employeurs = getDataStorage("employeurs");
  employees = getDataStorage("employees");
  declarations = getDataStorage("declarations");
  if (declarations.length === 0) {
    return;
  }

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
  const declarationMonth = declareDate.getMonth();
  let isAlreadyDeclared = alreadyDeclared(employeurId, declarationMonth);
  console.log(isAlreadyDeclared);

  // If already added a declaration show him an Alert message.
  if (isAlreadyDeclared == true) {
    message.innerHTML = "";
    // remove the default settings
    popUP.classList.remove("hidden");
    // add new settings
    popUP.classList.add("showen");
    // Set the message on pop up.
    message.innerHTML = `Le employeur ${selectedSocialRaison} est deja declarer!`;
    const timeOut = setTimeout(() => {
      // back to the defautl settings
      popUP.classList.remove("showen");

      popUP.classList.add("hidden");
    }, 1000);
    return;
  }

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
  setDataStorage("declarations", declarations);

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

  // Elese show him a success message
  if (isAlreadyDeclared == false) {
    message.innerHTML = "";
    // remove the default settings
    popUP.classList.remove("hidden");
    popUP.classList.remove("failur");
    // add new settings
    popUP.classList.add("showen");
    popUP.classList.add("success");
    // Set the message on pop up.
    message.innerHTML = `Le employeur ${selectedSocialRaison} été ajouté avec succée`;
    const timeOut = setTimeout(() => {
      // back to the defautl settings
      popUP.classList.add("hidden");
      popUP.classList.add("failur");
    }, 1000);
    //clearInterval(interval);
  }
  return;
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
  console.log("payDay 11111", date);
  console.log("decDay111111111", decDate);
  // Convert input date to js date.
  const payDate = new Date(date);
  const declareDate = new Date(decDate);

  const payDay = payDate.getDay(); ///
  const decDay = declareDate.getDay();
  console.log("payDay", payDay);
  console.log("decDay", decDay);

  const diffTime = Math.abs(declareDate - payDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
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
  console.log(data);
  for (const declaration of declarations) {
    if (declaration.employeurId == data[0]) {
      const penality = calculateThePenalityOfLating(
        declaration.dateDeclaration,
        declaration.anneeMois,
      );
      console.log("Penality", typeof penality);

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

const alreadyDeclared = (employeurId, declarationMonth) => {
  for (const declaration of declarations) {
    const employeurDeclarationMobth = new Date(
      declaration.dateDeclaration,
    ).getMonth();
    if (declaration.employeurId == employeurId) {
      if (employeurDeclarationMobth == declarationMonth) {
        return true;
      }
    }
  }

  return false;
};
