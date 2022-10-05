import { IOrderProductsDB, Order } from "../models/Order"
import { BaseDatabase } from "./BaseDatabase"

export class OrderDatabase extends BaseDatabase {
    public static TABLE_ORDERS = "orders_shopper"

    public toOrderDBModel = (order: Order): IOrderProductsDB => {
        const ordersDB: IOrderProductsDB = {
            id: order.getId(),
            userName: order.getUserName(),
            deliveryDate: order.getDeliveryDate(),
            products: order.getProductsOrder()
        }
        return ordersDB
    }


    public insertOrder = async (order: Order) => {
        const orderDB = this.toOrderDBModel(order)

        await BaseDatabase.connection(OrderDatabase.TABLE_ORDERS)
            .insert(orderDB)
    }

}