const socket=io();

//Real time products

productsTag = document.querySelector(".realTimeProducts");
buttonRefresh=document.querySelector("#bttRefresh");

buttonRefresh.addEventListener("click", ()=>{
        socket.emit('refresh')
});

socket.on('showAllProducts', data=>{
        let htmlStructure= ` <div class="Product">
        <div style="background-color: grey;" class="title">TITLE</div>
        <div style="background-color: grey;" class="description">DESCRIPTION</div>
        <div style="background-color: grey;" class="price">PRICE</div>
    </div>`;
        data.forEach(element => {
              htmlStructure+= ` 
                <div class="Product"> 
                <div class="productName">${element.title}</div>
                <div class="productDescription">${element.description}</div>
                <div class="productPrice">${element.price}</div>
                </div>`
        })
        productsTag.innerHTML=htmlStructure;
})









/*
socket.emit('init')

;*/


