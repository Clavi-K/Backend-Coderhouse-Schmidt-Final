const express = require('express');
const { Router } = express;
const Container = require("../api/container");
const container = new Container("./data/products.json");

const router = Router();
const admin = true;

router.get("/:id", (req, res) => {

    const { id } = req.params;

    container.getById(id)
        .then((response) => {

            if (!response || response == undefined) {

                res.status(404).send({
                    error: "Product not found"
                });

                return;

            } else {

                res.send(response);

            }

        });

});

router.post("/", (req, res) => {

    if (admin == false) {

        res.status(403).send({
            error: "Request not authorized"
        });

        return;

    } else {

        const prod = req.body;
        const val = prodValidator(prod);

        if (val === false) {

            res.status(400).send({
                error: "Bad request"
            });

            return;

        } else {

            container.saveFile(val);
            res.status(200).send("Ok");

        }

    }

});

router.put("/:id", (req, res) => {

    if (admin === false) {

        res.status(403).send({
            error: "Request not authorized"
        });

        return;

    } else {

        const prod = req.body;
        const { id } = req.params;
        const val = prodValidator(prod);

        if (val === false) {

            res.status(400).send({
                error: "Bad request"
            });

            return;

        } else {

            container.updateById(id, prod);
            res.status(200).send("Ok");

        }

    }

});

router.delete("/:id", (req, res) => {

    if (admin === false) {

        res.status(403).send({
            error: "Request not authorized"
        });

        return;

    } else {

        const { id } = req.params;
        container.deleteById(id);

        res.status(200).send("Ok");

    }

});

module.exports = router;

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

    prod.timestamp = Date.now();
    return prod;

}