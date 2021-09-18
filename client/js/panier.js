let orderTable;
let totalItems;
// Recover items in Local Storage
function recoverItems (){
    
    orderTable = JSON.parse(localStorage.getItem('basketItem')); 

    if (localStorage.getItem('basketItem') == null) {
    alert('basket is empty');
    } else{
        orderTable = JSON.parse(localStorage.getItem('basketItem')); 
        totalItems= document.getElementById('totalItems')
        totalItems.innerHTML='Total Items: ' + orderTable.length;
    }
}
recoverItems ();

let table;
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

displayItems();

console.log(orderTable);

// Remmove all items
document.getElementById("removeAll").addEventListener('click',()=>{
          
    let storageCount= localStorage.length
    
    if (storageCount > 0) {
        localStorage.clear();
        orderTable=[]; 
        console.log(orderTable);
        
        table.innerHTML="";
        totalItems.innerHTML='Total Items: ' + orderTable.length;
    };
}
);
