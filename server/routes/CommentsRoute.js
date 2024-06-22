const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken} = require("../middlewares/AuthMiddleware")

router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  const comments = await Comments.findAll({ where: { ProductId: productId } });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => { 
  const comment = req.body; // comment obj
  const username = req.user.username
  comment.username = username; // then the comment obj will contain the pass too 
  await Comments.create(comment); // add it to the db
  res.json(comment); // sending the comment obj to the frontend
});

router.delete("/:commentId", validateToken, async (req, res) => {// only the owner will delete the comment
  const commentId = req.params.commentId // identify which comment

  await Comments.destroy({ // deleting the id
    where: {  
      id: commentId,
    },
  })

  res.json("Deleted Successfully")

}) 

module.exports = router;