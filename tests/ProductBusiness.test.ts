import {ProductBusiness} from '../src/business/ProductBusiness'
import { ProductDatabaseMock } from './mocks/ProductDatabaseMock'

describe("Testando a ProductBusiness", () => {
    const productBusiness = new ProductBusiness(
        new ProductDatabaseMock()
    )

    test("Deve retornar uma lista de produtos", async () => {

        const response = await productBusiness.getAllProducts()
        expect(response.products.length).toBe(3)
    })


})