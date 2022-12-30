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
        fs.existsSync(pathAllProducts) ? fs.appendFileSync(pathAllProducts, JSON.stringify(product)) : fs.writeFileSync(pathAllProducts, JSON.stringify(product));
    }

    static getProduct(id) {
        products.find(product => {
            if (product.id === id) {
                console.log(`\n Encontramos el producto con id: ${id} sus datos son los siguientes:  \n\n`,

                    product)
            } else {
                console.log(`\nNo se encontro el producto con el id: ${id} \n`)
            }
        });

        readline.question(`Presione Enter para continuar`)
    }

    static getAllProducts() {
        if (fs.existsSync(pathAllProducts)) {
            let contenido;
            contenido = fs.readFileSync(pathAllProducts), 'utf8';
            
            console.log((contenido.toString()));
            
        } else {
            console.log("No hay ningún producto aún");
        }

        readline.question(`Presione Enter para continuar`)
    }
}



let continueExecution = true;
do {
    console.clear();
    let option = readline.question(`\nIngrese la opcion que desee:
1)Crear y agregar producto
2)Consultar producto por ID
3)Consultar todos los productos
4)Salir\n`)

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
            if (products.length > 0) {
                let id = readline.question(`Ingrese id del producto. \nRecuerda que el ID automatico comienza en 0.`)
                Product.getProduct(parseInt(id));
            } else {
                readline.question(`Aun no hay productos agregados, presione enter para continuar`)
            }
            break;

        case 3:
            Product.getAllProducts();
            break;

        case 4:
            continueExecution = false;
            console.log("Adios!");
            break;

        default:
            console.log("Esa opción no es valida :C")
            break;

    }
} while (continueExecution)