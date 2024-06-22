const express = require('express');
const router = express.Router(); // as a route 
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => { // the token holds the user's info (req) 
    const { ProductId } = req.body
    const UserId = req.user.id
    
    const found = await Likes.findOne({
         where: {
            ProductId: ProductId,
            UserId: UserId
        }
    })

        if(!found){
            await Likes.create({ProductId: ProductId, UserId: UserId }); // adding the like
            res.json({liked: true})
        } else{
            await Likes.destroy({ // deleting the like
                where:{ProductId: ProductId, UserId: UserId },
            })
            res.json({liked: false})
        }

})
router.delete("/:id", validateToken, async (req, res) => {// only the owner will delete the comment
    const productId = req.params.id // identify which comment
    const UserId = req.user.id

    await Likes.destroy({ // deleting the id
      where: {  
        ProductId: productId, UserId: UserId 
      },
    })
  
    res.json("Deleted Successfully")
  
  }) 
  
module.exports = router;