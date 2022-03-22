const express = require('express');
const { Router } = express;

const controller = require("../controllers/carts");

const router = Router();
const admin = true;

router.post("/", controller.post);
router.delete("/:id", controller.delete);
router.get("/:id/products", controller.get);
router.post("/:id/products/:idprod", controller.addProd);
router.delete("/:id/products/:idprod", controller.deleteProd);

module.exports = router;
