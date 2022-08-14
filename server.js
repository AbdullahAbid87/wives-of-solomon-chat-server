const path = require("path");
const http = require("http");
const express = require("express");
// const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
});
const connectDB = require("./config/db");
const { addMessage } = require("./controllers/chat");
const cors = require("cors");
const bodyParser = require("body-parser");
var https = require("https");
var fs = require("fs");

var options = {
  key: fs.readFileSync("ssl/key.pem"),
  cert: fs.readFileSync("ssl/cert.pem"),
};

// use it before all route definitions
app.use(cors({origin: 'https://kza.rzw.mybluehost.me'}));

// Set static folder
app.use(express.static(path.join(__dirname, "/client/public")));

const SecurePORT = 5000 || process.env.SecurePORT;
const PORT = 5001 || process.env.PORT;
//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Define Routes
app.use("/api/chat", require("./routes/chat"));
app.use("/api/referral", require("./routes/referral"));

io.on("connection", (socket) => {
  socket.on("chatMessage", async (obj) => {
    let adminAddress1 = "0x5fc5DF5ee69055B5ce53b139c725a1bda41B0ce6";
    let adminAddress2 = "0x9544d2E163B83e94Ea0D9E254dB36AbDf6BdC861";
    let isAdmin = adminAddress1 == obj.address || adminAddress2 == obj.address;
    io.emit("message", { ...obj, isAdmin });
    await addMessage(obj);
  });
});

io.listen(
  http
    .createServer(app)
    .listen(PORT, () => console.log(`Server running on port ${PORT}`))
);

io.listen(
  https
    .createServer(options, app)
    .listen(SecurePORT, () =>
      console.log(`Secure Server running on port ${SecurePORT}`)
    )
);
