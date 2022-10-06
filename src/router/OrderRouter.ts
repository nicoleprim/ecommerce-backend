import { Router } from "express";
import { OrderController } from "../controller/OrderController";
import { OrderBusiness } from "../business/OrderBusiness";
import { OrderDatabase } from "../database/OrderDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { ProductOrderDatabase } from "../database/ProductOrderDatabase";
import { ProductDatabase } from "../database/ProductDatabase";

export const orderRouter = Router()

const orderController = new OrderController(
    new OrderBusiness(
        new OrderDatabase(),
        new ProductOrderDatabase(),
        new ProductDatabase(),
        new IdGenerator()
    )
)

orderRouter.post("/createorder", orderController.createOrder) 
orderRouter.get("/", orderController.getOrders)