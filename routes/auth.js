const bcrypt = require("bcrypt");
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../models/User");
const { message } = require("statuses");

router.post("/signup", async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) 
            return res.status(400).json({message: "The Email provided allready exist"});
         const hashedPassword = await bcrypt.hash(password, 10);
         const newUser = new User({username, email, password: hashedPassword});
         await newUser.save();
         res.json({message: "User Account has been create Successfully"})
    } catch(error) {
        res.status(500).json({message: "Error enter a valid email"})
    }
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({message: "The User not found try again"})
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({message: "Inavlid password or email"})
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET || "your __jwt_secret", {expiresIn: "2hrs"});
        res.json({message: "Your Login was Succefully", token})

    }catch(err) {
        res.status(500).json({error: err.message})
    }
})
module.exports = router;