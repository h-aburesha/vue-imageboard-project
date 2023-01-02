const path = require("path");
const express = require("express");
const { DataBrew } = require("aws-sdk");
const app = express();
require("dotenv").config();
const { PORT = 8080 } = process.env;
const {
    getAllImg,
    addImg,
    getImgById,
    addComment,
    getAllComments,
} = require("./db");
const { uploader, fileUpload } = require("./file-upload");

app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.get("/images", (req, res) => {
    getAllImg().then(({ rows }) => {
        // console.log("rows", rows);
        res.json(rows.sort((a, b) => a.id - b.id)); // sorted by id from postgres
    });
});

app.get("/image/:id", (req, res) => {
    const id = req.params.id;
    // console.log(":id from server", req.params.id);
    getImgById(id).then(({ rows }) => {
        // console.log("rows from image/:id : ", rows[0]);
        //rows[0] just the object

        res.json(rows[0]); // or you respond back with rows[0] with just the {img object}
    });
});

app.post("/add-comment", (req, res) => {
    // console.log("req.body: ", req.body);
    const { comment, username, image_id } = req.body;
    // console.log("/add-comment: ", comment, username, image_id);

    addComment(comment, username, image_id).then(({ rows }) => {
        console.log("Rows from /add-comment: ", rows[0]);
    });
});

app.get("/comments/:id", (req, res) => {
    const image_id = req.params.id;
    // console.log(":id from server", req.params.id);
    getAllComments(image_id).then(({ rows }) => {
        console.log("rows from comments/:id : ", rows);
        //rows[0] just the object

        res.json(rows); // or you respond back with rows[0] with just the {img object}
    });
});

app.post("/add-formdata", uploader.single("file"), fileUpload, (req, res) => {
    console.log("req.file: ", req.file);
    const { username, title, description } = req.body;
    const { fileUrl } = res.locals;

    // console.log(username, title, description, "req.body", fileUrl);
    addImg(fileUrl, username, title, description);

    // post what came from the file sent from app.js to add-formdata & its body contains (file, desc)
    if (req.file) {
        res.json({
            success: true,
            // responding to the browser
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
