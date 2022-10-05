import { OrderDatabase } from "../database/OrderDatabase";
import { ProductDatabase } from "../database/ProductDatabase";
import { ParamsError } from "../errors/ParamsError";
import { IProductOrderInputDTO, IProductOrderOutputDTO, Order } from "../models/Order";
import { IdGenerator } from "../services/IdGenerator";

export class OrderBusiness {
    constructor (
        private orderDatabase: OrderDatabase,
        private idGenerator: IdGenerator,
        private productDatabase: ProductDatabase
    ) {}

    public createOrder = async (input: IProductOrderInputDTO): Promise<IProductOrderOutputDTO> => {
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

        for (let product of products) {
            if (product.qty) {
                throw new ParamsError("A quantidade mínima de pedido para cada produto deve ser de 1 item")
            }
        }

/*         const checkStock = await this.productDatabase.selectQtyStock(products)

        const showAlreadyExists = await this.showDatabase.findShowByDate(startsAtDate)
        
        if (showAlreadyExists) {
            throw new ConflictError("Esse dia já possui show")
        } */

        const id = this.idGenerator.generate()

        const newOrder = new Order(
            id,
            userName,
            deliveryDate,
            products
        )

        await this.orderDatabase.insertOrder(newOrder)

        const response: IProductOrderOutputDTO = {
            message: "Pedido realizado com sucesso",
            id,
            userName,
            deliveryDate,
            products
        }

        return response
    }
}