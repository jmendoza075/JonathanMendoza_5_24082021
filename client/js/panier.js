let orderTable;
let totalItems;
let table;
const arrayOfPrice = [0];
const arrayOfItems = [0];
const dateNow = new Date(); // today, now
const dateFr = dateNow.toLocaleDateString('fr-FR');  // DD/MM/YYYY


mainFunction();

function mainFunction(){
    recoverItems();
    collectPrice();
    sumOfPrices();
    collectItems();
    sumOfItems()
};


// Recover items in Local Storage
function recoverItems (){
    orderTable = JSON.parse(localStorage.getItem('basketItem')); 
    if (localStorage.getItem('basketItem') == null) {
    alert('Votre panier est vide. Veuillez choisir votre appareil photo');
    document.getElementById('contact-form').classList.add('invisible');
    document.getElementById('removeAll').classList.add('invisible');
    }
}



// Display items in the table   
let orderDisplay; 
orderDisplay= JSON.parse(localStorage.getItem('basketItem')); 

function displayItems(){
    for (let i in orderDisplay){
        table=document.getElementById('order-body');
        table.appendChild(document.createElement('tr')).innerHTML=
        `   <td width="20%" class="text-center"> <a href="produit.html?id=${orderDisplay[i].id}"> <img src="${orderDisplay[i].imageUrl}" width="90" alt="cam"></a> </td>
            <th scope="row">${orderDisplay[i].name}</th>
            <td>${orderDisplay[i].lense}</td>
            <td class="text-center">${orderDisplay[i].count}</td>
            <td class="text-right">${orderDisplay[i].basePrice}</td>
            <td class="text-right">  
                    ${(orderDisplay[i].price = new Intl.NumberFormat   // Euro format
                        ("fr-FR", {style: "currency", currency: "EUR",})
                        .format(orderDisplay[i].price)
                    )} 
            </td>   
        `;
    }
}

displayItems();

console.log(orderTable);


// Collect all Item Counts in an array
function collectItems(){
    for (let item in orderTable) {
    arrayOfItems.push(orderTable[item].count);
    };
}

// Total Item count
function sumOfItems(){
    const itemReducer = (previousValue, currentValue) => previousValue + currentValue;
    totalItems=(arrayOfItems.reduce(itemReducer));
    totalItemsDiplay=document.getElementById('totalItems');
    totalItemsDiplay.innerHTML= `Nombre d'articles: ${totalItems}  `;

}


// Collect all Prices in an array
function collectPrice(){
    for (let order in orderTable) {
    arrayOfPrice.push(orderTable[order].price);
    };
}

// Sum of all Prices
function sumOfPrices(){
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    totalPrice=(arrayOfPrice.reduce(reducer));

    totalDisplay=document.getElementById('totalPrice');
    //Display Prix total in Euros format
    totalDisplay.innerHTML=`Total : ${(totalPrice = new Intl.NumberFormat
        ("fr-FR", {style: "currency", currency: "EUR",})
        .format(totalPrice)
    )}` ;

}

// Add Total Price to Local Storage
localStorage.setItem('totalPrice', JSON.stringify(totalPrice));

// Submit Button
const submitButton=document.getElementById('submit-btn');
submitButton.addEventListener('click', ($event) => {
    //$event.preventDefault();
    console.log(orderTable);
    console.log(totalPrice);
   
    let productsCart = [];
    productsCart.push(orderTable);
    console.log(productsCart);

    let form=document.getElementById('cartForm');

    const dateFR = new Date() // Create date now
    console.log(dateFR.toLocaleDateString('fr-FR')) // DD/MM/YYYY

    const contactCart= {
            lastName:form.nom.value ,
            firstName:form.prenom.value,
            email:form.email.value,
            phone:form.phone.value,
            address: form.adresse.value,
            addressLn2: form.adresseLn2.value,
            codePostal: form.codepostal.value,
            city:form.ville.value,
            date: dateFr
        }

    console.log(contactCart);
    localStorage.setItem('contactCart', JSON.stringify(contactCart));
});


// Remove all items Button
document.getElementById("removeAll").addEventListener('click',()=> {
        let storageCount= localStorage.length
    
        if (storageCount > 0) {
            localStorage.clear();
            orderTable=[]; 
            table.innerHTML="";
            //set displays to 0
            totalItems.innerHTML=`Nombre d'articles: ${totalItems}  `
            totalDisplay.innerHTML='Total: ' + orderTable.length;
        };
});




