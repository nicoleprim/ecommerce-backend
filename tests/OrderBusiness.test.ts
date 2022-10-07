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
                    name: "BEBIDA ENERGÉTICA VIBE 2L",
                    quantity: 14
                }
            ]
        }

        const response = await orderBusiness.createOrder(input)

        expect(response.message).toBe("Pedido realizado com sucesso")
        expect(response.order.id).toBe("id-mock")
        expect(response.order.userName).toBe("Theodoro")
    })

    test("Erro se não informado nome, data e sem inserção de produtos", async () => {
        expect.assertions(2)

        try {
            const input = {
                userName: "",
                deliveryDate: new Date(''),
                products: []
            }
            await orderBusiness.createOrder(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Preencha todos os dados solicitados: 'nome' e 'data de entrega' e insira pelo menos um produto no carrinho")
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
                    name:"nome do produto",
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

    test("Erro quando a quantidade de produtos for 0", async () => {
        expect.assertions(2)

        try {
            const input = {
                userName: "nome do usuário",
                deliveryDate: '2022/10/20',
                products: [{
                    name:"nome do produto",
                    quantity: 0
                }]
            } as any

            await orderBusiness.createOrder(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Quantidade de produtos inválida. A quantidade mínima é 1")
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
                    name:"nome do produto",
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