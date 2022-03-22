let ProductDao;
let CartDao;

const DAOProductMongo = require('./products/productsMongo.js')
const DAOCartMongo = require('./carts/cartsMongo.js')

ProductDao = new DAOProductMongo();
CartDao = new DAOCartMongo();

module.exports = {ProductDao, CartDao}