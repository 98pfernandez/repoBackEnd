let idAuto = 0;
let products = [];
var readline = require('readline-sync');

class product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = idAuto;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        idAuto++;
    }
}

function addProduct(product) {
    products.push(product);
}

function getProduct(id) {
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

let continueExecution = true;
do {
    console.clear();
    let option = readline.question(`\nIngrese la opcion que desee:
1)Crear y agregar producto
2)Consultar producto por ID
3)Salir\n`)

    switch (parseInt(option)) {
        case 1:
            let title = readline.question(`Ingrese titulo\n`)
            let description = readline.question(`Ingrese descripcion\n`)
            let price = readline.question(`Ingrese precio\n`)
            let thumbnail = readline.question(`Ingrese ruta imagen\n`)
            let code = readline.question(`Ingrese codigo\n`)
            let stock = readline.question(`Ingrese stock\n`)

            addProduct(new product(title, description, price, thumbnail, code, stock));
            break;

        case 2:
            if (products.length > 0) {
                let id = readline.question(`Ingrese id del producto. \nRecuerda que el ID automatico comienza en 0.`)
                getProduct(parseInt(id));
            } else {
                readline.question(`Aun no hay productos agregados, presione enter para continuar`)
            }
            break;

        case 3:
            continueExecution = false;
            console.log("Adios!");
            break;

        default:
            console.log("Esa opción no es valida :C")
            break;

    }
} while (continueExecution)