let orderTable;
let totalItems;
let table;
const arrayOfPrice = [0];

mainFunction();

function mainFunction(){
    recoverItems();
    displayItems();
    collectPrice();
    sumOfPrices()
};


// Recover items in Local Storage
function recoverItems (){
    
    orderTable = JSON.parse(localStorage.getItem('basketItem')); 

    if (localStorage.getItem('basketItem') == null) {
    alert('basket is empty');
    document.getElementById('contact-form').classList.add('invisible');
    document.getElementById('removeAll').classList.add('invisible');
    } else{
        orderTable = JSON.parse(localStorage.getItem('basketItem')); 
        totalItems= document.getElementById('totalItems');
        totalItems.innerHTML='Total Items: ' + orderTable.length;
    }
}



// Display items in the table   
function displayItems(){
    for (let i in orderTable){
        table=document.getElementById('order-body');
        table.appendChild(document.createElement('tr')).innerHTML=
        `   <th scope="row">${orderTable[i].name}</th>
            <td>${orderTable[i].lense}</td>
            <td>${orderTable[i].price} Euros</td>   `;
    }
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
    totalDisplay.innerHTML=`Total Price: ${totalPrice} Euros`;
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

    const contactCart= {
            lastName:form.nom.value ,
            firstName:form.prenom.value,
            email:form.email.value,
            phone:form.phone.value,
            address: form.adresse.value,
            addressLn2: form.adresseLn2.value,
            codePostal: form.codepostal.value,
            city:form.ville.value,
            date: form.date.value,
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
            totalItems.innerHTML='Total Items: ' + orderTable.length;
            totalDisplay.innerHTML='Total Price: ' + orderTable.length;
        };
});





