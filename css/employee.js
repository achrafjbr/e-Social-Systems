const Ajouter = document.getElementById("Ajouter");
const tbody = document.getElementById("tbody");

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


    const tr = document.createElement("tr");
    tr.innerHTML =`
    <td>${Nom}</td>
    <td>${Salaire}</td>
    <td>${Employer}</td>
    `;

    tbody.appendChild(tr);
});