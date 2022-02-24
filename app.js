const express = require("express");
const path = require("path");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

const app = express();
const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`);
});

/* --- MIDDLEWARES --- */

app.use((req, res, next, err) => {
    console.log("Hubo un error");
    res.status(500).sned({
        error: "Error"
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(path.join(__dirname, 'public')));

app.use((req, res, next, err) => {
    console.log("hubo un error");
    res.status(500).send({
        error: "Error" + err
    });
});

/* ---------------------------- */

/* --- ROUTES --- */

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("*", (req, res) => {
    res.status(500).send({
        error: `Route ${req.path} does not exist`
    });
});

app.post("*", (req, res) => {
    res.status(500).send({
        error: `Route ${req.path} does not exist`
    });
});

app.put("*", (req, res) => {
    res.status(500).send({
        error: `Route ${req.path} does not exist`
    });
});

app.delete("*", (req, res) => {
    res.status(500).send({
        error: `Route ${req.path} does not exist`
    });
});
