const express = require("express");
const app = express();
const config = require("./config/server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const coifRoute = require("./routes/coiffeur");
const postRoute = require("./routes/posts");
const Coiffeur = require("./routes/PostCoiffeur");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Import Routes
const authRoute = require("./routes/auth");

dotenv.config();
//connection avec Mongoose
mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true },

    console.log("connection à la base de donnée !")
);
//middlewares
app.use(express.json());

//Routes Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/coiffeur", coifRoute);
app.use("/api/postCoiffeur", Coiffeur);

app.listen(config.server.port, () =>
    console.log("Server On " + config.server.port)
);