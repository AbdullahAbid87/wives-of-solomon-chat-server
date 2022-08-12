const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  address: {
    type: String,
    unique: true,
  },
  referral: {
    type: String,
  },
  referralScore: {
    type: Number,
    default: 0,
  },
  referralAddresses: [String],
});

module.exports = mongoose.model("user", UserSchema);
