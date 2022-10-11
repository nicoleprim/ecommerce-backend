import { Console } from "console"
import { OrderBusiness } from "../src/business/OrderBusiness"
import { BaseError } from "../src/errors/BaseError"
import { ICreateOrderInputDTO, Order } from "../src/models/Order"
import { IdGeneratorMock } from "./mocks/idGeneratorMock"
import { OrderDatabaseMock } from "./mocks/OrderDatabaseMock"
import { ProductDatabaseMock } from "./mocks/ProductDatabaseMock"
import { ProductOrderDatabaseMock } from "./mocks/ProductOrderDatabaseMock"

describe("Testando a OrderBusiness", () => {
    const orderBusiness = new OrderBusiness(
        new OrderDatabaseMock(),
        new ProductOrderDatabaseMock(),
        new ProductDatabaseMock(),
        new IdGeneratorMock()
    )

    test("Deve retornar uma lista de pedidos", async () => {

        const response = await orderBusiness.getOrders()
        expect(response.orders.length).toBe(3)
    })

    test("Deve ser possível criar um novo pedido", async () => {
        const input: ICreateOrderInputDTO = {
            userName: "Theodoro",
            deliveryDate: new Date("2022-10-20"),
            products: [
                {
                    id: 18,
                    quantity: 14
                }
            ]
        }

        const response = await orderBusiness.createOrder(input)

        expect(response.message).toBe("Pedido realizado com sucesso")
    })

    test("Erro se não for informado nome", async () => {
        expect.assertions(2)

        try {
            const input = {
                userName: "",
                deliveryDate: new Date('2022/12/09'),
                products: [{
                    id: 94,
                    quantity: 2
                }]
            }
            await orderBusiness.createOrder(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("É obrigatório o preenchimento do campo 'nome'")
            }
        }
    })



    test("Erro se não for adicionado nenhum produto", async () => {
        expect.assertions(2)

        try {
            const input = {
                userName: "nome do cliente",
                deliveryDate: new Date('2022/12/09'),
                products: []
            }
            await orderBusiness.createOrder(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Insira pelo menos um produto no carrinho para prosseguir")
            }
        }
    })

    test("Erro quando 'userName' for diferente de string", async () => {
        expect.assertions(2)

        try {
            const input = {
                userName: 123,
                deliveryDate: '2022/10/10',
                products: [{
                    id: 95,
                    quantity: 5
                }]
            } as any

            await orderBusiness.createOrder(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Parâmetro 'nome' inválido")
            }
        }
    })

    test("Erro quando a data de entrega é menor que 03 dias da data do pedido", async () => {
        expect.assertions(2)

        try {
            const input = {
                userName: "nome do usuário",
                deliveryDate: new Date('2022/10/07'),
                products: [{
                    id: 95,
                    quantity: 5
                }]
            } as any

            await orderBusiness.createOrder(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Informe uma data futura. Conseguimos realizar a entrega a partir de 03 dias após a realização do pedido")
            }
        }
    })

})