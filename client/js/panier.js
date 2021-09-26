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
function displayItems(){
    for (let i in orderTable){
        table=document.getElementById('order-body');
        table.appendChild(document.createElement('tr')).innerHTML=
        `   <td width="20%" class="text-center"> <a href="produit.html?id=${orderTable[i].id}"> <img src="${orderTable[i].imageUrl}" width="90" alt="cam"></a> </td>
            <th scope="row">${orderTable[i].name}</th>
            <td>${orderTable[i].lense}</td>
            <td class="text-center">${orderTable[i].count}</td>
            <td class="text-right">${orderTable[i].basePrice}</td>
            <td class="text-right">${orderTable[i].price}</td>   
        `;
    }
    
}

// Prices in Euro Format
function euroFormat(){
    for (let i in orderTable) {
        orderTable[i].basePrice = new Intl.NumberFormat
        ("fr-FR", {style: "currency", currency: "EUR",})
        .format(orderTable[i].basePrice);

        orderTable[i].price = new Intl.NumberFormat
        ("fr-FR", {style: "currency", currency: "EUR",})
        .format(orderTable[i].price);

        
    }
};

euroFormat();




displayItems();
console.log(orderTable);
console.log(orderTable);


// Collect all Item Counts in an array
function collectItems(){
    for (let item in orderTable) {
    arrayOfItems.push(orderTable[item].count);
    };
}

// Count all items
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

console.log(table);

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
};





 


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
            localStorage.clear();
            orderTable=[]; 
            table.innerHTML="";
            //set displays to 0
            console.log(totalItems);
            totalItemsDiplay.innerHTML= "" 
            totalDisplay.innerHTML="";
        });





