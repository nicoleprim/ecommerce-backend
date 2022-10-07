import { IOrderItemDB } from "../models/Order";
import { BaseDatabase } from "./BaseDatabase";

export class ProductOrderDatabase extends BaseDatabase {
    public static TABLE_PRODUCTS_ORDERS = "products_orders_shopper"

    public insertItemOnOrder = async (orderItem: IOrderItemDB): Promise<void> => {
        await BaseDatabase
            .connection(ProductOrderDatabase.TABLE_PRODUCTS_ORDERS)
            .insert(orderItem)
    }

    public getOrderItem = async (orderId: string): Promise<IOrderItemDB[]> => {
        const result: IOrderItemDB[] = await BaseDatabase
            .connection(ProductOrderDatabase.TABLE_PRODUCTS_ORDERS)
            .select()
            .where({ order_id: orderId })

        return result
    }
}