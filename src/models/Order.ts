export interface IaddedProducts {
    id: number
    name: string
    qty: number
    order_id: string
}

export interface IOrderProductsDB {
    id: string,
    userName: string,
    deliveryDate: string
    products: IaddedProducts []
}

export class Order {
    constructor(
        private id: string,
        private userName: string,
        private deliveryDate: string,
        private productsOrder: IaddedProducts[]
    ) {}

    public getId = () => {
        return this.id
    }

    public getUserName = () => {
        return this.userName
    }

    public getDeliveryDate = () => {
        return this.deliveryDate
    }

    public getProductsOrder = () => {
        return this.productsOrder
    }

    public setProductsOrder = (newProductsOrder: IaddedProducts[]) => {
        this.productsOrder = newProductsOrder
    }

    public addProductsOrder = (newProductsOrder: IaddedProducts) => {
        this.productsOrder.push(newProductsOrder)
    }

    public removeProductsOrder = (idToRemove: number) => {
        return this.productsOrder.filter(addedProducts => addedProducts.id !== idToRemove)
    }
}

export interface IProductOrderInputDTO {
    userName: string
    deliveryDate: string
    products: IaddedProducts[]
}

export interface IProductOrderOutputDTO {
    message: string
    id: string
    userName: string
    deliveryDate: string
    products: IaddedProducts[]
}