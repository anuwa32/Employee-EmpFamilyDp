const mongoose = require("mongoose");
const Joi = require("joi");
const { number } = require("joi");

const employeeSchema = new mongoose.Schema ({

    age: {type: Number, require},
    code: { type: String, require },
    initials: { type: String, require },
    firstname: { type: String, require },
    surname: { type: String, require  },
    address1: { type: String, require},
    address2: { type: String, require },
    dob: { type: Date, require },
    status: {type: String, require },

});

const Employee = mongoose.model("employee", employeeSchema);

const validate = (data) => {
    const schema = Joi.object({

        age: Joi.number().required().label("Age"),
        code: Joi.string().required().label("Code"),
        initials: Joi.number().required().label("Initials"),
        firstname: Joi.string().required().label("Firstname"),
        surname: Joi.string().required().label("Surname"),
        address1: Joi.string().required().label("Address1"),
        address2: Joi.string().required().label("Address2"),
        dob: Joi.date().required().label("Dob"),
        status: Joi.string().required().label("Status"),

    });
};

module.exports = {Employee, validate}