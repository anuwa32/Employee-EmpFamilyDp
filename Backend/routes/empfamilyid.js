const router = require("express").Router();
const { EmpFamily } = require("../models/empfamily");

router.post("/insert-employeefamilyid", async (req, res) => {

    try {

       
        //const employeefam = await EmpFamily.findOne({ code: req.body.code });
        const employeefam = await EmpFamily.find({ code: req.body.code });
        if (!employeefam ) {
            return res
                .status(409)
                .send({ message: "ID with given employee doesnt add his/her family details!" });
        } else {
            res.json({
                message: "successfully",
                employeefam,
                status: 200
            });

        }
    } catch (error) {

        res.status(500).send({ message: "Internal Server Error" });
    }

});

//employee family details retrieve

router.route('/:code').get((req, res) => {

    EmpFamily.find({ code: req.params.code })

        .then(employeeFamilyDetails => res.json(employeeFamilyDetails))
        .catch(err => res.status(400).json('Error: ' + err));
});

//employee family details update

router.post("/update-employeefamilydetails/:id", async (req, res) => {
    EmpFamily.findById(req.params.id)
        .then(employeeFamDetails => {

            employeeFamDetails.firstname = req.body.firstname;
            employeeFamDetails.surname = req.body.surname;
            employeeFamDetails.relationship = req.body.relationship;

            employeeFamDetails.save()
                .then(() => {

                    res.json({
                        message: "Employee Family Details sucessfully updated"
                    });
                })
                .catch(err => res.status(400).json('Error: ' +err));
        })
        .catch(err => res.status(400).json('Error: ' +err));
});

//employee family details delete

router.route('/:id').delete((req, res) => {

    EmpFamily.findByIdAndDelete(req.params.id)

        .then(() => res.json('Employee family Details sucessfully deleted.'))

        .catch(err => res.status(400).json('Error: ' + err));

});
module.exports = router;