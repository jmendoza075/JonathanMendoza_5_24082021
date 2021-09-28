let orderTable;
let totalPrice;
let contactCart;
const orderIdString =[];

// Recover Ordered Items from Local Storage
totalPrice = JSON.parse(localStorage.getItem('totalPrice')); 
orderTable = JSON.parse(localStorage.getItem('basketItem')); 
// Recover Contact from Local Storage
contactCart=JSON.parse(localStorage.getItem('contactCart')); 

// Pick the _id's only
for (let i in orderTable ){
  orderIdString.push(orderTable[i].id);
}

// API fetch POST 
const order = {contact: contactCart, products: orderIdString};

fetch('http://localhost:3000/api/cameras/order/', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(order),
})
.then(response => response.json())

.then(data => {
  // Fill-in Confirmation Order: Contacts with Order Reference
  document.getElementById('orderConfirmId').innerHTML=data.orderId;
  document.getElementById('nom').innerHTML=`Bonjour ${data.contact.firstName} ${data.contact.lastName}`;
  document.getElementById('orderDate').innerHTML=data.contact.date;

  const addressTo = `${data.contact.address} <br>
                    ${data.contact.addressLn2}<br>
                    ${data.contact.codePostal} ${data.contact.city} `;
  document.getElementById('address').innerHTML= addressTo;

  // Display with ordered items details
  for (let i in orderTable){
    table=document.getElementById('orderTable');

    table.appendChild(document.createElement('tr')).innerHTML=
    `   <td width="20%" class="text-center"> <img src="${data.products[i].imageUrl}" width="90"> </td>
        <th scope="row">${orderTable[i].name}</th>
        <td>${orderTable[i].lense}</td>
        <td class="text-center">${orderTable[i].count}</td>
        <td class="text-right">
          ${(orderTable[i].basePrice = new Intl.NumberFormat   // Euro format
            ("fr-FR", {style: "currency", currency: "EUR",})
            .format(orderTable[i].basePrice)
          )} 
        </td>
        <td class="text-right">
          ${(orderTable[i].price = new Intl.NumberFormat   // Euro format
            ("fr-FR", {style: "currency", currency: "EUR",})
            .format(orderTable[i].price)
          )} 
        </td>   `;
  }
  document.getElementById('total').innerHTML=`${totalPrice}`;
})

.catch((error) => {
  console.error('Error:', error);
  alert('Erreur API POST');
});

//Click to Menu and Button: Acceuil -> Empties the Local Storage
document.querySelectorAll('.resetAll').forEach(item => {
  item.addEventListener('click', event => {
    localStorage.clear();
  })
});