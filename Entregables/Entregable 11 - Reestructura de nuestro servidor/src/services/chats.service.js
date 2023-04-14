import ChatRepository from "../repository/chats.repository.js";
const chatRepository=new ChatRepository();

class ChatService{
createMessage(msg){
   return chatRepository.createMessage(msg);
}

getMessageHistory(){
    return chatRepository.getMessageHistory();
 }
}

export default ChatService