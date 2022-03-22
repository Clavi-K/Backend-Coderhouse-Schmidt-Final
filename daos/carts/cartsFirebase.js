const container = require("../../containers/firebase");

class DaoCartFirebase extends container {

    constructor() {
        super("carts")
    }
}

module.exports = DaoProductFirebase;