const buyButton = document.querySelector("#buy");

const urlPurchase = '/purchase'
const headersPurchase = {
  'Content-Type': 'application/json'
}
const methodPurchase = 'POST'


// Iterar sobre los botones y agregar un eventListener a cada uno
buyButton.addEventListener("click", (event) => {
    // Aquí puedes colocar el código que se ejecutará cuando se haga clic en el botón

    fetch(urlPurchase, {
      headers:headersPurchase,
      method:methodPurchase
    })
    .then(response => {
      statusVar = response.status;
      return response.json()
    })
    .then(data => {
        if(data.insufficientStock) return Swal.fire(
          'Atención',
          'Los articulos que prevalecen en su carrito tienen un stock insuficiente.',
          'warning') 

          return Swal.fire("Done", "The purchase was completed successfully", "success").then((result) => {
            if (result.isConfirmed) {
              // El usuario presionó "OK"
              document.location.href = '/'
            }})
    }
    )
    .catch(error => {
      alert('error')
      console.log(error)
    })
  })
