import UserModel from "../../models/users.models.js";

class UserRepository {
    async findUserByEmail(username) {
        try {
            return await UserModel.findOne( {email:username});
        } catch (error) {
            return { error };
        }
    }

    async deleteMany(usersEmail) {
        try {
            return await UserModel.deleteMany( {email: { $in: usersEmail } });
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
          return await UserModel.updateOne({ email }, { $set: user }); 
        } catch (error) {
          return { error };
        }
      }

      async updateManyUser(prop, user) {
        try {
          return await UserModel.updateMany({ prop }, { $set: user }); 
        } catch (error) {
          return { error };
        }
      }

      async getUsers() {
        try {
         return await UserModel.find().lean();
        } catch (error) {
            return error
        }
    }  
}

export default UserRepository;
