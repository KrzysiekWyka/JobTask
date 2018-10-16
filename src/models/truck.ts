import { Item } from "./Item";
import UUID from "uuid/v1";

export class Truck {
    /**
     * Track UUID
     *
     * @type {string}
     * @memberof Truck
     */
    truckID: string;
    /**
     * Loaded items
     *
     * @type {Item[]}
     * @memberof Truck
     */
    load: Item[];

    constructor() {
        this.truckID = UUID();
        this.load = [];
    }

    get loadWeight() {
        return this.load.reduce((prev, cur) => prev + cur.weight, 0);
    }

    addItem(item: Item) {
        this.load.push(item);
    }
}
