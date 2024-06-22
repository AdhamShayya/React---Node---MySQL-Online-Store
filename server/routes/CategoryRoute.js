const express = require('express');
const router = express.Router(); // as a route 
const { Category, SubCategory, Products } = require("../models");
const { validateToken } = require('../middlewares/AuthMiddleware');


router.get("/", async (req, res) => { // to get the list of categories
    const listOfCategories = await Category.findAll();
    res.json(listOfCategories);
  });
  router.get("/catname/:id", async (req, res) => {  // to get the category name and display it in the subcategory
    const id = req.params.id
    const product = await Category.findByPk(id)
    res.json(product)
  });


 
  router.get('/sub/:id', async (req, res) => { // to get all the subcategory list
    const id = req.params.id 
    const subCategory = await SubCategory.findAll({
        where: { CategoryId: id },
      });
    res.json(subCategory)
    
})

  router.get('/all/:id', async (req, res) => { // to get all the products of the category
  const id = req.params.id 
  const subCategory = await SubCategory.findAll({
      where: { CategoryId: id },
    });
    const productIds = subCategory.map((product) => product.id); // Extract Subcategory IDs
    
    const products = await Products.findAll({
      where:{ SubCategoryId: [ ...productIds ] }
    });
  res.json(products)
  
})

 /* admin */
 router.get('/catCount', async (req, res) => { // get the number of categories
  try {
    const categoryCount = await Category.count();
    res.json({ count: categoryCount });
  } catch (error) {
    console.error("Error fetching product count:", error);
    res.status(500).json({ error: "Error fetching product count" });
  }
});

 router.post("/",validateToken, async (req, res) =>{ 
  const category = req.body;
  
  await Category.create(category); // then it will passes the data to the database and it should wait until the post is added
  res.json(category);
})


router.delete("/:categoryId", validateToken, async (req,res) => {
  const categoryId =  req.params.categoryId
  
  await Category.destroy({ // deleting the id
      where: {  
        id: categoryId,
      },
    })
    res.json("DELETED SUCCESSFULLY")
})

router.put("/title",validateToken, async (req, res) =>{
  const { newTitle, id } = req.body;
  await Category.update({title: newTitle}, {where: {id: id} })

  res.json(newTitle);
})
router.put("/description",validateToken, async (req, res) =>{
  const { newDescription, id } = req.body;
  await Category.update({description: newDescription}, {where: {id: id} })

  res.json(newDescription);
})

router.put("/image",validateToken, async (req, res) =>{
  const { newImage, id } = req.body;
  await Category.update({img: newImage}, {where: {id: id} })

  res.json(newImage);
})

/* subcat Admin */
router.get("/subCat", async (req, res) => { // to get the list of categories
  const listOfSubCategories = await SubCategory.findAll();
  res.json(listOfSubCategories);
});

router.get('/subCount', async (req, res) => { // get the number of products
  try {
    const subCategoryCount = await SubCategory.count(); // Use Products.count() to get the total count
    res.json({ count: subCategoryCount });
  } catch (error) {
    console.error("Error fetching product count:", error);
    res.status(500).json({ error: "Error fetching product count" });
  }
});

router.post("/sub",validateToken, async (req, res) =>{ 
  const subCategory = req.body;
  
  await SubCategory.create(subCategory); // then it will passes the data to the database and it should wait until the post is added
  res.json(subCategory);
})



router.delete("/sub/:subCategoryId", validateToken, async (req,res) => {
  const subCategoryId =  req.params.subCategoryId
  
  await SubCategory.destroy({ // deleting the id
      where: {  
        id: subCategoryId,
      },
    })
    res.json("DELETED SUCCESSFULLY")
})

router.put("/sub/title",validateToken, async (req, res) =>{
  const { newTitle, id } = req.body;
  await SubCategory.update({title: newTitle}, {where: {id: id} })

  res.json(newTitle);
})
router.put("/sub/image",validateToken, async (req, res) =>{
  const { newImage, id } = req.body;
  await SubCategory.update({img: newImage}, {where: {id: id} })

  res.json(newImage);
})
module.exports = router;