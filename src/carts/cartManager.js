const fs = require('fs');
const pathAllProducts = './fileSystem/carts.json';

class Cart {
    constructor(products) {
        this.id=getProductID();
        this.products=products;
    }

    static addProduct(product) {
        fs.existsSync(pathAllProducts) ? fs.appendFileSync(pathAllProducts, "___" + JSON.stringify(product)) : fs.writeFileSync(pathAllProducts, JSON.stringify(product));
    } 
}

    function getProductID() {
        let content;
        try {
            content = fs.readFileSync(pathAllProducts), 'utf8';
            let arrayAllProducts = (content.toString()).split('___');
            return arrayAllProducts.length;
        } catch (error) {
            //No hay ningún producto agregado
            return 0;
        }
    
    }

    module.exports = Cart;