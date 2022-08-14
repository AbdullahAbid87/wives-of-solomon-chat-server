const express = require("express");
const User = require("../models/User");
const router = express.Router();

//@route    POST api/chat
//@desc     Get User Referral
//@access   Public
router.post("/getUserReferral", async (req, res) => {
  try {
    const { address } = req.body;
    const currentUser = await User.findOne({
      address,
    });
    if (!currentUser) {
      res.header("Access-Control-Allow-Origin", "*");
      return res.json({ noReferral: "Referral not generated" });
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      return res.json({ currentUser });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    POST api/referral
//@desc     Get All Chats
//@access   Public
router.post("/addReferral", async (req, res) => {
  try {
    const { address, referralCode } = req.body;
    const userFields = {};
    userFields.address = address;
    userFields.referralCode = referralCode;
    const updatedUser = await User.findOneAndUpdate(
      {
        address,
        referral: referralCode,
      },
      { $set: userFields },
      { new: true, upsert: true }
    );
    res.header("Access-Control-Allow-Origin", "*");
    return res.json({ updatedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    POST api/referral
//@desc     Get All Chats
//@access   Public
router.post("/updateReferral", async (req, res) => {
  try {
    const { address, referralCode } = req.body;
    const userFields = {};
    const referralUser = await User.findOne({
      referral: referralCode,
    });

    if (!referralUser) {
      return res.status(500).json({ msg: "Invalid Referral" });
    }

    if (referralUser.address === address) {
      return res.status(500).json({ msg: "You cannot get refer yourself" });
    }

    let referredListOfUsers = referralUser.referralAddresses;
    if (referredListOfUsers.includes(address)) {
      return res.json({ msg: "User already referred" });
    } else {
      referredListOfUsers.push(address);
      userFields.referralAddresses = referredListOfUsers;
      let currentScore = referralUser.referralScore;
      currentScore += 5;
      userFields.referralScore = currentScore;
    }

    //   userFields.address = address;
    //   userFields.referralCode = referralCode;
    const updatedUser = await User.findOneAndUpdate(
      {
        referral: referralCode,
      },
      { $set: userFields },
      { new: true }
    );
    res.header("Access-Control-Allow-Origin", "*");
    return res.json({ updatedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
