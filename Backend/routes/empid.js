const router = require("express").Router();
const { Employee } = require("../models/employee");
const findage = require("findage");

router.post("/insert-employeeid", async (req, res) => {

    try {
        const employee = await Employee.findOne({ code: req.body.code }); 
        if (!employee) {
            return res
                .status(409)
                .send({ message: "ID with given employee doesnt exists!" });
        } else {
            res.json({
                message: "successfully",
                employee,
                status: 200
            });
        }
    } catch (error) {

        res.status(500).send({ message: "Internal Server Error" });
    }

});

//retrieve employee details

router.route('/:code').get((req, res) => {

    Employee.find({ code: req.params.code })

        //.then(employeeDetails => res.json(employeeDetails))
        .then((employeeDetails) => {
            var empDateOfBirth = employeeDetails[0].dob
            // console.log("employeeDetails",employeeDetails[0])
            // console.log("InputDOB",empDateOfBirth)
            const dateob = new Date(empDateOfBirth);
            const changeFormatDOB = (((dateob.getMonth() > 8) ? (dateob.getMonth() + 1) : ('0' + (dateob.getMonth() + 1))) + '/' + ((dateob.getDate() > 9) ? dateob.getDate() : ('0' + dateob.getDate())) + '/' + dateob.getFullYear());
            var employeeAge = findage.fullAge(changeFormatDOB)
            res.json({
                employeeDetails,
                employeeAge
            })
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

//update employee details

router.post("/update-employeedetails/:id", async (req, res) => {
    Employee.findById(req.params.id)
        .then(employeeDetails => {

            employeeDetails.initials = req.body.initials;
            employeeDetails.firstname = req.body.firstname;
            employeeDetails.surname = req.body.surname;
            employeeDetails.address1 = req.body.address1;
            employeeDetails.address2 = req.body.address2;
            employeeDetails.dob = req.body.dob;
            employeeDetails.status = req.body.status;

            employeeDetails.save()
                .then(() => {
                    var dateOfBirth = req.body.dateOfBirth  
                    const currentDate = new Date(dateOfBirth); 
                    const ageToToday = (((currentDate.getMonth() > 8) ? (currentDate.getMonth() + 1) : ('0' + (currentDate.getMonth() + 1))) + '/' + ((currentDate.getDate() > 9) ? currentDate.getDate() : ('0' + currentDate.getDate())) + '/' + currentDate.getFullYear()); 
                    var employeeAge = findage.fullAge(ageToToday) 

                    res.json({ //sent as json object to frontend
                        message: "Employee details sucessfully updated",
                        employeeAge 
                    });
                })
                .catch(err => res.status(400).json('Error: ' + err));


        })
        .catch(err => res.status(400).json('Error: ' + err));
});


//delete employee details

router.route('/:id').delete((req, res) => {

    Employee.findByIdAndDelete(req.params.id)

        .then(() => res.json('Employee Details sucessfully deleted.'))

        .catch(err => res.status(400).json('Error: ' + err));

});
module.exports = router;