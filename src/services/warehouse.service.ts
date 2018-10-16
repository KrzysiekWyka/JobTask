import { Item } from "../models/Item";
import { Truck } from "../models/truck";
import Order from '../entities/order';
class Warehouse {
    private maxTruckWeight: number;

    constructor() {
        if (process.env && process.env.MAX_TRUCK_WEIGHT) {
            this.maxTruckWeight = +process.env.MAX_TRUCK_WEIGHT || 1000;
        } else {
            this.maxTruckWeight = 1000;
        }
    }


    /**
     * Calculate price of items
     *
     * @param {Item[]} items Items
     * @returns {number}
     * @memberof Warehouse
     */
    calculateItemsPrice(items: Item[]) {
        return items.reduce((prev, cur) => {
            const { weight } = cur;

            if (weight > 400) {
                return prev + 0.01 * weight;
            }

            return prev + (2 + 0.005 * weight);
        }, 0);
    }

    /**
     * Saving order in database
     *
     * @param {any} model
     * @memberof Warehouse
     */
    async saveOrder(model: any) {
        try {
            await new Order(model).save();
        } catch (error) {
            throw new Error("Cannot save order");
        }
    }
    

    /**
     * All orders from database
     *
     * @returns
     * @memberof Warehouse
     */
    allOrders() {
        return new Promise(async (resolve, reject) => {
            Order.find({}).sort('-createdAt').exec((err, res) => {
                if (err) reject(err);
    
                resolve(res);
            });
        });
    }


    /**
     * Simple method of assigning items to trucks
     *
     * @param {Item[]} items Items
     * @returns
     * @memberof Warehouse
     */
    loadItemsToTrucks(items: Item[]) {
        items = this.sortItemsByWeight(items);

        const trucks: Truck[] = [new Truck()];

        items.forEach((item, i) => {
            if (i === 0) {
                trucks[i].addItem(item);
            } else {
                const truckIndex = trucks.findIndex(
                    truck =>
                        truck.loadWeight + item.weight <= this.maxTruckWeight
                );

                if (truckIndex < 0) {
                    const truck = new Truck();

                    truck.addItem(item);

                    trucks.push(truck);
                } else trucks[truckIndex].load.push(item);
            }
        });

        return trucks;
    }

    private sortItemsByWeight(items: Item[]) {
        return items.sort((x, y) => y.weight - x.weight);
    } 
}

export default new Warehouse();
