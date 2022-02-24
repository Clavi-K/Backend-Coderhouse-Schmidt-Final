const express = require('express');
const { Router } = express;
const Container = require("../api/container");
const Cart = require("../models/cart");

const container = new Container("./data/carts.json");
const prodContainer = new Container("./data/products.json");
const router = Router();
const admin = true;

router.post("/", (req, res) => {

    const cart = new Cart([]);

    container.saveFile(cart)
        .then((response) => {

            res.status(200).send(`Cart created! ID: ${response}`);

        });

});

router.delete("/:id", (req, res) => {

    const { id } = req.params;
    container.deleteById(id);

    res.status(200).send("Ok");

});

router.get("/:id/products", (req, res) => {

    const { id } = req.params;

    container.getById(id)
        .then((response) => {

            if (!response || response === undefined) {

                res.status(404).send({
                    error: "Cart not found"
                });

            } else {

                res.send(response.products);

            }

        });

});

router.post("/:id/products/:idprod", async (req, res) => {

    const { id } = req.params;
    const { idprod } = req.params;

    let cart;
    let prod;

    await container.getById(id)
        .then((response) => {
            cart = response;
        });

    await prodContainer.getById(idprod)
        .then((response) => {
            prod = prodValidator(response);
        });


    if (!cart || cart === undefined) {

        res.status(404).send({
            error: "Cart not found"
        });

    }

    if (prod === false) {

        res.status(404).send({
            error: "Product not found"
        });

    }

    cart.products.push(prod);
    container.updateById(id, cart);
    res.status(200).send("Ok");

});

router.delete("/:id/products/:idprod", async (req, res) => {

    const { id } = req.params;
    const { idprod } = req.params;

    let cart;
    let prod;

    await container.getById(id)
        .then((response) => {
            cart = response;
        });

    await prodContainer.getById(idprod)
        .then((response) => {
            prod = prodValidator(response);
        });


    if (!cart || cart === undefined) {

        res.status(404).send({
            error: "Cart not found"
        });

    }

    if (prod === false) {

        res.status(404).send({
            error: "Product not found"
        });

    }

    cart.products = cart.products.filter(p => p.id != idprod);
    container.updateById(id, cart);
    res.status(200).send("Ok");

});

function prodValidator(prod) {

    if(!prod || prod === undefined) {
        return false;
    }
    if (!prod.name || prod.name === undefined || prod.name.trim(" ").length == 0) {
        return false;
    }
    if (!prod.description || prod.description === undefined || prod.description.trim(" ").length == 0) {
        return false;
    }
    if (!prod.thumbnail || prod.thumbnail === undefined || prod.thumbnail.trim(" ").length == 0) {
        return false;
    }
    if (!prod.price || prod.thumbnail === undefined || prod.price <= 0) {
        return false;
    }
    if (!prod.stock || prod.stock === undefined || prod.stock <= 0) {
        return false;
    }

    return prod;

}

module.exports = router;
