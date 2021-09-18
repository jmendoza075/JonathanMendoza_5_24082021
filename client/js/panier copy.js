
// Recover items in Local Storage
orderTable = JSON.parse(localStorage.getItem('basketItem')); 

////addd if empty here
if (localStorage.getItem('basketItem') == null) {
   alert('basket is empty');
} else{
    orderTable = JSON.parse(localStorage.getItem('basketItem')); 
    let totalItems= document.getElementById('totalItems')
    totalItems.innerHTML='total Items: ' + orderTable.length;
}
 

// Display in the table

function displayCart (){
for (let i in orderTable){
    
    document.getElementById('order-body').appendChild(document.createElement('tr')).innerHTML=
    `   <th scope="row">${orderTable[i].name}</th>
        <td>${orderTable[i].lense}</td>
        <td>${orderTable[i].price} Euros</td>   `;
}

}  

// Remmove all items
document.getElementById("removeAll").addEventListener('click',()=>{
    //add condition here, if Not null, then proceed
           
    let storageCount= localStorage.length
    
    if (storageCount > 0) {
       localStorage.clear(); 
       orderTable=[];
       console.log(orderTable);
       location.reload();
       
     
    }else{
        document.getElementById("all-removed").innerHTML = "no record to remove"; 
    };
}
);


/// cart total items
document.getElementById('totalCartItems').innerText=orderTable.length;