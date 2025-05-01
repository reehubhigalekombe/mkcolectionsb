const bcrypt = require("bcryptjs");
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../models/User");

router.post("/signup", async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) 
            return res.status(400).json({message: "The Email provided already exist"});
         const hashedPassword = await bcrypt.hash(password, 10);
         const newUser = new User({username, email, password: hashedPassword});
         await newUser.save();
         const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "2hrs" })
         return res.status(201).json({message: "User registered Successfuly"})
    } catch(error) {
        return res.status(500).json({message: "Error enter a valid email"})
    }
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({message: "The User not found. Kindly try again"})
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({message: "Invalid password or email"})
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET || "your __jwt_secret", {expiresIn: "2hrs"});
        return res.json(200)({message: "Your Login was Successful", token})

    }catch(err) {
        res.status(500).json({error: err.message})
    }
})
module.exports = router;