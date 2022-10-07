import { BaseDatabase } from "../../src/database/BaseDatabase"
import { IOrderItemDB } from "../../src/models/Order"



export class ProductOrderDatabaseMock extends BaseDatabase {
    public static TABLE_PRODUCTS_ORDERS = "products_orders_shopper"

    public insertItemOnOrder = async (orderItem: IOrderItemDB): Promise<void> => {

    }

    public getOrderItem = async (orderId: string): Promise<IOrderItemDB[]> => {

        const getOrderItemsTest: IOrderItemDB[] = [
            {
                product_id: 82,
                order_id: 'f81b8ba2-54b2-4d13-948b-39143903b66d',
                qty: 20
            },
            {
                product_id: 66,
                order_id: 'efba781c-ab3b-44c8-baca-b6fa9aa4db20',
                qty: 3
            },
            {
                product_id: 84,
                order_id: 'da14c438-b4b2-4c3e-ac9e-56853fedc771',
                qty: 70
            }
        ]
        return getOrderItemsTest
    }
}