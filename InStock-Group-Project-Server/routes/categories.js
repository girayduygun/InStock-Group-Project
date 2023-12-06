const express = require("express");
const router = express.Router();

const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);

//get all distinct inventory categories
router.get("/", async (_req, res) => {
    try {
        const categoriesData = await db.select("category").from("inventories").distinct();
        res.status(200).json(categoriesData);
        return;
    } catch (error) {
        res.status(500).send("Error");
        return;
    }
});

module.exports = router;