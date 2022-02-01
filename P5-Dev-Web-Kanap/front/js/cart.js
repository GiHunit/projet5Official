const items = document.getElementById("cart__items")
let totalQuantity = 0
const elemTotalQuantity = document.getElementById("totalQuantity")

let  totalPrice = 0
const elemTotalPrice = document.getElementById('totalPrice')



// creer une variable qui est egal au storage si pas null sinon tableau vide

let panier = JSON.parse(localStorage.getItem("panier")) || [];

for (let item of panier) {
  console.log(item.quantity)
  items.innerHTML += addPanierThird(item) 
  totalQuantity += item.quantity
  totalPrice += item.price
}

elemTotalQuantity.innerHTML = totalQuantity

elemTotalPrice.innerHTML = totalPrice

const deleteBtns = document.querySelectorAll(".deleteItem")
deleteBtns.forEach(btn => {
  btn.addEventListener("click",  () => {
    console.log(btn.closest('.cart__item').getAttribute('data-id'))
    console.log(btn.closest('.cart__item').getAttribute('data-color'));
    // recup le panier + filtrer avec les elements et les supprimer
    })
})





// async function UpdateCart() {
//     //OneProduct est un objet récupéré avec les informations du produit notamment son id, sa couleur(coloration), et sa quantité(number) (instance de classe)
//     const OneProduct = await CreateProductForCart();
//     const AllProducts = localStorage.getItem('Allproducts');
//     const Cart =  AllProducts ? JSON.parse(AllProducts) : [];

//     if (Cart.length == 0) {

//         Cart.push(OneProduct);
//         return Cart;

//     } else {
//        for (let CartParts of Cart) {   
//             if (CartParts.id === OneProduct.id && CartParts.coloration === OneProduct.coloration) {
//                 CartParts.number += OneProduct.number;
//                 return Cart;
//             } else {
//                 Cart.push(OneProduct);
//                 return Cart;
//             }
//         }
//     }
// }

// async function UpdateStorage() {

//     const Cart = await UpdateCart();

//     localStorage.removeItem('Allproducts');
//     localStorage.setItem('Allproducts', JSON.stringify(Cart));
//     console.log("Le Storage s'est mis à jour.");

















function addPanierThird(panier) {
  return ` 
  <article class="cart__item" data-id="${panier.id}" data-color="${panier.color}">
    <div class="cart__item__img">
      <img src="${panier.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${panier.name}</h2>
        <p>${panier.color}</p>
        <p>${panier.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
`}


