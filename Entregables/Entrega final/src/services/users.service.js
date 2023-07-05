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

updateUser(email, user) {
    return userRepository.updateUser(email, user);
  }

  updateManyUser(prop, user) {
    return userRepository.updateManyUser(prop, user);
  }

  deleteManyUser(usersEmails){
    return userRepository.deleteMany(usersEmails);
  }

getUsers(){
    return userRepository.getUsers();
 }
}

export default UserService