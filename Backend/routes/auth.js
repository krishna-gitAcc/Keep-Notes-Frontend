const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECTET = 'secret';
const fetchuser = require('../middleware/fetchuser');


const User = require("../models/User");


//Route 1:create a user using: Post "/api/auth/createuser". Doesn't require Auth
router.post('/createuser',
    [
        //validation of name, passowrd, email usint express validator
        body('email', 'Enter a valid name').isEmail(),
        body('name', "Enter a valid email").isLength({ min: 3 }),
        body('password', "Password must be atleast 5 char").isLength({ min: 5 }),
    ],
    async (req, res) => {

        let success = false

        //if there are error return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        //check whether the user with the this email exists
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({
                    success,
                    error: "Sorry a user with this email already exit",
                })
            }

            //encrypting the password using bcryptjs node module
            const salt = await bcrypt.genSalt(10);

            const secPass = await bcrypt.hash(req.body.password, salt);

            //create a new user in the database.
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            let data = {
                "id": user.id
            }

            let authToken = jwt.sign(data, JWT_SECTET);
            success=true;
            res.json({success,authToken});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }

    });



//Route 2:Authentication a User using : Post "/api/auth/login". No login required
router.post('/login', [
    //email and password validation
    body('email', 'Enter a valid name').isEmail(),
    // body('name', "Enter a valid email").isLength({ min: 3 }),
    body('password', "Enter a valid Passoword").isLength({ min: 5 }),
], async (req, res) => {
    const { email, password } = req.body;
    let success = false;
    try {
        //Seraching user in database
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }

        //password authentcation
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "please try to login with correct credentials" });
        }

        const data = {
            "id": user.id
        }

        //generating a jwt token for each login
        const authToken = jwt.sign(data, JWT_SECTET);
        success = true;
        res.json({success,authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success, error:"Internal Server Error"});
    }
});



//Route 3 :get login User Details using Post "/api/auth/getuser". Login Required.
router.post('/getuser',fetchuser ,async (req, res) => {

let success = false
try {
    const userId = req.id
    success = true;
    const user = await User.findById(userId).select("-password").populate("name");
    res.status(200).json({success, data:user});

} catch (error) {
    console.error(error.message);
    res.status(500).json({success, error:"Internal Server Error"});
}

});



module.exports = router;