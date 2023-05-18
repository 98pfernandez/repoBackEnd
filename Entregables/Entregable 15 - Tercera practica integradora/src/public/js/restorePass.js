const buttonRecover = document.getElementById('restorePass')

buttonRecover.addEventListener('click', e => {
    const recoverEmail= document.getElementById('recoverEmail')
    const email=recoverEmail.value;
    if(!email) return alert("the email cant be empty!");   

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) return alert("email not valid")

    //fetch
    const url = '/auth/sendMailRestore'
     const headers = {
    'Content-Type': 'application/json'
    }
    const method = 'POST'
    const body = JSON.stringify({email})

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