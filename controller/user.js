const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');


require('dotenv').config();


function generateAccessToken(id) {
    return jwt.sign({ userId: id }, process.env.JWT_TOKEN);
}

exports.postSignup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);

        if (hash) {
            await User.create({ email: email, password: hash });
            res.status(201).json('user created successfully');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }

}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: 'User with this email does not exist' });
        }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            return res.status(201).json({ message: 'User logged in Successfully', token: generateAccessToken(user._id.toString()) });
        }
        else {
            return res.status(401).json({ message: 'incorrect password' });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }

}


exports.requestHandler = async (req, res) => {
    try {
        // const { taskData} = req.body;
        const { userId } = req;
        console.log(userId);
        if (userId) {
            res.status(200).json({ message: "User succesfully authenticated through middleware" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

