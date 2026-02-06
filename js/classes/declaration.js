

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
