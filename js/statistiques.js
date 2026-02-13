const EmpEnergCount = document.getElementById("EmpEnergCount");
const employeesCount = document.getElementById("employeesCount");
const Cotisationstotales = document.getElementById("Cotisationstotales");
const SalaireMoyen = document.getElementById("SalaireMoyen");
const RepEmpSecteur = document.getElementById("RepartitionContent");
const DeclarationRec = document.getElementById("DeclarationRec");
let total = 0;
let SalaireTotal = 0;
let Moyenne = 0;
let count = 0;
let employeurCotisations;
let employeurs;
let employees;
let declarations;

function getData(table) {
  return JSON.parse(localStorage.getItem(table));
}
employeurCotisations = getData("employeurCotisations");
employeurs = getData("employeurs");
employees = getData("employees");
declarations = getData("declarations");
// console.log(employeurCotisations);

function countEmployeurs() {
  return employeurs.length;
}

function countEmployees() {
  return employees.length;
}
function employeurCotisationsTotal() {
  total = 0;
  employeurCotisations.forEach((cotisation) => {
    total += Number(cotisation.tauxPatronalEtSocial);
  });
  // console.log(total)
  return total;
}
function SalaireMoyene() {
  SalaireTotal = 0;
  employees.forEach((employee, index) => {
    SalaireTotal = employee.salaire;
    // console.log(index + 1);
  });
  Moyenne = SalaireTotal / employees.length;
  return Moyenne;
}
function CountEmployeeSecteurs(id) {
  let count = 0;
  employees.forEach((employees, index) => {
    if (employees.employeurId == id) {
      count += 1;
    }
  });
  return count;
}

function EmployeurCotisationsCount(id) {
  let count = 0;
  employeurCotisations.forEach((Cotisations, index) => {
    if (Cotisations.employeurId == id) {
      count = Number(count) + Number(Cotisations.tauxPatronalEtSocial);
    }
  });
  return Number(count);
}

function EmplouerSectuer(id) {
  let sector;
  employeurs.forEach((employeur, index) => {
    if (employeur.id == id) {
      sector = employeur.sociale;
    }
  });
  return sector;
}
function SalaireEmpDec(id) {
  let salaire = 0;
  employees.forEach((employee, index) => {
    if (employee.employeurId == id) {
      salaire += employee.salaire;
    }
  });
  return salaire;
}

function RepEmpSecteurs() {
  RepEmpSecteur.innerHTML = "";
  let Cotisations = 0;
  employeurs.forEach((employeur, index) => {
    count = CountEmployeeSecteurs(employeur.id);
    Cotisations = EmployeurCotisationsCount(employeur.id);
    RepEmpSecteur.innerHTML += `
        <div class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <i class="ri-community-line text-3xl text-blue-700  "></i>
                    </div>
                    <div class="ml-3">
                      <h5 class="font-medium text-gray-800">${employeur.sociale}</h5>
                      <p class="text-sm text-gray-600">${count} employés</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-gray-800">${Cotisations.toFixed(2)}&nbsp;MAD</p>
                    <p class="text-xs text-gray-600">Cotisations</p>
                  </div>
                </div>`;
  });
}

function RecentDeclarations() {
  DeclarationRec.innerHTML = "";
  let sector;
  let salaire;
  if (declarations) {
    declarations.forEach((declaration, index) => {
      sector = EmplouerSectuer(declaration.employeurId);
      salaire = SalaireEmpDec(declaration.employeurId);
      DeclarationRec.innerHTML += `
            <div class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div>
                      <h5 class="font-medium text-gray-800">${sector}</h5>
                      <p class="text-sm text-gray-600">${declaration.anneeMois}</p>
                    </div>
                    <div class="text-right">
                      <div class="mb-1"><span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Date declaration :${declaration.dateDeclaration} </span></div>
                      <p class="text-sm text-gray-800">${salaire}&nbsp;MAD</p>
                    </div>
                  </div>
        `;
    });
  } else {
    DeclarationRec.innerHTML = `<p class="text-sm text-gray-600">Aucune déclaration récente</p>`;
  }
}

RepEmpSecteurs();
RecentDeclarations();
SalaireMoyen.textContent = SalaireMoyene().toFixed(2);
EmpEnergCount.textContent = countEmployeurs();
employeesCount.textContent = countEmployees();
Cotisationstotales.textContent = employeurCotisationsTotal().toFixed(2);
