import UserRepository from "../dao/repository/users.repository.js"
const userRepository=new UserRepository();

class UserService{
findUserByEmail(username){
   return userRepository.findUserByEmail(username);
}

findById(id){
    return userRepository.findById(id);
}

createUser(userInfo){
    return userRepository.createUser(userInfo);
}
}

export default UserService