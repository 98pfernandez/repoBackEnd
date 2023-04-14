import CartModel from "../models/cart.models.js";
const cartModel=new CartModel();

class CartRepository {
    async createCart() {
        try {
           return await cartModel.create({});
        } catch (error) {
            return error
        }
    }

    async getMessageHistory() {
        try {
         return await ChatModel.find()
        } catch (error) {
        }
    }
}

export default CartRepository;
