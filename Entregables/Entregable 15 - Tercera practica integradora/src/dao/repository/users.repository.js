import UserModel from "../../models/users.models.js";

class UserRepository {
    async findUserByEmail(username) {
        try {
            return await UserModel.findOne( {email:username});
        } catch (error) {
            return { error };
        }
    }

    async createUser(userInfo) {
        try {
            return await UserModel.create(userInfo);
        } catch (error) {
            return { error };
        }
    }

    async findById(id) {
        try {
            return await UserModel.findById(id);
        } catch (error) {
            return { error };
        }
    }

    async updateUser(email, user) {
        try {
          return await UserModel.updateOne( {email: email} , {user} ); 
        } catch (error) {
          return { error };
        }
      }
}

export default UserRepository;
