const router = require("express").Router();
const PostModel = require("../model/PostCoiffeur");
const { CoiffeurPostValidation } = require("../validation");

router.post('/posts', async(req, res) => {

    const post = new PostModel({
        ville: req.body.ville,
        name: req.body.name,
        SalonName: req.body.SalonName,
        Address: req.body.Address,
        photo: req.body.photo,
        description: req.body.description
    })
    try {
        post.save()

        console.log(post);
        console.log("ceci est un post");
        //res.send({ user: user._id });


        res.status(200).send(coiffeur);
    } catch (err) {
        res.status(400).send(err.details);
    }
})
module.exports = router;