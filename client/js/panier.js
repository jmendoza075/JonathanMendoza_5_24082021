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



console.log(orderTable);

// Collect all Prices in an array


function collectPrice(){
    for (let order in orderTable) {
     console.log(orderTable[order].price);
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
 








// Remove all items
document.getElementById("removeAll").addEventListener('click',()=>{
          
    let storageCount= localStorage.length
    
    if (storageCount > 0) {
        localStorage.clear();
        orderTable=[]; 
        table.innerHTML="";
        //set displays to 0
        totalItems.innerHTML='Total Items: ' + orderTable.length;
        totalDisplay.innerHTML='Total Price: ' + orderTable.length;
    };
}
);
