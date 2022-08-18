const express = require("express");
const Chat = require("../models/Chat");
const User = require("../models/User");
const router = express.Router();

//@route    GET api/chat
//@desc     Get All Chats
//@access   Public
router.get("/", async (req, res) => {
  try {
    const chats = (
      await Chat.find().sort({ $natural: -1 }).limit(10)
    ).reverse();
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ chats });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    GET api/chat
//@desc     Get All Chats
//@access   Public
router.get("/count", async (req, res) => {
  try {
    const chatCount = await Chat.find().count();
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ chatCount });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    POST api/chat/loadMore
//@desc     load 10 More Chat Messages
//@access   Public
router.post("/loadMore", async (req, res) => {
  try {
    const { currentChatCount } = req.body;
    let newChatCount = currentChatCount + 10;
    const chats = await (await Chat.find().sort({ $natural: -1 }).limit(newChatCount)).reverse();
    res.header("Access-Control-Allow-Origin", "*");
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
    await Chat.remove();
    await User.remove();
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ msg:"Chat and users dropped" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
