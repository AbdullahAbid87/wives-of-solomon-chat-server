const Chat = require("../models/Chat");

const addMessage = async (obj) => {
  try {
    let { address, message, date } = obj;
    let adminAddress = "0xd75501d60524CF00146bF822F3b4A6A36e481a74";
    let isAdmin = adminAddress===address;
    let newChat = new Chat({
      address,
      message,
      isAdmin,
      date: new Date(date),
    });

    await newChat.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addMessage };
