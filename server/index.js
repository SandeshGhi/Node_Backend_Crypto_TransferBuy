const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "cryptocoin"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/cryptocoins/get", (req, res) => {
    const sqlSelect = "SELECT * FROM crypto_coin";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/cryptocoins/insert", (req, res) => {
    const cryptocoinName = req.body.cryptocoinName;
    const cryptocoinNumber = req.body.cryptocoinNumber;

    const sqlInsert = "INSERT INTO crypto_coin (cryptocoinName, cryptocoinNumber) VALUES (?,?)";
    db.query(sqlInsert, [cryptocoinName, cryptocoinNumber], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});