const express = require("express");
const router = express.Router();

const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);

// Get all inventory items
router.get("/", async (_req, res) => {
    try {
        const inventoriesData = await db.select("*").from("warehouses")
            .join("inventories", "inventories.warehouse_id", "=", "warehouses.id");
        res.status(200).json(inventoriesData);
        return;
    } catch (error) {
        res.status(500).send("Error");
        return;
    }
});

// Get a single inventory item
router.get("/:id", async (req, res) => {

    const inventoryId = req.params.id;

    try {
        const inventoryData = await db.select("*").from("inventories").join("warehouses", "inventories.warehouse_id", "warehouses.id").select("warehouse_name").where('inventories.id', inventoryId).first();

        if (!inventoryData) {
            res.status(404).json({ error: 'Inventory not found' });
            return;
        }

        res.status(200).json(inventoryData);
        return;
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
});

// Add an inventory item
router.post("/", async (req, res) => {
    try {
        const approvalFlag = (
            req.body.itemName &&
            req.body.itemDescription &&
            req.body.itemCategory &&
            req.body.itemAvailability &&
            req.body.hasOwnProperty("itemQuantity") &&
            req.body.itemWarehouseID
        );
        if (!approvalFlag) {
            res.status(400).json({ error: 'Missing properties in the request body' });
            return;
        }
        const {itemName,itemDescription,itemCategory,itemAvailability,itemWarehouseID,itemQuantity} = req.body;

        const warehouseExists = await db.select("*").from("warehouses").where('id', itemWarehouseID).first();
        if (!warehouseExists) {
            res.status(400).json({ error: 'A warehouse with that ID does not exist' });
            return;
        }

        if (isNaN(parseInt(itemQuantity))) {
            res.status(400).json({ error: 'Quantity is not a number' });
            return;
        }

        const [newInventoryId] = await db.select("*").from('inventories').insert({
            warehouse_id: parseInt(itemWarehouseID),
            item_name: itemName,
            description: itemDescription,
            category: itemCategory,
            status: itemAvailability,
            quantity: parseInt(itemQuantity)
        });

        const newInventoryItem = await db.select("*").from('inventories').where('id', newInventoryId).first();
        res.status(201).json(newInventoryItem);
        return;
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
});


// Edit an inventory item
router.put("/:id", async (req, res) => {
    const inventoryId = req.params.id;

    try {
        const approvalFlag = (
            req.body.itemName &&
            req.body.itemDescription &&
            req.body.itemCategory &&
            req.body.itemAvailability &&
            req.body.hasOwnProperty("itemQuantity") &&
            req.body.itemWarehouseID
        );
        if (!approvalFlag) {
            res.status(400).json({ error: 'Missing properties in the request body' });
            return;
        }
        const {itemName,itemDescription,itemCategory,itemAvailability,itemWarehouseID,itemQuantity} = req.body;
        
        const inventoriesIDData = await db.select("id").from("inventories");
        if (!(inventoriesIDData.find((item) => { return item.id === parseInt(inventoryId) }))) {
            res.status(404).json({ error: 'Could not find item with that ID' });
            return;
        }

        const warehousesIDData = await db.select("id").from("warehouses");
        if (!(warehousesIDData.find((warehouse) => { return warehouse.id === parseInt(itemWarehouseID) }))) {
            res.status(400).json({ error: 'Could not find a warehouse with that ID' });
            return;
        }

        if (isNaN(parseInt(itemQuantity))) {
            res.status(400).json({ error: 'Quantity is not a number' });
            return;
        }

        await db.select("*").from("inventories").where({ id: inventoryId })
            .update({
                item_name: itemName,
                description: itemDescription,
                category: itemCategory,
                status: itemAvailability,
                quantity: itemQuantity,
                warehouse_id: itemWarehouseID
            });
        const updatedItem = await db.select("*").from("inventories").where({ id: inventoryId }).first();
        res.status(200).json(updatedItem);
        return;
    } catch (error) {
        res.status(500).send(error);
        return;
    }
});


// Delete a single inventory item
router.delete("/:id", async (req, res) => {
    const itemId = req.params.id;
    
    try {
        const inventoriesIDData = await db.select("id").from("inventories");
        if (!(inventoriesIDData.find((item) => { return item.id === parseInt(itemId) }))) {
            res.status(404).json({ error: 'Could not find item with that ID' });
            return;
        }

        await db("inventories").where({ id: itemId}).del();
        res.status(200).json({ message: "Item deleted from inventory successfully"});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting Item from Inventory");
        return;
    }
});

module.exports = router;