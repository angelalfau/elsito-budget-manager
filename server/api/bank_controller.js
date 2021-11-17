const express = require("express");
const router = express.Router();
const bank = require("../service/bank");

// router.get("/getbanks", async (req, res) => {
//     res.send("uwu Hello");
// try {
//     const posts = await Posts.find();
//     if (!posts) throw Error("No Items");
//     res.status(200).json(posts);
// } catch (err) {
//     res.status(400).json({ mesg: err });
// }
// });

// router.post("/newbank", async (req, res) => {
//     const newPost = new Posts(req.body);
//     try {
//         const post = await newPost.save();
//         if (!post) throw Error("Something went wrong with the post");
//         res.status(200).json(post);
//     } catch {
//         res.status(400).json({ msg: error });
//     }
// });

router.post("/create-token", async (req, res) => {
    console.log("attempting to create token");
    try {
        console.log(req.body);
        await bank.createToken(req.body);
        res.status(200).send("created token");
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/sb-create-token", async (req, res) => {
    console.log("attempting to create sandbox token");
    console.log(req.body);
    try {
        await bank.sandboxCreateToken(req.body);
        res.status(200).send("created sandbox token");
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post("/balance", async (req, res) => {
    console.log("attempting to get balance");
    console.log(req.body);
    try {
        const access_token = req.body.access_token;
        await bank.getBalance(access_token);
        res.status(200).send("obtained balance");
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;