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

const joinEmployeurWithDeclarationForRerenderingTable = () => {
  employeurs.forEach((employeur) => {
    declarations.forEach((declaration) => {
       let declarationEmployeur = declaration.employeurId == employeur.id;

       reRenderDeclarationTable(declarationEmployeur, employeur);
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

        document.querySelector('.employeur_table_data')
        .appendChild(table);
};

const addDeclaration = () => {
  // console.log(socialSelection, anneeMois.value, declarationDate.value);

  // Get employeur which has this ' employeurSelection '
  const employeurId = findEmployeurBySociale(socialSelection).id;

  // Calculate the penalité of this employeur.
  const penalityRate = calculateThePenalityOfLating(
    anneeMois.value,
    declarationDate.value,
  );

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

  // reRender table screen.
  joinEmployeurWithDeclarationForRerenderingTable();
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
  const date = new Date(date);
  const decDate = new Date(decDate);
  const payDay = date.getDate();
  const decDay = decDate.getDate();
  return (payDay - decDay) * 0.01;
};
