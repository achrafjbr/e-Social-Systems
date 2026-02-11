const Ajouter = document.getElementById("Ajouter");
const tbody = document.getElementById("tbody");

let stock = JSON.parse(localStorage.getItem("stock")) || [];

// 🔹 نعرضو data القديمة
stock.forEach(emp => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${emp.Nom}</td>
    <td>${emp.Salaire}</td>
    <td>${emp.Employer}</td>
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
    Nom: Nom,
    Salaire: Salaire,
    Employer: Employer
  };

  // 🔹 2. نضيفوه للـ array
  stock.push(employee);

  // 🔹 3. نخزّنو ف localStorage
  localStorage.setItem("stock", JSON.stringify(stock))

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


// insearch= input 
// search-icon = icon 
// serchelement = div li jma3 les element 2