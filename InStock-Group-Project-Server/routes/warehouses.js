const express = require("express");
const router = express.Router();

const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);
const validator = require("validator").default;
const libphonenumber = require("libphonenumber-js");

// Get all warehouses
router.get("/", async (_req, res) => {
    try {
        const warehouseData = await db.select("*").from("warehouses");
        res.status(200).json(warehouseData);
        return;
    } catch (error) {
        res.status(500).send("Error");
        return;
    }
});

// Get a single warehouse
router.get("/:id", async (req, res) => {

    const warehouseId = req.params.id;

    try {
        const warehouseData = await db('warehouses').where('id', warehouseId).first();

        if (!warehouseData) {
            res.status(404).json({ error: 'Warehouse not found' });
            return;
        }

        res.status(200).json(warehouseData);
        return;
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
});

// Get all inventory items for a single warehouse
router.get("/:id/inventories", async (req, res) => {

    const warehouseId = req.params.id;

    try {
        const warehousesIDData = await db.select("id").from("warehouses");
        if (!(warehousesIDData.find((warehouse) => { return warehouse.id === parseInt(itemWarehouseID) }))) {
            res.status(404).json({ error: 'Could not find a warehouse with that ID' });
            return;
        }

        const inventoriesData = await db.select("*").from("warehouses")
            .where('warehouses.id', warehouseId)
            .join("inventories", "inventories.warehouse_id", "=", "warehouses.id");
        res.status(200).json(inventoriesData);
        return;
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
});

// Add a warehouse
router.post("/", async (req, res) => {

    // Handle bad requests
    // Check that all the fields are filled
    const approvalFlag = (!(
        req.body?.warehouseName &&
        req.body?.warehouseAddress &&
        req.body?.warehouseCity &&
        req.body?.warehouseCountry && 
        req.body?.contactName &&
        req.body?.contactPosition &&
        req.body?.contactNumber &&
        req.body?.contactEmail
    ))
    if (approvalFlag) {
        res.status(400).send("All fields need to be filled to add a warehouse");
        return;
    }

    const { warehouseName,warehouseAddress,warehouseCity,warehouseCountry,contactName,contactPosition,contactNumber,contactEmail } = req.body;
    
    if (!(libphonenumber.isPossiblePhoneNumber(contactNumber) || validator.isMobilePhone(contactNumber))) {
        res.status(400).send("Phone number is not valid");
        return;
    }

    if (!(validator.isEmail(contactEmail))) {
        res.status(400).send("Email is not valid");
        return;
    }

    const newWarehouseObj = {
        warehouse_name: warehouseName,
        address: warehouseAddress,
        city: warehouseCity,
        country: warehouseCountry,
        contact_name: contactName,
        contact_position: contactPosition,
        contact_phone: contactNumber,
        contact_email: contactEmail
    }

    try {
        const insertData = await db("warehouses").insert(newWarehouseObj);
        const [ newWarehouseID ] = insertData;
        const newWarehouse = await db.select("*").from("warehouses").where({ id: newWarehouseID });
        res.status(201).json(newWarehouse);
        return;
    } catch (error) {
        res.status(500).send("Error");
        return;
    }
});

// Edit a warehouse
router.put("/:id", async (req, res) => {
    const warehouseId = req.params.id;

    const {warehouseName,warehouseAddress,warehouseCity,warehouseCountry,contactName,contactPosition,contactNumber,contactEmail} = req.body;

    try {
        const warehousesIDData = await db.select("id").from("warehouses");
        if (!(warehousesIDData.find((warehouse) => { return warehouse.id === parseInt(warehouseId) }))) {
            res.status(404).json({ error: 'Could not find a warehouse with that ID' });
            return;
        }

        await db.select("*").from("warehouses").where({ id: warehouseId })
            .update({
                warehouse_name: warehouseName, 
                address: warehouseAddress,
                city: warehouseCity,
                country: warehouseCountry,
                contact_name: contactName,
                contact_position: contactPosition,
                contact_phone: contactNumber,
                contact_email: contactEmail
            });

        const updatedWarehouse = await db('warehouses').where('id', warehouseId).first();
        res.status(200).json(updatedWarehouse);
        return;
    } catch (error) {
        res.status(500).send(error);
        return;
    }
});

// Delete a warehouse
router.delete("/:id", async (req, res) => {
    const warehouseId = req.params.id;

    try {
        const warehousesIDData = await db.select("id").from("warehouses");
        if (!(warehousesIDData.find((warehouse) => { return warehouse.id === parseInt(warehouseId) }))) {
            res.status(400).json({ error: 'Could not find a warehouse with that ID' });
            return;
        }

        await db("warehouses").where({ id: warehouseId }).del();
        res.status(200).json({ message: "Warehouse deleted successfully" });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting warehouse");
        return;
    }
});

module.exports = router;