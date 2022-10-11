import { BaseDatabase } from "./BaseDatabase"
import { ProductDatabase } from "./ProductDatabase"

export class OrderDatabase extends BaseDatabase {
    public static TABLE_ORDERS = "orders_shopper"


    public createOrder = async (orderId: string, userName: string, deliveryDate: Date): Promise<void> => {
        await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDERS)
            .insert({
                id: orderId,
                user_name: userName,
                delivery_date: deliveryDate
            })
    }

    public getPriceById = async (product_id: number): Promise<number> => {
        const result: any[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select("price")
            .where({ id: product_id })
    
        return result[0].price as number
    }

    public getNameById = async (product_id: number) => {
        const result: any[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select("name")
            .where({ id: product_id })
    
        return result[0].name
    }

    public getOrders = async () => {
        const result = await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDERS)
            .select()

        return result
    }
}