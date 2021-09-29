const apiURL = "http://localhost:3000/api/cameras/";
const errorHolder = document.getElementById('error-holder');

// create and open AJAX request //
let apiRequest = new XMLHttpRequest();
apiRequest.open('GET', apiURL);
apiRequest.send();

// capture
apiRequest.onreadystatechange = () => {
    if(apiRequest.readyState === 4) {
        if(apiRequest.status === 404) {
            errorHolder.classList.remove('invisible');
            return errorHolder.textContent = "Error 404!. Merci de verifier l'URL";
        }
        const CAMERAS = JSON.parse(apiRequest.response);
        itemsListing (CAMERAS);
    }
};

function itemsListing (CAMERAS){
    for (let item in CAMERAS) {
        //Create Camera Card //
        let cameraCardCol = document.createElement('div');
        document.querySelector('.all-camera').appendChild(cameraCardCol);
        let cameraCard = document.createElement('div');
        cameraCardCol.appendChild(cameraCard);

        //Add Camera image //
        let cameraImg = document.createElement('img');
        cameraCard.appendChild(cameraImg);

        //Add Camera details //
        let cameraCardBody = document.createElement('div');
        cameraCard.appendChild(cameraCardBody);

        //Add Camera elements //
        let cameraCardName = document.createElement('h5');
        let cameraCardText = document.createElement('p');
        let cameraCardPrice = document.createElement('p');
        let cameraCardButton = document.createElement('a');

        cameraCardBody.appendChild(cameraCardName);
        cameraCardBody.appendChild(cameraCardText);
        cameraCardBody.appendChild(cameraCardPrice);
        cameraCardBody.appendChild(cameraCardButton);

        //Iterate//  
        cameraImg.src= CAMERAS[item].imageUrl;
        let cameraId = CAMERAS[item]._id;
        cameraCardName.textContent = CAMERAS[item].name;
        cameraCardText.textContent = CAMERAS[item].description;

        //Display Price in Euro format
        let camPriceEuro = euroFormat(CAMERAS[item].price/100);
        cameraCardPrice.textContent = camPriceEuro;
        
        //Item Details Button//
        cameraCardButton.textContent = 'En savoir plus';
        cameraCardButton.href = `produit.html?id=${cameraId}`;

        //Apply Bootstrap classes//
        cameraCardCol.classList.add('col-12', 'col-lg-4','mt-4');
        cameraCard.classList.add('card', 'mb-4', 'mb-lg-0', 'border-light', 'shadow-sm');
        cameraCardBody.classList.add('card-body');
        cameraCardName.classList.add('card-title');
        cameraCardText.classList.add('card-text');
        cameraCardPrice.classList.add('card-text');
        cameraCardButton.classList.add('btn', 'btn-primary', 'stretched-link');
    } 
};
       
function euroFormat(price){
    price = new Intl.NumberFormat   // Euro format
    ("fr-FR", {style: "currency", currency: "EUR",})
    .format(price)
    return(price);
}
