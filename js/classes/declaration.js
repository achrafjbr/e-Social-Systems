import {
  declaration,
  Sector
} from '../data.js'



class Declaration {
  constructor(id, anneeAndmois, dateDeclaration, enRetard, penalité) {
    this.id = id;
    this.anneeAndmois = anneeAndmois;
    this.dateDeclaration = dateDeclaration;
    this.enRetard = enRetard;
    this.penalité = penalité;
  }

  declare(employeur, declaration){
    employeur.declarationList.push(declaration);
  }

}


const employeurSelection = document.getElementById('employeur-selection').value;
const anneeMois = document.getElementById('annee-mois').value;
const declarationDate = document.getElementById('declaration-date').value;

const saveEmployeurBtn = document.querySelector('.save_employeur')

const addDeclaration = () => {
  console.log(employeurSelection, anneeMois, declarationDate);
}


saveEmployeurBtn.addEventListener('click', addDeclaration);

