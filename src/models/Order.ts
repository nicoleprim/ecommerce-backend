export interface IaddedProducts {
    id: number
    name: string
    qty: number
    price: number
    order_id: string
}

export class Order {
    constructor(
        private id: string,
        private userName: string,
        private deliveryDate: Date,
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