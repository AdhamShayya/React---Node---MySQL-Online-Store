const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Products } = require("../models"); // Assuming Products is the model for your products

router.get('/', async (req, res) => {
  const query = req.query.query;
  try {
    const products = await Products.findAll({
      where: {
        title: {
          [Op.like]: `%${query}%`
        }
      }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while searching for products' });
  }
  
});

module.exports = router;
