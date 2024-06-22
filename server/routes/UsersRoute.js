const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const jwt = require('jsonwebtoken');
const { sign } = require('jsonwebtoken')

router.post("/", async (req, res) => { // register
  const { username, email, password, phoneNumber } = req.body;

  try {
  const hash = await bcrypt.hash(password, 10);
  
  const user = await Users.create({ // Await user creation
    username,
    email,
    password: hash,
    phoneNumber,
    admin_type: 0
  });
  const accessToken = jwt.sign(
    { username: user.username, id: user.id },
    "importantsecret",
    { expiresIn: '1h' } // Optionally set token expiry
  );// the key for the access token to be verified in the middleware

  
  res.json({ token: accessToken, username: username, id: user.id }); // sending the token, username, id
} catch (error) {
  console.error(error);
  res.json({ error: "Internal Server Error" });
}
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
// the user will holds the email and pass
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    // Clear any existing error message before checking password
    delete res.locals.error; 

    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) {
        res.json({
          error: "Wrong Username And Password Combination" });
      } else {
        // Generate token and successful response
        const accessToken = sign({
           username: user.username, 
           id: user.id 
          },
          "importantsecret" // the key for the access token to be verified in the middleware
        );

        res.json({token: accessToken, username: username, id: user.id, admin_type: user.admin_type}); // sending the token, username, id
      }
    });
  }
});
router.get('/auth', validateToken, (req, res) => { // for security and importing a fake token 
  res.json(req.user);
});


router.get("/basicinfo/:id",async (req, res) => { // we have to return the id from the params
  const id = req.params.id
 
  const basicInfo = await Users.findByPk(
    id,
    {attributes: {exclude: ["password"]},
   })

  res.json(basicInfo)
})
module.exports = router;


/* admin */

router.get("/all",validateToken, async (req, res) => {
  const allMembers = await Users.findAll()
  res.json(allMembers)
})

router.get('/count', async (req, res) => { // get the number of products
  try {
    const usersCount = await Users.count(); // Use Products.count() to get the total count
    res.json({ count: usersCount });
  } catch (error) {
    console.error("Error fetching product count:", error);
    res.status(500).json({ error: "Error fetching product count" });
  }
});

router.delete("/:id", validateToken, async (req, res) => {// only the owner will delete the comment
  const id = req.params.id // identify which comment

  await Users.destroy({ // deleting the id
    where: {  
      id: id,
    },
  })

  res.json("Deleted Successfully")

}) 

router.put("/username",validateToken, async (req, res) =>{
  const { newUserName, id } = req.body;
  await Users.update({username: newUserName}, {where: {id: id} })

  res.json(newUserName);
})

router.put("/email",validateToken, async (req, res) =>{
  const { newEmail, id } = req.body;
  await Users.update({email: newEmail}, {where: {id: id} })

  res.json(newEmail);
})

router.put("/phonenumber",validateToken, async (req, res) =>{
  const { newPhoneNumber, id } = req.body;
  await Users.update({phoneNumber: newPhoneNumber}, {where: {id: id} })

  res.json(newPhoneNumber);
})
router.put("/type",validateToken, async (req, res) =>{
  const { newType, id } = req.body;
  await Users.update({admin_type: newType}, {where: {id: id} })

  res.json(newType);
})