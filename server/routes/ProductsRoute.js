const express = require('express');
const router = express.Router(); // as a route 
const { Products, SubCategory, Likes } = require("../models");
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get("/", async (req, res) => { // to display the all the items without a liking method
  const listOfProducts = await Products.findAll({ include: [Likes] });
  res.json(listOfProducts);
});

router.get('/count', async (req, res) => { // get the number of products
  try {
    const productCount = await Products.count(); // Use Products.count() to get the total count
    res.json({ count: productCount });
  } catch (error) {
    console.error("Error fetching product count:", error);
    res.status(500).json({ error: "Error fetching product count" });
  }
});
router.get('/products', async (req, res) => {
  const { search } = req.query;
  try {
      const products = await Product.findAll({
          where: {
              title: {
                  [Op.like]: `%${search}%`
              }
          }
      });
      res.json(products);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.get("/:id", validateToken, async (req, res) => { // to display which items are liked and which are not
  const id = req.params.id 
  const listOfProducts = await Products.findAll({
    where: { SubCategoryId: id }, include:[Likes]});
  const likedProducts = await Likes.findAll({ where: { UserId: req.user.id }});
    res.json({ listOfProducts: listOfProducts, likedProducts: likedProducts });
  });

  router.get("/fav/:id", validateToken, async (req, res) => { // to get the liked product 
    const id = req.params.id;

    const likedProducts = await Likes.findAll({
      where: { UserId: id },
      attributes: ['ProductId']
    });
    const productIds = likedProducts.map((like) => like.ProductId); // Extract product IDs

    if (!productIds.length) {
      return res.json({ likedProducts: [] }); // No liked products
    }
    
    const products = await Products.findAll({
      where:{ id: [ ...productIds ] },
      include: [Likes]
    });
    
    res.json({ likedProducts: products });
    });
  
 
  
  router.get('/all/:id', async (req, res) => { // for all the products of the subcategory list
    const id = req.params.id 
    const products = await Products.findAll({
        where: { SubCategoryId: id }, include:[Likes]} );
    res.json({listOfProducts: products})
    
})

router.get("/prodName/:id", async (req, res) => {  // to get the category name and display it in the subcategory
  const id = req.params.id
  const product = await SubCategory.findByPk(id)
  res.json(product)
});


router.get("/byuserId/:id", async (req, res) => {  // to get the list of products created by that user
  const id = req.params.id;
  const listOfPosts = await Products.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});

  // for the admin
    // create a product
router.post("/",validateToken, async (req, res) =>{ 
    const product = req.body;
//    product.username = req.user.username we are getting the name from the token
    product.UserId = req.user.id
    
    await Products.create(product); // then it will passes the data to the database and it should wait until the post is added
    res.json(product);
})

// editing the title of the product

router.put("/title",validateToken, async (req, res) =>{
    const { newTitle, id } = req.body;
    await Products.update({title: newTitle}, {where: {id: id} })

    res.json(newTitle);
})

// editing the description of the product

router.put("/description",validateToken, async (req, res) =>{
    const { newDescription, id } = req.body;
    await Products.update({description: newDescription}, {where: {id: id} })

    res.json(newDescription);
})


router.delete("/:productId", validateToken, async (req,res) => {
    const productId =  req.params.productId
    
    await Products.destroy({ // deleting the id
        where: {  
          id: productId,
        },
      })
      res.json("DELETED SUCCESSFULLY")
})
module.exports = router;