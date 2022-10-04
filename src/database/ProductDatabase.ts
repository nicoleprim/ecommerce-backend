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

    public insertProduct = async (product: Product) => {
        const productDB = this.toProductDBModel(product)

        await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCTS)
            .insert(productDB)
    }
}