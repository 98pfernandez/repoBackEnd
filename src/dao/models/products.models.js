const mongoose = require('mongoose');

const productCollection='products';

const productSchema=new mongoose.Schema({

    title:String,
    description:String,
    price:Number

})

const productModel=mongoose.model(productCollection,productSchema);

module.exports = productModel;