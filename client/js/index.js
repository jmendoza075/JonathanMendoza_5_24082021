// Get DOM elements
const testHolder = document.getElementById('test-holder');

// create and open AJAX request
let apiRequest = new XMLHttpRequest();

apiRequest.open('GET', 'http://localhost:3000/api/cameras/');
apiRequest.send();

// capture
apiRequest.onreadystatechange = () => {
    if(apiRequest.readyState === 4) {
        if(apiRequest.status === 404) {
            return testHolder.textContent = 'error during Get';
        }
        const CAMERAS = JSON.parse(apiRequest.response);
        console.log(CAMERAS);
        
        
        for (let item in CAMERAS) {
            let cameraCardCol = document.createElement('div');
            cameraCardCol.classList.add('col-12', 'col-lg-4');
            document.querySelector('.all-camera').appendChild(cameraCardCol);

            let cameraCard = document.createElement('div');
            cameraCardCol.appendChild(cameraCard);
            cameraCard.classList.add('card', 'mb-4', 'mb-lg-0', 'border-light', 'shadow-sm');

            //Camera image 
            let cameraImg = document.createElement('img');
            cameraCard.appendChild(cameraImg);
            cameraImg.src= CAMERAS[item].imageUrl;

            //Camera details 
            let cameraCardDetails = document.createElement('div');
            cameraCard.appendChild(cameraCardDetails);
            cameraCardDetails.classList.add('card-body');

            let cameraCardName = document.createElement('h5');
            let cameraCardText = document.createElement('p');
            let cameraCardPrice = document.createElement('p');
            let cameraCardButton = document.createElement('a');
            let cameraId = CAMERAS[item]._id;

            cameraCardDetails.appendChild(cameraCardName);
            cameraCardDetails.appendChild(cameraCardText);
            cameraCardDetails.appendChild(cameraCardPrice);
            cameraCardDetails.appendChild(cameraCardButton);

            cameraCardName.classList.add('card-title');
            cameraCardText.classList.add('card-text');
            cameraCardPrice.classList.add('card-text');
            cameraCardButton.classList.add('btn', 'btn-primary', 'stretched-link');

            cameraCardName.textContent = CAMERAS[item].name;
            cameraCardText.textContent = CAMERAS[item].description;
            cameraCardPrice.textContent = (CAMERAS[item].price/100) + ' euros';

            cameraCardButton.textContent = 'En savoir plus';



        }
    }
};
