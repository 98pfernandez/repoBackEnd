const generateProductErrorInfo = product => {
  return `
    One or more properties were incomplete or not valid.
    List of required properties:
    title: needs to be String, received: ${product.title}
    description: needs to be String, received: ${product.description}
    price: needs to be String, received: ${product.price}
  `
}

export default generateProductErrorInfo
