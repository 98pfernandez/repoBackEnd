import mongoose from'mongoose';

const userCollection = 'user'

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  pass: String
})

const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel;