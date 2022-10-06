import { BaseDatabase } from "./BaseDatabase"
import { ProductDatabase } from "./ProductDatabase"

export class OrderDatabase extends BaseDatabase {
    public static TABLE_ORDERS = "orders_shopper"


    public createOrder = async (orderId: string, userName: string, deliveryDate: string): Promise<void> => {
        await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDERS)
            .insert({
                id: orderId,
                user_name: userName,
                delivery_date: deliveryDate
            })
    }

/* 
    public insertOrder = async (order: Order) => {
        const orderDB = this.toOrderDBModel(order)

        await BaseDatabase.connection(OrderDatabase.TABLE_ORDERS)
            .insert(orderDB)
    } */

    public getQuantity = async (name: string): Promise<number> => {
        const result: any[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select("qty_stock")
            .where({ name: name })
    
        return result[0].qty_stock as number
    }

    public getPrice = async (name: string): Promise<number> => {
        const result: any[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select("price")
            .where({ name: name })
    
        return result[0].price as number
    }

    public getId = async (name: string): Promise<number> => {
        const result: any[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select("id")
            .where({ name: name })
    
        return result[0].id as number
    }


}