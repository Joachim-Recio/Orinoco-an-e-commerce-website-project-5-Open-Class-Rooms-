let cartItem = JSON.parse(localStorage.getItem("product"));
let formulaireValues = JSON.parse(localStorage.getItem("contact"));
let orderID = localStorage.getItem("orderID");

const confirmation = document.querySelector(".confirmation");

// Affichage de la card Confirmation et des noms du/des Teddy

const confirmationDetails = `
    <div class="col-md-5 mt-3 confirmation-achat">
        <h3 class="text pt-4 nom-prenom">${formulaireValues.firstName} ${formulaireValues.lastName}</h3>
        <h4 class="mt-5 theme-color mb-5">Merci pour ton adoption:<br> <p class="text-center">${orderID}</p></h4> 
        <span class="theme-color">Voici un resumé pour être sûr que tout c'est bien passé </span>
        <div class="mb-3">
            <hr class="new1">
        </div>
        <div class="d-flex justify-content-between"> <span class="font-weight-bold">Bientôt arrivera: <br>
            <span class="nameTeddy"> </span> :) </span> <span class="text-muted">0 €</span>
        </div>
        <div class="d-flex justify-content-between"> <small>Frais de dossier</small> <small>${formulaireValues.panierTotal} €</small> </div>
        <div class="d-flex justify-content-between"> <small>Taxes</small> <small>Aucune l'amitié n'a pas de prix</small> </div>
        <div class="d-flex justify-content-between mt-3"> <span class="font-weight-bold">Total à payer</span> <span class="font-weight-bold theme-color">${formulaireValues.panierTotal} €</span> </div>
        <div class="card-adress mt-5 d-row-flex justify-content-center">
            <div class="d-flex justify-content-between"> <span class="font-weight-bold"><u>Ton nouvel ami frappera à la porte du :</u></span> </div>
            <div class="align-middle adresse-confirmation"> <span class="font-weight-bold theme-color">${formulaireValues.address}</span> </div>
            <div class="align-middle adresse-confirmation"> <span class="font-weight-bold theme-color">${formulaireValues.codePostal} ${formulaireValues.city}</span> </div>
            <div class="align-middle adresse-confirmation"> <span class="font-weight-bold theme-color">${formulaireValues.country}</span> </div>
        </div>

        <div class="text-center mt-5 pb-4 "> <button class="btn btn-primary" id="retourAccueil">Revoir tous les Teddys</button> </div>
</div>`;

confirmation.innerHTML = confirmationDetails;

// Affichage du nom du/des Teddy commandé(s)
const displayName = document.querySelector(".nameTeddy");

cartItem.forEach((item) => {
    displayName.innerHTML += `
        ${item.nom} 
    `;
});

localStorage.clear();

// Retour à l'accueil et suppression du panier
const backIndex = document.querySelector("#retourAccueil");
backIndex.addEventListener("click", (e) => {
    e.preventDefault();

    window.location.href = "index.html";
});