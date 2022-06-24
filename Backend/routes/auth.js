const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const User = require("../models/User");


//create a user using: Post "/api/auth/createuser". Doesn't require Auth
router.post('/createuser',
    [
        //validation of name, passowrd, email usint express validator
        body('email', 'Enter a valid name').isEmail(),
        body('name', "Enter a valid email").isLength({ min: 3 }),
        body('password', "Password must be atleast 5 char").isLength({ min: 5 }),
    ],
    async (req, res) => {

        //if there are error return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //check whether the user with the this email exists
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({
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
                "id":user.id
            }

            let authToken = jwt.sign(data, 'secret');

            res.send(authToken);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }

    });

module.exports = router;