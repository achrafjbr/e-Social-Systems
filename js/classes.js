export class Employer {
    constructor(id, companyName, sector) {
        this.id = id;
        this.companyName = companyName;
        this.sector = sector;
        this.employees = [];
        this.declarations = [];
    }
}

export class Employee {
    constructor(id, name, monthlySalary) {
        this.id = id;
        this.name = name;
        this.monthlySalary = monthlySalary;
        this.employerId = null;
        this.declarationHistory = [];
    }
}

export class Declaration {
    constructor(employerId, monthYear) {
        this.id = this.generateId();
        this.employerId = employerId;
        this.monthYear = monthYear;
        this.declarationDate = new Date().toISOString().split('T')[0];
        this.isLate = false;
        this.employeeDeclarations = [];
        this.totalContributions = 0;
        this.penaltyAmount = 0;
    }
}