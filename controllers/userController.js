const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

const getCurrentUser = asyncHandler(async (req, res) => {    
    res.json(req.user);
});

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists!");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword });
    if(user){
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    if(user && await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user: {
                email:user.email,
                _id: user.id
            }
        }, process.env.SECURITY_TOKEN,
        { expiresIn: "5m" }
        );
        res.status(200).json({ 
            email: user.email,
            token: accessToken 
        });
    } else {
        res.status(400);
        throw new Error("Email or password is not valid");
    }    
});

module.exports = {getCurrentUser, registerUser, loginUser};