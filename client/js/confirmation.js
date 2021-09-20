
// API POST 

let productsCart= [];
let contactCart= {
                firstName: "jojo " ,
                lastName: "mendoza" ,
                city: "paris",
                address: "5 rue du Renard",
                email: "jojolayas@gmailcom"
              }


let order = { contact: contactCart,
              products:  productsCart
};


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
})
.catch((error) => {
  console.error('Error:', error);
});
