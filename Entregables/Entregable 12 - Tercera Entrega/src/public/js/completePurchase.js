const buyButton = document.querySelector("#buy");

const url = '/purchase'
const headers = {
  'Content-Type': 'application/json'
}
const method = 'POST'
const body=null;


// Iterar sobre los botones y agregar un eventListener a cada uno
buyButton.addEventListener("click", (event) => {
    // Aquí puedes colocar el código que se ejecutará cuando se haga clic en el botón

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
        location.reload()
    })
    .catch(error => {
      alert('error')
      console.log(error)
    })
  })
