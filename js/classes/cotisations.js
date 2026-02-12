// const employeurs = JSON.parse(localStorage.getItem('employeurs')) || [];
// const employees = JSON.parse(localStorage.getItem('employees')) || [];
// const declarations = JSON.parse(localStorage.getItem('declarations')) || [];

const Sector = {
  COMMERCE: "Commerce",
  HEBERGEMENT: "Hébergement",
  CONSTRUCTION: "Construction",
  ENSEIGNEMENT: "Enseignement",
  SANTE: "Santé"
};

let employeurs = [
  {
    id: 1,
    sociale: "Tech tache",
    sector: Sector.COMMERCE,
  },
  {
    id: 2,
    sociale: "Heber",
    sector: Sector.HEBERGEMENT,
  },
  {
    id: 3,
    sociale: "Build-SET",
    sector: Sector.CONSTRUCTION,
  },
  {
    id: 4,
    sociale: "Educt",
    sector: Sector.ENSEIGNEMENT,
  },
  {
    id: 5,
    sociale: "SanFran",
    sector: Sector.SANTE,
  },
];

let employees = [
  {
    id: 1,
    nomPrenom: "Kamal nasim",
    salaire: 10000,
    employeurId: 2,
  },
  {
    id: 2,
    nomPrenom: "Ahmed nori",
    salaire: 15000,
    employeurId: 2,
  },
  {
    id: 3,
    nomPrenom: "Samir salhi",
    salaire: 5000,
    employeurId: 1,
  },
  {
    id: 4,
    nomPrenom: "Noura ahmed",
    salaire: 2700,
    employeurId: 3,
  },
  {
    id: 5,
    nomPrenom: "Samira jalal",
    salaire: 2700,
    employeurId: 4,
  },
  {
    id: 6,
    nomPrenom: "khdija lara",
    salaire: 2700,
    employeurId: 1,
  },
];

// Added joursRetard property based on the dates
let declarations = [
  {
    id: 1,
    anneeMois: "02/03/2025",
    dateDeclaration: "05/03/2025",
    penalité: 30,
    employeurId: 1,
    joursRetard: 2,
  },
  {
    id: 2,
    anneeMois: "02/03/2025",
    dateDeclaration: "06/03/2025",
    penalité: 0,
    employeurId: 2,
    joursRetard: 0,
  },
  {
    id: 3,
    anneeMois: "02/03/2025",
    dateDeclaration: "07/03/2025",
    penalité: 15,
    employeurId: 3,
    joursRetard: 4,
  },
  {
    id: 4,
    anneeMois: "02/03/2025",
    dateDeclaration: "05/03/2025",
    penalité: 0,
    employeurId: 4,
    joursRetard: 2,
  },
];

const PLAFOND = 6000;
const TAUX_SALARIAL = 0.07;
const TAUX_PATRONAL = 0.14;
const TAUX_PENALITE = 0.01;

function genererCotisations(employeurs, employees, declarations) {
    const cotisations = [];
    declarations.forEach(declaration => {
        const employeur = employeurs.find(emp => emp.id === declaration.employeurId);
        const employes = employees.filter(emp => emp.employeurId === declaration.employeurId);
        let totalSalairesBruts = 0;
        let totalCotisationsSalariales = 0;
        let totalCotisationsPatronales = 0;

        employes.forEach(employe => {
            const salaireBrut = Math.min(employe.salaire, PLAFOND);
            const cotisationSalariale = salaireBrut * TAUX_SALARIAL;
            const cotisationPatronale = salaireBrut * TAUX_PATRONAL;
            totalSalairesBruts += employe.salaire;
            totalCotisationsSalariales += cotisationSalariale;
            totalCotisationsPatronales += cotisationPatronale;
        });

        const penalite = declaration.joursRetard * totalSalairesBruts * TAUX_PENALITE;
        const montantFinal = totalCotisationsSalariales + totalCotisationsPatronales + penalite; 
        
        cotisations.push({
            employeurID: employeur.id,
            nomEmployeur: employeur.sociale,
            totalSalairesBruts: totalSalairesBruts,
            totalCotisationsSalariales: totalCotisationsSalariales,
            totalCotisationsPatronales: totalCotisationsPatronales,
            penalite: penalite,
            montantFinal: montantFinal,
        });
    });

    afficherCotisations(cotisations);
    localStorage.setItem('cotisations', JSON.stringify(cotisations));
    return cotisations;
}

function afficherCotisations(cotisations) {
    const tbody = document.createElement('tbody');
    cotisations.forEach(cotisation => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cotisation.employeurID}</td>
            <td>${cotisation.nomEmployeur}</td>
            <td>${cotisation.totalSalairesBruts.toFixed(2)}</td>
            <td>${cotisation.totalCotisationsSalariales.toFixed(2)}</td>
            <td>${cotisation.totalCotisationsPatronales.toFixed(2)}</td>
            <td>${cotisation.penalite.toFixed(2)}</td>
            <td>${cotisation.montantFinal.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
    
    const table = document.getElementById('cotisationsTable');
    const existingTbody = table.querySelector('tbody');
    if (existingTbody) {
        table.removeChild(existingTbody);
    }
    
    table.appendChild(tbody);
}


genererCotisations(employeurs, employees, declarations);