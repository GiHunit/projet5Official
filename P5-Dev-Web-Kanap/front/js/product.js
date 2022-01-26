let params = new URLSearchParams(document.location.search);
let id = params.get("id");
const item = document.getElementById("item")

const apiUrl = "http://localhost:3000/api/products"

fetch(apiUrl + "/" + id)
  .then((response) => response.json())
  .then((product) => {
    item.innerHTML = addProductTfront(product)

    console.log(product.colors)

  })
  .then((product) => {

    const btn = document.getElementById("addCart")
    btn.addEventListener("click", () => {

      const colors = document.getElementById("colors").value

      const price = document.getElementById("price").innerText
      console.log(price);

      const quantity = document.getElementById("quantity").value


      const productName = document.getElementById("title").innerText


      let product = {

        id: id,
        name: productName,
        quantity: quantity,
        couleur: colors,
        prix: price,
      }

      // ***************************************** ligne 50  ajout  41



      // ***************************************** HERE

      // ici


      let panier = localStorage.getItem("panier") !== null
        ? JSON.parse(localStorage.getItem("panier"))
        : [];

      if (panier.length > 0) {
        const productFound = panier.find(obj => {
          return obj.id == id && obj.couleur == colors
        })
        if (productFound) {
          panier = panier.map(obj => {
            if (obj.id === id && obj.couleur == colors) {
              return {
                ...obj,
                quantity: parseInt(obj.quantity) + parseInt(quantity)
              }
            }
            return obj
          })
        } else {
          panier = [...panier, product];
        }
      } else {
        panier = [...panier, product];
      }

      localStorage.setItem("panier", JSON.stringify(panier))





      // const panier = []
      // if (localStorage.getItem("panier")) {
      //   panier.push(...JSON.parse(localStorage.getItem("panier")))
      // }

      // console.log(panier)
      // let f = panier.filter(obj => {
      //   return obj.id == id && obj.couleur == colors

      // })
      // if (f.length == 0) {
      //   panier.push(product)
      //   localStorage.setItem("panier", JSON.stringify(panier))

      // }

    })



  })



  .catch((error) => console.log("il y a des erreurs sur le chargemnent de l'Api" + error))




// Declaration





function addProductTfront(product) {



  return `  
      
      <article>
      <div class="item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}"> 
      </div>
      <div class="item__content">
      
          <div class="item__content__titlePrice">
          <h1 id="title">  ${product.name}  </h1>
            <p>Prix : <span id="price">   ${product.price}</span>€</p>
            </div>
            
          <div class="item__content__description">
          <p class="item__content__description__title">Description :</p>
          <p id="description">    ${product.description} </p>
          </div>

          <div class="item__content__settings">
          <div class="item__content__settings__color">
          <label for="color-select">Choisir une couleur :</label>
              <select name="color-select" id="colors">
              <option value="">--SVP, choisissez une couleur --</option>
              ${addColors(product.colors)
    }
                                
                                        
                    </select>
                    </div>
                              <div class="item__content__settings__quantity">
               <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
              <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
              </div>
          </div>
          
          <div class="item__content__addButton">
          <button id="addCart"  >Ajouter au panier</button>
        
          </div>
          
          </div>
          
          </article>
     
          


          `
  function addColors(colors) {
    let html = ""
    for (let i = 0; i < colors.length; i++) {
      html += ' <option value="' + colors[i] + '">' + colors[i] + '</option> '
    }
    return html
  }
}