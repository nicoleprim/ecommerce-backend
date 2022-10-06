import { OrderDatabase } from "../database/OrderDatabase";
import { ProductOrderDatabase } from "../database/ProductOrderDatabase";
import { ParamsError } from "../errors/ParamsError";
import { ICreateOrderInputDTO, ICreateOrderOutputDTO, IOrderItemDB, Order } from "../models/Order";
import { IdGenerator } from "../services/IdGenerator";

export class OrderBusiness {
    constructor(
        private orderDatabase: OrderDatabase,
        private productOrderDatabase: ProductOrderDatabase,
        private idGenerator: IdGenerator
    ) { }

    public createOrder = async (input: ICreateOrderInputDTO): Promise<ICreateOrderOutputDTO> => {

        const { userName, deliveryDate, products } = input

        if (!userName || !deliveryDate) {
            throw new ParamsError("Preencha todos os dados solicitados: 'nome' e 'data de entrega'")
        }

        if (!products.length) {
            throw new ParamsError("Você precisa inserir pelo menos um produto para concluir o pedido")
        }

        if (typeof userName !== "string" || typeof deliveryDate !== "string") {
            throw new ParamsError("Parâmetro 'nome' e/ou 'data de entrega' inválidos")
        }

        const productsVerify = products.map((product) => {
            if (product.quantity <= 0) {
                throw new ParamsError("Quantidade de produtos inválida. A quantidade mínima é 1")
            }

            return {
                ...product,
                id: 0,
                price: 0
            }
        })

        for (let product of productsVerify) {
            const qty = await this.orderDatabase.getQuantity(product.name)

            if (qty <= 0 || !qty) {
                throw new Error("Não existe produto em estoque")
            }
        }

        for (let product of productsVerify) {
            const price = await this.orderDatabase.getPrice(product.name)

            product.price = price
        }

        const orderId = this.idGenerator.generate()

        await this.orderDatabase.createOrder(orderId, userName, deliveryDate)

        for (let product of productsVerify) {
            const idProduct = await this.orderDatabase.getId(product.name)

            product.id = idProduct
        }

        for (let product of productsVerify) {
            const orderItem: IOrderItemDB = {
                product_id: product.id,
                order_id: orderId,
                qty: product.quantity
            }

            await this.productOrderDatabase.insertItemOnOrder(orderItem)
        }

        const total = productsVerify.reduce(
            (acc, product) => (acc + (product.price * product.quantity)),
            0
        )

        const response: ICreateOrderOutputDTO = {
            message: "Pedido realizado com sucesso",
            order: {
                id: orderId,
                userName,
                deliveryDate,
                products: productsVerify,
                total
            }
        }

        return response
    }
}