const express = require("express");
const Chat = require("../models/Chat");
const User = require("../models/User");
const router = express.Router();

//@route    GET api/chat
//@desc     Get All Chats
//@access   Public
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json({ chats });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    GET api/chat
//@desc     Get All Chats
//@access   Public
router.get("/drop", async (req, res) => {
  try {
    await Chat.deleteMany();
    await User.deleteMany();
    res.json({msg:"Chat and Users dropped"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;