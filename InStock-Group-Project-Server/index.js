require("dotenv").config();

const cors = require('cors');
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const warehouseRoutes = require("./routes/warehouses");
const inventoriesRoutes = require("./routes/inventory");
const categoriesRoutes = require("./routes/categories");

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("<p>root</p>")
});

app.use("/warehouses", warehouseRoutes);
app.use("/inventories", inventoriesRoutes);
app.use("/categories", categoriesRoutes);


app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
