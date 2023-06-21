const mongoose = require("mongoose");
const Joi = require("joi");

const employeeFamilySchema = new mongoose.Schema({

    code: {type: String, require },
    firstname: {type: String, require },
    surname: {type: String, require },
    relationship: {type: String, require },
    tnumber: {type: Number, require},

});

const EmpFamily = mongoose.model("empfamily", employeeFamilySchema);

const validate = (date) => {
    const schema = Joi.object({
        code: Joi.string().required().label("Employee Id"),
        firstname: Joi.string().required().label("Firstname"),
        surname: Joi.string().required().label("Surname"),
        relationship: Joi.string().required().label("Relationship"),
        tnumber: Joi.number().required().label("Telephone number"),
        
    });
};

module.exports = {EmpFamily, validate}