import { BaseDatabase } from "../../src/database/BaseDatabase"


export class OrderDatabaseMock extends BaseDatabase {
    public static TABLE_ORDERS = "orders_shopper"

    public createOrder = async (orderId: string, userName: string, deliveryDate: Date): Promise<void> => {

    }

    public getPriceById = async (product_id: number): Promise<number> => {

        if (product_id == 18) return 8.99
        if (product_id == 94) return 4.49
        if (product_id == 43) return 3.79

        return 0
    }

    public getNameById = async (product_id: number) => {
        if (product_id == 18) return 'BEBIDA ENERGÉTICA VIBE 2L'
        if (product_id == 94) return 'NÉCTAR MAGUARY DE MARACUJÁ 1L'
        if (product_id == 43) return 'PRATO DESCARTÁVEL COPOBRAS 21CM'
    }

    public getOrders = async () => {

        const ordersTest = [
            {
                id: '769562c0-5899-4dcb-b579-82db7ab29fb8',
                user_name: 'Theodoro',
                delivery_date: "2022-10-10T03:00:00.000Z"
            }
            ,
            {
                id: '76e09f02-e0c0-423b-8bba-63f92cb3929e',
                user_name: 'Milka',
                delivery_date: "2022-12-10T03:00:00.000Z"
            },
            {
                id: 'eee8edd1-cd54-42d0-8462-7e611ae3920b',
                user_name: 'Oreo',
                delivery_date: "2022-10-06T03:00:00.000Z"
            }
        ]
        return ordersTest
    }
}