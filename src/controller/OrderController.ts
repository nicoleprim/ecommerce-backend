import { Request, Response } from "express";
import { OrderBusiness } from "../business/OrderBusiness";
import { BaseError } from "../errors/BaseError";
import { ICreateOrderInputDTO } from "../models/Order";

export class OrderController {
    constructor(
        private orderBusiness: OrderBusiness
    ) {}

    public createOrder = async (req: Request, res: Response) => {
        try {
            const input: ICreateOrderInputDTO = {
                userName: req.body.userName,
                deliveryDate: req.body.deliveryDate,
                products: req.body.products
            }

            const response = await this.orderBusiness.createOrder(input)
            res.status(200).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado" })
        }
    }

    public getOrders = async (req: Request, res: Response) => {
        try {
            const response = await this.orderBusiness.getOrders()
            res.status(200).send(response)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao buscar pedidos" })
        }
    }
}