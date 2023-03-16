const form = document.getElementById('formLogin')
SignUp=document.querySelector("#signup")
Login=document.querySelector("#login");
Logout=document.querySelector("#logout");

form.addEventListener('submit', e => {
  e.preventDefault()

  const data = new FormData(form)
  const obj = {}

  data.forEach((value, key) => obj[key] = value)

  const url = '/auth'
  const headers = {
    'Content-Type': 'application/json'
  }
  const method = 'POST'
  const body = JSON.stringify(obj)

  let statusVar;
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
        Logout.style.display='!none'
      }
    })
    .catch(error => console.log(error))


}
)