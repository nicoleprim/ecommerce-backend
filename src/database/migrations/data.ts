const csv = require('csvtojson')

export class ConvertFile {
    public static async convertFileCsvToJson(file: string) {
        return await csv().fromFile(file)
    }
}

export const orders = [
    {
        id: "102",
        user_name: "Theo",
        delivery_date: "2022/11/20",
    },
    {
        id: "103",
        user_name: "Milka",
        delivery_date: "2022/11/07",
    },
    {
        id: "104",
        user_name: "Oreo",
        delivery_date: "2022/12/12",
    }
]

export const productOrders = [
    {
        product_id: 18,
        order_id: "102",
        qty: 20,
    },
    {
        product_id: 43,
        order_id: "103",
        qty: 7,
    },
    {
        product_id: 94,
        order_id: "104",
        qty: 6,
    }
]