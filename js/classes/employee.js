const Ajouter = document.getElementById("Ajouter");
const tbody = document.getElementById("tbody");
const Employer = document.getElementById("Employer");






function getLocalStorage(table){
  return JSON.parse(localStorage.getItem(table))
}


let stock = getLocalStorage("employees");

let employees = getLocalStorage("employees") 
let employeurs = getLocalStorage("employeurs")

// JSON.parse(localStorage.getItem("employeurs")) || [];


// 🔹 نعرضو data القديمة
employees.forEach(emp => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${emp.nomPrenom}</td>
    <td>${emp.salaire}</td>
    <td>${emp.employeurId}</td>
  `;
  tbody.appendChild(tr);
});

Ajouter.addEventListener("click" , function(e){
    e.preventDefault();
   
    
    const Nom = document.getElementById("Nom").value;
    const Salaire = document.getElementById("Salaire").value;
    const Employer = document.getElementById("Employer").value;


if(Nom ===""|| Salaire ==="" || Employer === ""){
alert("Veuillez remplir tous les champs");
return;
}

if(isNaN(Salaire) || Salaire<=0){
    alert("veuille enter un number");
return;
}



  // 🔹 1. نصايبو object
  const employee = {
    id : employees.length + 1,
    nomPrenom: Nom,
    salaire: Salaire,
    employeurId: Employer
  };

  // 🔹 2. نضيفوه للـ array
  function setLocalStorage(table,data){
    localStorage.setItem(table, JSON.stringify(data));
  }

  stock.push(employee);
  setLocalStorage("employees",stock)



  // 🔹 3. نخزّنو ف localStorage

  

    const tr = document.createElement("tr");
    tr.innerHTML =`
    <td>${Nom}</td>
    <td>${Salaire}</td>
    <td>${Employer}</td>
    `;

    tbody.appendChild(tr);

});
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".insearch");

searchIcon.addEventListener("click", function (e) {
  e.preventDefault();

  const searchValue = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll("#tbody tr");

  rows.forEach((tr) => {
    const nomTd = tr.children[0].textContent.toLowerCase();

    // نرجعو اللون عادي
    tr.style.backgroundColor = "";

    if (nomTd === searchValue && searchValue !== "") {
      tr.style.backgroundColor = "lightgreen";
    }
  });
});

function getOptEmp(){
  Employer.innerHTML= "";
  employeurs.forEach((employeur,index)=>{
    Employer.innerHTML+=`<option value="${employeur.id}">${employeur.sociale}</option>`;
  });
  // 
}
getOptEmp()

// insearch= input 
// search-icon = icon 
// serchelement = div li jma3 les element 2