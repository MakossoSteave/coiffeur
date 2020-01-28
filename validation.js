//VALIDATION
const Joi = require("@hapi/joi");

//Validation d'inscription
const registerValidation = data => {
    const schema = {
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
};

// validation inscription coiffeur
const CoiffeurRegisterValidation = data => {
    const schema = {
        name: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        ville: Joi.string()
            .min(4)
            .required(),
        SalonName: Joi.string()
            .min(4)
            .required(),
        Address: Joi.string()
            .min(5)
            .required(),
        NbTel: Joi.string()
            .min(10)
            .required(),
        NbEmployé: Joi.string()
            .min(1)
            .required(),
        photo: Joi.string()
            .min(1)
            .required(),
        description: Joi.string()
            .min(50)
            .required()
    };
    return Joi.validate(data, schema);
};
//validation de de la connexion coiffeur
const CoiffeurLoginValidation = data => {
    const schema = {
        SalonName: Joi.string()
            .min(6)
            .required(),

        password: Joi.string()
            .min(6)
            .required(),
        name: Joi.string()
            .min(4)
            .required()
    };
    return Joi.validate(data, schema);
};
//validation de la connexion
const loginValidation = data => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
};

// coiffeur post 
const CoiffeurPostValidation = data => {
    const schema = {
        nom: Joi.string()
            .min(6)
            .required()
            .email(),
        description: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.CoiffeurRegisterValidation = CoiffeurRegisterValidation;
module.exports.CoiffeurLoginValidation = CoiffeurLoginValidation;
module.exports.CoiffeurPostValidation = CoiffeurPostValidation;