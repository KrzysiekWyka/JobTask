class Helpers {
    private maxItemWeight: number;

    constructor() {
        if (process.env && process.env.MAX_ITEM_WEIGHT) {
            this.maxItemWeight = +process.env.MAX_ITEM_WEIGHT || 500;
        } else {
            this.maxItemWeight = 500;
        }
    }
    /**
     * Simple body validation
     *
     * @param {*} data
     * @memberof Helpers
     */
    validateBody(data: any) {
        if (!Array.isArray(data)) {
            return false;
        }

        // For of because break
        data.forEach(item => {
            if (
                !item.id ||
                typeof item.id !== "string" ||
                !item.weight ||
                typeof item.weight !== "number" ||
                item.weight > this.maxItemWeight ||
                item.weight <= 0
            ) return false;
        });

        return true;
    }
}

export default new Helpers();
