
// Recover items in Local Storage
orderTable = JSON.parse(localStorage.getItem('basketItem')); 
////addd if empty here
if (localStorage.getItem('basketItem') == null) {
   alert('basket is empty');
} else{
    orderTable = JSON.parse(localStorage.getItem('basketItem')); 
    let totalItems= document.getElementById('totalItems')
    totalItems.innerHTML='Total Items: ' + orderTable.length;
}
 

// Display items in the table  
for (let i in orderTable){
    
    document.getElementById('order-body').appendChild(document.createElement('tr')).innerHTML=
    `   <th scope="row">${orderTable[i].name}</th>
        <td>${orderTable[i].lense}</td>
        <td>${orderTable[i].price} Euros</td>   `;
}



// Remmove all items
document.getElementById("removeAll").addEventListener('click',()=>{
    //add condition here, if Not null, then proceed
           
    let storageCount= localStorage.length
    
    if (storageCount > 0) {
       localStorage.clear();
       orderTable=[]; 
       location.reload();
     

       document.getElementById("demo3").innerHTML = "ALL removed"; 
    }else{
        document.getElementById("demo3").innerHTML = "no record to remove"; 
    };
}
);

  
/* Buttons Add and Remve Item
document.getElementById("addItem").addEventListener('click',()=>{

    document.getElementById("demo1").innerHTML = "Item is added";
}
);

document.getElementById("removeItem").addEventListener('click',()=>{

    document.getElementById("demo2").innerHTML = "Item is removed";
}
);
*/