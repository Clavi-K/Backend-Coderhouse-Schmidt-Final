const { ProductDao } = require("../daos/index");
const prodValidator = require("../utils");


const admin = true;

module.exports = {
    getById: async (req, res) => {

        const { id } = req.params;

        const item = await ProductDao.getById(id);

        if (!item) {

            res.status(404).send({
                error: "Product not found"
            });

            return;

        } else {

            res.send(item);

        }

    },

    post: async (req, res) => {

        if (admin == false) {

            res.status(403).send({
                error: "Request not authorized"
            });

            return;

        } else {

            const prod = req.body;

            try {

                prodValidator(prod);
                ProductDao.create(prod)

                res.status(201).send(`Product created!`);

            } catch (e) {

                res.status(400).send({
                    error: "Bad Request",
                    description: e.message
                });

            }

        }

    },

    put: (req, res) => {

        if (admin === false) {

            res.status(403).send({
                error: "Request not authorized"
            });

            return;

        } else {

            const prod = req.body;
            const { id } = req.params;

            try {

                const val = prodValidator(prod);
                ProductDao.update(id, val);

                res.status(200).send("Ok");

            } catch (e) {

                res.status(400).send({
                    error: "Bad Request",
                    description: e.message
                });

            }

        }


    },

    delete: (req, res) => {

        if (admin === false) {

            res.status(403).send({
                error: "Request not authorized"
            });

            return;

        } else {

            const { id } = req.params;
            ProductDao.delete(id);

            res.status(200).send("Ok");

        }

    }

}