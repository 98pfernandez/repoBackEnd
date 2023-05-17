import mongoose from 'mongoose';

const chatCollection='chat';

const chatSchema=new mongoose.Schema({

    userName:String,
    message:String

})

const ChatModel=mongoose.model(chatCollection,chatSchema);

export default ChatModel;