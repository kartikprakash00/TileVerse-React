import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid Email or Password" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token, userId: user._id })
        }
        else {
            res.json({ success: false, message: "Invalid Email or Password" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Route for user registeration
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password should be minimum 8 characters" });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id)

        res.json({ success: true, token, userId: user._id })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateHighScore2048 = async (req, res) => {
    try {

        const { userId, score } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (score > user.highscore2048) {
            user.highscore2048 = score;
            await user.save();
        }
        else {
            console.log("Score is not higher than current highscore.");
        }

        res.json({ success: true, highscore2048: user.highscore2048 })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateHighScore2187 = async (req, res) => {
    try {

        const { userId, score } = req.body;
        console.log(`Updating highscore2187 for user: ${userId}, score: ${score}`);

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (score > user.highscore2187) {
            user.highscore2187 = score;
            await user.save();
            console.log("High score updated:", user.highscore2187);
        }
        else {
            console.log("Score is not higher than current highscore.");
        }

        res.json({ success: true, highscore2187: user.highscore2187 })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const leaderboard2048 = async (req, res) => {
    try {

        const leaderboard = await userModel.find({})
            .sort({ highscore2048: -1 })
            .limit(10)
            .select('name highscore2048');

        res.json({ success: true, leaderboard });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const leaderboard2187 = async (req, res) => {
    try {

        const leaderboard = await userModel.find({})
            .sort({ highscore2187: -1 })
            .limit(10)
            .select('name highscore2187');

        res.json({ success: true, leaderboard });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { loginUser, registerUser, updateHighScore2048, updateHighScore2187, leaderboard2048, leaderboard2187 }