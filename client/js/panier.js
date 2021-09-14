 //console.log('hello2');//



document.getElementById("addItem").addEventListener('click',()=>{
    localStorage.setItem('name','jojo');
    localStorage.setItem('age','39');
    document.getElementById("demo1").innerHTML = "Item is added";
}
);

document.getElementById("removeItem").addEventListener('click',()=>{
    //add condition here,
    localStorage.removeItem('age');
    document.getElementById("demo2").innerHTML = "Item is removed";
}
);


// Remmove all items
document.getElementById("removeAll").addEventListener('click',()=>{
    //add condition here, if Not null, then proceed
    
    console.log(localStorage);
    
    let storageCount= localStorage.length
    console.log(storageCount);
 

    if (storageCount > 0) {
       localStorage.clear(); 
       document.getElementById("demo3").innerHTML = "ALL removed"; 
    }else{
        document.getElementById("demo3").innerHTML = "no record to remove"; 
    };




    
   
}
);
