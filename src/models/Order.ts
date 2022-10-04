export interface addedProducts {
    id: number
    qty: number
    price: number
}

export class Order {
    constructor(
        private id: string,
        private userName: string,
        private deliveryDate: Date,
        private products: addedProducts[]
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

    public getProducts = () => {
        return this.products
    }
}