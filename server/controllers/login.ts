import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { Router } from "express";
import User from "../models/user";
const loginRouter: Router = Router()

loginRouter.post("/", async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    
    const passwordCorrect = user == null ? false : await bcrypt.compare(password, user.passwordHash!)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: "Incorrect Email or Password"
        })
    }

    const userForToken = {
        email: user.email,
        id: user._id
    }

    if (!process.env.SECRET) {
        throw new Error('Secret key is not defined');
    }
    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60
    });

    return res.status(200).send({ token, email: user.email, name: user.name })
})

export default loginRouter