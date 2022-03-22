const container = require("../../containers/mongo");

class DaoProductMongo extends container {

    constructor() {
        super("products", {
            name: String,
            description: String,
            thumbnail: String,
            price: Number,
            stock: { type: Number, default: 0 },
            timestamp: { type: Number, default: Date.now() }
        })
    }

}

module.exports = DaoProductMongo;