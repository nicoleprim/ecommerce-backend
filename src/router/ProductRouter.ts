import { ProductController } from "../controller/ProductController";
import { Router } from "express";
import { ProductBusiness } from "../business/ProductBusiness";

export const productRouter = Router()

const productController = new ProductController( new ProductBusiness())

/* productRouter.get("/", productController.hello) */