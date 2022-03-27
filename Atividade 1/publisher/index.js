const readline = require("readline");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// bd
const client = require("./db/redis");

/* Using terminal */

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

/* Using HTTP

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

class Message {
  constructor(
    user = "Pitchulinhas",
    content = "Hello, World!",
    time = new Date()
  ) {
    this.user = user;
    this.content = content;
    this.time = time;
  }

  asString() {
    return `[${this.time.toLocaleTimeString()}] [<${this.user}>]: <${
      this.content
    }>`;
  }
}

app.post("/publish", (req, res) => {
  const { channel } = req.body;
  const { message } = req.body;

  let newMessage = new Message(message.user, message.content);

  publisher.publish(channel, newMessage.asString());
  res.send("Publiquei");
});

app.delete("/quit", (req, res) => {
  publisher.quit();
  res.send("Quitando");
});

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${process.env.PORT}`);
});
*/
