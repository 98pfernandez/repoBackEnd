//Change password
const changePass = document.getElementById('changePassword')
changePass.addEventListener('click', e => {
    const newPass = document.getElementById('newPass')
    const confirmPass = document.getElementById('passConfirm')
    if (!newPass.value || !confirmPass.value) return alert('dont leave empty fields')
    if (newPass.value != confirmPass.value) return alert('passwords must be equals')

    var queryString = window.location.search;

    var params = new URLSearchParams(queryString);
    var token = params.get('token');

    //fetch
    const url = '/auth/restorePass'
    const headers = {
        'Content-Type': 'application/json'
    }
    const method = 'PATCH'
    const body = JSON.stringify({ token:token, pass:newPass.value})

    fetch(url, {
        headers,
        method,
        body
    })
        .then(response => {
            alert("recovery email was sent")
            return response.json()
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            alert('error')
            console.log(error)
        })
});
