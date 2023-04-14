import CartRepository from "../repository/carts.repository.js";
const cartRepository=new CartRepository();

class CartService{
createCart(){
   return cartRepository.createCart();
}

}

export default CartService