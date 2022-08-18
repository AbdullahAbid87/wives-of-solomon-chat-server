const Chat = require("../models/Chat");

const addMessage = async (obj) => {
  try {
    let { address, message, date } = obj;
    let adminAddress1 = "0x5fc5DF5ee69055B5ce53b139c725a1bda41B0ce6";
    let adminAddress2 = "0x48C7E38Dcb67542852C09395476A21A29E0cDC77";

    let isAdmin =
      adminAddress1 === obj.address || adminAddress2 === obj.address;

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
