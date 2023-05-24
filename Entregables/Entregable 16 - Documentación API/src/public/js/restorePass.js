const buttonRecover = document.getElementById('restorePass')
if(buttonRecover) {
  
//Recovery mail
buttonRecover.addEventListener('click', e => {
  const recoverEmail= document.getElementById('recoverEmail')
  const email=recoverEmail.value;
  if(!email) return Swal.fire(
    'Warning',
    'The email cant be empty!',
    'warning')  
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email))  return Swal.fire(
        'Warning',
        'Email not valid',
        'warning')
    
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
    Swal.fire("Done", "Recovery mail was sent!", "success").then((result) => {
      if (result.isConfirmed) {
        // El usuario presionó "OK"
        document.location.href = '/'
      }})
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
}