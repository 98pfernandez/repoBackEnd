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
            return Swal.fire(
                'Warning',
                'Insert name!',
                'warning') 
        }
    }
});

inputMessage.addEventListener('keypress', (e)=> {

    if (e.key === 'Enter' && inputMessage.value!='') {
        message=inputMessage.value
        const messageForDB = { userName, message };
        inputMessage.value=''
        
        socket.emit('addMessageDB', messageForDB)
    }

});

socket.on('showMessagesLog', (messages)=>{
    messages.forEach(message => {
        chatLog.innerHTML+=`<div class='message'><b>${message.userName} says: </b> ${message.message}</div>`
});
})

socket.on('showNewMessageAllUserConnected',(msg)=>{
    chatLog.innerHTML +=`<div class='message'><b>${msg.userName} says: </b> ${msg.message}</div>`
})