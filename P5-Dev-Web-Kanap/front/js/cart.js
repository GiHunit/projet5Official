
// creer une variable qui est egal au stirage si pas null sinon tableau vide
console.log(localStorage.getItem("panier"));

let panier = JSON.parse(localStorage.getItem("panier")) || [];    
if (panier.length > 0){
    
}