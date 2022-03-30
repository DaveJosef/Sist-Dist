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

// users
const dbUsers = [
  registeredUser1 = {
    id: 0,
    username: "Diogo",
  },
  registeredUser2 = {
    id: 1,
    username: "Anna",
  }
];

// context vars
let authUser = null;
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

const verifyAuth = async(req, res, next) => {

  if (!authUser) {
    return res.send("Usuario nao autenticado");
  }

  next();
}

app.post("/login", async(req, res) => {
  const { username } = req.body;

  userFound = dbUsers.find(user => user.username === username);

  if (userFound) {
    authUser = userFound;
    res.send("Autenticado com Sucesso");
  } else {
    res.send("Usuario nao encontrado");
  }
});

app.post("/publish", verifyConnetion, verifyAuth, async(req, res) => {
  const { message } = req.body;

  await sendMessage(publisher, currentChannel, message);

  res.send("Publiquei");
});

app.delete("/quit", verifyConnetion, verifyAuth, async(req, res) => {
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
  if (message === null || !authUser) {
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
