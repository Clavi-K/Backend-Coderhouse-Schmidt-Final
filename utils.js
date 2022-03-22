module.exports = function prodValidator(prod) {

    if (!prod || prod === undefined) {
        throw new Error("Product not valid");
    }
    if (!prod.name || prod.name === undefined || prod.name.trim(" ").length == 0) {
        throw new Error("Product name not defined");
    }
    if (!prod.description || prod.description === undefined || prod.description.trim(" ").length == 0) {
        throw new Error("Product description not defined");
    }
    if (!prod.thumbnail || prod.thumbnail === undefined || prod.thumbnail.trim(" ").length == 0) {
        throw new Error("Product thumbnail not defined");
    }
    if (!prod.price || prod.thumbnail === undefined || prod.price <= 0) {
        throw new Error("Product thumbnail not defined");
    }
    if (!prod.stock || prod.stock === undefined || prod.stock <= 0) {
        throw new Error("Product stock not defined");
    }

    prod.timestamp = Date.now();
    return prod;

}
