const readline = require("readline");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// message controller
const {sendMessage} = require('./utils/sendMessage');

// message utils
const messageUtils = require('./utils/messageUtils');

// bd
const client = require("./db/redis");

// context vars
let authUser = {
  id: 0,
  username: "Diogo",
};
let currentChannel = {
  channelName: "Pitchulinhas"
};

const publisher = client.duplicate();
const subscriber = client.duplicate();
/*
(async() => {
  await publisher.connect();
  await subscriber.connect();
})();
*/

/* Using terminal */
/*
function readMessage(leitor, publisher, channel) {
  console.log("Informe um numero: ");
  leitor.question("", async (answer) => {
    await publisher.publish(channel, answer);
    console.log("enter");
    await leitor.close();
    process.stdin.destroy();

    readMessage(leitor, publisher, channel);
  });
}

(async () => {
  const channel = "msg";

  const subscriber = client.duplicate();
  //   await subscriber.connect();

  await subscriber.subscribe(channel, () => {
    console.log("Increveu-se");
  });

  const publisher = client.duplicate();
  //   await publisher.connect();

  const leitor = readline.createInterface(process.stdin);

  readMessage(leitor, publisher, channel);

  subscriber.on("message", (channel, message) => {
    console.log(message);
  });
})();
*/

// Using HTTP

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const verifyConnetion = async(req, res, next) => {

  if (!await publisher.ping((err) => {
    
  })) {
    return res.send("Chat desconectado");
  }

  next();
}

app.post("/publish", verifyConnetion, async(req, res) => {
  const { message } = req.body;

  await sendMessage(publisher, currentChannel, message);

  res.send("Publiquei");
});

app.delete("/quit", verifyConnetion, async(req, res) => {
  await sendMessage(publisher, currentChannel, {
    user: authUser,
    content: "Exited the chat."
  });

  await publisher.quit();
  await subscriber.quit();

  res.send("Quitando");
});

// Subscriber logic
(async() => {
  await subscriber.subscribe(currentChannel.channelName)}
)();

subscriber.on("message", (channel, message) => {
  if (message === null) {
    return;
  }

  let messageObject = JSON.parse(message);

  messageObject.user = messageUtils.replaceUser(messageObject, authUser);

  // [HH:MM:SS] [<usuário>]: <mensagem>
  const displayMessage = messageUtils.stringify(messageObject);

  console.log(displayMessage);
});

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${process.env.PORT}`);
});
