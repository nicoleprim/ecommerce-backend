import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";

export class ProductController {
    constructor(
        private productBusiness: ProductBusiness
    ) {}

/*     public hello = async (req:Request, res: Response) => {
        try {
            const response = await this.productBusiness.parser()
            res.status(200).send(response)
        } catch (error: any) {
            console.log(error)
        }
    }  */
}