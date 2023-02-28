import mongoose from 'mongoose';

const cartCollection='cart';

const cartSchema=new mongoose.Schema({

    products:Array

})

const cartModel=mongoose.model(cartCollection,cartSchema);

export default cartModel;