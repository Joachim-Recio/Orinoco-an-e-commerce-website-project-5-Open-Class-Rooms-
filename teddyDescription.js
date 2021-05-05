//------------------------- Récuperation de l'ID du Teddy -----------
let params = (new URL(document.location)).searchParams;
let idTeddy = params.get('id');

//------------------------ Utilisation de l'ID pour afficher les données du Teddy concerné via un apple à l'API
const getTeddy = (callback) => {

    const request = new XMLHttpRequest();
    request.open('GET', 'https://ab-p5-api.herokuapp.com/api/teddies/' + idTeddy);
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            const dataTeddy = JSON.parse(request.responseText)
            callback(undefined, dataTeddy);
        } else if (request.readyState === 4) {
            callback('Oups les données sont inaccessibles', undefined);
        }
    });
}

//--------------------- Creéation de card du Teddy avec les données associées

const containerDetails = document.querySelector(".containerTeddy");

getTeddy((err, data) => {
    if (err) {
        console.log(err);
    } else {
        // afficher les infos du Teddy                 
        const containerTeddyDescription = `                             
            <div class="card col-10 mt-5 mb-5 cardTeddyDescription  rounded">
                <div class="card-horizontal d-flex flex-column flex-md-row">
                    <div class="img-square-wrapper col-5-md imgOurs">
                        <img class="card-img  rounded imageoursDetails" src="${data.imageUrl}" alt="${data.name}">
                    </div>
                    <div class="card-body">
                        <h2 class="card-title nameourDetails"><center>Salut, moi c'est<br><b>${data.name}</b></center></h2>
                        <p class="card-text descriptionoursDetails">
                            <center>Faisons connaissance.</center>
                            <h6 class="text-justify">${data.description}</h6>
                            <p class="card-text priceoursDetails text-justify">Pour que je sois ton nouvel ami, il ne te reste plus qu'à <b>payer les frais de dossier</b>
                            (${data.price / 100} euros) et <b>choisir dans quelle couleur tu veux que je vienne</b>.
                        </p>
                        
                        <center><h5 label for="exampleFormControlSelect2">Choisi moi comme tu m'aimes</label></center>
                        <select class="form-control colorsTeddy" id="couleur_Produit">
                        </select>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-lg btn-block addCart">Pour avoir bientôt ${data.name} chez toi </button>
                </div>                                  
            </div>`;

        containerDetails.innerHTML = containerTeddyDescription;
        

        // Choix de la couleur du Teddy
        const getChoiceColor = document.querySelector(".colorsTeddy");
        data.colors.forEach(data => {
            getChoiceColor.innerHTML += `
            <option value="${data}" class="colorTeddy">${data}</option>
            `;
        });
    }
});


//---------------------- LOCAL STORAGE --------------------------

// for button add cart "click"
getTeddy((err, data) => {
    if (err) {
        console.log(err);
    } else {
        const cartBtn = document.querySelector(".addCart");

        cartBtn.addEventListener('click', (event) => {
            event.preventDefault();

            const idForm = document.querySelector(".colorsTeddy");
            const choixColor = idForm.value;

            let optionsProduit = {
                id_product: data._id,
                nom: data.name,
                price: data.price,
                image: data.imageUrl,
                description: data.description,
                quantite: 1,
                couleur: choixColor,
                couleur_background: choixColor,
            }

// ---------------------------LOCAL STORAGE-----------------------
            // Stocker la récuperation des valeurs dans le localStorage
            let cartItem = JSON.parse(localStorage.getItem("product"));

            // Pop Up
            const confirmationPopup = () => {
                if (window.confirm(`${data.name} arrive bientôt chez toi
POur voir le panier c4est OK et pour revoir les Teddy c4est ANNULER`)) {
                    window.location.href = "panier.html";
                } else {
                    window.location.href = "index.html";
                }
            };

            // fonction ajouter un produit dans le Local Storage
            const addingLocalStorage = () => {
                cartItem.push(optionsProduit);
                localStorage.setItem("product", JSON.stringify(cartItem));
            };

            function sendingLocalStorage() {
                //si il y a des produits dans le localStorage
                if (cartItem) {
                    addingLocalStorage();
                    confirmationPopup();
                }
                // si il n'y a pas de produit dans le localStorage
                else {
                    cartItem = [];
                    addingLocalStorage();
                    confirmationPopup();
                }
            }

            sendingLocalStorage();
        });
    }
});
