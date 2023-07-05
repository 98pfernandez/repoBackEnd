const deleteButtons = document.querySelectorAll(".deleteProduct");

deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const product = {
            productID: button.parentNode.id
        };

        console.log(product.productID)
        const urlProduct = '/products'
        const headersProduct = {
            'Content-Type': 'application/json'
        }
        const methodProduct = 'DELETE'
        const bodyProduct = JSON.stringify(product)

        fetch(urlProduct, {
            headers: headersProduct,
            method: methodProduct,
            body: bodyProduct
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                Swal.fire("Done", "product was deleted!", "success").then((result) => {
                    if (result.isConfirmed) {
                        // El usuario presionó "OK"
                        document.location.href = '/products'
                    }
                })
            })
            .catch(error => {
                Swal.fire("Error", "product wasnt deleted!", "error")
                console.log(error)
            })
    })
})
