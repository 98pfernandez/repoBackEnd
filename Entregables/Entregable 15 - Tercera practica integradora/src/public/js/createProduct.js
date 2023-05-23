const form = document.getElementById('formAddProduct')

form.addEventListener('submit', e => {
  e.preventDefault()

  const data = new FormData(form)
  const newProduct = {}
  const numberRegex = /^\d+(?:,\d+)?(?:\.\d+)?$/;


  data.forEach((value, key) => {
    if (!value) {
      return Swal.fire("Warning", "Don't leave empty fields", "warning");
    }

    if(([key]=="price" || [key]=="stock" || [key]=="category") && !numberRegex.test(value)){
      return Swal.fire("Warning", "Stock,price and category must be numeric", "warning");
    }
    
    newProduct[key] = value;
  });

  console.log(newProduct)

const url = '/products'
  const headers = {
    'Content-Type': 'application/json'
  }
  const method = 'POST'
  const body = JSON.stringify(newProduct)

  fetch(url, {
    headers,
    method,
    body
  })
  .then(response => {
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
