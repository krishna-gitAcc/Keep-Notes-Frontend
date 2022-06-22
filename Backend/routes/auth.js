const express = require('express');
const router = express.Router();

const User = require("../models/User");

//create a user using: Post "/api/auth/". Doesn't require Auth

router.get('/', (req, res)=>{

    res.send("Hello");
    console.log(req.body);

});

router.post('/', (req,res)=>{
    const user = User(req.body);
    user.save();
    res.send("recieved");
});

module.exports = router;