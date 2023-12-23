const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
const requiredLogin = require("../middlewares/requiredLogin");

/// to get user profile
router.get("/user/:id", async (req, res) => {
    try {
        const user = await USER.findOne({ _id: req.params.id }).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const posts = await POST.find({ postedBy: req.params.id })
            .populate("postedBy", "_id")
            .exec();
        // console.log(posts)
        res.status(200).json({ user, posts });
    } catch (err) {
        return res.status(422).json({ error: err.message });
    }
});
// to follow user
router.put("/follow", requiredLogin, async (req, res) => {
    try {
        const updatedUser = await USER.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.user._id } },
            { new: true }
        ).exec();

        await USER.findByIdAndUpdate(
            req.user._id,
            { $push: { following: req.body.followId } },
            { new: true }
        ).exec();

        res.json(updatedUser);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

// to unfollow user
router.put("/unfollow", requiredLogin, async (req, res) => {
    try {
        const updatedUser = await USER.findByIdAndUpdate(
            req.body.followId,
            { $pull: { followers: req.user._id } },
            { new: true }
        ).exec();

        await USER.findByIdAndUpdate(
            req.user._id,
            { $pull: { following: req.body.followId } },
            { new: true }
        ).exec();

        res.json(updatedUser);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

// to upload profile pic
// router.put("/uploadProfilePic", requiredLogin, (req, res) => {
//     USER.findByIdAndUpdate(
//         req.user._id,
//         { $set: { Photo: req.body.pic } },
//         { new: true },
//         (err, result) => {
//             if (err) {
//                 return res.status(422).json({ error: err });
//             } else {
//                 res.json(result);
//             }
//         }
//     );
// });
// to upload profile pic
router.put("/uploadProfilePic", requiredLogin, async (req, res) => {
    try {
        const result = await USER.findByIdAndUpdate(
            req.user._id,
            { $set: { Photo: req.body.pic } },
            { new: true }
        ).exec(); // Add .exec() to explicitly execute the query as a promise

        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});


module.exports = router;