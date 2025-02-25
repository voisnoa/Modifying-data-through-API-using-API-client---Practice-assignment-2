const express = require("express");
const router = express.Router();
const MenuItem = require("../model/MenuItem");

router.post("/", async (req, res) => {
    try {
      const { name, price } = req.body;
  
      
      if (!name || !price) {
        return res.status(400).json({ error: "Name and price are required" });
      }
  
      const newItem = new MenuItem({ name,
         price });
      await newItem.save();
  
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Error adding menu item" });
    }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedItem) return res.status(404).json({ error: "Menu item not found" });

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: "Invalid request" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) return res.status(404).json({ error: "Menu item not found" });

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Invalid request" });
  }
});

module.exports = router;