export interface IOrderItem {
    id: string,
    name: string,
    price: number,
    qty: number,
    order_id: string
}

export interface IOrderItemDB {
    product_id: number,
    order_id: string,
    qty: number
}

export interface IOrderResume {
    id: string,
    userName: string,
    deliveryDate: string
    products: {
        name: string,
        quantity: number,
        price: number
    }[],
    total: number
}

export class Order {
    private total: number = 0
    constructor(
        private id: string,
        private userName: string,
        private deliveryDate: string,
        private productsOrder: IOrderItem[]
    ) {
        this.total = this.calculateTotal()
    }

    private calculateTotal = () => {
        const total = this.productsOrder.reduce(
            (acc, product) => acc + (product.price * product.qty),
            0
        )
        return total
    }

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

    public setProductsOrder = (newProductsOrder: IOrderItem[]) => {
        this.productsOrder = newProductsOrder
        this.total = this.calculateTotal()
    }

    public addProductsOrder = (newProductsOrder: IOrderItem) => {
        this.productsOrder.push(newProductsOrder)
    }

    public removeProductsOrder = (idToRemove: string) => {
        return this.productsOrder.filter(IOrderItem => IOrderItem.id !== idToRemove)
    }

    public getTotal = () => {
        return this.total
    }
}


export interface ICreateOrderInputDTO {
    userName: string
    deliveryDate: string
    products: {
        name: string,
        quantity: number
    }[]
}

export interface ICreateOrderOutputDTO {
    message: string,
    order: IOrderResume
}

export interface IGetOrdersOutputDTO {
    orders: IOrderResume[]
}