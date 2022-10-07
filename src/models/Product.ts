export interface IProductDB {
    id: number,
    name: string,
    price: number,
    qty_stock: number
}

export class Product {
    constructor(
        private id: number,
        private name: string,
        private price: number,
        private qty_stock: number
    ) {}

    public getId = () => {
        return this.id
    }

    public getName = () => {
        return this.name
    }

    public getPrice = () => {
        return this.price
    }

    public getQtyStock = () => {
        return this.qty_stock
    }
}

export interface IGetProductsOutputDTO {
    message: string,
    products: {
        name: string,
        price: number,
        qty_stock: number
    }[]
}