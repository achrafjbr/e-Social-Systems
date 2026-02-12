// EMPLOYEURS
// localStorage.setItem(
//   "employeurs",
//   JSON.stringify([
//     { id: 1, sociale: "TechNova", sector: "Information et communication" },
//     { id: 2, sociale: "BuildCorp", sector: "Construction" },
//     { id: 3, sociale: "MediCare", sector: "Santé humaine et action sociale" },
//   ]),
// );

// // EMPLOYEES
// localStorage.setItem(
//   "employees",
//   JSON.stringify([
//     { id: 1, nomPrenom: "Ahmed Karim", salaire: 8000, employeurId: 1 },
//     { id: 2, nomPrenom: "Sara Idrissi", salaire: 12000, employeurId: 1 },
//     { id: 3, nomPrenom: "Omar Tazi", salaire: 6000, employeurId: 2 },
//     { id: 4, nomPrenom: "Nadia Lahlou", salaire: 7000, employeurId: 2 },
//     { id: 5, nomPrenom: "Yassine Amrani", salaire: 9000, employeurId: 3 },
//   ]),
// );

// // EMPLOYEUR COTISATIONS (14%)
// localStorage.setItem(
//   "employeurCotisations",
//   JSON.stringify([
//     { id: 1, tauxPatronalEtSocial: (8000 + 12000) * 0.14, employeurId: 1 },
//     { id: 2, tauxPatronalEtSocial: (6000 + 7000) * 0.14, employeurId: 2 },
//     { id: 3, tauxPatronalEtSocial: 9000 * 0.14, employeurId: 3 },
//   ]),
// );

// // DECLARATIONS
// localStorage.setItem(
//   "declarations",
//   JSON.stringify([
//     {
//       id: 1,
//       anneeMois: "2025-03-01",
//       dateDeclaration: "2025-03-03",
//       employeurId: 1,
//     },
//     {
//       id: 2,
//       anneeMois: "2025-01-02",
//       dateDeclaration: "2025-01-04",
//       employeurId: 2,
//     },
//     {
//       id: 3,
//       anneeMois: "2025-01-03",
//       dateDeclaration: "2025-01-05",
//       employeurId: 3,
//     },
//   ]),
// );

const getDataStorage = (table) => {
  return JSON.parse(localStorage.getItem(table));
};

const setDataStorage = (table, data) => {
  return localStorage.setItem(table, JSON.stringify(data));
};

console.log("Data seeded successfully!");

export { getDataStorage, setDataStorage };
