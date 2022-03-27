require("dotenv").config();
const express = require("express");
const cors = require("cors");

// bd
const subscriber = require("./db/redis");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/subscribe", (req, res) => {
  const { channel } = req.body;

  subscriber.subscribe(channel);
  res.send("Estou inscrito");
});

app.delete("/subscribe", (req, res) => {
  const { channel } = req.body;

  subscriber.unsubscribe(channel);
  res.send("Inscrição Removida");
});

app.delete("/quit", (req, res) => {
  subscriber.quit();
  res.send("Quitando");
});

subscriber.on("message", (channel, message) => {
  // [HH:MM:SS] [<usuário>]: <mensagem>
  console.log(message);
});

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${process.env.PORT}`);
});
