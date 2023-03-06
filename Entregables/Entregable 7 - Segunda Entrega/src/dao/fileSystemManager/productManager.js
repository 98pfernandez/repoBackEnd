import fs from 'fs';
const pathAllProducts = './fileSystem/products.json';

class Product {
    constructor(title, description, code, price, stock,category) {
        this.id=getProductID();
        this.title = title;
        this.description = description;
        this.code=code;
        this.price = price;
        this.status=true;
        this.stock=stock
        this.category=category
    }

    static addProduct(product) {
        fs.existsSync(pathAllProducts) ? fs.appendFileSync(pathAllProducts, "___" + JSON.stringify(product)) : fs.writeFileSync(pathAllProducts, JSON.stringify(product));
    } 

    static deleteProduct(id) {

        let arrayAllProducts = getArrayWithAllProducts();
        let arrayProductsParseObject = convertStringArrayToObjectArray(arrayAllProducts);

        for (let i = parseInt(arrayProductsParseObject.length) - 1; i >= 0; i--) {
            if (arrayProductsParseObject[i].id == id) {
                arrayProductsParseObject.splice(i, 1);
            }
        }

        //Creamos el documento sin el ID especificado
        for (let i = 0; i < arrayProductsParseObject.length; i++) {
            if(i==0){
                fs.writeFileSync(pathAllProducts, JSON.stringify(arrayProductsParseObject[i]));
            }else{
                fs.appendFileSync(pathAllProducts,  "___" +JSON.stringify(arrayProductsParseObject[i]))
            }
        }
    }


    static updateProduct(product) {

        let arrayAllProducts = getArrayWithAllProducts();
        let arrayProductsParseObject = convertStringArrayToObjectArray(arrayAllProducts);

        for (let i = parseInt(arrayProductsParseObject.length) - 1; i >= 0; i--) {
            if (arrayProductsParseObject[i].id == product.id) {
                arrayProductsParseObject[i]=product;
            }
        }

        //Creamos el documento con los cambios
        for (let i = 0; i < arrayProductsParseObject.length; i++) {
            if(i==0){
                fs.writeFileSync(pathAllProducts, JSON.stringify(arrayProductsParseObject[i]));
            }else{
                fs.appendFileSync(pathAllProducts,  "___" +JSON.stringify(arrayProductsParseObject[i]))
            }
        }
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

    function getArrayWithAllProducts() {
        let content;
        try {
            content = fs.readFileSync(pathAllProducts), 'utf8';
            let arrayAllProducts = (content.toString()).split('___');
            return arrayAllProducts;
        } catch (error) {
            console.log("Verificar archivos")
        }
    
    }
    
    function convertStringArrayToObjectArray(arrayAllProducts) {
        let arrayProductsParseObject = [];
        for (let i = 0; i < arrayAllProducts.length; i++) {
            arrayProductsParseObject.push(JSON.parse(arrayAllProducts[i]));
        }
        return arrayProductsParseObject;
    }

export default Product;