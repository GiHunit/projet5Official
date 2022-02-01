const apiUrl = "http://localhost:3000/api/products"
const items = document.getElementById("items")

fetch (apiUrl)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        for(product of data){
            items.innerHTML += addProductTfront(product)

        }
    })
    .catch((error) => console.log("il y a des erreurs sur le chargemnent de l'Api" + error)) 
    
function addProductTfront(product) {
    return  `<a href="./product.html?id=${product._id}">
                <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
                </article>
            </a>`  
}

