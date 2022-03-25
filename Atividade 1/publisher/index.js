require("dotenv").config();
const express = require("express");
const cors = require("cors");

// bd
const publisher = require('./db/redis');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

class Message {
    constructor(user = "Pitchulinhas", content = "Hello, World!", time = new Date()) {
        this.user = user;
        this.content = content;
        this.time = time;
    }

    asString() {
        return `[${this.time.toLocaleTimeString()}] [<${this.user}>]: <${this.content}>`;
    }
}

app.post('/publish', (req, res) => {
    const {channel} = req.body;
    const {message} = req.body;

    let newMessage = new Message(message.user, message.content);

    publisher.publish(channel, newMessage.asString());
    res.send('Publiquei');
});

app.delete('/quit', (req, res) => {
    publisher.quit();
    res.send('Quitando');
});

app.listen(process.env.PORT, (err) => {
    if(err) throw err;
    console.log(`Server listening on port ${process.env.PORT}`);
});
