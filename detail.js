//! Variabili di comodo globali
const url = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNTI1Y2I5YzBmNzAwMTQ0ODRmNzQiLCJpYXQiOjE2ODYwNjU3NTYsImV4cCI6MTY4NzI3NTM1Nn0.tPeZyizHckrYl9kQ98z7RYh9bq0EF0elhMzjUHvpZYc"

//? Variabili per la MODIFICA della cardProduct
const modNameInput = document.getElementById("mod-name-input");
const modDescInput = document.getElementById("mod-desc-input");
const modBrandInput = document.getElementById("mod-brand-input");
const modImageUrl = document.getElementById("mod-imageUrl");
const modPriceInput = document.getElementById("mod-price-input");
//? variabile di appoggio della row
const myRow = document.getElementById("my-row");
//? bottone che fa partire la funzione modProduct
const modifyBtn = document.getElementById('modify-btn');
//? warning temporaneo in caso di mancato riempimento dei fields
const emptyField = document.getElementById('empty-fields');

//? mi creo l'IF in cui lavoreranno tutte le funzioni 
if (window.location.search) {
    /* console.log(window.location.search) */
    //? mi prendo l'id dell'elemento come parametro "product"
    const params = new URLSearchParams(window.location.search)
    /* console.log(params.get('product'))*/

    //? creo la chiamata API con l'url + id prodotto
    async function getProducts() {
        myRow.innerHTML = "";
        const res = await fetch(url + params.get('product'), {headers: {"Authorization": "Bearer "+ token }});
        const json =  await res.json();
        createProductTemplate(json);
        /* console.log(json); */
        //? mi chiamo il bottone in questo punto per prendere come elemento il json(ossia gli elementi del prodotto)
        modifyBtn.addEventListener("click", () =>{
            modProduct(json);
            /* console.log("click"); */
        });
    }
    
    window.onload = getProducts();

    //! funzione che crea la card prodotto e la fa vedere a schermo
    function createProductTemplate(element) {

        /* 
            div"div">div"card">div"row g-0">(div"col-md-4">img"img-fluid rounded-start")+(div"col-md-8">div"card-body" etc...)

            myDiv = document.createElement("div");
            myDiv.classList.add("col-12");


        
        
            */

        const myDiv1 = document.createElement("div");
        myDiv1.classList.add("img-cont");
        const myDiv2= document.createElement("div");
        myDiv2.classList.add("card-body-cont");

        const cardImg = document.createElement("img");
        cardImg.src = element.imageUrl;
        cardImg.classList.add("img-fluid");
        

        const myCardBody = document.createElement("div");
        myCardBody.classList.add("my-card-body");
        const myCardName = document.createElement("h2");
        myCardName.classList.add("card-title");
        myCardName.innerText = element.name;
        const myCardDesc = document.createElement("p"); 
        myCardDesc.classList.add("card-text");
        myCardDesc.innerText = element.description;
        const myCardBrand = document.createElement("h5");
        myCardBrand.classList.add("card-subtitle", "mb-2", "text-muted");
        myCardBrand.innerText = element.brand;
        const myCardPrice = document.createElement("p");
        myCardPrice.classList.add("card-text");
        myCardPrice.innerText = "Price: €" + element.price;

        //? <button type="button" class="btn btn-primary">edit</button>
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn-dark', 'btn-small', "mx-1", 'btn');  
        editBtn.setAttribute("data-bs-toggle", "modal");
        editBtn.setAttribute("data-bs-target", "#staticBackdrop");
        editBtn.innerText = "Modifica Prodotto";

       
        myDiv1.appendChild(cardImg);
        myDiv2.appendChild(myCardBody);
        
        myCardBody.append(myCardName, myCardBrand, myCardDesc, myCardPrice, editBtn);
        myRow.append(myDiv1, myDiv2);
    }

    //! Funzione che MODIFICA il prodotto con gli elementi scritti nel modale
    async function modProduct(element) {
        /* console.log(element); */
        if (modNameInput.value &&modDescInput.value && modBrandInput.value && modImageUrl.value && modPriceInput.value) {
        const payload = {
            "name": modNameInput.value, 
            "description": modDescInput.value,
            "brand": modBrandInput.value,
            "imageUrl": modImageUrl.value,
            "price": modPriceInput.value,
        };
        const modResult = await fetch(url + params.get('product'), {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+ token
            }
        });
        getProducts();
        modNameInput.innerHTML = "";
        modDescInput.innerHTML = "";
        modBrandInput.innerHTML = "";
        modImageUrl.innerHTML = "";
        modPriceInput.innerHTML = "";
        }else {
            console.log("valorizza tutti i campi richiesti");
            emptyField.classList.toggle("d-none");
            setTimeout(() => {
                emptyField.classList.toggle("d-none");
            }, 5000);
        }
    }

} 



