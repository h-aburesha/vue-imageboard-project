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

/* Add a new POST route in your server to handle the incoming data from the form

add a middleware to handle FormData to access the uploaded file and it should be automatically saved in a folder
In your client you'll need to add a form to your index.html with corresponding input fields to upload and update an image in your server

you will need to send the data as FormData. Add two methods in the methods keyword in VueJs where you will handle file changes and handle the submit (here you will create the form data and send it via fetch to your server)
in the fetch response you'll need to handle the response and update the images array accordingly 
*/

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
