import { ProductDatabase } from "../database/ProductDatabase"
import { IGetProductsOutputDTO, Product } from "../models/Product"

export class ProductBusiness {
    constructor(
        private productDatabase: ProductDatabase
    ) { }

    public getAllProducts = async (): Promise<IGetProductsOutputDTO> => {

        const productsDB = await this.productDatabase.selectAllProducts()

        const products: Product[] = []

         for (let productDB of productsDB) {
            const product = new Product(
                productDB.id,
                productDB.name,
                productDB.price,
                productDB.qty_stock
            )

            products.push(product)
        }

        const response: IGetProductsOutputDTO = {
            message: "Produtos renderizados com sucesso!",
            products: products.map((product) => ({
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice(),
                qty_stock: product.getQtyStock()
            }))
        }
        return response
    }

}
