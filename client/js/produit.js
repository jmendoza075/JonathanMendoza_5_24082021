// Recover Id

let params = new URLSearchParams(window.location.search);
let product_id= params.get('id');
console.log(product_id);





// create and open AJAX request //
let apiRequest = new XMLHttpRequest();

apiRequest.open('GET', 'http://localhost:3000/api/cameras/'+ product_id);
apiRequest.send();

// capture
apiRequest.onreadystatechange = () => {
    if(apiRequest.readyState === 4) {
        if(apiRequest.status === 404) {
            return errorHolder.textContent = 'Error 404. not found';
        }
        const cameraProduct= JSON.parse(apiRequest.response);
        console.log(cameraProduct);

        //Create Camera Card //
        let cameraCardCol = document.createElement('div');
        document.querySelector('.product_camera').appendChild(cameraCardCol);

        let cameraCard = document.createElement('div');
        cameraCardCol.appendChild(cameraCard);

        //Add Camera image //
        let cameraImg = document.createElement('img');
        cameraCard.appendChild(cameraImg);
        cameraImg.src= cameraProduct.imageUrl;


        //Add Camera details //
        let cameraCardBody = document.createElement('div');
        cameraCard.appendChild(cameraCardBody);

        //Add Camera elements //
        let cameraCardName = document.createElement('h5');
        let cameraCardText = document.createElement('p');
        let cameraCardPrice = document.createElement('p');
        let cameraCardButton = document.createElement('a');
        let cameraCardLenses = document.createElement('div');

        cameraCardBody.appendChild(cameraCardName);
        cameraCardBody.appendChild(cameraCardText);
        cameraCardBody.appendChild(cameraCardPrice);
        cameraCardBody.appendChild(cameraCardLenses);
        cameraCardBody.appendChild(cameraCardButton);

        cameraCardName.textContent = cameraProduct.name;
        cameraCardText.textContent = cameraProduct.description;
        cameraCardPrice.textContent = (cameraProduct.price/100) + ' EUR';
        
        cameraCardLenses.textContent = cameraProduct.lenses;
        console.log(cameraCardLenses);
        
        cameraCardButton.textContent = 'Ajouter au panier';
        cameraCardButton.href = 'panier.html';
     

        //Apply Bootstrap classes//
        cameraCardCol.classList.add('col-12', 'col-lg-6','mt-4');
        cameraCard.classList.add('card', 'mb-4', 'mb-lg-0', 'border-light', 'shadow-sm');
        cameraCardBody.classList.add('card-body');
        cameraCardName.classList.add('card-title');
        cameraCardText.classList.add('card-text');
        cameraCardPrice.classList.add('card-text');
        cameraCardLenses.classList.add('form-group');
        cameraCardButton.classList.add('btn', 'btn-primary','mt-4');

      
        /*DropDown menu//
        lenses = cameraProduct.lenses;
        console.log(lenses);


        let lensDiv = document.createElement('div');
        document.querySelector('.product_camera').appendChild(lensDiv);

        let lensForm = document.createElement('form');
        let lensFG = document.createElement('div');
        let lensLabel = document.createElement('label');
        let lensSelect = document.createElement('select');
        let lensOption = document.createElement('option');

        lensDiv.appendChild(lensForm);
        lensDiv.appendChild(lensFG);
        lensDiv.appendChild(lensLabel);
        lensDiv.appendChild(lensSelect);
        lensDiv.appendChild(lensOption);

        lensOption.textContent = 'Option';

        lensDiv.classList.add('col-12', 'col-lg-4','mt-4');
        lensDiv.textContent = 'Lenses';

        lensFG.classList.add('form-group');
        lensLabel.textContent='You can use the following lenses :';
        lensSelect.classList.add('form-control')
        */


   }
};
