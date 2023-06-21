const router = require("express").Router();
const {Employee } = require("../models/employee");

router.post("/", async (req, res) => {

    try{

        const employee = await Employee.findOne({code: req.body.code});
        if(employee)
           return res
                .status(409)
                .send({ message: "Code with given employee already Exist!. Please try again" });

            await new Employee({ ...req.body }).save();
            res.status(201).send({message: "Employee added succseefully!." });

    }catch(error){
     
        res.status(500).send({ message: "Internal Server Error" });

    }
});



module.exports = router;