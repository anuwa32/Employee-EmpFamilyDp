const router = require("express").Router();
const { EmpFamily } = require("../models/empfamily");
const { Employee } = require("../models/employee");

router.post("/", async (req, res) => {

    try {
        const emp = await Employee.findOne({ code: req.body.code });
        const empfamily = await EmpFamily.findOne({ code: req.body.code });

        if (!emp) {
            return res
                .status(409)
                .send({ message: "ID with given employee doesnt exist!. Please try again" });
        } else if (emp && empfamily) {
            return res
                .status(409)
                .send({ message: "ID with given employee already has family details." });
        } else {
            await new EmpFamily({ ...req.body }).save();
            res.status(201).send({ message: "Employee's family details added succseefully!." });
        }

    } catch (error) {

        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;




