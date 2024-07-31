var express = require("express");
var router = express.Router();

var jwt = require('jsonwebtoken');


/* GET token. */
router.get("/", async function (req, res, next) {
  
  var token = await jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: 'foobar'
  }, 'secret');

  res.render("ticket", {
    username:req.cookies['username'],
    token:token, 
  });
});

module.exports = router;