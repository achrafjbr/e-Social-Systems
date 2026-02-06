import { declarations, employeurs } from "../data.js";

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

const socialSelection = document.getElementById("employeur-selection").value;

const anneeMois = document.getElementById("annee-mois");

const declarationDate = document.getElementById("declaration-date");

const saveEmployeurBtn = document.querySelector(".save_employeur");

const addDeclaration = () => {
  console.log(socialSelection, anneeMois.value, declarationDate.value);
  // convert input date to js date
  const date = new Date(anneeMois.value);
  const decDate = new Date(declarationDate.value);
  // Get employeur which has this ' employeurSelection '
  console.log(findEmployeurBySociale(socialSelection));
  // then add declaration of this employeur
};

saveEmployeurBtn.addEventListener("click", addDeclaration);

const findEmployeurBySociale = (sociale) => {
  employeurs.filter((employeur)=> employeur.sociale == sociale);
};
