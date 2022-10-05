import { Router } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { ProductDatabase } from "../database/ProductDatabase";
import { OrderController } from "../controller/OrderController";
import { OrderBusiness } from "../business/OrderBusiness";
import { OrderDatabase } from "../database/OrderDatabase";
import { IdGenerator } from "../services/IdGenerator";

export const orderRouter = Router()

const orderController = new OrderController(
    new OrderBusiness(
        new OrderDatabase(),
        new IdGenerator(),
        new ProductDatabase()
    )
)

orderRouter.post("/createorder", orderController.createOrder) 