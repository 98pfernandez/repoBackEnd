const form = document.getElementById('formSignup')

form.addEventListener('submit', e => {
  e.preventDefault()

  const data = new FormData(form)
  const obj = {}

  data.forEach((value, key) => obj[key] = value)

  const url = '/users'
  const headers = {
    'Content-Type': 'application/json'
  }
  const method = 'POST'
  const body = JSON.stringify(obj)

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
    //Si el usuario esta correcto entramos al sistema
    if (statusVar == 201) {
      document.location.href = '/'
    }
  })
  .catch(error => {
    alert('error')
    console.log(error)
  })
})
