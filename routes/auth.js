const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const saltRounds = 10;

router.post("/register", async(req, res) => {
    //Validation des donnée après la creation de l'User
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checking d'utilisateur dans la base de donnée

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exist");
    //hashage du mots de passe

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Création d'un nouvelle utilisateur
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: false
    });
    try {
        const savedUser = await user.save();
        //res.send({ user: user._id });

        console.log(req.body.email);
        console.log(req.body.name);
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err.details);
    }
});
//Admin registration
router.post("/register/admin", async(req, res) => {
    //Validation des donnée après la creation de l'User
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checking d'utilisateur dans la base de donnée

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exist");
    //hashage du mots de passe

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Création d'un nouvel Admin
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: true
    });
    try {
        const savedUser = await user.save();
        //res.send({ user: user._id });

        console.log(req.body.email);
        console.log(req.body.name);
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err.details);
    }
});

//LOGIN

router.post("/login", async(req, res) => {
    //Validation des donnée après la creation de l'User

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checking existance de l'email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email is not found");
    //checking du mots de passe
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");
    if (req.body.role == 1) {
        console.log("I am admin");
    }
    //Creation et  distribution de token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
});

module.exports = router;