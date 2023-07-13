const express = require("express")
require("dotenv").config()
const app = express()

const port = process.env.port

const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./Routes/user.route")
const { employeeRouter } = require("./Routes/emp.route")

app.use(express.json())
app.use(cors())

app.use("/user", userRouter)
app.use("/employees", employeeRouter)
app.listen(port, async () => {
    try {
        await connection
        console.log(`server running at ${port} and connected to db`)
    } catch (error) {
        console.log(error)
    }
})

module.exports = { app }