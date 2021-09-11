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
                cameraCardCol.classList.add('card','mb-4' ,'mb-lg-0','border-light', 'shadow-sm');
                document.querySelector('.all-camera').appendChild(cameraCardCol);
                
                //Camera imgage 
                let cameraImg = document.createElement('img');
                cameraCardCol.appendChild(cameraImg);
                cameraImg.src= CAMERAS[item].imageUrl;

                //Camera details 
                let cameraCardColDetails = document.createElement('div');
                cameraCardCol.appendChild(cameraCardColDetails);
                cameraCardColDetails.classList.add('card-body');

                let cameraCardColName = document.createElement('h5');
                let cameraCardColText = document.createElement('p');
                let cameraCardColPrice = document.createElement('p');
                let cameraCardColButton = document.createElement('a');
                let cameraId = CAMERAS[item]._id;

                cameraCardColDetails.appendChild(cameraCardColName);
                cameraCardColDetails.appendChild(cameraCardColText);
                cameraCardColDetails.appendChild(cameraCardColPrice);
                cameraCardColDetails.appendChild(cameraCardColButton);

                cameraCardColName.classList.add('card-title');
                cameraCardColText.classList.add('card-text');
                cameraCardColPrice.classList.add('card-text');
                cameraCardColButton.classList.add('btn', 'btn-primary', 'stretched-link');

                cameraCardColName.textContent = CAMERAS[item].name;
                cameraCardColText.textContent = CAMERAS[item].description;
                cameraCardColPrice.textContent = (CAMERAS[item].price/100) + ' euros';

                cameraCardColButton.textContent = 'En savoir plus';







                

                

                
                
               


        }
    }
};
