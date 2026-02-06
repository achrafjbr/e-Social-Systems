// Example Data project :

/*

  let data = [
// employeur 1
  {
    id: "",
    raisonSocial: "",
    secteur: "",

    declaration: [
      {
        id: "",
        anneeAndmois: "",
        dateDeclaration: "",
        enRetard: "",
        penalité: "",
      },
      {
        id: "",
        anneeAndmois: "",
        dateDeclaration: "",
        enRetard: "",
        penalité: "",
      },
    ],
    employees: [
      {
        id: "",
        fullName: "",
        salary: "",
        cotisation: [
          {
            id: "",
            tauxCotisation: "",
            date: "",
          },
          {
            id: "",
            tauxCotisation: "",
            date: "",
          },
        ],
      },

      {
        id: "",
        fullName: "",
        salary: "",
        cotisation: [
          {
            id: "",
            tauxCotisation: "",
            date: "",
          },
          {
            id: "",
            tauxCotisation: "",
            date: "",
          },
        ],
      },
    ],

    cotisation: [
      {
        id: "",
        tauxCotisation: "",
        date: "",
      },
      {
        id: "",
        tauxCotisation: "",
        date: "",
      },
    ],
  },


// employeur 2
   {
    id: "",
    raisonSocial: "",
    secteur: "",
    declaration: [
      {
        id: "",
        anneeAndmois: "",
        dateDeclaration: "",
        enRetard: "",
        penalité: "",
      },
      {
        id: "",
        anneeAndmois: "",
        dateDeclaration: "",
        enRetard: "",
        penalité: "",
      },
    ],
    employees: [
      {
        id: "",
        fullName: "",
        salary: "",
        cotisation: [
          {
            id: "",
            tauxCotisation: "",
            date: "",
          },
          {
            id: "",
            tauxCotisation: "",
            date: "",
          },
        ],
      },

      {
        id: "",
        fullName: "",
        salary: "",
        cotisation: [
          {
            id: "",
            tauxCotisation: "",
            date: "",
          },
          {
            id: "",
            tauxCotisation: "",
            date: "",
          },
        ],
      },
    ],
    cotisation: [
      {
        id: "",
        tauxCotisation: "",
        date: "",
      },
      {
        id: "",
        tauxCotisation: "",
        date: "",
      },
    ],
  },
];


*/

const Sector = {
  COMMERCE: "Commerce - réparation d'automobiles",
  INDUSTRIE: "Industrie manufacturière",
  SANTE: "Santé humaine et action sociale",
  SERVICEADMINISTRATIF: "Services administratifs et de soutien",
  CONSTRUCTION: "Construction",
  INFORMATIQUE: "Information et communication",
  TRANSPORT: "Transports et entreposage",
  HEBERGEMENT: "Hébergement et restauration",
  ENSEIGNEMENT: "Enseignement",
  FINANCE: "Finance, assurance, immobilier",
};

let employeur = [
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

let employee = [
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

let declaration = [
  {
    id: 1,
    anneeMois: "02/03/2025",
    dateDeclaration: "05/03/2025",
    penalité: 30,
    employeurId: 1,
  },
  {
    id: 2,
    anneeMois: "02/03/2025",
    dateDeclaration: "06/03/2025",
    penalité: 0,
    employeurId: 2,
  },
  {
    id: 3,
    anneeMois: "02/03/2025",
    dateDeclaration: "07/03/2025",
    penalité: 15,
    employeurId: 3,
  },
  {
    id: 4,
    anneeMois: "02/03/2025",
    dateDeclaration: "05/03/2025",
    penalité: 0,
    employeurId: 4,
  },
];

let employeurCotisation = [
  {
    id: 1,
    tauxPatronalEtSocial: 1960, // (5000 + 2700) * 0.14
    employeurId: 1,
  },
  {
    id: 2,
    tauxPatronalEtSocial: 3500, // (10000 + 15000) * 0.14
    employeurId: 2,
  },
  {
    id: 3,
    tauxPatronalEtSocial: 378, // 2700 * 0.14
    employeurId: 3,
  },
  {
    id: 4,
    tauxPatronalEtSocial: 378, // 2700 * 0.14
    employeurId: 4,
  },
];

let employeeCotisation = [
  {
    id: 1,
    tauxPatronalEtSocial: 700, // 10000 * 0.07
    employeeId: 1,
  },
  {
    id: 2,
    tauxPatronalEtSocial: 1050, // 15000 * 0.07
    employeeId: 2,
  },
  {
    id: 3,
    tauxPatronalEtSocial: 350, // 5000 * 0.07
    employeeId: 3,
  },
  {
    id: 4,
    tauxPatronalEtSocial: 189, // 2700 * 0.07
    employeeId: 4,
  },
  {
    id: 5,
    tauxPatronalEtSocial: 189,
    employeeId: 5,
  },
  {
    id: 6,
    tauxPatronalEtSocial: 189,
    employeeId: 6,
  },
];

export  {
  Sector,
  employeur,
  employeurCotisation,
  employee,
  employeeCotisation,
  declaration
}