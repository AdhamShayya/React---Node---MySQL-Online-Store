const express = require('express');
const router = express.Router(); // as a route 
const { Products, Cart } = require("../models");
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get("/:id",validateToken, async (req, res) => { // getting all the cart products 
    const id = req.params.id;// param is the userId
    let totalPrice = 0;

    const cartProducts = await Cart.findAll({
      where: { UserId: id },
      attributes: ['ProductId', 'quantity']
    });

    if (!cartProducts.length) {
      return res.json({ cartProducts: [], totalPrice: totalPrice }); // No liked products
    }
    
    const productIds = cartProducts.map((product) => product.ProductId); // Extract product IDs
   
    if (!productIds.length) {
      return res.json({ cartProducts: [], totalPrice: totalPrice }); // No liked products
    }
    
    const productQuantityMap = {};
        cartProducts.forEach((product) => { // to associate all the product id to its quantity id 
            productQuantityMap[product.ProductId] = product.quantity;
        });

        // Fetch products from the product table
        const products = await Products.findAll({
            where: { id:  [...productIds]  }
        });

        // Update quantities in the products array
        products.forEach((product) => {
            const productId = product.id;
            product.quantity = productQuantityMap[productId];
            totalPrice += product.quantity * product.price;

        });
  
        res.json({ cartProducts: products, totalPrice: totalPrice});
});

router.post("/", validateToken, async (req, res) => {
    const { ProductId } = req.body
    const UserId = req.user.id
    
    const found = await Cart.findOne({
         where: {
            ProductId: ProductId,
            UserId: UserId,
        }
    })

        if(!found){
            await Cart.create({ProductId: ProductId, UserId: UserId, quantity: 1}); // adding to Cart
            res.json({added: true})
        } else{
            await Cart.destroy({ // deleting from the cart
                where:{ProductId: ProductId, UserId: UserId },
            })
            res.json({added: false})
        }

})
router.put("/:productId", async (req, res) => { // updating the quantity 
  const { productId } = req.params;
  const { totalPrice } = req.body
  const { quantity } = req.body;

  try {
    const existingCartItem = await Cart.findOne({ // to get the specific item from the cart
      where: { ProductId: productId},
    });
    const product  = await Products.findOne({ // to get the price from it to update the total in the cart
      where: { id: productId},
    })
    if (!existingCartItem) {
      return res.json({ message: "Cart item not found" });
    }

    existingCartItem.quantity += quantity;
    await existingCartItem.save(); // to update the quantity
    
    const total = (product.price)*(quantity) + totalPrice // if we are subtracting then we have to subtract the price of 1 product
    res.json({totalPrice: total});
  } catch (error) {
    console.error("Error updating cart item quantity:");
    res.json("Error updating cart item quantity");
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  const productId = req.params.id 
  const UserId = req.user.id
  const { quantity } = req.body;
  const { totalPrice } = req.body

  const product  = await Products.findOne({ // to get the price from it to update the total in the cart
    where: { id: productId},
  })
  const total = totalPrice - (product.price)*(quantity)  // if we are subtracting then we have to subtract the price of 1 product
  
  await Cart.destroy({ 
    where: {  
      ProductId: productId, UserId: UserId 
    },
  })
  res.json({totalPrice: total});

}) 
router.delete("/reset/:id", validateToken, async (req, res) => {
  const userId = req.params.id;

  try {
    await Cart.destroy({ where: { UserId: userId }});
    res.status(200).json({ message: "Cart reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});



module.exports = router;