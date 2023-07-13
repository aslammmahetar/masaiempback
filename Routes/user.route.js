const express = require("express")

const userRouter = express.Router()

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const { UserModel } = require("../Model/user.model")

userRouter.post("/signup", (req, res) => {
    const { email, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).json({ err: err })
            } else {
                const user = new UserModel({ email, password: hash })
                await user.save()
                res.status(200).json({ msg: "SignIn SuccessFully" })
            }
        })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userId: user._id, userEmail: user.email }, "employee")
                    res.status(200).json({ msg: "Logged In Successfull", token })
                } else {
                    res.status(400).json({ msg: err.message })
                }
            })
        } else {
            res.status(400).json({ msg: "User not found" })
        }
    } catch (error) {
        res.status(400).json({ msg: error })
    }
})

module.exports = { userRouter }