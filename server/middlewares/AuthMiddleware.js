//this middlewar is executed in every request then we have the token data accessed by using req.user.username for username
const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => { // this will run before a request middleware and the next -> routes -> models 
  const accessToken = req.header("accessToken"); // the key is accessed from here

  if (!accessToken){
   return res.json({
     error: "User not logged in!" });
   }
  try {
    const validToken = verify(accessToken, "importantsecret"); // validating the token and it contains the raw data
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };