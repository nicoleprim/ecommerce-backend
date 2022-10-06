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

    public getId = async (name: string): Promise<number> => {
        const result: any[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select("id")
            .where({ name: name })
    
        return result[0].id as number
    }

    public getOrders = async () => {
        const result = await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDERS)
            .select()

        return result
    }


}