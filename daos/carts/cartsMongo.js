const container = require("../../containers/mongo");

class DaoCartMongo extends container {

    constructor() {
        super("carts", {

            timestamp: { type: Number, default: Date.now() },
            products: { type: Array, default: [] }

        });
    }

}

module.exports = DaoCartMongo;