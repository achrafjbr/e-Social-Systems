const employeurs = JSON.parse(localStorage.getItem('employeurs'));
const assures = JSON.parse(localStorage.getItem('assures'));
const declarations = JSON.parse(localStorage.getItem('declarations'));


const PLAFOND = 6000;
const TAUX_SALARIAL = 0.07;
const TAUX_PATRONAL = 0.14;
const TAUX_PENALITE = 0.01;

function genererCotisations(employeurs, assures, declarations) {
    const cotisations = [];
    declarations.forEach(declaration => {
        const employeur = employeurs.find(employeur => employeur.id === declaration.employeurId);
        const employes = assures.filter(assure => assure.employeurId === declaration.employeurId);
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
            nomEmployeur : employeur.raisonSociale,
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
    table.appendChild(tbody);
}

genererCotisations(employeurs, assures, declarations);