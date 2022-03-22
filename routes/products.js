const express = require('express');
const { Router } = express;

const controller = require("../controllers/products");

const router = Router();
const admin = true;

router.get("/:id",  controller.getById);

router.post("/", controller.post);

router.put("/:id", controller.put);

router.delete("/:id", controller.delete);

module.exports = router;

