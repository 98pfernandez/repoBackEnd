import CartRepository from "../repository/carts.repository.js";
const cartRepository=new CartRepository();

class CartService{
createCart(){
   return cartRepository.createCart();
}

getCarts(){
   return cartRepository.getCarts();
}

getCartById(id){
   return cartRepository.getCartById(id);
}

updateCart(cartID, cart){
   return cartRepository.updateCart(cartID, cart);
}

deleteAllCarts(){
   return cartRepository.deleteAllCarts();
}

deleteCartById(id){
   return cartRepository.deleteCartById(id);
}
}

export default CartService