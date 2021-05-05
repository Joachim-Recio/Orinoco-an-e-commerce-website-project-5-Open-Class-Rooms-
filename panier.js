// Afficher les produits du panier
const container = document.querySelector(".global-list");

let productTeddy = JSON.parse(localStorage.getItem('product'));

function renderComponentProduct() {
    // si le panier est vide
    if (productTeddy === null) {
        const containerBasketEmpty = `
            <div class=" pt-2 pb-4 pl-3 pr-3 panier_vide">
                <h2> Oh non, tu n'as choisi aucun Teddy </h2>
            </div>`;
        container.innerHTML = containerBasketEmpty;

        console.log("snif snif");
    } else {
        // si le panier n'est pas vide  
        productTeddy.forEach((item) => {
            // changement de la valeur color pour celle n'existant pas via un opérateur ternaire
            item.couleur_background = (item.couleur_background == "Dark brown") ? "#654321" : item.couleur_background;
            item.couleur_background = (item.couleur_background == "Pale brown") ? "#964B00" : item.couleur_background;

            const containerBasketFull = `        
                <div class="card col-8 mt-4 d-flex flex-column flex-md-row panier-teddy" style="border: 6px solid ${item.couleur_background}; border-radius: 10px">            
                        <img class="card-img-top col-4 rounded-circle panier-teddy-image" src="${item.image}" alt="Card image cap" style="border: 3px solid ${item.couleur_background}">            
                    <div class="card-body panier-teddy-card">
                        <h4 class="card-title">Quantité 1 - ${item.nom} de couleur ${item.couleur}</h4>
                        <div class="card-text"> Pour seulement ${item.price / 100} € - 
                            <button class="btn btn-primary btn-supprimer" onclick='removeFromCart(${JSON.stringify(item)})'> Supprimer ${item.nom} (${item.couleur}) </button> 
                        </div>
                    </div>
                </div>`;
            container.innerHTML += containerBasketFull;
        })
    }
}

// Point d'entrée :
window.addEventListener('load', (event) => {
    renderComponentProduct();
})

// Suppression dans la panier d'un des Teddy non voulu
function removeFromCart(item) {
    let productTeddy = JSON.parse(localStorage.getItem("product"));
    productTeddy = productTeddy.filter(element => JSON.stringify(element) !== JSON.stringify(item));
    localStorage.setItem("product", JSON.stringify(productTeddy));
    alert("Ton Teddy est retourné à la boutique");
    window.location.href = "panier.html";
}

// bouton pour vider le panier
const btn_delete_basket_html = `
    <div class="text-center">
        <button type="button" onclick="emptyCart()" class="btn btn-primary btn-lg col-8 btn-delete-basket"> Si tu as changé d'avis et que tu ne veux plus aucun Teddy </button>
    </div>
    `;
container.insertAdjacentHTML("afterend", btn_delete_basket_html);

function emptyCart() {
    localStorage.removeItem("product");
    // message d'alerte
    alert(" Votre panier est tout léger sans Teddy ");
    window.location.href = "index.html";
}

// ------------------------------ TOTAL PANIER ---------------------------

// Montant Total du panier
const priceTotalBasket = [];

productTeddy.forEach(item => {
    let prixProduit = item.price / 100;
    priceTotalBasket.push(prixProduit);
});

// additionner les prix de tout les article avec la methode "reduce"
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let priceTotal = priceTotalBasket.reduce(reducer, 0);     // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

// Le code HTML du Total Panier
const containerTotalPrice = `
    <div class="text-center justify-content-center mt-4 mb-4 affichage-prix-panier" id="panierTotal">Pour recevoir ta commande, <b>les frais de dossier sont de ${priceTotal} €</b> </div>
`;
container.insertAdjacentHTML("afterend", containerTotalPrice);

// Récuperation des données du formulaire pour local storage
const btnCheckout = document.querySelector("#envoyer-formulaire");

btnCheckout.addEventListener("click", (e) => {
    e.preventDefault();

    const contact = {
        firstName: document.querySelector("#prenom").value,
        lastName: document.querySelector("#nom").value,
        email: document.querySelector("#email").value,
        address: document.querySelector("#adresse").value,
        city: document.querySelector("#ville").value,
        country: document.querySelector("#pays").value,
        codePostal: document.querySelector("#code-postal").value,
        panierTotal: priceTotal,
    }

    //---------------- Verifier que les valeurs du formulaire sont bonnes----------------
    const textAlert = (value) => {
        return ` Pour ton ${value} les symboles et chiffres ne sont pas autorisés \n Merci de le refaire `
    };
    const regExPrenomNomVille = (value) => {
        return /^[a-zA-Z]{1}[a-zA-Z -]*$/.test(value);
    };
    const regExCodePostal = (value) => {
        return /^[0-9]{5}(-[0-9]{4})?|(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/.test(value);
    };
    const regExEmail = (value) => {
        return /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(value);
    };
    const regExAdresse = (value) => {
        return /^[A-Za-z0-9\s]{5,50}$/.test(value);
    };

    // fonction pour afficher message d'erreur (dans le formulaire) lors d'un input vide 
    function inputVideFormulaire(inputVide) {
        document.querySelector(`#${inputVide}`).textContent = "Oups il y a un problème";
    }

    function prenomControl() {
        // controle des données prénom
        const lePrenom = contact.firstName;
        if (regExPrenomNomVille(lePrenom)) {
            return true;
        } else {
            inputVideFormulaire("prenomManquant");
            alert(textAlert("prénom"));
            return false;
        }
    }

    function nomControl() {
        // controle des données nom
        const leNom = contact.lastName;
        if (regExPrenomNomVille(leNom)) {
            return true;
        } else {
            inputVideFormulaire("nomManquant");
            alert(textAlert("nom"));
            return false;
        }
    }

    function codePostalControl() {
        // controle des données code postal
        const leCodePostal = contact.codePostal;
        if (regExCodePostal(leCodePostal)) {
            return true;
        } else {
            inputVideFormulaire("codePostalManquant");
            alert("Le code postal n'est pas valide, merci de réessayer");
            return false;
        }
    }

    function EmailControl() {
        // controle des données de l'email
        const lEmail = contact.email;
        if (regExEmail(lEmail)) {
            return true;
        } else {
            inputVideFormulaire("emailManquant");
            alert("L'email n'est pas valide, merci de réessayer");
            return false;
        }
    }

    function AdresseControl() {
        // controle des données de l'adresse
        const lAdresse = contact.address;
        if (regExAdresse(lAdresse)) {
            return true;
        } else {
            inputVideFormulaire("adresseManquant");
            alert("L'adresse n'est pas valide, merci de réessayer");
            return false;
        }
    }

    function villeControl() {
        // controle des données ville
        const laVille = contact.city;
        if (regExPrenomNomVille(laVille)) {
            return true;
        } else {
            inputVideFormulaire("villeManquant");
            alert(textAlert("ville"));
            return false;
        }
    }

// Envoi des données à l'API
    // Envoi des données au back (contact & products)
    const products = []
    
    productTeddy.forEach((item) => {
        products.push(item.id_product);
    })
  
    let data = {
        contact,
        products,
    }

    // Pour envoyer les données au back
    function post(url, data) { 
        return new Promise((resolve, reject) => { 
            let request = new XMLHttpRequest(); 
            request.open("POST", url);
            request.setRequestHeader("content-type", "application/json"); 
            request.send(JSON.stringify(data));
            request.onreadystatechange = function() { 
                if (this.readyState === 4) { 
                    if (this.status === 201) {
                        resolve(JSON.parse(this.responseText)); 
                    } else {
                        reject(request);
                    }
                }
            }
        })
    }
    
    post("https://ab-p5-api.herokuapp.com/api/teddies/order", data)
        .then((response) => {
            let orderId = response.orderId;
            localStorage.setItem("orderID", orderId);
        })

// confirmation de la validation de la commande
    // controle de la validité du formulaire 

    function formValidity() {
        if (prenomControl() && nomControl() && codePostalControl() && EmailControl() && AdresseControl() && villeControl() &&
            (window.confirm(`    Ton colis Teddy arrive bientôt chez toi.
    Confirme son paiement avec OK ou annule le avec ANNULER`)
            )) {
            // redirection vers la page de confirmation
            window.location.href = "confirmation.html";

            // envoi dans le local storage des données du formulaire
            localStorage.setItem("contact", JSON.stringify(contact));
        } else {
            alert("Le formulaire n'est pas rempli correctement");
        }
    }
    formValidity();
});
