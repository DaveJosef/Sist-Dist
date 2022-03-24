require("dotenv").config();
const express = require("express");
const cors = require("cors");

// bd
const client = require('./db/redis');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {

    res.send('Estou inscrito');
})

client.on("message", (channel, message) => {
    console.log({message});
});

client.subscribe("Bla-blah");

app.listen(process.env.PORT, (err) => {
    if(err) throw err;
    console.log(`Server listening on port ${process.env.PORT}`);
});

console.log();
