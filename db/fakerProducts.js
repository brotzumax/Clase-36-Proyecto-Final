import faker from "faker";

function generateProducts() {
    const products = [];

    for (let i = 0; i < 5; i++) {
        let name = faker.commerce.productName();
        let price = faker.commerce.price();

        products.push({ name, price });
    }

    return products;
}

export default generateProducts;