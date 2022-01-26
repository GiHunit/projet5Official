//  // vérifie si l'article est pas déjà dans le panier
//  cartArticles.forEach(function(v) {
//     // si l'article est déjà présent, on incrémente la quantité
//     if (v.id == id) {
//         newArticle = false;
//         v.qt += qt;
//         $('#'+ id).html('<a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="qt">'+ v.qt +'</span></small></a>');
//     }
// });

// // s'il est nouveau, on l'ajoute
// if (newArticle) {
//     $('#cart-dropdown').prepend('<li id="'+ id +'"><a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="qt">'+ qt +'</span></small></a></li>');

//     cartArticles.push({
//         id: id,
//         name: name,
//         price: price,
//         weight: weight,
//         qt: qt,
//         url: url
//     });
// }

// // sauvegarde le panier
// saveCart(inCartItemsNum, cartArticles);

// // affiche le contenu du panier si c'est le premier article
// cartEmptyToggle();
// });