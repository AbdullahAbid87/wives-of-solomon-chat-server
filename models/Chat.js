const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  address: {
    type: String
  },
  message: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("chat", ChatSchema);
