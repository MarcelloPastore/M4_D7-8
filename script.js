//! Variabili di comodo globali
const url = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNTI1Y2I5YzBmNzAwMTQ0ODRmNzQiLCJpYXQiOjE2ODYwNjU3NTYsImV4cCI6MTY4NzI3NTM1Nn0.tPeZyizHckrYl9kQ98z7RYh9bq0EF0elhMzjUHvpZYc"

//? Variabili per la CREAZIONE della cardProduct
const nameInput = document.getElementById("name-input");
const descInput = document.getElementById("desc-input");
const brandInput = document.getElementById("brand-input");
const imageUrl = document.getElementById("imageUrl");
const priceInput = document.getElementById("price-input");
//? variabile di appoggio della row
const myRow = document.getElementById("my-row");
//? bottone che fa partire la funzione addProduct
const createBtn = document.getElementById('create-btn');
//? warning temporaneo in caso di mancato riempimento dei fields
const emptyField = document.getElementById('empty-fields');



//! Chiamata API
async function getProducts() { 
    myRow.innerHTML= "";
    const res = await fetch(url, {headers: {"Authorization": "Bearer "+ token }});
    const json =  await res.json();

    json.forEach((element) => {
        createProductTemplate(element);
    });

    console.log(json);
}

window.onload = getProducts();

//! Funzione crea prodotto
// avvio la funzione al click del prodotto
createBtn.addEventListener("click", newProduct);
// funzione che crea il prodotto e lo pusha nel "server"
async function newProduct() {
    if (nameInput.value && descInput.value && brandInput.value && imageUrl.value && priceInput.value) {
        const payload = {
            "name": nameInput.value, 
            "description": descInput.value,
            "brand": brandInput.value,
            "imageUrl": imageUrl.value,
            "price": priceInput.value,
        };
        const createResult = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload), 
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+ token
            }
        });
        getProducts();
        nameInput.value = "";
        descInput.value = "";
        brandInput.value = "";
        imageUrl.value = "";
        priceInput.value = "";
    } else {
        console.log("valorizza tutti i campi richiesti");
        emptyField.classList.toggle("d-none");
        setTimeout(() => {
            emptyField.classList.toggle("d-none");
        }, 5000);
    }
}

//! funzione che crea la card prodoto e la fa vedere a schermo

function createProductTemplate(element) {
    let myID = element._id;
    
    const myDiv = document.createElement("div");
    myDiv.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "p-3", "d-flex", "justify-content-center"); 
    const myCard = document.createElement("div");
    myCard.classList.add("card");
    const cardImg = document.createElement("img");
    cardImg.src = element.imageUrl;
    cardImg.classList.add("card-img-top");
    const myCardBody = document.createElement("div");
    myCardBody.classList.add("card-body-2");
    const myCardName = document.createElement("h5");
    myCardName.classList.add("card-title");
    myCardName.innerText = element.name;
    const myCardDesc = document.createElement("p"); 
    myCardDesc.classList.add("card-text", "Txt");
    myCardDesc.innerText = element.description;
    const myCardBrand = document.createElement("h6");
    myCardBrand.classList.add("card-subtitle", "mb-2", "text-muted");
    myCardBrand.innerText = element.brand;
    const myCardPrice = document.createElement("p");
    myCardPrice.classList.add("card-text");
    myCardPrice.innerText = "Price: €" + element.price;
    const seeMore = document.createElement("a");
    seeMore.href= "details.html?product=" + myID;
    seeMore.innerText = "See more";

    //? <button type="button" class="btn btn-primary">Delete</button>
    const delBtn = document.createElement('button');
    delBtn.classList.add('btn-danger', 'btn-small', "mx-1", 'btn'); 
    delBtn.innerText = "Delete";

    myDiv.appendChild(myCard);
    myCard.append(cardImg, myCardBody);
    myCardBody.append(myCardName, myCardBrand, myCardDesc, myCardPrice, seeMore, delBtn);
    myRow.appendChild(myDiv);

    
    delBtn.onclick = () => {deleteProduct(myID); /* console.log("click"); */}
}

//! funzione del delete button funzionante
async function deleteProduct(elementID) {
    const deleteResult = await fetch(url + elementID, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": "Bearer "+ token
        }
    })
    console.log(elementID);
    getProducts();
}


