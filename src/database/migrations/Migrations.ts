import { BaseDatabase } from "../BaseDatabase";
import { OrderDatabase } from "../OrderDatabase";
import { ProductDatabase } from "../ProductDatabase";
import { ProductOrderDatabase } from "../ProductOrderDatabase";
import { ConvertFile, orders, productOrders } from "./data";

class Migrations extends BaseDatabase {
    execute = async () => {
        try {
            const createTables = async () => {
                await BaseDatabase.connection.raw(`
                DROP TABLE IF EXISTS ${ProductOrderDatabase.TABLE_PRODUCTS_ORDERS};
                DROP TABLE IF EXISTS ${ProductDatabase.TABLE_PRODUCTS};
                DROP TABLE IF EXISTS ${OrderDatabase.TABLE_ORDERS};
                                
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
                CREATE TABLE IF NOT EXISTS ${ProductOrderDatabase.TABLE_PRODUCTS_ORDERS}(
                product_id INT NOT NULL,
                order_id VARCHAR(255) NOT NULL,
                qty INT NOT NULL,
                FOREIGN KEY (product_id) REFERENCES ${ProductDatabase.TABLE_PRODUCTS}(id),
                FOREIGN KEY (order_id) REFERENCES ${OrderDatabase.TABLE_ORDERS}(id) 
                );
                `)
            }

            const productsFile = await ConvertFile.convertFileCsvToJson('./src/database/migrations/products.csv')

            const arrayErrors: any = []

            const arraySuccess: any = []

            productsFile.map((product: any) => {
                if (product.field5 || product.field6) {
                    return arrayErrors.push(product);
                } else {
                    return arraySuccess.push(product);
                }
            })

            console.log("Os produtos a seguir n??o puderam ser inseridos. Por favor, verifique os dados informados", arrayErrors)

            const insertData = async () => {
                await BaseDatabase
                    .connection(ProductDatabase.TABLE_PRODUCTS)
                    .insert(arraySuccess)

                await BaseDatabase
                    .connection(OrderDatabase.TABLE_ORDERS)
                    .insert(orders)

                await BaseDatabase
                    .connection(ProductOrderDatabase.TABLE_PRODUCTS_ORDERS)
                    .insert(productOrders)
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