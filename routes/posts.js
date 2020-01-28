const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

router.get("/", verify, (req, res) => {
    console.log(req.user);
    res.send(req.user);
});

module.exports = router;