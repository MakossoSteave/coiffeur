const mongoose = require("mongoose");
const router = require("express").Router();
const CoiffeurModel = require("../model/coiffeur");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const {
    CoiffeurRegisterValidation,
    CoiffeurLoginValidation
} = require("../validation");



router.get("/", (req, res) => {
    res.send("Bienvenue sur l'espace coiffeur");
});

router.post("/register", async(req, res) => {
    {
        const { error } = CoiffeurRegisterValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //Checking d'utilisateur dans la base de donnée

        const SalonExist = await CoiffeurModel.findOne({
            SalonName: req.body.SalonName
        });
        if (SalonExist) return res.status(400).send("Salon already exist");

        //hashage du mots de passe

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const coiffeur = new CoiffeurModel({
            ville: req.body.ville,
            name: req.body.name,
            description: req.body.description,
            SalonName: req.body.SalonName,
            Address: req.body.Address,
            NbTel: req.body.NbTel,
            NbEmployé: req.body.NbEmployé,
            photo: req.body.photo,
            password: hashedPassword

        });

        try {
            coiffeur.save()

            console.log(coiffeur);
            console.log("jkfnjznjfez");
            //res.send({ user: user._id });


            res.status(200).send(coiffeur);
        } catch (err) {
            res.status(400).send(err.details);
        }
    };
});
router.post("/login", async(req, res) => {
    const { error } = CoiffeurLoginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checking existance de l'email
    const coiffeur = await CoiffeurModel.findOne({ SalonName: req.body.SalonName });

    if (!coiffeur) return res.status(400).send("Salon is not found");
    //checking du mots de passe
    const validPass = await bcrypt.compare(req.body.password, coiffeur.password);
    if (!validPass) return res.status(400).send("Invalid password");
    const validName = await (req.body.name == coiffeur.name);
    if (!validName) return res.status(400).send("Invalid name");

    else {
        return res.status(400).send("Bienvenue " + req.body.name + " votre address est bien la " + coiffeur.Address);
    }



})

module.exports = router;