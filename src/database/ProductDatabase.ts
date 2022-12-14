import { IProductDB, Product } from "../models/Product";
import { BaseDatabase } from "./BaseDatabase";

export class ProductDatabase extends BaseDatabase {
    public static TABLE_PRODUCTS = "products_stock_shopper"

    public toProductDBModel = (product: Product) => {
        const productDB: IProductDB = {
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice(),
            qty_stock: product.getQtyStock()
        }
        return productDB
    }

    public selectAllProducts = async (): Promise<IProductDB[]> => {
        const result: IProductDB[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select()

        return result
    }

    public updateStock = async (productId: number, productQty: number) => {
        await BaseDatabase
        .connection(ProductDatabase.TABLE_PRODUCTS)
        .decrement('qty_stock', productQty)
        .where({id: productId})
    }

    public getProductById = async (id: number) => {
        const result = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select("*")
            .where({ id: id })
    
        return result[0]
    }

}