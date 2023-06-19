import {faker} from '@faker-js/faker'

const generateProduct= (productQty=1) => {

    const generatedProducts=[];
    for (let i=0; i<productQty; i++){
        const randomProduct={
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: faker.datatype.uuid(),
            price: faker.datatype.number(),
            category: faker.datatype.number(100),
            image: faker.image.business()
        } 

        generatedProducts.push(randomProduct);
    }

    return generatedProducts;
} 

export default generateProduct