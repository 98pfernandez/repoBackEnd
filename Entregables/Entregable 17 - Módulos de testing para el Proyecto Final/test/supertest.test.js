import chai from 'chai';
import supertest from 'supertest'

const expect = chai.expect;
const requester = supertest("localhost:8080")

describe("Testing de aplicación de ecommerce", () => {
    //Remplazar token por generado 
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0NmMwYjE1ZjVhYThhM2QxNDlhMTg1OSIsIm5hbWUiOiJQYWJsbyIsImVtYWlsIjoiOThwYWJsb2ZsQGdtYWlsLmNvbSIsInBhc3MiOiIkMmIkMTAkRjZOcWY5Q3JGbExKc1RxMVpsNkhMdXV3VmxDTTlIWk5YSDc5SjBZMTB1U3lRcldBR0M1V2EiLCJjYXJ0IjoiNjQ2YzBiMTVmNWFhOGEzZDE0OWExODU3IiwiX192IjowLCJyb2wiOiJ1c2VyIn0sInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NTcyODEyMiwiZXhwIjoxNjg4MzIwMTIyfQ.GpOxRa9eecii71FtFw5GHZXqSOEa1eYi0r8dVpAJuqI";
  
    //PRODUCTOS
    describe("Testing modulo de productos.....", () => {
        it("GET /products obtiene todos los productos", async () => {
            const { statusCode } = await requester.get('/products').set('Cookie', `authToken=${token}`);

            expect(statusCode).has.equal(200)
        })

        let idProducto='';
        it("POST /products crea un nuevo producto", async () => {
            const productTest = {
                title: "producto ingresado por modulo de test", 
                description: "description",
                code: "fewfewgweger",
                price:300, 
                stock: 1,
                category: 33,
                image: "",
                owner: "admin"
            }

            const {_body,statusCode} = await requester.post('/products').send(productTest);
            expect(statusCode).has.equal(200)
            expect(_body.response).to.have.property('_id');
            idProducto=_body.response._id
        })

        it("DELETE /products borra un producto del id especificado", async()=>{
            const {_body,statusCode} = await requester.delete(`/products/${idProducto}`);
            expect(statusCode).has.equal(200)
            expect(_body.response).to.have.property('deletedCount').is.greaterThan(0)
        })
    })


    describe("Testing modulo de carrito.....", () => {
        it("GET /carts obtiene todos los carritos", async () => {
            const {_body, statusCode} = await requester.get('/carts/all');

             expect(statusCode).has.equal(200)
             expect(_body.responseDB).to.not.be.empty;
        })

        let idCarrito='';
        it("POST /carts crea un nuevo carrito", async () => {
            const cartTest = {
                products:[]
            }

            const {_body,statusCode} = await requester.post('/carts').send(cartTest);
            expect(statusCode).has.equal(200)
            expect(_body.response).to.have.property('_id');
            idCarrito=_body.response._id
        })

        it("GET /carts obtiene carrito con id especificado", async()=>{
            const {statusCode} = await requester.get(`/carts/${idCarrito}`).set('Cookie', `authToken=${token}`);;
            expect(statusCode).has.equal(200)
        })

        it("DELETE /carts borra el carrito del id especificado", async()=>{
            const {_body,statusCode} = await requester.delete(`/carts/${idCarrito}`);
            expect(_body).to.have.property('deletedCount').is.greaterThan(0)
            expect(statusCode).has.equal(200);
        })

        describe("Testing modulo de sesion.....", () => {
            const userPrueba={
                email:"pablopruebatest@gmail.com",
                pass:"pablo"
            }
            it("Conexion con el usuario de prueba especificado", async()=>{
                const {header,statusCode} = await requester.post(`/auth`).send(userPrueba);
                
                const cookies = header['set-cookie'];
                const authTokenCookie = cookies.find(cookie => cookie.includes('authToken'));
                
                expect(statusCode).has.equal(201);
                expect(authTokenCookie).to.exist;
            })
        })
    })
})