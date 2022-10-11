import { BaseDatabase } from "../../src/database/BaseDatabase"
import { IProductDB, Product } from "../../src/models/Product"


export class ProductDatabaseMock extends BaseDatabase {
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

        const productsTest: IProductDB[] = [
            {
                id: 97,
                name: 'ÁGUA MINERAL BONAFONT SEM GÁS 500ML',
                price: 1.75,
                qty_stock: 423
            },
            {
                id: 95,
                name: 'REFRIGERANTE ANTARCTICA GUARANÁ ZERO 2L',
                price: 5.79,
                qty_stock: 923
            },
            {
                id: 88,
                name: 'DESODORANTE AEROSOL NIVEA BLACK&WHITE INVISIBLE MASCULINO 150ML',
                price: 11.99,
                qty_stock: 0
            }
        ]
        return productsTest
    }

    public updateStock = async (productId: number, productQty: number) => {

    }

    public getProductById = async (id: number) => {
        if (id === 18) return {
            id: 18,
            name: 'BEBIDA ENERGÉTICA VIBE 2L',
            price: 8.99,
            qty_stock: 659
        }
    }
}