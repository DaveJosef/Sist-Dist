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

    client.publish("Bla-blah", JSON.stringify({nome: "José David"}))
    res.send('Publiquei');
})

app.listen(process.env.PORT, (err) => {
    if(err) throw err;
    console.log(`Server listening on port ${process.env.PORT}`);
});
