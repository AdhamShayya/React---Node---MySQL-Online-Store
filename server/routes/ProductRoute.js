const express = require('express');
const router = express.Router(); // as a route 
const { Likes, Products } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get('/:id', async (req, res) => { // for the Product
    const id = req.params.id // the id in the path
    const product = await Products.findByPk(id, {include:[Likes]}) //to wait for the data to return and findByPk to find the item according to the primary key
    res.json(product)
    
})

router.put("/title",validateToken, async (req, res) =>{
    const { newTitle, id } = req.body;
    await Products.update({title: newTitle}, {where: {id: id} })

    res.json(newTitle);
})

router.put("/price",validateToken, async (req, res) =>{
    const { newPrice, id } = req.body;
    await Products.update({price: newPrice}, {where: {id: id} })

    res.json(newPrice);
})

router.put("/quantity",validateToken, async (req, res) =>{
    const { newQuantity, id } = req.body;
    await Products.update({quantity: newQuantity}, {where: {id: id} })

    res.json(newQuantity);
})

router.put("/description",validateToken, async (req, res) =>{
    const { newDescription, id } = req.body;
    await Products.update({description: newDescription}, {where: {id: id} })

    res.json(newDescription);
})

router.put("/image",validateToken, async (req, res) =>{
    const { newImage, id } = req.body;
    await Products.update({image: newImage}, {where: {id: id} })

    res.json(newImage);
})

module.exports = router;