import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection='products';

const productSchema=new mongoose.Schema({

    title:{
        type:String,
        index:true
    },
    description:String,
    code:String,
    price:Number,
    stock: Number,
    category: Number,
    image: String,
    owner:{
        type:String,
        default:'admin'
    }
})

productSchema.plugin(mongoosePaginate)
const productModel=mongoose.model(productCollection,productSchema);

export default productModel;