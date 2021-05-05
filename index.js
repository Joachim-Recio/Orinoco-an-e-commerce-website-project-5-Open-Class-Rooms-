//----------------- Appel à l'API -----------------
const getTeddiesData = (callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://ab-p5-api.herokuapp.com/api/teddies');
    request.send();
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            const dataTeddies = JSON.parse(request.responseText)
            callback(undefined, dataTeddies);
        } else if (request.readyState === 4) {
            callback('Oups les données sont inaccessibles', undefined);
        }
    });
}

// -------------------- Création de la Card Teddy et mise en place d'une boucle pour la répéter (forEach)
const container = document.querySelector(".container");

getTeddiesData((err, dataTeddies) => {
    if (err) {
        console.log(err);
    } else {
        // afficher les infos du Teddy
        dataTeddies.forEach(element => {

            const containerIndex = `
                <div class="col-8 col-md-5 col-lg-3 card cardTeddy" id="${element._id}">
                    <div class="inner">
                        <img class="card-img-top imageours" src="${element.imageUrl}" alt="${element.name}">
                    </div>
                    <div class="card-body">
                        <h4 class="card-title nameours">Salut, moi c'est<br><b>${element.name}</b></h4>
                        <p class="card-text descriptionours"><center>J'attends que tu m'adoptes.</center><font size="2.5em">${element.description}</font></p>
                        <p class="card-text priceours">A présent, il ne te reste plus qu'à <b>payer les frais de dossier</b> (${element.price / 100} €) et <b>choisir dans quelle couleur tu veux que je vienne</b>.</p>
                        <a href="teddyDescription.html?id=${element._id}" class="btn btn-lg btn-block btnadoptemoi">Adopte moi</a>
                    </div>
                </div>`;

            container.innerHTML += containerIndex;
        });
    }
});
