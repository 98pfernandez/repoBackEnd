// Obtener todos los elementos con la clase "productButton"
const buttons = document.querySelectorAll(".productButton");

const url = '/auth'
const headers = {
  'Content-Type': 'application/json'
}
const method = 'POST'
const body = JSON.stringify(obj)


// Iterar sobre los botones y agregar un eventListener a cada uno
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Aquí puedes colocar el código que se ejecutará cuando se haga clic en el botón
    const parent = button.parentNode;
    console.log(parent.id + "El botón ha sido clickeado.");
  });
});