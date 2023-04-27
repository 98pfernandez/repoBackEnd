import CartDTO from "../DTOs/cart.dto.js";
import CartRepository from "../dao/repository/carts.repository.js";
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
   const cartDTO=new CartDTO(cart);
   return cartRepository.updateCart(cartID, cartDTO);
}

deleteAllCarts(){
   return cartRepository.deleteAllCarts();
}

deleteCartById(id){
   return cartRepository.deleteCartById(id);
}
}

export default CartService