const saveButton = document.getElementById("saveUsers");

// Obtener todas las celdas td de la tabla
const trElements = document.querySelectorAll('table tbody tr');
// Array para almacenar los objetos de usuario
const usersToUpdate = { users: [] };

// Recorrer cada celda td y construir el objeto de usuario
trElements.forEach((tr) => {
    const email = tr.querySelector('td:nth-child(1)').textContent.trim();
    const name = tr.querySelector('td:nth-child(2)').textContent.trim();
    const rol = tr.querySelector('td:nth-child(3) select').value;


    usersToUpdate.users.push({
        email: email,
        name: name,
        rol: rol
    });
});

const url = 'http://localhost:8080/config'
const headers = {
    'Content-Type': 'application/json'
}
const method = 'PATCH'
const body = JSON.stringify(usersToUpdate)

saveButton.addEventListener("click", (event) => {
    fetch(url, {
        headers,
        method,
        body
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            Swal.fire("Done", "users were updated!", "success")
        })
        .catch(error => {
            alert('error')
            console.log(error)
        })
})
