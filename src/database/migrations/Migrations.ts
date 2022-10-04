import { BaseDatabase } from "../BaseDatabase";
import { OrderDatabase } from "../OrderDatabase";
import { ProductDatabase } from "../ProductDatabase";
import { ConvertFile } from "./data";

class Migrations extends BaseDatabase {
    execute = async () => {
        try {
            const createTables = async () => {
                await BaseDatabase.connection.raw(`
                DROP TABLE IF EXISTS ${ProductDatabase.TABLE_PRODUCTS};
                DROP TABLE IF EXISTS ${OrderDatabase.TABLE_ORDERS};
                DROP TABLE IF EXISTS products_orders_shopper;
                
                CREATE TABLE IF NOT EXISTS ${ProductDatabase.TABLE_PRODUCTS}(
                    id INT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    price DECIMAL(4,2) NOT NULL,
                    qty_stock INT NOT NULL
                );     
                CREATE TABLE IF NOT EXISTS ${OrderDatabase.TABLE_ORDERS}(
                    id VARCHAR(255) PRIMARY KEY,
                    user_name VARCHAR(255) NOT NULL,
                    delivery_date DATE NOT NULL
                );
                CREATE TABLE IF NOT EXISTS products_orders_shopper(
                    product_id INT NOT NULL,
                    order_id VARCHAR(255) NOT NULL,
                    qty INT NOT NULL,
                    FOREIGN KEY (product_id) REFERENCES ${ProductDatabase.TABLE_PRODUCTS}(id),
                    FOREIGN KEY (order_id) REFERENCES ${OrderDatabase.TABLE_ORDERS}(id) 
                );
                
                `)
            }

            const productsFile = await ConvertFile.convertFileCsvToJson('./src/database/migrations/products.csv')

            const arrayErrors = []

            const arraySuccess: any = []

            const productsVerify = productsFile.map((product: any) => {
                if (product.field5 || product.field6) {
                    console.log("Os produtos não puderam ser inseridos. Por favor, verifique os dados informados")
                    return arrayErrors.push(product)
                } else {
                    return arraySuccess.push(product)
                }
            })

            console.log(productsVerify)
            const insertData = async () => {
                await BaseDatabase
                    .connection(ProductDatabase.TABLE_PRODUCTS)
                    .insert(arraySuccess)
            }

            console.log("Creating tables...")
            await createTables()
            console.log("Tables created successfully.")

            console.log("Populating tables...")
            await insertData()
            console.log("Tables populated successfully.")

            console.log("Migrations completed.")

        } catch (error) {
            console.log("FAILED! Error in migrations...")
            if (error instanceof Error) {
                console.log(error.message)
            }
        } finally {
            console.log("Ending connection...")
            BaseDatabase.connection.destroy()
            console.log("Connection closed graciously.")
        }
    }
}

const migrations = new Migrations()
migrations.execute()