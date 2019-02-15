const express = require("express");
const router = require("./routes.js");
const compress = require("compression");
const path = require("path");
const bodyParser = require("body-parser");
var port = process.env.PORT || 9011;

const app = express();

app.use(compress());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "../client/dist")));
app.use("/:id", express.static(path.join(__dirname, "../client/dist")));
app.use("/api/similarlistings", router);

app.listen(port, () => console.log(`Server listening on ${port}`));
