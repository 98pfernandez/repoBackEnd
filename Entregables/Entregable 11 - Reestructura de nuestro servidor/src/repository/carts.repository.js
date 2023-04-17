import CartModel from "../models/cart.models.js";

class CartRepository {
    async createCart() {
        try {
           return await CartModel.create({});
        } catch (error) {
            return error
        }
    }

    async getCarts() {
        try {
         return await CartModel.find()
        } catch (error) {
            return error
        }
    }
    
    async getCartById(id) {
        try {
            return await CartModel.findOne( {_id:id}).lean();
        } catch (error) {
            return { error };
        }
    }

    async updateCart(cartId, cart){
        try {
            return await CartModel.updateOne({ _id: cartId }, cart)
        } catch (error) {
            return error
        }
    }

    async deleteAllCarts (){
        try {
            return await CartModel.deleteMany({})
        } catch (error) {
            return error
        }
    }

    async deleteCartById(id) {
        try {
            return await CartModel.deleteOne( {_id:id});
        } catch (error) {
            return { error };
        }
    }
}

export default CartRepository;
