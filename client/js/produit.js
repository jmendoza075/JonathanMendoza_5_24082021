// Recover Id

let params = new URLSearchParams(window.location.search);
let product_id= params.get('id');

let orderTable=[];
let orderedObject;

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
        let cameraCardLenses = document.createElement('div');
        let ajoutBanner = document.createElement('div');
        let cameraCardButton = document.createElement('a');
        let seeCartButton = document.createElement('a');
        
        cameraCardBody.appendChild(ajoutBanner);
        cameraCardBody.appendChild(cameraCardName);
        cameraCardBody.appendChild(cameraCardText);
        cameraCardBody.appendChild(cameraCardPrice);
        cameraCardBody.appendChild(cameraCardLenses);
        cameraCardBody.appendChild(cameraCardButton);
        cameraCardBody.appendChild(seeCartButton);

        cameraCardName.textContent = cameraProduct.name;
        cameraCardText.textContent = cameraProduct.description;

        //Display Prix in Euros format
        let camPriceEuro = (cameraProduct.price/100)

        cameraCardPrice.textContent =`${(camPriceEuro = new Intl.NumberFormat
                ("fr-FR", {style: "currency", currency: "EUR",})
                .format(camPriceEuro)
            )}` ;

        cameraCardButton.textContent = 'Ajouter au panier';
        cameraCardButton.href = '#';
        seeCartButton.textContent = 'Voir le panier';
        seeCartButton.href = 'panier.html';
        
        //Dropdown Menu for Lenses //
        let lensLabel = document.createElement('label');
        let lensSelect = document.createElement('select');
        lensLabel.innerText='Objectifs disponible: '
        cameraCardLenses.appendChild(lensLabel);
        cameraCardLenses.appendChild(lensSelect);     
         
        //Lense Options //
        const tabLenses= cameraProduct.lenses;
        for (let i=0; i<tabLenses.length; i+=1){
            let lensOption = document.createElement("option");
            lensOption.innerText = tabLenses[i];
            lensSelect.appendChild(lensOption);
        };     

        //Lens select//
        const lensDropdown = document.querySelector('select');
        lensChoice= lensDropdown.value;         //applies default choice
        lensDropdown.addEventListener('change',($event) =>{
            lensChoice= $event.target.value;
        });

        


        //Banner Confirmation Ajout au Panier
        ajoutBanner.innerText = "Votre choix d'article a bien été ajouté au panier."
        
    
        //Apply Bootstrap classes//
        cameraCardCol.classList.add('col-12', 'col-lg-6','mt-4','mx-auto');
        cameraCard.classList.add('card', 'mb-4', 'mb-lg-0', 'border-light', 'shadow-sm');
        cameraCardBody.classList.add('card-body');
        cameraCardName.classList.add('card-title');
        cameraCardText.classList.add('card-text');
        cameraCardPrice.classList.add('card-text');
        cameraCardLenses.classList.add('form-group');
        lensSelect.classList.add('form-control')
        cameraCardButton.classList.add('add-cart','btn', 'btn-primary','mt-2');
        ajoutBanner.classList.add('ajoutBanner', 'alert', 'alert-success', 'mt-4','text-center');
        $('.ajoutBanner').hide();  //hide Banner message 
        seeCartButton.classList.add('btn', 'btn-outline-secondary','mt-2','ml-5');
     


        // Check and add item to Local Storage
        if (localStorage.getItem('basketItem') !== null) {
            orderTable = JSON.parse(localStorage.getItem('basketItem')); 
        }                                                               // <-No "else" statement because we do 
                                                                        // not need to inform the client at this stage

        //On click, Add to localStorage//
        cameraCardButton.addEventListener('click',   ()=>  {
            
            orderedObject = {
                name: cameraProduct.name,
                price: cameraProduct.price/100,
                basePrice:cameraProduct.price/100,
                count: 1,
                lense: lensChoice,
                id:product_id,
                imageUrl:cameraProduct.imageUrl
                };
    

            //Check if orderedObject is already in the orderTable
            
            function updateOrderInOrderTable(product){
                for (let i=0; i < orderTable.length; i++){
                    if ((orderTable[i].id == product.id) && (orderTable[i].lense == product.lense)){  // check if same id and same lense
                        orderTable[i].count +=1;
                        orderTable[i].price = orderTable[i].basePrice * orderTable[i].count;
                        return; 
                    }
                }
                orderTable.push(product);
            }

            updateOrderInOrderTable(orderedObject);


            //Show then hide Banner message 
            $('.ajoutBanner').show();  
            setTimeout(() => {$('.ajoutBanner').hide()}, 3000);
            
                       
            //Update basket in Local Storage
            localStorage.setItem('basketItem', JSON.stringify(orderTable));
            
            }
            
        );
       
   }
};
