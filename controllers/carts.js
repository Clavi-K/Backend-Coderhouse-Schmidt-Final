const { CartDao } = require("../daos/index");
const { ProductDao } = require("../daos/index");
const Cart = require("../models/cart");

const admin = true;

module.exports = {

    post: async (req, res) => {

        const cart = new Cart([]);
        let id = await CartDao.create(cart);

        res.status(201).send(`Cart created! ID: ${id}`);

    },

    delete: (req, res) => {

        const { id } = req.params;
        CartDao.delete(id);

        res.status(200).send("Ok");

    },

    get: async (req, res) => {

        const { id } = req.params;
        const cart = await CartDao.getById(id);

        if (!cart) {

            res.status(404).send({
                error: "Cart not found"
            });

        } else {

            res.send(cart.products);

        }

    },

    addProd: async (req, res) => {

        const { id, idprod } = req.params;

        const cart = await CartDao.getById(id);
        const prod = await ProductDao.getById(idprod);

        if (!cart) {

            res.status(404).send({
                error: "Cart not found"
            });

        }

        if (!prod) {

            res.status(404).send({
                error: "Product not found"
            });

        }

        try {

            cart.products.push(prod);
            await CartDao.update(cart._id, cart);

            res.status(200).send("Cart updated!");

        } catch (e) {

            res.status(500).send({
                error: "Could not add product to cart.",
                description: e.message
            });

        }

    },

    deleteProd: async (req, res) => {

        const { id, idprod } = req.params;
        const cart = await CartDao.getById(id);

        if(!cart) {

            res.status(404).send({
                error: "Cart not found"
            });

        }

        cart.products = cart.products.filter(p => p._id != idprod);
        await CartDao.update(id, cart);
        res.status(200).send("OK");

    }

}
