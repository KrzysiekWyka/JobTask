import { Router, Request, Response } from "express";
import { Item } from "../models/Item";
import WarehouseService from "../services/warehouse.service";
import Helpers from "../helpers";

const router = Router();

router.get("/order", async (_, res: Response) => {
    const orders = await WarehouseService.allOrders();

    return res.json(orders);
});

router.post("/order", async (req: Request, res: Response) => {
    const isDataValid = Helpers.validateBody(req.body);

    if (!isDataValid) {
        return res.status(422).send("Incorrect data");
    }

    const items: Item[] = req.body;

    let price = WarehouseService.calculateItemsPrice(items);
    // Simple rounding
    price = +price.toFixed(2);
    const trucks = WarehouseService.loadItemsToTrucks(items);

    const order = { price, trucks };

    try {
        await WarehouseService.saveOrder(order);

        return res.json(order);
    } catch (error) {
        return res.status(500).send("Cannot save order");
    }
});

export default router;
