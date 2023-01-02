let idAuto = 0;
let products = [];
var readline = require('readline-sync');
const fs = require('fs');
const path = require('path');
const pathAllProducts = './allProducts.txt';

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = idAuto;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        idAuto++;

        this.path = './PRODUCT_' + this.title + '_' + this.id + '.txt';
    }

    static addProduct(product) {
        products.push(product);
        //Crea un txt con el contenido del producto individual
        fs.writeFileSync(product.path, JSON.stringify(product));

        //Agrega o crea el txt con todos los productos
        fs.existsSync(pathAllProducts) ? fs.appendFileSync(pathAllProducts, "___" + JSON.stringify(product)) : fs.writeFileSync(pathAllProducts, JSON.stringify(product));
    }

    static getProduct(id) {
        let arrayAllProducts = getArrayWithAllProducts();
        let arrayProductsParseObject = convertStringArrayToObjectArray(arrayAllProducts);

        arrayProductsParseObject.find(product => {
            if (product.id === id) {
                console.log(`\n Encontramos el producto con id: ${id} sus datos son los siguientes:  \n\n`,

                    product)

                return readline.question(`Presione Enter para continuar`);
            } else {
                console.log(`\nNo se encontro el producto con el id: ${id} \n`)
                return readline.question(`Presione Enter para continuar`);
            }
        });

    }

    static getAllProducts() {
        if (fs.existsSync(pathAllProducts)) {
            let arrayAllProducts = getArrayWithAllProducts();

            for (let i = 0; i < arrayAllProducts.length; i++) {
                console.log(`Producto N°${(1 + parseInt(i))}: ${arrayAllProducts[i]}`);
            }

        } else {
            console.log("No hay ningún producto aún");
        }

        readline.question(`Presione Enter para continuar`)
    }

    static deleteProduct(id) {

        let arrayAllProducts = getArrayWithAllProducts();
        let arrayProductsParseObject = convertStringArrayToObjectArray(arrayAllProducts);

        for (let i = parseInt(arrayProductsParseObject.length) - 1; i >= 0; i--) {
            if (arrayProductsParseObject[i].id == id) {
                //Eliminamos el documento del id especificado
                fs.unlinkSync((arrayProductsParseObject[i].path).toString());
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
        //No hay productos
        if(arrayProductsParseObject.length==0){
            fs.unlinkSync(pathAllProducts);
        }
        return readline.question(`Producto eliminado presione enter para continuar`)
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

let continueExecution = true;
do {
    console.clear();
    let option = readline.question(`\nIngrese la opcion que desee:
1)Crear y agregar producto
2)Consultar producto por ID
3)Consultar todos los productos
4)Borrar producto
5)Salir\n`)

    switch (parseInt(option)) {
        case 1:
            let title = readline.question(`Ingrese titulo\n`)
            let description = readline.question(`Ingrese descripcion\n`)
            let price = readline.question(`Ingrese precio\n`)
            let thumbnail = readline.question(`Ingrese ruta imagen\n`)
            let code = readline.question(`Ingrese codigo\n`)
            let stock = readline.question(`Ingrese stock\n`)

            Product.addProduct(new Product(title, description, price, thumbnail, code, stock));
            break;

        case 2:
            if (fs.existsSync(pathAllProducts)) {
                let id = readline.question(`Ingrese id del producto. \nRecuerda que el ID automatico comienza en 0.\n`)
                Product.getProduct(parseInt(id));
            } else {
                readline.question(`Aun no hay productos agregados, presione enter para continuar`)
            }
            break;

        case 3:
            Product.getAllProducts();
            break;

        case 4:
            let id = readline.question(`Ingrese id del producto. \nRecuerda que el ID automatico comienza en 0.\n`)
            Product.deleteProduct(parseInt(id));
            break;

        case 5:
            continueExecution = false;
            console.log("Adios!");
            break;

        default:
            console.log("Esa opción no es valida :C")
            break;

    }
} while (continueExecution)