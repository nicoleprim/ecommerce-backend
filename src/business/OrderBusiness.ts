import { OrderDatabase } from "../database/OrderDatabase";
import { ProductDatabase } from "../database/ProductDatabase";
import { ProductOrderDatabase } from "../database/ProductOrderDatabase";
import { ParamsError } from "../errors/ParamsError";
import { ICreateOrderInputDTO, ICreateOrderOutputDTO, IGetOrdersOutputDTO, IOrderItemDB, Order } from "../models/Order";
import { IdGenerator } from "../services/IdGenerator";

export class OrderBusiness {
    constructor(
        private orderDatabase: OrderDatabase,
        private productOrderDatabase: ProductOrderDatabase,
        private productDatabase: ProductDatabase,
        private idGenerator: IdGenerator
    ) { }

    public createOrder = async (input: ICreateOrderInputDTO): Promise<ICreateOrderOutputDTO> => {

        const { userName, deliveryDate, products } = input

        if (!userName) {
            throw new ParamsError("É obrigatório o preenchimento do campo 'nome'")
        }

        if (!deliveryDate) {
            throw new ParamsError("É obrigatório o preenchimento do campo 'data de entrega'")
        }

        if (!products.length) {
            throw new ParamsError("Insira pelo menos um produto no carrinho para prosseguir")
        }

        if (typeof userName !== "string") {
            throw new ParamsError("Parâmetro 'nome' inválido")
        }

        const today = new Date()
        const minimunDate = new Date(today.setDate(today.getDate() + 3))
        const dateVerify = new Date(deliveryDate)

        if(dateVerify < minimunDate) {
            throw new ParamsError("Informe uma data futura. Conseguimos realizar a entrega a partir de 03 dias após a realização do pedido")
        }

        for (let product of products) {

            const getProduct = await this.productDatabase.getProductById(product.id)

            if (getProduct.qty_stock <= 0) {
                throw new ParamsError(`No momento não existe ${getProduct.name} em estoque`)
            }

            if (getProduct.qty_stock < product.quantity) {
                throw new ParamsError(`Não existe a quantidade solicitada de ${getProduct.name} em estoque. Temos ${getProduct.qty_stock} produtos disponíveis para compra`)
            }

            const orderId = this.idGenerator.generate()

            const orderItem: IOrderItemDB = {
                product_id: product.id,
                order_id: orderId,
                qty: product.quantity
            }

            await this.orderDatabase.createOrder(orderId, userName, deliveryDate)

            await this.productOrderDatabase.insertItemOnOrder(orderItem)

            await this.productDatabase.updateStock(product.id, product.quantity)

        }
        const response: ICreateOrderOutputDTO = {
            message: "Pedido realizado com sucesso"
        }
        return response
    }

    public getOrders = async (): Promise<IGetOrdersOutputDTO> => {

        const ordersDB = await this.orderDatabase.getOrders()

        const orders: Order[] = []

        for (let orderDB of ordersDB) {
            const order = new Order(
                orderDB.id,
                orderDB.user_name,
                orderDB.delivery_date,
                []
            )

            const orderItemsDB: any = await
                this.productOrderDatabase.getOrderItem(order.getId())

            for (let orderItemDB of orderItemsDB) {
                const price = await this.orderDatabase.getPriceById(orderItemDB.product_id)
                const name = await this.orderDatabase.getNameById(orderItemDB.product_id)
                orderItemDB.price = price
                orderItemDB.name = name
            }

            order.setProductsOrder(orderItemsDB)

            orders.push(order)
        }

        const response: IGetOrdersOutputDTO = {
            orders: orders.map((order) => ({
                id: order.getId(),
                userName: order.getUserName(),
                deliveryDate: order.getDeliveryDate(),
                products: order.getProductsOrder().map((item) => ({
                    name: item.name,
                    quantity: item.qty,
                    price: item.price
                })),
                total: order.getTotal()
            }))
        }

        return response
    }
}