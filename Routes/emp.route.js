const express = require("express")
const { EmpModel } = require("../Model/empModel")

const employeeRouter = express.Router()

employeeRouter.post("/", async (req, res) => {
    try {
        const employee = new EmpModel(req.body)
        await employee.save()
        res.status(200).json({ msg: "User has been added successfully" })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
})

employeeRouter.get("/allemp", async (req, res) => {
    try {
        let allEmp = await EmpModel.find()
        res.status(200).json({ msg: "All employees are here", allEmp })
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong" })
    }
})

module.exports = { employeeRouter }