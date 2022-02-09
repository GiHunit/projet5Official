const items = document.getElementById("cart__items")
const formCart = document.querySelector(".cart__order__form")
const apiUrl = "http://localhost:3000/api/products/order"
// creer une variable qui est egal au storage si pas null sinon tableau vide

let panier = JSON.parse(localStorage.getItem("panier")) || [];
for (let item of panier) {
  items.innerHTML += addPanierThird(item)
}
updateCartValues();


const deleteBtns = document.querySelectorAll(".deleteItem")
deleteBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const cardItemDiv = btn.closest(".cart__item")
    panier = panier.filter(product => {
      return product.id !== cardItemDiv.getAttribute('data-id')
        && product.color !== cardItemDiv.getAttribute('data-color')
    })
    localStorage.setItem("panier", JSON.stringify(panier))
    cardItemDiv.remove()
    updateCartValues()
  })
})
const itemQuantity = document.querySelectorAll('.itemQuantity')

itemQuantity.forEach(item => {
  item.addEventListener("click", () => {
    const cardItemDiv = item.closest(".cart__item")
    panier = panier.map(product => {
      if (product.id === cardItemDiv.getAttribute('data-id')
        && product.color === cardItemDiv.getAttribute('data-color')) {
        const newQuantity = parseInt(item.value)
        const newPrice = (product.price / product.quantity) * newQuantity
        cardItemDiv.querySelector('.cart__item__content__description').lastElementChild.innerHTML = `${newPrice} €`
        return {
          ...product,
          quantity: newQuantity,
          price: newPrice
        }

      }
      return product;
    })
    localStorage.setItem("panier", JSON.stringify(panier))
    updateCartValues()
  })
})

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
formCart.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target)
  const objectData = {
    contact: Object.fromEntries(formData),
    products: panier.map(product => product.id)
  }
  fetch(apiUrl, {
    method: "POST",
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify(objectData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    }).catch((error) => {
      console.log(error)
    });
})








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

function updateCartValues() {
  let totalQuantity = 0
  const elemTotalQuantity = document.getElementById("totalQuantity")
  let totalPrice = 0
  const elemTotalPrice = document.getElementById('totalPrice')
  for (let item of panier) {
    totalQuantity += item.quantity
    totalPrice += item.price
  }
  elemTotalQuantity.innerHTML = totalQuantity
  elemTotalPrice.innerHTML = totalPrice
}





