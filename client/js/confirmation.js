let orderTable;
let totalPrice;
let productsCart= ["5be9bc241c9d440000a730e7","5be1ed3f1c9d44000030b061"] ; // <- good format for fetch-POST array of string id's 


// Recover Ordered Items from Local Storage
orderTable = JSON.parse(localStorage.getItem('basketItem')); 
totalPrice = JSON.parse(localStorage.getItem('totalPrice')); 




// Recover Contact from Local Storage
let contactCart=JSON.parse(localStorage.getItem('contactCart')); 


// API fetch POST 

const order = { contact: contactCart, products: productsCart};

fetch('http://localhost:3000/api/cameras/order/', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(order),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  
// Fill-in Confirmation Order
document.getElementById('orderConfirmId').innerHTML=data.orderId;
document.getElementById('nom').innerHTML=`Bonjour ${data.contact.firstName} ${data.contact.lastName}`;
document.getElementById('orderDate').innerHTML=data.contact.date;

const addressTo = `${data.contact.address} <br>
${data.contact.addressLn2}<br>
${data.contact.codePostal} ${data.contact.city} `;

document.getElementById('address').innerHTML= addressTo;


// console.log(data.products[0].name);
// console.log(data.products[0].price);
// console.log(data.products[0].lenses[0]);

})
.catch((error) => {
  console.error('Error:', error);
  alert('Error in API POSTing');
});


for (let i in orderTable){
  table=document.getElementById('orderTable');
  table.appendChild(document.createElement('tr')).innerHTML=
  `   <th scope="row">${orderTable[i].name}</th>
      <td>${orderTable[i].lense}</td>
      <td class="text-right">${orderTable[i].price} €</td>   `;
}



document.getElementById('total').innerHTML=`${totalPrice} € `;