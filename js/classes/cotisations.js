const employeurs = JSON.parse(localStorage.getItem('employeurs')) || [];
const employees = JSON.parse(localStorage.getItem('employees')) || [];
const declarations = JSON.parse(localStorage.getItem('declarations')) || [];


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

        const date1 = new Date(declaration.anneeMois);
        const date2 = new Date(declaration.dateDeclaration);
        
        let payDay = date1.getDay()
        let decDay = date2.getDay()

        let diff = (payDay - decDay)
        alert(diff)
        

        const penalite =  declaration * totalSalairesBruts * TAUX_PENALITE;
        const montantFinal = totalCotisationsSalariales + totalCotisationsPatronales + penalite; 
        

        cotisations.push({
            id: cotisations.length + 1,
            tauxPatronalEtSocial: montantFinal,
            employeurId: employeur.id,
            sociale: employeur.sociale
        });
    });

    afficherCotisations(cotisations);
    localStorage.setItem('employeurCotisations', JSON.stringify(cotisations));
    return cotisations;
}

function afficherCotisations(cotisations) {
    const tbody = document.createElement('tbody');
    cotisations.forEach(cotisation => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cotisation.id}</td>
            <td>${cotisation.sociale}</td>
            <td>${cotisation.tauxPatronalEtSocial}</td>
            <td>${cotisation.employeurId}</td>
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