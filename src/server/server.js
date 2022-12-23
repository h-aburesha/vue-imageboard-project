const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8080 } = process.env;

app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.get("/cities", (req, res) => {
    // later get data from DB
    const cities = [
        {
            city: "Berlin",
            country: "Germany",
        },
        {
            city: "Warsaw",
            country: "Poland",
        },
        {
            city: "Kiev",
            country: "Ukraine",
        },
    ];
    res.json(cities);
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
