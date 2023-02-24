const socket=io();

chatLog=document.querySelector(".chatLog")
inputMessage=document.querySelector("#messageInput");
chatVisible=document.querySelector("#chatVisible");
divName=document.querySelector("#divName");
welcomeTitle=document.querySelector("#welcome");
let userName='';
let message='';

inputName.addEventListener('keypress', (e)=> {

    if (e.key === 'Enter') {
        if(inputName.value!=''){
            userName=inputName.value;

            chatVisible.style.display="contents"
            divName.style.display="none"
            welcomeTitle.innerHTML=`${userName} welcome to the chat`

            socket.emit('getMessageLogs')
        }else{
            alert("insert name!")
        }
    }
});

inputMessage.addEventListener('keypress', (e)=> {

    if (e.key === 'Enter' && inputMessage.value!='') {
        message=inputMessage.value
        const messageForDB = { userName, message };
        console.log(messageForDB)
        inputMessage.value=''
        
        socket.emit('addMessageDB', messageForDB)
        socket.on('showNewMessageAllUserConnected',()=>{
            chatLog.innerHTML +=`<div class='message'><b>${userName} says: </b> ${message}</div>`
        })
    }

});

socket.on('showMessagesLog', (messages)=>{
    messages.forEach(message => {
        chatLog.innerHTML+=`<div class='message'><b>${message.userName} says: </b> ${message.message}</div>`
});
})