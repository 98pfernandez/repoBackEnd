import mongoose from'mongoose';

const userCollection = 'user'

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  pass: String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
    unique:true
  },
  rol:{
    type:String,
    default:'user'
  },
  last_connection: Date,
})

const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel;