// Obtener todos los elementos con la clase "productButton"
const buttons = document.querySelectorAll(".removeButton");


const headers = {
  'Content-Type': 'application/json'
}
const method = 'DELETE'
const body=null;


// Iterar sobre los botones y agregar un eventListener a cada uno
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Aquí puedes colocar el código que se ejecutará cuando se haga clic en el botón
    const parent = button.parentNode.parentNode;
    const url = '/carts/products/'+parent.id

    fetch(url, {
      headers,
      method,
      body
    })
    .then(response => {
      statusVar = response.status;
      return response.json()
    })
    .then(data => {
      console.log(data)
     document.location.href = '/carts'
    })
    .catch(error => {
      alert('error')
      console.log(error)
    })
  })
  });
