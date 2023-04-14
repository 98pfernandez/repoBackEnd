import ChatModel from "../models/chat.models.js";

class ChatRepository {
    async createMessage(msg) {
        try {
           return await ChatModel.create(msg)
        } catch (error) {
        }
    }

    async getMessageHistory() {
        try {
         return await ChatModel.find()
        } catch (error) {
        }
    }
}

export default ChatRepository;
