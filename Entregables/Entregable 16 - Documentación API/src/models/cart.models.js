import mongoose from 'mongoose';

const cartCollection='cart';

const cartSchema=new mongoose.Schema({

    products: {
        type: [
          {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'products'
            },
          quantity: {
          type: Number,
          default: 1
        }
          }
        ],
        default: []
      }

})

cartSchema.pre('find', function () {
    this.populate('products.product')
  })

  cartSchema.pre('findOne', function () {
    this.populate('products.product')
  })

const cartModel=mongoose.model(cartCollection,cartSchema);

export default cartModel;