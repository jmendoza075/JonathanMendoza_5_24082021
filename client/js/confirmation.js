let orderTable;
let totalPrice;
let productsCart=[];


// Recover Ordered Items from Local Storage
orderTable = JSON.parse(localStorage.getItem('basketItem')); 
totalPrice = JSON.parse(localStorage.getItem('totalPrice')); 



// Recover Contact from Local Storage
const contactCart=JSON.parse(localStorage.getItem('contactCart')); 


// API fetch POST 

const order = { contact: contactCart, products:  productsCart};

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
document.getElementById('address').innerHTML=
`${data.contact.address} ${data.contact.addressLn2} ${data.contact.codePostal} ${data.contact.city}`;






})
.catch((error) => {
  console.error('Error:', error);
});


for (let i in orderTable){
  table=document.getElementById('orderTable');
  table.appendChild(document.createElement('tr')).innerHTML=
  `   <th scope="row">${orderTable[i].name}</th>
      <td>${orderTable[i].lense}</td>
      <td class="text-right">${orderTable[i].price} €</td>   `;
}


console.log(totalPrice);
document.getElementById('total').innerHTML=`${totalPrice} € `;