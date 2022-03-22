const container = require("../../containers/firebase");

class DaoProductFirebase extends container{

    constructor() {
        super("products")
    }

}

module.exports = DaoProductFirebase;