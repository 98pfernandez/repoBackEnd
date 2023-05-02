// Obtener todos los elementos con la clase "productButton"
const buttons = document.querySelectorAll(".productButton");


const url = '/carts'
const headers = {
  'Content-Type': 'application/json'
}
const method = 'PATCH'


// Iterar sobre los botones y agregar un eventListener a cada uno
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Aquí puedes colocar el código que se ejecutará cuando se haga clic en el botón
    const parent = button.parentNode;
    const data = { productID: parent.id};
    console.log(data)
    const body = JSON.stringify(data)

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
    })
    .catch(error => {
      alert('error')
      console.log(error)
    })
  })
  });
